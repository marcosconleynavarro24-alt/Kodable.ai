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

export const pricingTiers: PricingTier[] = [
  {
    id: "startup",
    label: "Startup",
    price: "$2,500",
    period: "/project",
    featured: false,
    features: [
      "5-Page Marketing Site",
      "Responsive Design",
      "CMS Integration",
      "Basic SEO",
    ],
    cta: "Get Started",
  },
  {
    id: "local-pro",
    label: "Local Pro",
    price: "$5,000",
    period: "/project",
    featured: true,
    badge: "Most Popular",
    features: [
      "10-Page Custom Build",
      "Editorial Brand System",
      "Speed & SEO Opt.",
      "Custom Animation",
    ],
    cta: "Select Pro",
  },
  {
    id: "growth",
    label: "Growth",
    price: "$9,000+",
    period: "/project",
    featured: false,
    accentColor: "#B8860B",
    features: [
      "Unlimited Custom Pages",
      "AI Agent Integration",
      "Advanced E-commerce",
      "Lifetime Support",
    ],
    cta: "Contact Us",
  },
];
