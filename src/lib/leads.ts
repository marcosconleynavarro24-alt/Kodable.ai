// Lead handling for the contact form. Self-contained and dependency-free:
// validates input, blocks spam (honeypot + time-trap + rate limit), persists to
// data/leads.ndjson, and delivers two emails — a notification to the owner and a
// friendly auto-reply to the customer. With no RESEND_API_KEY set it writes the
// rendered emails to data/outbox/ so you can preview them; set the key to send.
import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Locale } from "@/i18n/config";

export const SERVICE_INTERESTS = [
  "websites",
  "ai-agents",
  "custom-tools",
  "automations",
  "not-sure",
] as const;
export type ServiceInterest = (typeof SERVICE_INTERESTS)[number];

export interface LeadInput {
  name?: unknown;
  business?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  services?: unknown;
  locale?: unknown;
  t0?: unknown; // form-render timestamp (ms), for the time-trap
  companyUrl?: unknown; // honeypot — must stay empty
}

export interface Lead {
  name: string;
  business: string;
  email: string;
  phone: string;
  message: string;
  services: ServiceInterest[];
  locale: Locale;
  receivedAt: string;
}

export type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "message" | "contact", string>
>;

export type ValidationResult =
  | { ok: true; lead: Lead }
  | { ok: false; errors: FieldErrors };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 4000;

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

const messages = {
  en: {
    name: "Please tell us your name.",
    message: "Please add a short message so we know how to help.",
    email: "That email doesn't look right.",
    contact: "Please leave an email or a phone number so we can reply.",
    rate: "You've sent a few messages just now. Please try again in a minute.",
    server: "Something went wrong on our end. Please try WhatsApp or email instead.",
  },
  es: {
    name: "Dinos tu nombre, por favor.",
    message: "Añade un mensaje corto para saber cómo ayudarte.",
    email: "Ese email no parece correcto.",
    contact: "Déjanos un email o un teléfono para poder responderte.",
    rate: "Has enviado varios mensajes seguidos. Inténtalo de nuevo en un minuto.",
    server: "Algo ha fallado por nuestra parte. Prueba por WhatsApp o email.",
  },
} as const;

export function localeFromInput(v: unknown): Locale {
  return v === "es" ? "es" : "en";
}

export function errorMessages(locale: Locale) {
  return messages[locale];
}

export function validateLead(input: LeadInput): ValidationResult {
  const locale = localeFromInput(input.locale);
  const m = messages[locale];

  const name = asString(input.name).slice(0, 120);
  const business = asString(input.business).slice(0, 160);
  const email = asString(input.email).slice(0, 160);
  const phone = asString(input.phone).slice(0, 60);
  const message = asString(input.message).slice(0, MAX_MESSAGE);

  const services = Array.isArray(input.services)
    ? input.services
        .map((s) => asString(s))
        .filter((s): s is ServiceInterest =>
          (SERVICE_INTERESTS as readonly string[]).includes(s),
        )
    : [];

  const errors: FieldErrors = {};
  if (name.length < 2) errors.name = m.name;
  if (message.length < 5) errors.message = m.message;
  if (email && !EMAIL_RE.test(email)) errors.email = m.email;
  if (!email && !phone) errors.contact = m.contact;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    lead: {
      name,
      business,
      email,
      phone,
      message,
      services,
      locale,
      receivedAt: new Date().toISOString(),
    },
  };
}

// ── Spam defences ────────────────────────────────────────────────────────────
// Honeypot: bots fill hidden fields.
export function isSpam(input: LeadInput): boolean {
  return asString(input.companyUrl).length > 0;
}

// Time-trap: a real person takes a few seconds to fill the form. A submit faster
// than MIN_FILL_MS after the form rendered is almost certainly a bot. Lenient: if
// t0 is missing or unparseable we let it through (don't punish edge cases).
const MIN_FILL_MS = 2500;
export function tooFast(input: LeadInput): boolean {
  const t0 = typeof input.t0 === "number" ? input.t0 : Number(asString(input.t0));
  if (!Number.isFinite(t0) || t0 <= 0) return false;
  const delta = Date.now() - t0;
  return delta >= 0 && delta < MIN_FILL_MS;
}

// Simple best-effort in-memory limiter (per server instance): 5 / IP / 10 min.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();
export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

// ── Persistence ──────────────────────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.ndjson");

export async function saveLead(lead: Lead): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(LEADS_FILE, JSON.stringify(lead) + "\n", "utf8");
  } catch (err) {
    console.error("[lead] could not write data/leads.ndjson:", err);
  }
  console.info("[lead] received", {
    name: lead.name,
    business: lead.business,
    email: lead.email,
    phone: lead.phone,
    services: lead.services,
    locale: lead.locale,
    at: lead.receivedAt,
  });
}

export async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as Lead;
        } catch {
          return null;
        }
      })
      .filter((x): x is Lead => x !== null);
  } catch {
    return [];
  }
}

export function leadsToCsv(leads: Lead[]): string {
  const cols = ["receivedAt", "name", "business", "email", "phone", "services", "locale", "message"] as const;
  const cell = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const head = cols.join(",");
  const rows = leads.map((l) =>
    cols
      .map((c) => cell(c === "services" ? l.services.join("; ") : String(l[c] ?? "")))
      .join(","),
  );
  return [head, ...rows].join("\n");
}

// ── Email rendering ──────────────────────────────────────────────────────────
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SERVICE_LABELS: Record<Locale, Record<ServiceInterest, string>> = {
  en: {
    "websites": "A new website",
    "ai-agents": "An AI assistant",
    "custom-tools": "A custom tool or app",
    "automations": "Automations",
    "not-sure": "Not sure yet",
  },
  es: {
    "websites": "Una web nueva",
    "ai-agents": "Un asistente de IA",
    "custom-tools": "Una herramienta a medida",
    "automations": "Automatizaciones",
    "not-sure": "Aún no lo saben",
  },
};

interface RenderedEmail {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}

function ownerEmail(lead: Lead, to: string): RenderedEmail {
  const interests = lead.services.map((s) => SERVICE_LABELS.en[s]).join(", ") || "—";
  const lines = [
    `Name: ${lead.name}`,
    `Business: ${lead.business || "—"}`,
    `Email: ${lead.email || "—"}`,
    `Phone: ${lead.phone || "—"}`,
    `Interested in: ${interests}`,
    `Language: ${lead.locale.toUpperCase()}`,
    `Received: ${lead.receivedAt}`,
    "",
    lead.message,
  ];
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 14px 4px 0;color:#4b5c56;white-space:nowrap">${label}</td><td style="padding:4px 0;color:#16221f;font-weight:600">${escapeHtml(value)}</td></tr>`;
  const html = `
  <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#16221f">
    <h2 style="color:#0a6650;margin:0 0 4px">New enquiry${lead.business ? ` · ${escapeHtml(lead.business)}` : ""}</h2>
    <p style="color:#4b5c56;margin:0 0 18px">via kodable.ai contact form</p>
    <table style="border-collapse:collapse;font-size:15px">
      ${row("Name", lead.name)}
      ${row("Business", lead.business || "—")}
      ${row("Email", lead.email || "—")}
      ${row("Phone", lead.phone || "—")}
      ${row("Interested in", interests)}
      ${row("Language", lead.locale.toUpperCase())}
    </table>
    <div style="margin-top:18px;padding:16px;background:#f4f7f4;border-radius:12px;white-space:pre-wrap;font-size:15px;line-height:1.5">${escapeHtml(lead.message)}</div>
    ${lead.email ? `<p style="margin-top:18px"><a href="mailto:${escapeHtml(lead.email)}" style="color:#0a6650;font-weight:600">Reply to ${escapeHtml(lead.name)} →</a></p>` : ""}
  </div>`;
  return {
    to,
    subject: `New enquiry from ${lead.name}${lead.business ? ` (${lead.business})` : ""}`,
    text: lines.join("\n"),
    html,
    replyTo: lead.email || undefined,
  };
}

function customerEmail(lead: Lead, from: string): RenderedEmail | null {
  if (!lead.email) return null; // nowhere to send
  const wa = "https://wa.me/34690689260";
  const t =
    lead.locale === "es"
      ? {
          subject: "Gracias — hemos recibido tu mensaje · Kodable.ai",
          hi: `¡Hola ${lead.name}!`,
          body: "Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos en menos de 24 horas. Si lo prefieres ya, escríbenos por WhatsApp.",
          yours: "Esto es lo que nos contaste:",
          wa: "Escríbenos por WhatsApp",
          sign: "Un saludo,\nEl equipo de Kodable.ai",
        }
      : {
          subject: "Thanks — we got your message · Kodable.ai",
          hi: `Hi ${lead.name},`,
          body: "Thanks for getting in touch. We've got your message and we'll reply within 24 hours. Prefer it sooner? Message us on WhatsApp.",
          yours: "Here's what you told us:",
          wa: "Message us on WhatsApp",
          sign: "Warmly,\nThe Kodable.ai team",
        };
  const text = `${t.hi}\n\n${t.body}\n\n${t.yours}\n"${lead.message}"\n\n${t.sign}`;
  const html = `
  <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;color:#16221f">
    <p style="font-size:17px;margin:0 0 12px">${escapeHtml(t.hi)}</p>
    <p style="color:#33433e;line-height:1.6;margin:0 0 18px">${escapeHtml(t.body)}</p>
    <p style="color:#4b5c56;margin:0 0 6px">${escapeHtml(t.yours)}</p>
    <div style="padding:14px 16px;background:#f4f7f4;border-radius:12px;white-space:pre-wrap;color:#33433e">${escapeHtml(lead.message)}</div>
    <p style="margin:22px 0"><a href="${wa}" style="display:inline-block;background:#0e8266;color:#fff;text-decoration:none;font-weight:700;padding:11px 20px;border-radius:999px">${escapeHtml(t.wa)}</a></p>
    <p style="color:#4b5c56;white-space:pre-line;font-size:14px">${escapeHtml(t.sign)}</p>
  </div>`;
  return { to: lead.email, subject: t.subject, text, html, replyTo: from };
}

// ── Delivery ─────────────────────────────────────────────────────────────────
async function sendViaResend(email: RenderedEmail, from: string): Promise<boolean> {
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
      }),
    });
    if (!res.ok) {
      console.error("[lead] Resend error", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[lead] Resend request failed:", err);
    return false;
  }
}

// When email isn't configured, write the message that WOULD be sent to
// data/outbox/ so the owner can preview the whole flow without a key.
async function writeToOutbox(kind: string, email: RenderedEmail): Promise<void> {
  try {
    const dir = path.join(DATA_DIR, "outbox");
    await fs.mkdir(dir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const file = path.join(dir, `${stamp}-${kind}.txt`);
    const body = `To: ${email.to}\nSubject: ${email.subject}\n${email.replyTo ? `Reply-To: ${email.replyTo}\n` : ""}\n${email.text}\n`;
    await fs.writeFile(file, body, "utf8");
    console.info(`[lead] email preview written to ${path.relative(process.cwd(), file)} (set RESEND_API_KEY to actually send)`);
  } catch (err) {
    console.error("[lead] could not write outbox preview:", err);
  }
}

// Send the owner notification and the customer auto-reply. Best-effort: a failure
// here never fails the request (the lead is already saved).
export async function deliverLead(lead: Lead): Promise<void> {
  const from = process.env.LEAD_FROM_EMAIL ?? "Kodable.ai <hola@kodable.ai>";
  const notify = process.env.LEAD_NOTIFY_EMAIL;
  const configured = Boolean(process.env.RESEND_API_KEY);

  const emails: { kind: string; email: RenderedEmail | null }[] = [
    { kind: "owner", email: notify ? ownerEmail(lead, notify) : null },
    { kind: "customer", email: customerEmail(lead, from) },
  ];

  for (const { kind, email } of emails) {
    if (!email) continue;
    if (configured) {
      const sent = await sendViaResend(email, from);
      if (!sent) await writeToOutbox(kind, email); // fall back to a preview on failure
    } else {
      await writeToOutbox(kind, email);
    }
  }
}
