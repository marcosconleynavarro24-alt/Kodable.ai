"use client";

// New-client intake form. Spanish only on purpose: every client so far is a
// Spanish local business, and this page is operational (linked from the
// welcome WhatsApp/email after closing), not part of the marketing funnel.
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { contactInfo } from "@/content/contact-info";

type Status = "idle" | "submitting" | "ok" | "error";
type FieldErrors = Record<string, string>;

const FIELDS = [
  { name: "business", label: "Nombre del negocio", type: "input", req: true, auto: "organization" },
  { name: "name", label: "Tu nombre", type: "input", req: true, auto: "name" },
  { name: "phone", label: "Teléfono / WhatsApp", type: "input", req: true, auto: "tel" },
  { name: "email", label: "Email", type: "input", req: false, auto: "email" },
  { name: "address", label: "Dirección del local", type: "input", req: false, auto: "street-address" },
  { name: "hours", label: "Horarios (tal cual queréis que salgan)", type: "textarea", req: true,
    ph: "p. ej. Martes a domingo 12:00–16:30 y 19:30–23:30 · Lunes cerrado" },
  { name: "description", label: "Vuestro negocio en 2–3 líneas", type: "textarea", req: true,
    ph: "Qué hacéis, desde cuándo, qué os hace especiales…" },
  { name: "services", label: "Carta / servicios y precios", type: "textarea", req: false,
    ph: "Pegad la carta o lista de servicios aquí. Vale copiar de un PDF o escribirlo rápido" },
  { name: "style", label: "Estilo que os gusta", type: "textarea", req: false,
    ph: "Colores, alguna web que os guste, cómo NO la queréis…" },
  { name: "domain", label: "Dominio actual (si tenéis)", type: "input", req: false, ph: "minegocio.es" },
  { name: "social", label: "Instagram / Facebook", type: "input", req: false, ph: "@minegocio" },
  { name: "notes", label: "Algo más que debamos saber", type: "textarea", req: false },
] as const;

export default function OnboardingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const renderedAt = useRef<number>(0);
  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setFormError("");
    const data = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = { t0: renderedAt.current };
    for (const f of FIELDS) payload[f.name] = data.get(f.name);
    payload.companyUrl = data.get("companyUrl"); // honeypot
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("ok");
        return;
      }
      const e2 = (json.errors ?? {}) as FieldErrors;
      setErrors(e2);
      setFormError(e2.form ?? "Revisa los campos marcados.");
      setStatus("error");
    } catch {
      setFormError("No se ha enviado. Prueba de nuevo o escríbenos por WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="form-card">
        <div className="form-status ok" role="status">
          <Icon name="check" />
          <span>
            <strong>¡Todo recibido!</strong>
            <br />
            Último paso: mándanos 5–10 fotos del local y de los platos/productos
            por WhatsApp y el reloj de los 7 días empieza a contar.
          </span>
        </div>
        <a
          className="btn btn-primary"
          style={{ width: "100%", justifyContent: "center", marginTop: 14 }}
          href={`${contactInfo.whatsappUrl}?text=${encodeURIComponent("Hola, os paso las fotos para la web:")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enviar fotos por WhatsApp <Icon name="send" />
        </a>
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

      {FIELDS.map((f) => (
        <div key={f.name} className={`field${errors[f.name] ? " bad" : ""}`}>
          <label htmlFor={`ob-${f.name}`}>
            {f.label} {!f.req ? <span className="opt">(opcional)</span> : null}
          </label>
          {f.type === "textarea" ? (
            <textarea
              id={`ob-${f.name}`}
              name={f.name}
              placeholder={"ph" in f ? f.ph : undefined}
              aria-invalid={!!errors[f.name]}
            />
          ) : (
            <input
              id={`ob-${f.name}`}
              name={f.name}
              type="text"
              autoComplete={"auto" in f ? f.auto : undefined}
              placeholder={"ph" in f ? f.ph : undefined}
              aria-invalid={!!errors[f.name]}
            />
          )}
          {errors[f.name] ? <p className="err">{errors[f.name]}</p> : null}
        </div>
      ))}

      {/* honeypot: hidden from people, tempting to bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="ob-company-url">Company URL</label>
        <input id="ob-company-url" name="companyUrl" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "submitting"}
        style={{ width: "100%", justifyContent: "center" }}
      >
        {status === "submitting" ? "Enviando…" : "Enviar todo"}
        {status === "submitting" ? null : <Icon name="send" />}
      </button>
    </form>
  );
}
