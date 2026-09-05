// Pushes every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver share the
// endpoint) so new or changed pages are fetched within minutes instead of
// waiting for a crawl. Bing Webmaster Tools lists "Set up IndexNow" as the
// site's top recommendation and, unlike Google's URL Inspection, there is no
// meaningful daily quota.
//
// The key is the ONLY file matching public/<32 hex>.txt, which is also how
// the search engines verify ownership (https://kodable.ai/<key>.txt must
// serve the key as its body). Rotate by replacing that file.
//
// Run after a deploy:  node scripts/indexnow.mjs            (all sitemap URLs)
//                      node scripts/indexnow.mjs /en /es    (specific paths)
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const SITE = "https://kodable.ai";
const pub = resolve(process.cwd(), "public");
const keyFile = readdirSync(pub).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("no IndexNow key file in public/ (expected <32 hex>.txt)");
const key = readFileSync(resolve(pub, keyFile), "utf8").trim();

const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((p) => (p.startsWith("http") ? p : `${SITE}${p}`));
} else {
  const xml = await fetch(`${SITE}/sitemap.xml`).then((r) => r.text());
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (!urls.length) throw new Error("no URLs to submit");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: "kodable.ai",
    key,
    keyLocation: `${SITE}/${keyFile}`,
    urlList: urls,
  }),
});
// 200 = accepted, 202 = accepted + key pending validation. Anything else is a
// real refusal (403 bad key, 422 bad URLs, 429 too many).
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URL(s)`);
if (res.status !== 200 && res.status !== 202) {
  console.log(await res.text());
  process.exit(1);
}
