import { locales } from "@/i18n/config";

// Page-level hreflang alternates for a locale-prefixed route suffix (e.g.
// "/services/ai-agents"). Next.js shallow-merges `alternates`, so any page
// that sets `canonical` must also set `languages` or it silently wipes the
// layout's — every page below the homepage shipped without hreflang until
// this helper. Keys are bare language codes to match the sitemap's alternate
// set exactly; x-default points at the English page, the fallback for
// visitors whose language we don't serve.
export function hreflangs(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    "x-default": `/en${path}`,
  };
}
