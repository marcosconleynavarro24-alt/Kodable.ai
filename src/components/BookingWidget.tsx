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
}
interface Availability {
  tz: string;
  days: DaySlots[];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The "Reserva tu cita" widget, now functional: pick a day + time, leave your
// details, and it creates a real booking (owner + client emails, calendar
// invite with a day-before reminder). Availability comes from /api/booking.
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
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "", companyUrl: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const t0 = useRef<number>(0);

  useEffect(() => {
    t0.current = Date.now();
    let alive = true;
    fetch(`/api/booking?locale=${locale}`, { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Availability) => {
        if (!alive) return;
        setAvail(data);
        setDayIdx(0);
        setTime(null);
      })
      .catch(() => alive && setLoadFailed(true));
    return () => {
      alive = false;
    };
  }, [locale]);

  const day = avail?.days[dayIdx];
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const canSubmit =
    !!time && form.name.trim().length >= 2 && EMAIL_RE.test(form.email.trim());

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
        const errs = (data && data.errors) || {};
        setErrMsg(errs.slot || errs.contact || errs.email || errs.name || copy.errorGeneric);
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
          <div className="days" role="tablist" aria-label={copy.chooseDay}>
            {avail.days.map((d, i) => (
              <button
                key={d.date}
                type="button"
                className={`day${i === dayIdx ? " sel" : ""}`}
                aria-pressed={i === dayIdx}
                onClick={() => {
                  setDayIdx(i);
                  setTime(null);
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
              return (
                <button
                  key={s.t}
                  type="button"
                  className={`slot${taken ? " taken" : ""}${time === s.t ? " pick" : ""}`}
                  disabled={taken}
                  aria-pressed={time === s.t}
                  onClick={() => setTime(s.t)}
                >
                  {s.t}
                </button>
              );
            })}
          </div>

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
