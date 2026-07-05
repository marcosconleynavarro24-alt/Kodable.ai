// Client-onboarding intake: everything we need to build the site in 7 days,
// collected in one shot. Validation is deliberately light — this is a paying
// (or about-to-pay) client, not a cold lead; the enemy is friction, not spam.
// Spam traps (honeypot/time/rate) are still applied at the route level via
// the shared helpers in lib/leads.
import { promises as fs } from "fs";
import path from "path";

export interface OnboardingInput {
  business?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  address?: unknown;
  hours?: unknown;
  description?: unknown;
  services?: unknown;
  style?: unknown;
  domain?: unknown;
  social?: unknown;
  notes?: unknown;
  companyUrl?: unknown; // honeypot — must stay empty
  t0?: unknown; // time-trap
}

export interface Onboarding {
  business: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  description: string;
  services: string;
  style: string;
  domain: string;
  social: string;
  notes: string;
  receivedAt: string;
}

const s = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export function validateOnboarding(
  input: OnboardingInput,
): { ok: true; onboarding: Onboarding } | { ok: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const business = s(input.business, 200);
  const name = s(input.name, 200);
  const phone = s(input.phone, 40);
  const hours = s(input.hours);
  const description = s(input.description);
  if (!business) errors.business = "Necesitamos el nombre del negocio.";
  if (!name) errors.name = "¿Con quién hablamos?";
  if (!phone) errors.phone = "Sin teléfono no podemos avanzar (usamos WhatsApp).";
  if (!hours) errors.hours = "Los horarios van en la web — los necesitamos.";
  if (!description) errors.description = "Dos líneas bastan.";
  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    onboarding: {
      business, name, phone, hours, description,
      email: s(input.email, 200),
      address: s(input.address, 300),
      services: s(input.services, 4000),
      style: s(input.style),
      domain: s(input.domain, 200),
      social: s(input.social, 500),
      notes: s(input.notes, 4000),
      receivedAt: new Date().toISOString(),
    },
  };
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "onboarding.ndjson");

export async function saveOnboarding(o: Onboarding): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(FILE, JSON.stringify(o) + "\n", "utf8");
  } catch (err) {
    console.error("[onboarding] could not write data/onboarding.ndjson:", err);
  }
  console.info("[onboarding] received", {
    business: o.business, name: o.name, phone: o.phone, at: o.receivedAt,
  });
}

const esc = (x: string) =>
  x.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

export async function deliverOnboarding(o: Onboarding): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const row = (label: string, v: string) =>
    v ? `<tr><td style="padding:4px 10px 4px 0;color:#4b5c56;vertical-align:top">${label}</td><td style="padding:4px 0">${esc(v)}</td></tr>` : "";
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#16221f;line-height:1.5">
    <h2 style="margin:0 0 12px">📋 Onboarding: ${esc(o.business)}</h2>
    <table style="border-collapse:collapse;font-size:14px">
      ${row("Contacto", o.name)}${row("Teléfono", o.phone)}${row("Email", o.email)}
      ${row("Dirección", o.address)}${row("Horarios", o.hours)}
      ${row("Descripción", o.description)}${row("Carta/servicios", o.services)}
      ${row("Estilo", o.style)}${row("Dominio", o.domain)}${row("Redes", o.social)}
      ${row("Notas", o.notes)}
    </table>
    <p style="margin:14px 0 0;color:#4b5c56;font-size:13px">Recibido ${esc(o.receivedAt)} ·
    el reloj de los 7 días empieza cuando lleguen las fotos por WhatsApp.</p>
  </div>`;
  if (!key) {
    // same dev fallback the lead flow uses: write a preview instead of sending
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      const file = path.join(DATA_DIR, `onboarding-preview-${Date.now()}.html`);
      await fs.writeFile(file, html, "utf8");
      console.info(`[onboarding] email preview written to ${path.relative(process.cwd(), file)} (set RESEND_API_KEY to actually send)`);
    } catch (err) {
      console.error("[onboarding] preview write failed:", err);
    }
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.TRACK_FROM || "Kodable <onboarding@resend.dev>",
        to: [process.env.TRACK_TO || "marcos@kodable.ai"],
        subject: `📋 Onboarding completo: ${o.business}`,
        html,
      }),
    });
    if (!res.ok) console.error("[onboarding] resend refused", res.status, (await res.text()).slice(0, 200));
  } catch (err) {
    console.error("[onboarding] resend error:", err);
  }
}
