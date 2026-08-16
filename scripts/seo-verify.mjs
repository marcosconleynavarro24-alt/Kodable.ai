// SEO regression checks against a running build:
//   npm run build && npx next start -p 3111 &
//   node scripts/seo-verify.mjs [base]
// Default base http://localhost:3111. Exits non-zero on any FAIL. Also used
// by the recurring AI-visibility sweep (SEO_AI_VISIBILITY_SWEEP.md) against
// production: node scripts/seo-verify.mjs https://kodable.ai
const BASE = process.argv[2] ?? "http://localhost:3111";
const SITE = "https://kodable.ai";

let failures = 0;
function check(name, ok, detail = "") {
  if (ok) console.log(`  PASS ${name}`);
  else {
    failures += 1;
    console.log(`  FAIL ${name}${detail ? ` :: ${detail}` : ""}`);
  }
}

function attr(html, re) {
  const m = html.match(re);
  return m ? m[1] : null;
}
function ogUrl(html) {
  return attr(html, /<meta property="og:url" content="([^"]*)"/);
}
function ogTitle(html) {
  return attr(html, /<meta property="og:title" content="([^"]*)"/);
}
function canonical(html) {
  return attr(html, /<link rel="canonical" href="([^"]*)"/);
}
function jsonLdNodes(html) {
  const nodes = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
    const raw = m[1]
      .replaceAll("\\u003c", "<")
      .replaceAll("\\u003e", ">")
      .replaceAll("\\u0026", "&");
    const doc = JSON.parse(raw); // throws on malformed JSON-LD: that IS the test
    nodes.push(...(doc["@graph"] ?? [doc]));
  }
  return nodes;
}
const types = (nodes) => nodes.map((n) => n["@type"]);

async function page(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  return { status: res.status, html: res.ok ? await res.text() : "" };
}

const homeTitles = {};
for (const loc of ["en", "es", "fr", "de", "it"]) {
  const { html } = await page(`/${loc}`);
  homeTitles[loc] = ogTitle(html);
}

// og:url must equal the canonical, og:title must be page-specific.
const OG_PAGES = [
  "/en/pricing", "/es/pricing", "/en/services", "/en/services/websites",
  "/fr/services/ai-agents", "/en/portfolio", "/it/portfolio", "/en/faq",
  "/en/contact", "/de/comparativa", "/en/blog", "/en/legal", "/es/privacy",
];
console.log("og/canonical:");
for (const p of OG_PAGES) {
  const loc = p.split("/")[1];
  const { html } = await page(p);
  const can = canonical(html);
  const og = ogUrl(html);
  check(`${p} og:url==canonical`, og && can && og === can, `og=${og} canonical=${can}`);
  check(`${p} og:title page-specific`, ogTitle(html) && ogTitle(html) !== homeTitles[loc]);
  check(`${p} twitter card`, html.includes('name="twitter:card"'));
}
// Legal cluster canonicalizes cross-locale: fr page must claim /en/legal.
{
  const { html } = await page("/fr/legal");
  check("/fr/legal og:url -> /en/legal", ogUrl(html) === `${SITE}/en/legal`, ogUrl(html));
}

console.log("structured data:");
{
  for (const loc of ["en", "es"]) {
    const { html } = await page(`/${loc}/pricing`);
    const nodes = jsonLdNodes(html);
    const svc = nodes.find((n) => n["@type"] === "Service" && n.hasOfferCatalog);
    check(`/${loc}/pricing Service+OfferCatalog`, Boolean(svc));
    const offers = (svc?.hasOfferCatalog?.itemListElement ?? []).flatMap(
      (g) => g.itemListElement ?? [],
    );
    const wantCur = loc === "en" ? "USD" : "EUR";
    check(
      `/${loc}/pricing >=9 offers, all ${wantCur}, numeric prices`,
      offers.length >= 9 && offers.every((o) => o.priceCurrency === wantCur && typeof o.price === "number"),
      `offers=${offers.length}`,
    );
    const h2s = (html.match(/<h2[\s>]/g) ?? []).length;
    check(`/${loc}/pricing has >=2 h2`, h2s >= 2, `h2=${h2s}`);
  }
  for (const post of ["kit-digital-2026", "get-found-in-ai-search", "ai-agent-for-small-business"]) {
    const { html } = await page(`/en/blog/${post}`);
    const nodes = jsonLdNodes(html);
    const bp = nodes.find((n) => n["@type"] === "BlogPosting");
    const faq = nodes.find((n) => n["@type"] === "FAQPage");
    check(`${post} BlogPosting image is per-post`, bp?.image?.[0]?.endsWith(`${post}.jpg`), bp?.image?.[0]);
    check(`${post} FAQPage >=2 questions`, (faq?.mainEntity?.length ?? 0) >= 2);
    check(`${post} BreadcrumbList`, types(nodes).includes("BreadcrumbList"));
  }
  for (const p of ["/en/faq", "/es/comparativa"]) {
    const { html } = await page(p);
    check(`${p} FAQPage`, types(jsonLdNodes(html)).includes("FAQPage"));
  }
  const { html: pf } = await page("/en/portfolio");
  const il = jsonLdNodes(pf).find((n) => n["@type"] === "ItemList");
  check("/en/portfolio ItemList >=2 works", (il?.itemListElement?.length ?? 0) >= 2);
}

console.log("noindex trio:");
for (const p of ["/en/onboarding", "/es/contratar", "/es/contratar/gracias"]) {
  const { html } = await page(p);
  check(`${p} noindex`, html.includes("noindex"));
  check(`${p} no canonical`, !html.includes('rel="canonical"'));
  check(`${p} no head hreflang`, !/<link rel="alternate"[^>]*hrefLang/.test(html));
}

console.log("links:");
{
  const { html } = await page("/en");
  check("footer links /en/comparativa", html.includes('href="/en/comparativa"'));
  check("home links /en/pricing", html.includes('href="/en/pricing"'));
}

console.log(failures ? `\n${failures} FAILURE(S)` : "\nALL PASS");
process.exit(failures ? 1 : 0);
