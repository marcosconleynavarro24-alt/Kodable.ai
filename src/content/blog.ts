import type { IconName } from "@/components/Icon";
import type { ServiceSlug } from "@/content/services";
import type { Locale } from "@/i18n/config";
import data_en from "./blog-data.json";
import data_es from "./blog-data.es.json";
import data_fr from "./blog-data.fr.json";
import data_de from "./blog-data.de.json";
import data_it from "./blog-data.it.json";

// ── Types ────────────────────────────────────────────────────────────────
export type BlogCategory = "AI Agents" | "Getting Found" | "Automation" | "AI Strategy";

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
  readMinutes: number;
  takeaways: string[];
  related: string[]; // other post slugs
  cta: { service: ServiceSlug | null; label: string };
  image?: { credit: string; creditUrl: string };
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
