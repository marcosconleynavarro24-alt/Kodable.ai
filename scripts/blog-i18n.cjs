#!/usr/bin/env node
/*
 * Blog i18n tooling. Single source of truth for which strings in a blog post
 * are translatable, in a deterministic order. Used to:
 *   - `extract`  : flatten each English post into an ordered array of source
 *                  strings (one file per post) for translator agents.
 *   - `assemble` : read each locale's translated array and re-inject it into a
 *                  clone of the English post, preserving every non-text field
 *                  (slug, block structure, stat values/sources, icons, related,
 *                  dates) by construction. Writes blog-data.<locale>.json.
 *
 * Because extraction and injection share extractSlots(), the i-th translated
 * string always lands back in the i-th slot. Nothing structural can drift.
 */
const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "..", "src", "content");
const EN_FILE = path.join(CONTENT_DIR, "blog-data.json");
const TMP_DIR = path.join(__dirname, "..", ".blog-i18n-tmp");
const LOCALES = ["es", "fr", "de", "it"];

// ── Canonical slot extractor ──────────────────────────────────────────────
// Returns an ordered list of { path, text } for every translatable string in a
// post. `path` is a key/index list into the post object. Order is stable.
function extractSlots(post) {
  const slots = [];
  const add = (p, text) => slots.push({ path: p, text });

  add(["title"], post.title);
  add(["description"], post.description);
  add(["dek"], post.dek);
  add(["author"], post.author);
  add(["cta", "label"], post.cta.label);
  (post.takeaways || []).forEach((t, i) => add(["takeaways", i], t));

  post.body.forEach((b, bi) => {
    switch (b.type) {
      case "p":
      case "h2":
      case "h3":
        add(["body", bi, "text"], b.text);
        break;
      case "list":
        b.items.forEach((it, ii) => add(["body", bi, "items", ii], it));
        break;
      case "steps":
        b.steps.forEach((s, si) => {
          add(["body", bi, "steps", si, "title"], s.title);
          add(["body", bi, "steps", si, "body"], s.body);
        });
        break;
      case "callout":
        add(["body", bi, "title"], b.title);
        add(["body", bi, "body"], b.body);
        break;
      case "stat":
        add(["body", bi, "label"], b.label); // value + source stay English
        break;
      case "quote":
        add(["body", bi, "text"], b.text);
        if (b.cite != null) add(["body", bi, "cite"], b.cite);
        break;
      case "cta":
        add(["body", bi, "title"], b.title);
        add(["body", bi, "body"], b.body);
        if (b.button != null) add(["body", bi, "button"], b.button);
        break;
      default:
        break;
    }
  });
  return slots;
}

function setPath(obj, p, value) {
  let cur = obj;
  for (let i = 0; i < p.length - 1; i++) cur = cur[p[i]];
  cur[p[p.length - 1]] = value;
}

// ── Markup helpers (for validation) ───────────────────────────────────────
function boldCount(s) {
  return (s.match(/\*\*/g) || []).length;
}
// All link targets in order: the (...) part of [anchor](target).
function linkTargets(s) {
  const re = /\[[^\]]+\]\(([^)]+)\)/g;
  const out = [];
  let m;
  while ((m = re.exec(s)) !== null) out.push(m[1]);
  return out;
}

function readEN() {
  return JSON.parse(fs.readFileSync(EN_FILE, "utf8"));
}

// ── Commands ──────────────────────────────────────────────────────────────
function cmdExtract() {
  const posts = readEN();
  const srcDir = path.join(TMP_DIR, "_src");
  const postDir = path.join(TMP_DIR, "_post");
  fs.mkdirSync(srcDir, { recursive: true });
  fs.mkdirSync(postDir, { recursive: true });

  const manifest = [];
  for (const post of posts) {
    const slots = extractSlots(post);
    const strings = slots.map((s) => s.text);
    fs.writeFileSync(
      path.join(srcDir, `${post.slug}.json`),
      JSON.stringify(strings, null, 2),
    );
    fs.writeFileSync(
      path.join(postDir, `${post.slug}.json`),
      JSON.stringify(post, null, 2),
    );
    manifest.push({ slug: post.slug, count: strings.length });
  }
  fs.writeFileSync(
    path.join(TMP_DIR, "manifest.json"),
    JSON.stringify({ locales: LOCALES, posts: manifest }, null, 2),
  );
  console.log(
    `extracted ${posts.length} posts, ${manifest.reduce((a, b) => a + b.count, 0)} strings -> ${TMP_DIR}`,
  );
  for (const m of manifest) console.log(`  ${m.slug}: ${m.count}`);
}

// Recreate the temp dir from the CURRENT state: _src/_post from English, plus a
// translation array per (post, locale) reverse-extracted from the already
// assembled blog-data.<locale>.json. Lets a QA-only workflow re-verify and
// repair existing translations without re-translating from scratch.
function cmdSeed() {
  cmdExtract();
  const posts = readEN();
  let n = 0;
  for (const locale of LOCALES) {
    const file = path.join(CONTENT_DIR, `blog-data.${locale}.json`);
    const locPosts = JSON.parse(fs.readFileSync(file, "utf8"));
    const bySlug = Object.fromEntries(locPosts.map((p) => [p.slug, p]));
    for (const enPost of posts) {
      const lp = bySlug[enPost.slug];
      if (!lp) throw new Error(`missing ${locale}/${enPost.slug}`);
      const texts = extractSlots(lp).map((s) => s.text);
      const enLen = extractSlots(enPost).length;
      if (texts.length !== enLen) {
        throw new Error(
          `slot drift ${locale}/${enPost.slug}: ${texts.length} vs en ${enLen}`,
        );
      }
      fs.writeFileSync(
        path.join(TMP_DIR, `${enPost.slug}__${locale}.json`),
        JSON.stringify(texts, null, 2),
      );
      n++;
    }
  }
  console.log(`seeded ${n} translation arrays from existing locale files`);
}

function injectPost(enPost, translations) {
  const slots = extractSlots(enPost);
  if (translations.length !== slots.length) {
    throw new Error(
      `length mismatch: expected ${slots.length}, got ${translations.length}`,
    );
  }
  const clone = JSON.parse(JSON.stringify(enPost));
  slots.forEach((slot, i) => {
    const t = translations[i];
    if (typeof t !== "string") {
      throw new Error(`slot ${i} (${slot.path.join(".")}) not a string`);
    }
    setPath(clone, slot.path, t);
  });
  return { post: clone, slots };
}

function cmdAssemble() {
  const posts = readEN();
  let hardErrors = 0;
  const warnings = [];

  for (const locale of LOCALES) {
    const out = [];
    for (const enPost of posts) {
      const tFile = path.join(TMP_DIR, `${enPost.slug}__${locale}.json`);
      if (!fs.existsSync(tFile)) {
        console.error(`MISSING ${locale}/${enPost.slug}: ${tFile}`);
        hardErrors++;
        continue;
      }
      let translations;
      try {
        translations = JSON.parse(fs.readFileSync(tFile, "utf8"));
      } catch (e) {
        console.error(`PARSE-FAIL ${locale}/${enPost.slug}: ${e.message}`);
        hardErrors++;
        continue;
      }
      if (!Array.isArray(translations)) {
        console.error(`NOT-ARRAY ${locale}/${enPost.slug}`);
        hardErrors++;
        continue;
      }
      let injected;
      try {
        injected = injectPost(enPost, translations);
      } catch (e) {
        console.error(`INJECT-FAIL ${locale}/${enPost.slug}: ${e.message}`);
        hardErrors++;
        continue;
      }
      // Per-slot markup validation against the English source.
      injected.slots.forEach((slot, i) => {
        const en = slot.text;
        const tr = translations[i];
        const where = `${locale}/${enPost.slug} [${slot.path.join(".")}]`;
        if (boldCount(en) !== boldCount(tr)) {
          warnings.push(`BOLD ${where}: en=${boldCount(en)} tr=${boldCount(tr)}`);
        }
        const le = linkTargets(en);
        const lt = linkTargets(tr);
        if (le.length !== lt.length || le.some((x, k) => x !== lt[k])) {
          warnings.push(
            `LINK ${where}: en=${JSON.stringify(le)} tr=${JSON.stringify(lt)}`,
          );
        }
      });
      out.push(injected.post);
    }
    if (out.length === posts.length) {
      const outFile = path.join(CONTENT_DIR, `blog-data.${locale}.json`);
      fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + "\n");
      console.log(`wrote ${outFile} (${out.length} posts)`);
    } else {
      console.error(
        `SKIP write ${locale}: only ${out.length}/${posts.length} posts assembled`,
      );
      hardErrors++;
    }
  }

  if (warnings.length) {
    console.log(`\n${warnings.length} markup warning(s):`);
    for (const w of warnings) console.log("  " + w);
  }
  if (hardErrors) {
    console.error(`\n${hardErrors} hard error(s) - some files not written.`);
    process.exit(1);
  }
  console.log("\nassemble OK");
}

const cmd = process.argv[2];
if (cmd === "extract") cmdExtract();
else if (cmd === "seed") cmdSeed();
else if (cmd === "assemble") cmdAssemble();
else {
  console.error("usage: node scripts/blog-i18n.cjs <extract|seed|assemble>");
  process.exit(1);
}
