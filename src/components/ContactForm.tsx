"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import Icon from "./Icon";

type Status = "idle" | "submitting" | "ok" | "error";
type FieldErrors = Record<string, string>;

const COPY = {
  en: {
    name: "Your name",
    business: "Business name",
    optional: "optional",
    email: "Email",
    phone: "Phone / WhatsApp",
    contactHint: "Leave an email or a phone — whichever you prefer.",
    interest: "What are you after?",
    message: "Tell us about your business",
    messagePlaceholder:
      "e.g. I run a café and want customers to book a table and see the menu on their phone…",
    submit: "Send my message",
    submitting: "Sending…",
    okTitle: "Got it — thank you!",
    okBody:
      "Your message is with us. We'll reply within 24 hours. Prefer it now? Message us on WhatsApp.",
    errTitle: "That didn't send.",
    interests: {
      "websites": "A new website",
      "ai-agents": "An AI assistant",
      "custom-tools": "A custom tool or app",
      "automations": "Automations",
      "not-sure": "Not sure yet",
    },
  },
  es: {
    name: "Tu nombre",
    business: "Nombre del negocio",
    optional: "opcional",
    email: "Email",
    phone: "Teléfono / WhatsApp",
    contactHint: "Déjanos un email o un teléfono, lo que prefieras.",
    interest: "¿Qué buscas?",
    message: "Cuéntanos sobre tu negocio",
    messagePlaceholder:
      "p. ej. Llevo un café y quiero que los clientes reserven mesa y vean la carta en el móvil…",
    submit: "Enviar mensaje",
    submitting: "Enviando…",
    okTitle: "¡Recibido, gracias!",
    okBody:
      "Tu mensaje ya está con nosotros. Te respondemos en 24 horas. ¿Lo prefieres ya? Escríbenos por WhatsApp.",
    errTitle: "No se ha enviado.",
    interests: {
      "websites": "Una web nueva",
      "ai-agents": "Un asistente de IA",
      "custom-tools": "Una herramienta a medida",
      "automations": "Automatizaciones",
      "not-sure": "Aún no lo sé",
    },
  },
} as const;

const INTEREST_KEYS = [
  "websites",
  "ai-agents",
  "custom-tools",
  "automations",
  "not-sure",
] as const;

export default function ContactForm({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>("");
  const [services, setServices] = useState<string[]>([]);

  // Time-trap: record when the form became interactive. A submit faster than a
  // couple of seconds is almost certainly a bot (checked server-side).
  const renderedAt = useRef<number>(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  function toggleService(key: string) {
    setServices((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key],
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setFormError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      business: data.get("business"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
      companyUrl: data.get("companyUrl"), // honeypot
      t0: renderedAt.current, // time-trap
      services,
      locale,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("ok");
        form.reset();
        setServices([]);
        return;
      }
      const e2 = (json.errors ?? {}) as FieldErrors;
      setErrors(e2);
      setFormError(e2.form ?? e2.contact ?? t.errTitle);
      setStatus("error");
    } catch {
      setFormError(t.errTitle);
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="form-card">
        <div className="form-status ok" role="status">
          <Icon name="check" />
          <span>
            <strong>{t.okTitle}</strong>
            <br />
            {t.okBody}
          </span>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      {status === "error" && formError ? (
        <div className="form-status bad" role="alert">
          <Icon name="spark" />
          <span>{formError}</span>
        </div>
      ) : null}

      <div className={`field${errors.name ? " bad" : ""}`}>
        <label htmlFor="cf-name">{t.name}</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" aria-invalid={!!errors.name} />
        {errors.name ? <p className="err">{errors.name}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="cf-business">
          {t.business} <span className="opt">({t.optional})</span>
        </label>
        <input id="cf-business" name="business" type="text" autoComplete="organization" />
      </div>

      <div className={`field${errors.email ? " bad" : ""}`}>
        <label htmlFor="cf-email">{t.email}</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" inputMode="email" aria-invalid={!!errors.email} />
        {errors.email ? <p className="err">{errors.email}</p> : null}
      </div>

      <div className={`field${errors.contact ? " bad" : ""}`}>
        <label htmlFor="cf-phone">{t.phone}</label>
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        <p className="err" style={{ color: "var(--ink-mute)" }}>{t.contactHint}</p>
        {errors.contact ? <p className="err">{errors.contact}</p> : null}
      </div>

      <div className="field">
        <span className="label" style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: ".9rem", color: "var(--ink)", marginBottom: "7px" }}>
          {t.interest}
        </span>
        <div className="chips">
          {INTEREST_KEYS.map((key) => (
            <label key={key} className={`chip${services.includes(key) ? " on" : ""}`}>
              <input
                type="checkbox"
                name="interest"
                value={key}
                checked={services.includes(key)}
                onChange={() => toggleService(key)}
              />
              {t.interests[key]}
            </label>
          ))}
        </div>
      </div>

      <div className={`field${errors.message ? " bad" : ""}`}>
        <label htmlFor="cf-message">{t.message}</label>
        <textarea id="cf-message" name="message" placeholder={t.messagePlaceholder} aria-invalid={!!errors.message} />
        {errors.message ? <p className="err">{errors.message}</p> : null}
      </div>

      {/* honeypot: hidden from people, tempting to bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-company-url">Company URL</label>
        <input id="cf-company-url" name="companyUrl" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"} style={{ width: "100%", justifyContent: "center" }}>
        {status === "submitting" ? t.submitting : t.submit}
        {status === "submitting" ? null : <Icon name="send" />}
      </button>
    </form>
  );
}
