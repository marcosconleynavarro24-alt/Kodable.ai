import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { serviceSlugs } from "@/content/services";
import { blogSlugs, getPosts } from "@/content/blog";

const SITE_URL = "https://kodable.ai";

// Real publish dates for blog posts. Stamping every URL with the build time
// teaches Google the lastmod is unreliable and it stops trusting it — which
// slows recrawls. Posts get their true date; evergreen pages keep build time
// only because they genuinely change with each content deploy.
const blogDates = new Map(getPosts("en").map((p) => [p.slug, new Date(p.datePublished)]));

// Static route suffixes (locale prefix added per-locale below).
const routes = [
  "",
  "/services",
  ...serviceSlugs.map((slug) => `/services/${slug}`),
  "/pricing",
  "/blog",
  ...blogSlugs.map((slug) => `/blog/${slug}`),
  "/contact",
  "/faq",
  "/comparativa",
  "/casos",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const localeRoutes = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: route.startsWith("/blog/")
        ? (blogDates.get(route.slice("/blog/".length)) ?? now)
        : now,
      changeFrequency:
        route === "" || route === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority:
        route === ""
          ? 1
          : route.startsWith("/services") || route === "/pricing"
            ? 0.8
            : route === "/blog"
              ? 0.7
              : route.startsWith("/blog/")
                ? 0.7
                : 0.6,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${route}`])),
          // x-default: the homepage cluster's default is the locale-redirecting
          // bare root; sub-pages fall back to the English page. Must match the
          // page-level hreflangs() output exactly — conflicting sets between
          // sitemap and <head> weaken the whole cluster.
          "x-default": route === "" ? `${SITE_URL}/` : `${SITE_URL}/en${route}`,
        },
      },
    })),
  );

  // Bare root (/) auto-redirects to each visitor's best locale. Listing it here
  // gives Google an explicit reason to (re)crawl and consolidate it to the
  // localized homepages — without it, the redirect-source root lingers in the
  // index on a stale crawl (old snippet + favicon). x-default → root is the
  // standard hreflang for a locale-selecting homepage.
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}`])),
          "x-default": `${SITE_URL}/`,
        },
      },
    },
    ...localeRoutes,
  ];
}
