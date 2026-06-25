// JSON-LD helpers. Keep SITE_URL in sync with the canonical origin used in
// layout.tsx / sitemap.ts / robots.ts.
export const SITE_URL = "https://kodable.ai";

export type Crumb = { name: string; path?: string };

// BreadcrumbList per schema.org / Google: 1-based positions, and the LAST item
// omits `item` (Google infers the current page from its URL). `path` is the
// locale-prefixed pathname, e.g. "/en/services". Always source `name` from the
// same copy the visible breadcrumb renders so the two stay consistent.
export function breadcrumbList(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: `${SITE_URL}${it.path}` } : {}),
    })),
  };
}

// Wrap one or more JSON-LD nodes into a single document: a lone node keeps a
// flat shape, multiple nodes go into an @graph. Serialize the result with
// JSON.stringify into a <script type="application/ld+json"> tag.
export function jsonLdDoc(...nodes: object[]) {
  return nodes.length === 1
    ? { "@context": "https://schema.org", ...nodes[0] }
    : { "@context": "https://schema.org", "@graph": nodes };
}
