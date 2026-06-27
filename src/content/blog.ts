import type { IconName } from "@/components/Icon";
import type { ServiceSlug } from "@/content/services";
import data from "./blog-data.json";

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
  body: BlogBlock[];
}

// blog-data.json is generated content; the shape is guaranteed by the build
// pipeline, so a single assertion here keeps the rest of the app fully typed.
const posts = data as unknown as BlogPost[];

// ── Accessors ────────────────────────────────────────────────────────────
// Newest first.
export function getPosts(): BlogPost[] {
  return [...posts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

// Resolve a post's related slugs to real posts, dropping any that don't exist.
export function getRelated(slug: string): BlogPost[] {
  const post = getPost(slug);
  if (!post) return [];
  return post.related
    .map((s) => getPost(s))
    .filter((p): p is BlogPost => Boolean(p));
}

export const blogSlugs: string[] = posts.map((p) => p.slug);
