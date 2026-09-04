import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { serviceSlugs } from "@/content/services";
import { blogSlugs, getPosts } from "@/content/blog";
import { SHOW_PRICING } from "@/content/flags";

const SITE_URL = "https://kodable.ai";

// Real publish dates for blog posts. Stamping every URL with the build time
// teaches Google the lastmod is unreliable and it stops trusting it - which
// slows recrawls. Posts get their true date; evergreen pages keep build time
// only because they genuinely change with each content deploy.
const blogDates = new Map(
  getPosts("en").map((p) => [p.slug, new Date(p.dateModified ?? p.datePublished)]),
);

// Static route suffixes (locale prefix added per-locale below).
const routes = [
  "",
  "/services",
  ...serviceSlugs.map((slug) => `/services/${slug}`),
  ...(SHOW_PRICING ? ["/pricing"] : []),
  "/blog",
  ...blogSlugs.map((slug) => `/blog/${slug}`),
  "/contact",
  "/faq",
  "/comparativa",
  "/portfolio",
  "/privacy",
  "/terms",
  "/legal",
  "/cookies",
];

// Legal copy exists only in EN/ES; fr/de/it serve the EN text and canonicalize
// to /en (see legalHreflangs). Keep those duplicate URLs out of the sitemap.
const legalRoutes = new Set(["/privacy", "/terms", "/legal", "/cookies"]);
const legalLocales = new Set(["en", "es"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const localeRoutes = locales.flatMap((locale) =>
    routes
      .filter((route) => !legalRoutes.has(route) || legalLocales.has(locale))
      .map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: route.startsWith("/blog/")
        ? (blogDates.get(route.slice("/blog/".length)) ?? now)
        : now,
      changeFrequency:
        route === "" || route === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority:
        route === ""
          ? 1
          : route.startsWith("/services") || route === "/pricing" // no-op while pricing is off
            ? 0.8
            : route === "/blog"
              ? 0.7
              : route.startsWith("/blog/")
                ? 0.7
                : 0.6,
      alternates: {
        languages: {
          ...Object.fromEntries(
            (legalRoutes.has(route) ? [...legalLocales] : [...locales]).map((l) => [
              l,
              `${SITE_URL}/${l}${route}`,
            ]),
          ),
          // x-default: the homepage cluster's default is the locale-redirecting
          // bare root; sub-pages fall back to the English page. Must match the
          // page-level hreflangs() output exactly - conflicting sets between
          // sitemap and <head> weaken the whole cluster.
          "x-default": route === "" ? `${SITE_URL}/` : `${SITE_URL}/en${route}`,
        },
      },
    })),
  );

  // The bare root (/) is a permanent redirect to each visitor's best locale
  // (proxy.ts), so it is not a canonical URL and stays out of the sitemap. It
  // still appears as every homepage's x-default above: that is the standard
  // hreflang for a locale-selecting root. (It was listed here from 2026-06-30
  // to force a recrawl of a stale root snippet; with the 308 that job is done.)
  return localeRoutes;
}
