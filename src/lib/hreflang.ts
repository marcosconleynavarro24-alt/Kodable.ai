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

// Legal copy (privacy/terms) exists only in EN and ES; fr/de/it render the EN
// text, so listing them as alternates makes Google flag "duplicate, different
// canonical" (seen in GSC 2026-08). Legal pages canonicalize to the en/es
// pair and advertise only those two variants.
export function legalHreflangs(path: string): Record<string, string> {
  return {
    en: `/en${path}`,
    es: `/es${path}`,
    "x-default": `/en${path}`,
  };
}

export function legalCanonical(locale: string, path: string): string {
  return locale === "es" ? `/es${path}` : `/en${path}`;
}
