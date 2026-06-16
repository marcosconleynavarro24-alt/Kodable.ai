export type Service = {
  slug: string;
  icon: string; // Material Symbols name, matching the existing icon system
  title: string;
  bucket: string; // which of the four plain promises this maps to
  tagline: string; // one benefit-led sentence, owner-facing, no jargon
  intro: string; // 2–3 sentences, customer-facing, plain language
  included: string[]; // 4–6 outcomes in the owner's words (not deliverables)
  whoFor?: string;
  underTheHood?: string[]; // optional small footnote — the only place tech terms live
  cta: string; // CTA button label
};

export const servicesCatalog: Service[] = [
  {
    slug: "website-design",
    icon: "design_services",
    title: "Website Design",
    bucket: "Look the part",
    tagline:
      "A site that makes you look established — so people choose you over the next option.",
    intro:
      "Your website is the first impression most customers ever get of you. We make you look established and trustworthy, so the person deciding between you and the next option picks you. Every page points at the one thing you want them to do — book, order, call or message — and it all works in Spanish and English, so you don't lose the locals or the expats.",
    included: [
      "Looks established and professional from the first second",
      "Works in Spanish and English, so you reach everyone",
      "Customers can book, order, call or message in one tap",
      "Looks perfect on a phone, where most people will see it",
      "Your happy customers' reviews, front and centre",
      "Easy to read and use for everyone who lands on it",
    ],
    whoFor:
      "Businesses launching a new site, or replacing a dated, templated one.",
    underTheHood: [
      "Responsive, mobile-first layouts",
      "Bilingual ES/EN with language switcher",
      "Accessibility to WCAG AA",
    ],
    cta: "Design my site",
  },
  {
    slug: "web-development",
    icon: "code",
    title: "Web Development",
    bucket: "Win the customer",
    tagline:
      "Loads instantly and does the work — booking, orders and messages, straight from your site.",
    intro:
      "A site only earns its keep if it loads fast and actually does things. We build yours so it opens in a blink and lets customers book themselves, order, or reach you in one tap — even when you're closed. Change your hours, prices or photos yourself in seconds, no developer needed.",
    included: [
      "Loads instantly — people don't wait around for a slow site",
      "Customers book themselves from their phone, even after hours",
      "One tap to message or call you, the way people here get in touch",
      "Take orders straight from your site — keep what the apps take",
      "Change your hours, prices or photos yourself in seconds",
    ],
    whoFor: "Teams that need real, working functionality — not a page-builder.",
    underTheHood: [
      "Modern React / Next.js build",
      "Self-editable CMS",
      "Online booking, ordering & messaging integrations",
    ],
    cta: "Build my site",
  },
  {
    slug: "seo-optimization",
    icon: "trending_up",
    title: "SEO & Optimization",
    bucket: "Get found",
    tagline:
      "When someone nearby searches for what you do, you come up — not just your competitors.",
    intro:
      "Most customers find a local business by searching for it. We set yours up so that when someone nearby Googles a business like yours, you show up — and keep tuning it against what real people search for. It's steady traffic that doesn't depend on paying for every click.",
    included: [
      "When someone Googles a business like yours nearby, you come up",
      "Show up on the map when people search 'near me'",
      "Loads instantly, which search engines reward",
      "Found in both Spanish and English searches",
      "A simple monthly note on how you're doing",
    ],
    whoFor: "Businesses that want to grow without paying for every click.",
    underTheHood: [
      "Technical SEO & site structure",
      "Local SEO / Google Business Profile",
      "Core Web Vitals optimization",
    ],
    cta: "Get me found",
  },
  {
    slug: "hosting-maintenance",
    icon: "cloud_done",
    title: "Hosting & Maintenance",
    bucket: "Forget about it",
    tagline: "We keep it online, safe and up to date — you never think about it.",
    intro:
      "Launch day is the start, not the finish. We keep your site online, safe and current, and we actually answer when you need a change — usually in English or Spanish within 24 hours. If anything ever goes wrong, we fix it, often before you notice.",
    included: [
      "We keep it online, safe and updated — you never think about it",
      "Your site is backed up automatically",
      "Watched around the clock, so problems get caught early",
      "We actually answer — within 24 hours, in English and Spanish",
      "Need a change? We're the ones who make it",
    ],
    whoFor: "Owners who'd rather run their business than babysit a website.",
    underTheHood: [
      "Fully managed hosting",
      "Automatic backups, updates & SSL",
      "Uptime monitoring & alerts",
    ],
    cta: "Keep my site healthy",
  },
];

export function getService(slug: string): Service | undefined {
  return servicesCatalog.find((s) => s.slug === slug);
}
