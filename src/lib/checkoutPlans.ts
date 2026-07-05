// Checkout amounts in euro CENTS — the server-side source of truth for what
// Stripe actually charges. KEEP IN SYNC with the display prices in
// src/content/pricing.ts (web Starter / Care Basic / Chat Essential) and with
// leads/proposal/pricing.json in the ops repo. All amounts IVA included.
export const CONTRACT_VERSION = "2026-07-05";

export interface PlanLine {
  name: string;
  setupCents: number;
  monthlyCents: number;
}

export const PLANS: Record<"web" | "web-agente", PlanLine[]> = {
  web: [
    { name: "Web profesional + mantenimiento", setupCents: 49000, monthlyCents: 3900 },
  ],
  "web-agente": [
    { name: "Web profesional + mantenimiento", setupCents: 49000, monthlyCents: 3900 },
    { name: "Agente IA de chat (web / WhatsApp)", setupCents: 47500, monthlyCents: 9500 },
  ],
};

// Founding offer (first 5 clients): web setup 490 -> 190, everything else as-is.
export const FOUNDING_WEB_SETUP_CENTS = 19000;

export function planLines(plan: keyof typeof PLANS, founding: boolean): PlanLine[] {
  return PLANS[plan].map((l, i) =>
    founding && i === 0 ? { ...l, setupCents: FOUNDING_WEB_SETUP_CENTS } : l,
  );
}
