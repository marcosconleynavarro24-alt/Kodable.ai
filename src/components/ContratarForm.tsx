"use client";

// Plan selection + contract acceptance + hand-off to Stripe Checkout.
// Spanish-only operational page, same reasoning as the onboarding form.
import { useState } from "react";
import Icon from "./Icon";
import { contactInfo } from "@/content/contact-info";

const PRICES = {
  // display only — the amounts Stripe charges live server-side in lib/checkoutPlans.ts
  // (halved across the board 2026-07-08, in lockstep with checkoutPlans.ts)
  web: { setup: 245, foundingSetup: 95, monthly: 19.5 },
  agente: { setup: 118.75, monthly: 23.75 },
};

// Spanish-format an amount that may be fractional after the halving: 19.5 -> "19,50".
const eur = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(".", ","));

export default function ContratarForm({ founding }: { founding: boolean }) {
  const [plan, setPlan] = useState<"web" | "web-agente">("web");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const webSetup = founding ? PRICES.web.foundingSetup : PRICES.web.setup;
  const setupTotal = webSetup + (plan === "web-agente" ? PRICES.agente.setup : 0);
  const monthlyTotal = PRICES.web.monthly + (plan === "web-agente" ? PRICES.agente.monthly : 0);

  async function go() {
    setError("");
    if (!business.trim()) {
      setError("Dinos el nombre del negocio.");
      return;
    }
    if (!accepted) {
      setError("Marca la casilla de condiciones para continuar.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, founding, business, email, accepted }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok && json.url) {
        window.location.href = json.url as string;
        return;
      }
      setError((json.error as string) || "No se ha podido iniciar el pago.");
    } catch {
      setError("No se ha podido iniciar el pago. Inténtalo de nuevo.");
    }
    setBusy(false);
  }

  return (
    <div className="form-card">
      <div className="field">
        <span className="label" style={{ display: "block", fontWeight: 700, marginBottom: 7 }}>
          Qué contratas
        </span>
        <div className="chips">
          <label className={`chip${plan === "web" ? " on" : ""}`}>
            <input type="radio" name="plan" checked={plan === "web"} onChange={() => setPlan("web")} />
            Web · €{eur(webSetup)} + €{eur(PRICES.web.monthly)}/mes
          </label>
          <label className={`chip${plan === "web-agente" ? " on" : ""}`}>
            <input type="radio" name="plan" checked={plan === "web-agente"} onChange={() => setPlan("web-agente")} />
            Web + Agente IA · €{eur(webSetup + PRICES.agente.setup)} + €{eur(PRICES.web.monthly + PRICES.agente.monthly)}/mes
          </label>
        </div>
        {founding ? (
          <p className="err" style={{ color: "var(--accent-deep)" }}>
            Oferta fundadores aplicada: puesta en marcha de la web €{eur(PRICES.web.foundingSetup)} en
            lugar de €{eur(PRICES.web.setup)}, a cambio de reseña en Google + caso de estudio + 1 referencia.
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="ct-business">Nombre del negocio</label>
        <input id="ct-business" type="text" value={business} onChange={(e) => setBusiness(e.target.value)} autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="ct-email">Email para las facturas <span className="opt">(opcional)</span></label>
        <input id="ct-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" />
      </div>

      <div className="field" style={{ background: "var(--paper-warm)", borderRadius: 14, padding: "14px 16px", fontSize: ".88rem", color: "var(--ink-soft)" }}>
        <b>Condiciones en corto</b> (versión 2026-07-08):
        <ul style={{ margin: "6px 0 0 18px", lineHeight: 1.6 }}>
          <li>Hoy pagas la puesta en marcha (€{eur(setupTotal)}) + primera cuota (€{eur(monthlyTotal)}). IVA incluido.</li>
          <li>Web publicada en tu dominio en un máximo de 7 días laborables desde que recibimos tus contenidos y fotos.</li>
          <li>Sin permanencia: cancelas cuando quieras con 30 días de aviso y la web deja de estar activa al final del período pagado.</li>
          <li>La cuota incluye hosting, dominio, mantenimiento y cambios razonables de textos y fotos.</li>
          <li>Tus datos, según nuestra <a href="/es/privacy">política de privacidad</a>.</li>
        </ul>
      </div>

      <label className="chip" style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "10px 14px" }}>
        <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} style={{ marginTop: 3 }} />
        <span>He leído y acepto las condiciones. Contratar es aceptar este contrato.</span>
      </label>

      {error ? (
        <div className="form-status bad" role="alert" style={{ marginTop: 12 }}>
          <Icon name="spark" />
          <span>{error}</span>
        </div>
      ) : null}

      <button
        type="button"
        className="btn btn-primary"
        onClick={go}
        disabled={busy}
        style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
      >
        {busy ? "Abriendo pago seguro…" : `Pagar €${eur(setupTotal + monthlyTotal)} y empezar`}
        {busy ? null : <Icon name="send" />}
      </button>
      <p style={{ color: "var(--ink-mute)", fontSize: ".8rem", textAlign: "center", marginTop: 10 }}>
        Pago seguro con tarjeta o domiciliación SEPA (Stripe). ¿Prefieres hacerlo en persona?{" "}
        <a href={contactInfo.whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>.
      </p>
    </div>
  );
}
