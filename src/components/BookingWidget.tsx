"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { BookingCopy } from "@/content/booking";
import Icon from "./Icon";

type SlotState = "free" | "taken";
interface DaySlots {
  date: string;
  dn: string;
  dow: string;
  slots: { t: string; state: SlotState }[];
  from: string; // earliest bookable start (HH:MM)
  to: string; // latest bookable start (HH:MM)
  busy: string[]; // already-booked starts that day
}
interface Availability {
  tz: string;
  step: number;
  days: DaySlots[];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MEETING_MIN = 15;

function toMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// Format what the visitor types into "HH:MM" as they go: digits only, colon
// inserted after the hour. Keeps a plain text field on brand instead of the
// browser's native time picker (a wheel on iOS, a dropdown elsewhere).
function formatTyping(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  if (!d) return "";
  // "930" means 9:30, "245" means 2:45: a leading 3-9 (or 2 followed by 4-9)
  // can only be a one-digit hour, so the colon goes after the first digit.
  const oneDigitHour = d[0] > "2" || (d.length > 1 && d[0] === "2" && d[1] > "3");
  const hLen = oneDigitHour ? 1 : 2;
  const h = d.slice(0, hLen);
  const m = d.slice(hLen, hLen + 2);
  if (m) return `${h}:${m}`;
  return raw.endsWith(":") && d.length === hLen ? `${h}:` : h;
}

// Turn any reasonable entry ("9", "930", "16:4", "16:45") into "HH:MM", or
// null when it cannot be a time of day.
function normalizeTime(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  let h: string;
  let m: string;
  if (v.includes(":")) {
    const [a, b = ""] = v.split(":");
    h = a;
    m = b.padEnd(2, "0");
  } else {
    const d = v.replace(/\D/g, "");
    if (!d) return null;
    if (d.length <= 2) {
      h = d;
      m = "00";
    } else if (d.length === 3) {
      h = d.slice(0, 1);
      m = d.slice(1);
    } else {
      h = d.slice(0, 2);
      m = d.slice(2, 4);
    }
  }
  if (!/^\d{1,2}$/.test(h) || !/^\d{2}$/.test(m)) return null;
  const hh = Number(h);
  const mm = Number(m);
  if (hh > 23 || mm > 59) return null;
  return `${String(hh).padStart(2, "0")}:${m}`;
}

type CustomIssue = "invalid" | "past" | "taken" | null;

// Check a normalized custom time against the day's window and the grid.
function checkCustom(t: string, day: DaySlots, step: number): CustomIssue {
  const min = toMin(t);
  const opens = 9 * 60; // business hours open; the API sends `from` per day
  if (min % step !== 0 || min < opens || min > toMin(day.to)) return "invalid";
  if (min < toMin(day.from)) return "past";
  if (day.busy.some((b) => Math.abs(toMin(b) - min) < MEETING_MIN)) return "taken";
  return null;
}

function fill(s: string, day: DaySlots): string {
  return s.replace("{from}", day.from).replace("{to}", day.to);
}

// The "Reserva tu cita" widget, now functional: pick a day + time, leave your
// details, and it creates a real booking (owner + client emails, calendar
// invite with a day-before reminder). Availability comes from /api/booking.
// Besides the fixed slots, "another time" opens a typed HH:MM field for any
// time inside business hours.
export default function BookingWidget({
  locale,
  copy,
}: {
  locale: Locale;
  copy: BookingCopy;
}) {
  const [avail, setAvail] = useState<Availability | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [dayIdx, setDayIdx] = useState(0);
  const [pick, setPick] = useState<string | null>(null); // a fixed slot
  const [customOpen, setCustomOpen] = useState(false);
  const [custom, setCustom] = useState(""); // raw typed text
  const [customTouched, setCustomTouched] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "", companyUrl: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const t0 = useRef<number>(0);
  const customRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    t0.current = Date.now();
    let alive = true;
    fetch(`/api/booking?locale=${locale}`, { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Availability) => {
        if (!alive) return;
        setAvail(data);
        setDayIdx(0);
        setPick(null);
      })
      .catch(() => alive && setLoadFailed(true));
    return () => {
      alive = false;
    };
  }, [locale]);

  const day = avail?.days[dayIdx];
  const step = avail?.step ?? 15;

  // The chosen time: a fixed slot, or a custom entry once it is valid.
  const customNorm = customOpen ? normalizeTime(custom) : null;
  const customIssue: CustomIssue =
    customOpen && day ? (customNorm ? checkCustom(customNorm, day, step) : custom.trim() ? "invalid" : null) : null;
  const time = customOpen ? (customNorm && !customIssue ? customNorm : null) : pick;

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const canSubmit =
    !!time && form.name.trim().length >= 2 && EMAIL_RE.test(form.email.trim());

  function openCustom() {
    setPick(null);
    setCustomOpen(true);
    // Focus after the field mounts.
    setTimeout(() => customRef.current?.focus(), 0);
  }

  function chooseSlot(t: string) {
    setCustomOpen(false);
    setPick(t);
  }

  async function submit() {
    if (!canSubmit || !day || status === "sending") return;
    setStatus("sending");
    setErrMsg(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          note: form.note,
          companyUrl: form.companyUrl,
          date: day.date,
          time,
          locale,
          t0: t0.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("done");
      } else {
        // `error` is a request-level failure code (nothing the visitor typed is
        // wrong), so it wins over the field errors and is rendered from `copy`,
        // which exists in the visitor's own locale. `errors` holds field messages.
        const errs = (data && data.errors) || {};
        const code: string | undefined = data && data.error;
        setErrMsg(
          code === "rate_limited"
            ? copy.errorRateLimited
            : code
              ? copy.errorGeneric
              : errs.slot || errs.contact || errs.email || errs.name || copy.errorGeneric,
        );
        setStatus("error");
      }
    } catch {
      setErrMsg(copy.errorGeneric);
      setStatus("error");
    }
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (status === "done") {
    return (
      <div className="booking reveal" role="status">
        <div className="book-done">
          <span className="book-done-ico" aria-hidden="true">
            <Icon name="check" />
          </span>
          <h4>{copy.successTitle}</h4>
          {day && time ? (
            <p className="book-done-when">
              {day.dow} {day.dn} · {time}
            </p>
          ) : null}
          <p className="book-done-body">{copy.successBody}</p>
        </div>
      </div>
    );
  }

  // ── Picker + form ────────────────────────────────────────────────────────────
  const noSlots = avail && avail.days.length === 0;
  const customMsg =
    day && customTouched && customIssue
      ? customIssue === "past"
        ? copy.customPast
        : customIssue === "taken"
          ? copy.customTaken
          : fill(copy.customInvalid, day)
      : null;

  return (
    <div className="booking reveal" role="group" aria-label={copy.title}>
      <div className="booking-head">
        <span className="b-ico" aria-hidden="true">
          <Icon name="calendar" />
        </span>
        <div>
          <h4>{copy.title}</h4>
          <p>{copy.place}</p>
        </div>
      </div>

      {!avail && !loadFailed ? <p className="book-msg">{copy.loading}</p> : null}
      {loadFailed || noSlots ? <p className="book-msg">{copy.noSlots}</p> : null}

      {avail && day ? (
        <>
          <div className="b-label">{copy.chooseDay}</div>
          {/* role=group, not tablist: children are aria-pressed toggle buttons, not tabs */}
          <div className="days" role="group" aria-label={copy.chooseDay}>
            {avail.days.map((d, i) => (
              <button
                key={d.date}
                type="button"
                className={`day${i === dayIdx ? " sel" : ""}`}
                aria-pressed={i === dayIdx}
                onClick={() => {
                  setDayIdx(i);
                  setPick(null);
                }}
              >
                <span className="dn">{d.dn}</span>
                {d.dow}
              </button>
            ))}
          </div>

          <div className="b-label">{copy.pickTime}</div>
          <div className="slots" role="group" aria-label={copy.pickTime}>
            {day.slots.map((s) => {
              const taken = s.state === "taken";
              const on = !customOpen && pick === s.t;
              return (
                <button
                  key={s.t}
                  type="button"
                  className={`slot${taken ? " taken" : ""}${on ? " pick" : ""}`}
                  disabled={taken}
                  aria-pressed={on}
                  onClick={() => chooseSlot(s.t)}
                >
                  {s.t}
                </button>
              );
            })}
            <button
              type="button"
              className={`slot slot-other${customOpen ? " pick" : ""}`}
              aria-pressed={customOpen}
              aria-expanded={customOpen}
              aria-controls="bk-custom-wrap"
              onClick={openCustom}
            >
              <Icon name="clock" />
              {copy.otherTime}
            </button>
          </div>

          {customOpen ? (
            <div className="custom-time" id="bk-custom-wrap">
              <div className={`field${customMsg ? " bad" : ""}`}>
                <label htmlFor="bk-custom">{copy.customLabel}</label>
                <div className="custom-row">
                  <input
                    ref={customRef}
                    id="bk-custom"
                    value={custom}
                    inputMode="numeric"
                    autoComplete="off"
                    maxLength={5}
                    placeholder={copy.customPh}
                    aria-describedby="bk-custom-hint"
                    aria-invalid={!!customMsg}
                    onChange={(e) => setCustom(formatTyping(e.target.value))}
                    onBlur={() => {
                      setCustomTouched(true);
                      const n = normalizeTime(custom);
                      if (n) setCustom(n);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                    }}
                  />
                  {time && customOpen ? (
                    <span className="custom-ok" aria-hidden="true">
                      <Icon name="check" />
                    </span>
                  ) : null}
                </div>
                {customMsg ? (
                  <p className="err" role="alert">
                    {customMsg}
                  </p>
                ) : null}
                <p className="book-hint" id="bk-custom-hint">
                  {fill(copy.customHint, day)}
                </p>
              </div>
            </div>
          ) : null}

          {time ? (
            <div className="book-form">
              <div className="field">
                <label htmlFor="bk-name">{copy.name}</label>
                <input
                  id="bk-name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder={copy.namePh}
                  autoComplete="name"
                />
              </div>
              <div className="field">
                <label htmlFor="bk-email">{copy.email}</label>
                <input
                  id="bk-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder={copy.emailPh}
                  autoComplete="email"
                />
              </div>
              <div className="field">
                <label htmlFor="bk-phone">
                  {copy.phone} <span className="opt">({copy.optional})</span>
                </label>
                <input
                  id="bk-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder={copy.phonePh}
                  autoComplete="tel"
                />
              </div>
              <div className="field">
                <label htmlFor="bk-note">
                  {copy.note} <span className="opt">({copy.optional})</span>
                </label>
                <textarea
                  id="bk-note"
                  value={form.note}
                  onChange={(e) => set("note", e.target.value)}
                  placeholder={copy.notePh}
                  rows={2}
                />
              </div>
              {/* honeypot */}
              <input
                className="hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.companyUrl}
                onChange={(e) => set("companyUrl", e.target.value)}
              />
              {errMsg ? <p className="book-err">{errMsg}</p> : null}
            </div>
          ) : null}

          <button
            type="button"
            className="btn btn-primary"
            disabled={!canSubmit || status === "sending"}
            onClick={submit}
          >
            {status === "sending" ? copy.confirming : copy.confirm}
          </button>
          <div className="confirm">
            <Icon name="check" />
            {copy.reminder}
          </div>
        </>
      ) : null}
    </div>
  );
}
