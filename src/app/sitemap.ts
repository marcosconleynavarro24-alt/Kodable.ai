import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { serviceSlugs } from "@/content/services";

const SITE_URL = "https://kodable.ai";

// Static route suffixes (locale prefix added per-locale below).
const routes = [
  "",
  "/services",
  ...serviceSlugs.map((slug) => `/services/${slug}`),
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route.startsWith("/services") ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}${route}`]),
        ),
      },
    })),
  );
}
