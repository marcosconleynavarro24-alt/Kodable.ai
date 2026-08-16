import type { Metadata } from "next";
import { locales, localeOg, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/jsonld";

// Per-page Open Graph + Twitter metadata. Next.js replaces `openGraph` and
// `twitter` per top-level key instead of merging, so any page that defines
// neither inherits the LAYOUT's block wholesale: homepage og:title, homepage
// og:description and og:url pointing at /<locale>. Every page below the
// homepage shipped that way until this helper (same trap hreflangs() fixed
// for `alternates`). Spread the result into the page's metadata return, next
// to `alternates`.
//
// `path` is the locale-prefixed CANONICAL pathname (e.g. `/en/pricing`): the
// og:url must match the canonical URL or social scrapers and search engines
// see two different claims about the page's identity. Pages whose canonical
// is cross-locale (legal cluster) pass the output of legalCanonical() and
// restrict `altLocales` to the locales that really exist.
//
// Images stay explicit because the page-level block replaces the layout block
// that carries them today; metadataBase (set in the layout) resolves the
// relative paths.
export function pageOg(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  altLocales?: readonly Locale[];
  image?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const { locale, path, title, description, altLocales = locales, image } = opts;
  return {
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "Kodable.ai",
      type: "website",
      locale: localeOg[locale],
      alternateLocale: altLocales
        .filter((l) => l !== locale)
        .map((l) => localeOg[l]),
      images: [image ?? "/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image ?? "/twitter-image"],
    },
  };
}
