// Next.js 16 renamed `middleware` to `proxy`. This handles locale routing:
// any path without a locale prefix is redirected to the best-matching locale.
// It also 301-redirects the old service slugs (pre-AI-rebrand) to their new
// homes so indexed links keep their equity.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/config";

function getLocale(request: NextRequest): string {
  const accept = request.headers.get("accept-language");
  if (accept) {
    const preferred = accept
      .split(",")
      .map((part) => part.split(";")[0].trim().toLowerCase());
    for (const lang of preferred) {
      const base = lang.split("-")[0];
      if ((locales as readonly string[]).includes(base)) return base;
    }
  }
  return defaultLocale;
}

// Old service slugs → new target path (locale is added back below). Websites
// absorbs the three build/SEO services; Hosting & Maintenance is no longer a
// service (it's the care plan) so it points at the services index.
const OLD_SERVICE_SLUGS: Record<string, string> = {
  "website-design": "/services/websites",
  "web-development": "/services/websites",
  "seo-optimization": "/services/websites",
  "hosting-maintenance": "/services",
};

const SERVICE_REDIRECT_RE = new RegExp(
  `^/(?:(${locales.join("|")})/)?services/([^/]+)/?$`,
);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) Old service slug → new home (handles both prefixed and un-prefixed forms).
  const svc = pathname.match(SERVICE_REDIRECT_RE);
  if (svc) {
    const target = OLD_SERVICE_SLUGS[svc[2]];
    if (target) {
      const locale = svc[1] ?? getLocale(request);
      request.nextUrl.pathname = `/${locale}${target}`;
      return NextResponse.redirect(request.nextUrl, 301);
    }
  }

  // 2) Locale routing: prefix un-prefixed paths with the best-matching locale.
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Run on everything except API routes, Next internals, metadata routes, and
  // any path that contains a dot (static files like favicon.ico, sitemap.xml).
  matcher: [
    "/((?!api|_next/static|_next/image|opengraph-image|twitter-image|icon|apple-icon|manifest|.*\\..*).*)",
  ],
};
