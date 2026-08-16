import type { IconName } from "@/components/Icon";
import type { ServiceSlug } from "@/content/services";
import type { Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/jsonld";
import data_en from "./blog-data.json";
import data_es from "./blog-data.es.json";
import data_fr from "./blog-data.fr.json";
import data_de from "./blog-data.de.json";
import data_it from "./blog-data.it.json";

// ── Types ────────────────────────────────────────────────────────────────
export type BlogCategory = "AI Agents" | "Getting Found" | "Automation" | "AI Strategy" | "Funding";

// Article body is a list of typed blocks, rendered by the post page. Paragraph
// text may contain **bold** and inline links written as [anchor](~/path), where
// ~/ expands to the current /<locale>/ prefix at render time.
export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; steps: { title: string; body: string }[] }
  | { type: "callout"; title: string; body: string }
  | { type: "stat"; value: string; label: string; source?: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "figure"; src: string; alt: string; caption?: string }
  | { type: "cta"; title: string; body: string; button?: string };

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  categoryIcon: IconName;
  title: string;
  description: string; // SEO meta description
  dek: string; // standfirst under the headline
  keyword: string; // primary target keyword (internal note)
  author: string;
  datePublished: string; // ISO YYYY-MM-DD
  dateModified?: string; // ISO YYYY-MM-DD; set only on real content updates
  readMinutes: number;
  takeaways: string[];
  related: string[]; // other post slugs
  cta: { service: ServiceSlug | null; label: string };
  image?: { credit: string; creditUrl: string };
  ogImage?: string; // social-card image filename in /public/blog (use when the lead is a figure, not a hero)
  body: BlogBlock[];
}

// Per-locale generated content; the shape is guaranteed by the build pipeline
// and the i18n assembly script (scripts/blog-i18n.cjs), which keeps slugs,
// block structure and stats identical across locales. A single assertion per
// file keeps the rest of the app fully typed.
const byLocale: Record<Locale, BlogPost[]> = {
  en: data_en as unknown as BlogPost[],
  es: data_es as unknown as BlogPost[],
  fr: data_fr as unknown as BlogPost[],
  de: data_de as unknown as BlogPost[],
  it: data_it as unknown as BlogPost[],
};

// ── Accessors ────────────────────────────────────────────────────────────
// Newest first.
export function getPosts(locale: Locale): BlogPost[] {
  return [...byLocale[locale]].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function getPost(locale: Locale, slug: string): BlogPost | undefined {
  return byLocale[locale].find((p) => p.slug === slug);
}

// Resolve a post's related slugs to real posts, dropping any that don't exist.
export function getRelated(locale: Locale, slug: string): BlogPost[] {
  const post = getPost(locale, slug);
  if (!post) return [];
  return post.related
    .map((s) => getPost(locale, s))
    .filter((p): p is BlogPost => Boolean(p));
}

// Slugs are identical across locales, so the canonical English set drives
// static params and routing.
export const blogSlugs: string[] = byLocale.en.map((p) => p.slug);

// Social-card image for a post: the hero photo if post.image is set, otherwise
// an explicit per-post ogImage file. Shared by generateMetadata and the
// BlogPosting JSON-LD so the two can never disagree about the article image.
export function postOgImage(post: BlogPost): string | null {
  if (post.image) return `${SITE_URL}/blog/${post.slug}.jpg`;
  if (post.ogImage) return `${SITE_URL}/blog/${post.ogImage}`;
  return null;
}

// Strip the inline [anchor](path) and **bold** markup that paragraph text may
// carry, for plain-text consumers (JSON-LD).
function stripInline(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]*)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}

// Extract the FAQ section every post ends with: the last h2 is the FAQ
// heading, followed by (h3 question, p answer) pairs to the end of the body.
// Structure-based rather than text-based so it works in every locale
// (scripts/blog-i18n.cjs keeps block structure identical across locales).
// Returns [] when a post doesn't follow the shape, so the FAQPage node is
// simply omitted rather than emitted half-empty.
export function getPostFaq(post: BlogPost): { q: string; a: string }[] {
  const lastH2 = post.body.map((b) => b.type).lastIndexOf("h2");
  if (lastH2 === -1) return [];
  const pairs: { q: string; a: string }[] = [];
  for (let i = lastH2 + 1; i + 1 < post.body.length; i += 2) {
    const qb = post.body[i];
    const ab = post.body[i + 1];
    if (qb.type !== "h3" || ab.type !== "p") break;
    pairs.push({ q: stripInline(qb.text), a: stripInline(ab.text) });
  }
  return pairs.length >= 2 ? pairs : [];
}
