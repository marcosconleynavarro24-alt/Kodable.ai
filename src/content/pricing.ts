export type PricingTier = {
  id: string;
  label: string;
  price: string;
  period: string;
  featured: boolean;
  accentColor?: string;
  badge?: string;
  features: string[];
  cta: string;
};

// One-off build projects. Prices "from", ex-IVA. Anchored to the low end of the
// credible transparent floor on the Costa Blanca (FocusWebs ~€490, KEEV ~€999,
// e-commerce ~€1,990) — above the €69–199 template factories so we don't read
// as throwaway.
export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    label: "Starter",
    price: "from €490",
    period: "/project",
    featured: false,
    features: [
      "1–5 page site",
      "Mobile-first design",
      "Google Business setup",
      "WhatsApp + click-to-call",
      "Basic on-page SEO",
    ],
    cta: "Get Started",
  },
  {
    id: "business",
    label: "Business",
    price: "from €990",
    period: "/project",
    featured: true,
    badge: "Most Popular",
    features: [
      "Up to ~8 custom pages",
      "Bilingual ES/EN",
      "Local SEO + schema",
      "Reviews block",
      "Online booking or ordering",
      "Blog",
    ],
    cta: "Select Business",
  },
  {
    id: "premium",
    label: "Premium / Shop",
    price: "from €1,990",
    period: "/project",
    featured: false,
    features: [
      "Bespoke build or online shop",
      "Multilingual",
      "Payments & integrations",
      "Priority delivery",
    ],
    cta: "Contact Us",
  },
];

export type CarePlan = PricingTier;

// Recurring care plans — the strategic core. Every site ships with one; we don't
// disappear after launch. Same conservative floor, billed monthly, ex-IVA.
export const carePlans: CarePlan[] = [
  {
    id: "care-basic",
    label: "Care Basic",
    price: "€25",
    period: "/month",
    featured: false,
    features: [
      "Managed hosting + SSL",
      "Software updates",
      "Backups",
      "Security & uptime monitoring",
      "Monthly report",
    ],
    cta: "Choose Basic",
  },
  {
    id: "care-plus",
    label: "Care Plus",
    price: "€49",
    period: "/month",
    featured: true,
    badge: "Recommended",
    features: [
      "Everything in Basic",
      "Capped monthly edits",
      "Priority support",
      "WhatsApp support",
    ],
    cta: "Choose Plus",
  },
  {
    id: "care-pro",
    label: "Care Pro",
    price: "€95",
    period: "/month",
    featured: false,
    features: [
      "Daily backups",
      "Online shop support",
      "Larger edit allowance",
      "Light monthly SEO check-in",
    ],
    cta: "Choose Pro",
  },
];
