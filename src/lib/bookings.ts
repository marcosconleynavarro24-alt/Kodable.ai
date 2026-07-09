// Booking handling for the "Reserva tu cita" widget. Self-contained and
// dependency-free, mirroring src/lib/leads.ts: validates input, blocks spam
// (honeypot + time-trap + rate limit), persists to data/bookings.ndjson, and
// delivers two emails — an owner notification and a client confirmation that
// carries an .ics calendar invite with a reminder 1 day before. With no
// RESEND_API_KEY set it writes the rendered emails to data/outbox/ to preview.
//
// On serverless (Vercel) data/ is ephemeral, so — like leads — email is the
// durable record. The day-before reminder is delivered by the .ics VALARM in the
// client's own calendar (no server cron needed). The DB seam (saveBooking /
// readBookings) is isolated for wiring durable storage later.
import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

export const TZ = "Europe/Madrid";
// Fixed daily slots (Madrid local time), matching the widget design.
export const SLOTS = ["10:00", "11:30", "12:00", "16:00", "17:30", "18:00"] as const;
export const DAYS_SHOWN = 5; // business days offered in the picker
const WINDOW_DAYS = 21; // how far ahead a date may be booked (server-side guard)
const EVENT_MINUTES = 15; // a free 15-minute consultation

// ── Durable store (Supabase, optional) ───────────────────────────────────────
// When SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set, bookings persist to
// Postgres, so a taken slot stays taken across serverless invocations and can
// never be double-booked: a UNIQUE(slot_date, slot_time) constraint enforces it
// atomically at insert time. Without the env vars, we fall back to the local
// file store (fine for dev / a single long-running host, best-effort otherwise).
// The service-role key is read server-side only (this module is server-only) and
// never reaches the browser; the table has no public RLS policies.
const SB_URL = process.env.SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SB_TABLE = "kodable_bookings";
function supabaseOn(): boolean {
  return Boolean(SB_URL && SB_KEY);
}
function sbHeaders(extra?: Record<string, string>): Record<string, string> {
  return { apikey: SB_KEY!, Authorization: `Bearer ${SB_KEY!}`, "Content-Type": "application/json", ...extra };
}

// Thrown when the slot was taken between the availability check and the insert
// (the UNIQUE constraint fires). The API turns this into the friendly
// "just taken, pick another" message and sends no confirmation.
export class SlotTakenError extends Error {
  constructor() {
    super("slot_taken");
    this.name = "SlotTakenError";
  }
}

export type SlotState = "free" | "taken";
export interface DaySlots {
  date: string; // YYYY-MM-DD (Madrid)
  dn: string; // day-of-month, e.g. "24"
  dow: string; // localized short weekday, e.g. "Mar"
  slots: { t: string; state: SlotState }[];
}
export interface Availability {
  tz: string;
  days: DaySlots[];
}

export interface BookingInput {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  note?: unknown;
  date?: unknown;
  time?: unknown;
  locale?: unknown;
  t0?: unknown; // widget-render timestamp (ms), for the time-trap
  companyUrl?: unknown; // honeypot — must stay empty
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  note: string;
  date: string; // YYYY-MM-DD (Madrid)
  time: string; // HH:MM (Madrid)
  locale: BackendLocale;
  createdAt: string;
}

export type BookingErrors = Partial<
  Record<"name" | "email" | "contact" | "slot", string>
>;
export type BookingResult =
  | { ok: true; booking: Booking }
  | { ok: false; errors: BookingErrors };

type BackendLocale = "en" | "es";
function backendLocale(v: unknown): BackendLocale {
  return v === "es" ? "es" : "en";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

// ── Madrid time helpers ──────────────────────────────────────────────────────
function partsInTz(d: Date) {
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
  const p = Object.fromEntries(dtf.formatToParts(d).map((x) => [x.type, x.value]));
  return {
    y: +p.year, m: +p.month, d: +p.day, hh: +p.hour, mi: +p.minute, s: +p.second,
    date: `${p.year}-${p.month}-${p.day}`,
  };
}

// Current wall-clock date/minute-of-day in Madrid.
function madridNow() {
  const p = partsInTz(new Date());
  return { date: p.date, minutes: p.hh * 60 + p.mi };
}

// UTC offset (ms) for Madrid at a given instant.
function offsetMs(d: Date): number {
  const p = partsInTz(d);
  return Date.UTC(p.y, p.m - 1, p.d, p.hh, p.mi, p.s) - d.getTime();
}

// Convert a Madrid wall-clock date+time to the corresponding UTC instant.
function madridWallToUtc(date: string, time: string): Date {
  const [Y, M, D] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(Y, M - 1, D, hh, mm);
  return new Date(guess - offsetMs(new Date(guess)));
}

// Enumerate the next business days from a YYYY-MM-DD (UTC date math, date-only).
function* upcomingBusinessDays(fromDate: string): Generator<string> {
  const [Y, M, D] = fromDate.split("-").map(Number);
  let cursor = Date.UTC(Y, M - 1, D);
  for (let i = 0; i < WINDOW_DAYS; i++) {
    const dt = new Date(cursor);
    const dow = dt.getUTCDay(); // 0 Sun … 6 Sat
    if (dow !== 0 && dow !== 6) {
      const iso = `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
      yield iso;
    }
    cursor += 86_400_000;
  }
}

function weekdayShort(date: string, locale: BackendLocale): string {
  const noon = madridWallToUtc(date, "12:00");
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    timeZone: TZ, weekday: "short",
  }).format(noon).replace(/\.$/, "");
}

// ── Availability ─────────────────────────────────────────────────────────────
export async function getAvailability(localeRaw: unknown): Promise<Availability> {
  const locale = backendLocale(localeRaw);
  const taken = await takenSlots();
  const days: DaySlots[] = [];
  const now = madridNow();
  for (const date of upcomingBusinessDays(now.date)) {
    const slots = SLOTS.map((t) => ({
      t,
      // Every time is offered; a slot is only unavailable once genuinely booked.
      state: (taken.get(date)?.has(t) ? "taken" : "free") as SlotState,
    }));
    if (!slots.some((s) => s.state === "free")) continue; // skip fully-booked days
    const dn = String(Number(date.split("-")[2]));
    days.push({ date, dn, dow: weekdayShort(date, locale), slots });
    if (days.length >= DAYS_SHOWN) break;
  }
  return { tz: TZ, days };
}

// Map of already-booked slots (date -> set of times). Backed by Supabase when
// configured (durable across serverless), else by the local file store.
async function takenSlots(): Promise<Map<string, Set<string>>> {
  if (supabaseOn()) return takenSlotsFromSupabase();
  const map = new Map<string, Set<string>>();
  for (const b of await readBookings()) {
    if (!map.has(b.date)) map.set(b.date, new Set());
    map.get(b.date)!.add(b.time);
  }
  return map;
}

// Read future-dated bookings from Supabase. Fails open (empty map) on any error:
// availability display degrades gracefully, and the atomic insert is still the
// real guard against an actual double-booking.
async function takenSlotsFromSupabase(): Promise<Map<string, Set<string>>> {
  const map = new Map<string, Set<string>>();
  try {
    const today = madridNow().date;
    const url = `${SB_URL}/rest/v1/${SB_TABLE}?select=slot_date,slot_time&slot_date=gte.${today}`;
    const res = await fetch(url, { headers: sbHeaders(), cache: "no-store" });
    if (!res.ok) {
      console.error("[booking] supabase read", res.status, await res.text().catch(() => ""));
      return map;
    }
    const rows = (await res.json()) as { slot_date: string; slot_time: string }[];
    for (const r of rows) {
      if (!map.has(r.slot_date)) map.set(r.slot_date, new Set());
      map.get(r.slot_date)!.add(r.slot_time);
    }
  } catch (err) {
    console.error("[booking] supabase read failed:", err);
  }
  return map;
}

// ── Validation ───────────────────────────────────────────────────────────────
const messages = {
  en: {
    name: "Please tell us your name.",
    email: "That email doesn't look right.",
    contact: "Please leave an email or a phone number so we can confirm.",
    slot: "Please pick an available day and time.",
    taken: "Sorry, that slot was just taken. Please pick another.",
  },
  es: {
    name: "Dinos tu nombre, por favor.",
    email: "Ese email no parece correcto.",
    contact: "Déjanos un email o un teléfono para poder confirmar.",
    slot: "Elige un día y una hora disponibles.",
    taken: "Lo sentimos, acaban de coger esa hora. Elige otra.",
  },
} as const;
export function bookingMessages(locale: unknown) {
  return messages[backendLocale(locale)];
}

export async function validateBooking(input: BookingInput): Promise<BookingResult> {
  const locale = backendLocale(input.locale);
  const m = messages[locale];

  const name = asString(input.name).slice(0, 120);
  const email = asString(input.email).slice(0, 160);
  const phone = asString(input.phone).slice(0, 60);
  const note = asString(input.note).slice(0, 1000);
  const date = asString(input.date);
  const time = asString(input.time);

  const errors: BookingErrors = {};
  if (name.length < 2) errors.name = m.name;
  if (email && !EMAIL_RE.test(email)) errors.email = m.email;
  if (!email && !phone) errors.contact = m.contact;

  // Slot must be a real upcoming business-day slot, not in the past.
  const validDate = [...upcomingBusinessDays(madridNow().date)].includes(date);
  const validTime = (SLOTS as readonly string[]).includes(time);
  if (!validDate || !validTime) {
    errors.slot = m.slot;
  } else {
    const taken = await takenSlots();
    if (taken.get(date)?.has(time)) errors.slot = m.taken;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    booking: {
      id: bookingId(),
      name, email, phone, note, date, time, locale,
      createdAt: new Date().toISOString(),
    },
  };
}

function bookingId(): string {
  return "bk_" + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);
}

// ── Spam defences (mirrors leads.ts) ─────────────────────────────────────────
export function isSpam(input: BookingInput): boolean {
  return asString(input.companyUrl).length > 0;
}
const MIN_FILL_MS = 2000;
export function tooFast(input: BookingInput): boolean {
  const t0 = typeof input.t0 === "number" ? input.t0 : Number(asString(input.t0));
  if (!Number.isFinite(t0) || t0 <= 0) return false;
  const delta = Date.now() - t0;
  return delta >= 0 && delta < MIN_FILL_MS;
}
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 6;
const hits = new Map<string, number[]>();
export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

// ── Persistence (isolated seam) ──────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.ndjson");

export async function saveBooking(b: Booking): Promise<void> {
  if (supabaseOn()) {
    await saveBookingToSupabase(b); // throws SlotTakenError if the slot is gone
    return;
  }
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(BOOKINGS_FILE, JSON.stringify(b) + "\n", "utf8");
  } catch (err) {
    console.error("[booking] could not write data/bookings.ndjson:", err);
  }
  console.info("[booking] received", { id: b.id, name: b.name, date: b.date, time: b.time, locale: b.locale });
}

// Insert into Supabase. A 409 means the UNIQUE(slot_date, slot_time) constraint
// fired — the slot was just taken — which we surface as SlotTakenError so the
// caller can tell the user and skip the confirmation emails.
async function saveBookingToSupabase(b: Booking): Promise<void> {
  const res = await fetch(`${SB_URL}/rest/v1/${SB_TABLE}`, {
    method: "POST",
    headers: sbHeaders({ Prefer: "return=minimal" }),
    body: JSON.stringify({
      id: b.id,
      slot_date: b.date,
      slot_time: b.time,
      name: b.name,
      email: b.email,
      phone: b.phone,
      note: b.note,
      locale: b.locale,
      created_at: b.createdAt,
    }),
  });
  if (res.status === 409) throw new SlotTakenError();
  if (!res.ok) {
    throw new Error(`supabase insert ${res.status} ${(await res.text().catch(() => "")).slice(0, 200)}`);
  }
  console.info("[booking] saved to supabase", { id: b.id, date: b.date, time: b.time, locale: b.locale });
}

export async function readBookings(): Promise<Booking[]> {
  try {
    const raw = await fs.readFile(BOOKINGS_FILE, "utf8");
    return raw.split("\n").filter(Boolean).map((l) => {
      try { return JSON.parse(l) as Booking; } catch { return null; }
    }).filter((x): x is Booking => x !== null);
  } catch {
    return [];
  }
}

// ── Email + .ics ─────────────────────────────────────────────────────────────
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function emailAddress(from: string): string {
  const m = from.match(/<([^>]+)>/);
  return m ? m[1] : from;
}
// RFC 5545 parameter value (used for the ATTENDEE CN). Strip CR/LF so a crafted
// booking name can't inject extra iCalendar lines/properties, and double-quote
// the value if it contains : ; or , (the parameter delimiters).
function icsParam(v: string): string {
  const clean = v
    .replace(/[\r\n]+/g, " ")
    .replace(/"/g, "'");
  return /[:;,]/.test(clean) ? `"${clean}"` : clean;
}
function fmtUtc(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
// Human date like "Tuesday 24 June, 10:00" (localized).
function prettyWhen(date: string, time: string, locale: BackendLocale): string {
  const day = madridWallToUtc(date, time);
  const d = new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    timeZone: TZ, weekday: "long", day: "numeric", month: "long",
  }).format(day);
  return `${d}, ${time}`;
}

function buildIcs(b: Booking, fromAddr: string): string {
  const start = madridWallToUtc(b.date, b.time);
  const end = new Date(start.getTime() + EVENT_MINUTES * 60_000);
  const summary = b.locale === "es"
    ? "Consulta con Kodable.ai (15 min)"
    : "Kodable.ai consultation (15 min)";
  const desc = b.locale === "es"
    ? "Tu consulta gratis de 15 minutos con Kodable.ai. Te contactaremos por WhatsApp o email."
    : "Your free 15-minute consultation with Kodable.ai. We'll reach you by WhatsApp or email.";
  const remind = b.locale === "es" ? "Recordatorio: consulta con Kodable.ai mañana" : "Reminder: Kodable.ai consultation tomorrow";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kodable.ai//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${b.id}@kodable.ai`,
    `DTSTAMP:${fmtUtc(new Date())}`,
    `DTSTART:${fmtUtc(start)}`,
    `DTEND:${fmtUtc(end)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${desc}`,
    "LOCATION:Online / WhatsApp",
    `ORGANIZER;CN=Kodable.ai:mailto:${emailAddress(fromAddr)}`,
    b.email ? `ATTENDEE;CN=${icsParam(b.name)};RSVP=TRUE:mailto:${b.email}` : "",
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${remind}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  return lines.join("\r\n");
}

interface Rendered {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

// Split a comma/semicolon/whitespace-separated recipient list into addresses.
function parseRecipients(v: string | undefined): string[] {
  if (!v) return [];
  return [...new Set(v.split(/[,;\s]+/).map((s) => s.trim()).filter((s) => s.includes("@")))];
}

function ownerEmail(b: Booking, to: string | string[]): Rendered {
  const when = prettyWhen(b.date, b.time, b.locale);
  const lines = [
    `New booking · ${when}`,
    `Name: ${b.name}`,
    `Email: ${b.email || "-"}`,
    `Phone: ${b.phone || "-"}`,
    `Language: ${b.locale.toUpperCase()}`,
    b.note ? `\nNote:\n${b.note}` : "",
  ];
  const row = (l: string, v: string) =>
    `<tr><td style="padding:4px 14px 4px 0;color:#4b5c56;white-space:nowrap">${l}</td><td style="padding:4px 0;color:#16221f;font-weight:600">${escapeHtml(v)}</td></tr>`;
  const html = `
  <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#16221f">
    <h2 style="color:#0a6650;margin:0 0 4px">New booking</h2>
    <p style="color:#4b5c56;margin:0 0 18px">a consultation was booked via kodable.ai</p>
    <table style="border-collapse:collapse;font-size:15px">
      ${row("When", when)}
      ${row("Name", b.name)}
      ${row("Email", b.email || "-")}
      ${row("Phone", b.phone || "-")}
      ${row("Language", b.locale.toUpperCase())}
    </table>
    ${b.note ? `<div style="margin-top:18px;padding:16px;background:#f4f7f4;border-radius:12px;white-space:pre-wrap;font-size:15px;line-height:1.5">${escapeHtml(b.note)}</div>` : ""}
    ${b.email ? `<p style="margin-top:18px"><a href="mailto:${escapeHtml(b.email)}" style="color:#0a6650;font-weight:600">Reply to ${escapeHtml(b.name)} →</a></p>` : ""}
    <p style="color:#4b5c56;font-size:13px;margin-top:14px">Calendar invite attached.</p>
  </div>`;
  return {
    to,
    subject: `New booking · ${b.name} · ${when}`,
    text: lines.filter(Boolean).join("\n"),
    html,
    replyTo: b.email || undefined,
  };
}

function clientEmail(b: Booking, from: string): Rendered | null {
  if (!b.email) return null;
  const when = prettyWhen(b.date, b.time, b.locale);
  const wa = "https://wa.me/34690689260";
  const t = b.locale === "es"
    ? {
        subject: `Cita confirmada · ${when} · Kodable.ai`,
        hi: `¡Hola ${b.name}!`,
        body: `Tu consulta gratis de 15 minutos está confirmada para el ${when} (hora peninsular). Te hemos adjuntado el evento para tu calendario, con un recordatorio el día antes.`,
        change: "¿Necesitas cambiarla? Respóndenos a este email o escríbenos por WhatsApp.",
        wa: "Escríbenos por WhatsApp",
        sign: "Un saludo,\nEl equipo de Kodable.ai",
      }
    : {
        subject: `Booking confirmed · ${when} · Kodable.ai`,
        hi: `Hi ${b.name},`,
        body: `Your free 15-minute consultation is confirmed for ${when} (Spain time). We've attached the event for your calendar, with a reminder the day before.`,
        change: "Need to change it? Just reply to this email or message us on WhatsApp.",
        wa: "Message us on WhatsApp",
        sign: "Warmly,\nThe Kodable.ai team",
      };
  const text = `${t.hi}\n\n${t.body}\n\n${t.change}\n\n${t.sign}`;
  const html = `
  <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#16221f">
    <p style="font-size:17px;margin:0 0 12px">${escapeHtml(t.hi)}</p>
    <div style="padding:14px 16px;background:#e3f3ed;border-radius:12px;color:#0a4d3c;font-weight:700;font-size:16px;margin:0 0 16px">📅 ${escapeHtml(when)}</div>
    <p style="color:#33433e;line-height:1.6;margin:0 0 16px">${escapeHtml(t.body)}</p>
    <p style="color:#33433e;line-height:1.6;margin:0 0 18px">${escapeHtml(t.change)}</p>
    <p style="margin:0 0 22px"><a href="${wa}" style="display:inline-block;background:#0e8266;color:#fff;text-decoration:none;font-weight:700;padding:11px 20px;border-radius:999px">${escapeHtml(t.wa)}</a></p>
    <p style="color:#4b5c56;white-space:pre-line;font-size:14px">${escapeHtml(t.sign)}</p>
  </div>`;
  return { to: b.email, subject: t.subject, text, html, replyTo: emailAddress(from) };
}

// ── Delivery ─────────────────────────────────────────────────────────────────
async function sendViaResend(email: Rendered, from: string, icsBase64?: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: email.to,
        subject: email.subject,
        text: email.text,
        html: email.html,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
        ...(icsBase64
          ? { attachments: [{ filename: "kodable-consultation.ics", content: icsBase64, content_type: "text/calendar; method=REQUEST" }] }
          : {}),
      }),
    });
    if (!res.ok) {
      console.error("[booking] Resend error", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[booking] Resend request failed:", err);
    return false;
  }
}

async function writeToOutbox(kind: string, email: Rendered, ics?: string): Promise<void> {
  try {
    const dir = path.join(DATA_DIR, "outbox");
    await fs.mkdir(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const toLine = Array.isArray(email.to) ? email.to.join(", ") : email.to;
    const body = `To: ${toLine}\nSubject: ${email.subject}\n${email.replyTo ? `Reply-To: ${email.replyTo}\n` : ""}\n${email.text}\n${ics ? `\n--- calendar invite (kodable-consultation.ics) ---\n${ics}\n` : ""}`;
    await fs.writeFile(path.join(dir, `${stamp}-booking-${kind}.txt`), body, "utf8");
    console.info(`[booking] email preview written for ${kind} (set RESEND_API_KEY to send)`);
  } catch (err) {
    console.error("[booking] could not write outbox preview:", err);
  }
}

// Best-effort: a delivery failure never fails the request (booking is saved).
export async function deliverBooking(b: Booking): Promise<void> {
  const from = process.env.LEAD_FROM_EMAIL ?? "Kodable.ai <hola@kodable.ai>";
  // Owner notification can go to several inboxes (e.g. the kodable.ai address +
  // a personal email). BOOKING_NOTIFY_EMAIL is a comma/semicolon-separated list;
  // falls back to LEAD_NOTIFY_EMAIL.
  const notify = parseRecipients(process.env.BOOKING_NOTIFY_EMAIL ?? process.env.LEAD_NOTIFY_EMAIL);
  const configured = Boolean(process.env.RESEND_API_KEY);
  const ics = buildIcs(b, from);
  const icsB64 = Buffer.from(ics, "utf8").toString("base64");

  const jobs: { kind: string; email: Rendered | null }[] = [
    { kind: "owner", email: notify.length ? ownerEmail(b, notify) : null },
    { kind: "client", email: clientEmail(b, from) },
  ];
  for (const { kind, email } of jobs) {
    if (!email) continue;
    if (configured) {
      const sent = await sendViaResend(email, from, icsB64);
      if (!sent) await writeToOutbox(kind, email, ics);
    } else {
      await writeToOutbox(kind, email, ics);
    }
  }
}
