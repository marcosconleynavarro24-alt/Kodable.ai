// Checkout amounts in euro CENTS — the server-side source of truth for what
// Stripe actually charges. KEEP IN SYNC with the display prices in
// src/content/pricing.ts (web Starter / Care Basic / Chat Essential) and with
// leads/proposal/pricing.json in the ops repo. All amounts IVA included.
export const CONTRACT_VERSION = "2026-07-08";

export interface PlanLine {
  name: string;
  setupCents: number;
  monthlyCents: number;
}

// Halved across the board 2026-07-08 (owner directive), in lockstep with the
// display prices in src/content/pricing.ts.
export const PLANS: Record<"web" | "web-agente", PlanLine[]> = {
  web: [
    { name: "Web profesional + mantenimiento", setupCents: 24500, monthlyCents: 1950 },
  ],
  "web-agente": [
    { name: "Web profesional + mantenimiento", setupCents: 24500, monthlyCents: 1950 },
    // Chat agent halved 2026-07-08 (in sync with pricing.ts chat Essential).
    { name: "Agente IA de chat (web / WhatsApp)", setupCents: 11875, monthlyCents: 2375 },
  ],
};

// Founding offer (first 5 clients): web setup 245 -> 95, everything else as-is.
export const FOUNDING_WEB_SETUP_CENTS = 9500;

export function planLines(plan: keyof typeof PLANS, founding: boolean): PlanLine[] {
  return PLANS[plan].map((l, i) =>
    founding && i === 0 ? { ...l, setupCents: FOUNDING_WEB_SETUP_CENTS } : l,
  );
}
