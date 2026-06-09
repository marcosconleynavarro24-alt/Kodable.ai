export type Service = {
  slug: string;
  icon: string; // Material Symbols name, matching the existing icon system
  title: string;
  tagline: string; // one benefit-led sentence
  intro: string; // 2–3 sentences, customer-facing
  included: string[]; // 4–6 concrete deliverables
  whoFor?: string;
  cta: string; // CTA button label
};

export const servicesCatalog: Service[] = [
  {
    slug: "website-design",
    icon: "design_services",
    title: "Website Design",
    tagline:
      "A site that looks like you mean business — and turns visitors into customers.",
    intro:
      "Your website is the first impression most customers ever get of you. We design editorial, conversion-minded layouts that make your brand feel established and impossible to scroll past. Every page is built around the one thing you want a visitor to do next.",
    included: [
      "Custom, brand-led visual design",
      "Mobile-first responsive layouts",
      "Conversion-focused page structure",
      "A reusable design system you can grow with",
      "Accessibility built in (WCAG AA)",
    ],
    whoFor:
      "Businesses launching a new site, or replacing a dated, templated one.",
    cta: "Design my site",
  },
  {
    slug: "web-development",
    icon: "code",
    title: "Web Development",
    tagline:
      "Fast, reliable engineering that keeps your site quick, secure, and easy to grow.",
    intro:
      "A beautiful design only performs if it's built right. We engineer your site on a modern, production-grade stack so it loads in milliseconds, ranks well, and won't break as you add to it. You get clean, maintainable code you actually own.",
    included: [
      "Modern React / Next.js build",
      "Sub-second load performance",
      "Headless CMS so you can edit content yourself",
      "Third-party and API integrations",
      "Secure, scalable architecture",
    ],
    whoFor: "Teams that need real, custom functionality — not a page-builder.",
    cta: "Build my site",
  },
  {
    slug: "seo-optimization",
    icon: "trending_up",
    title: "SEO & Optimization",
    tagline:
      "Get found by the customers who are already searching for what you do.",
    intro:
      "Ranking isn't luck — it's structure, speed, and content working together. We tune your site so search engines understand it and people choose it, then keep refining against real data. The result is steady, compounding traffic that doesn't depend on ad spend.",
    included: [
      "Technical SEO and site structure",
      "Keyword and content strategy",
      "Core Web Vitals optimization",
      "Local search and Google Business setup",
      "Monthly performance reporting",
    ],
    whoFor:
      "Businesses that want to grow traffic without paying for every click.",
    cta: "Grow my traffic",
  },
  {
    slug: "hosting-maintenance",
    icon: "cloud_done",
    title: "Hosting & Maintenance",
    tagline: "Stay online, secure, and up to date — without thinking about it.",
    intro:
      "Launch day is the start, not the finish. We host your site on fast, reliable infrastructure and handle the updates, backups, and monitoring that keep it healthy. If anything ever goes wrong, we're the ones who fix it — usually before you notice.",
    included: [
      "Fast, fully managed hosting",
      "Automatic backups and updates",
      "Security monitoring and SSL",
      "Uptime monitoring and alerts",
      "Priority support when you need changes",
    ],
    whoFor: "Owners who'd rather run their business than babysit a website.",
    cta: "Keep my site healthy",
  },
];

export function getService(slug: string): Service | undefined {
  return servicesCatalog.find((s) => s.slug === slug);
}
