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
// jsonLdHtml (below) into a <script type="application/ld+json"> tag.
export function jsonLdDoc(...nodes: object[]) {
  return nodes.length === 1
    ? { "@context": "https://schema.org", ...nodes[0] }
    : { "@context": "https://schema.org", "@graph": nodes };
}

// Serialize a JSON-LD document for embedding in a <script> tag. JSON.stringify
// does NOT escape `<`, `>` or `&`, so a value containing `</script>` could break
// out of the tag (stored XSS, especially under a CSP that allows inline script).
// Escape those, plus the U+2028 / U+2029 line separators that are valid in JSON
// strings but terminate an inline script, to their \uXXXX forms: still valid
// JSON, inert as HTML. Use this everywhere instead of JSON.stringify for ld+json.
export function jsonLdHtml(doc: object): string {
  return JSON.stringify(doc)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(new RegExp(String.fromCharCode(0x2028), "g"), "\\u2028")
    .replace(new RegExp(String.fromCharCode(0x2029), "g"), "\\u2029");
}
