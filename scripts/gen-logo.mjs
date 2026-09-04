// Generates public/logo.png, the 512x512 raster of the app-icon lockup (the
// reversed cube mark inside the ink rounded square).
//
// This file is what Google actually consumes as the Organization logo: it is
// the `logo` ImageObject in the JSON-LD graph ([locale]/layout.tsx) and the
// PNG icon in the web manifest, and Google ignores SVG for both. It missed the
// 2026-08-16 navy/cube rebrand and kept serving the old ring+arc mark, so the
// old logo stayed in Google's hands long after the site changed.
//
// The artwork is NOT redrawn here: it is rasterized straight from
// public/brand/KodableNewLogo-appicon.svg, which tools/brand-kit/build.py
// emits. Change the mark there, re-run the brand kit, and this follows.
//
// Run: node scripts/gen-logo.mjs
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const SIZE = 512;

const src = resolve(process.cwd(), "public/brand/KodableNewLogo-appicon.svg");
const svg = readFileSync(src, "utf8")
  .replace(/width="\d+"/, `width="${SIZE}"`)
  .replace(/height="\d+"/, `height="${SIZE}"`);

const out = resolve(process.cwd(), "public/logo.png");
const info = await sharp(Buffer.from(svg)).resize(SIZE, SIZE).png().toFile(out);

console.log(`Wrote ${out} (${info.width}x${info.height}, ${info.size} bytes) from ${src}`);
