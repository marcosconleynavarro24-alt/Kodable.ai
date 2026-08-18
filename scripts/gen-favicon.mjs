// Generates src/app/favicon.ico, the KodableNewLogo cube mark on a light
// tile, at 16/32/48px, packed into a single multi-size .ico (PNG-compressed
// entries). Google's favicon crawler prefers /favicon.ico; the light tile keeps
// the navy arc legible on Google's dark-mode result background.
// Geometry mirrors src/app/icon.svg and tools/brand-kit/build.py (the source of
// truth for the mark). The interior stem is dropped here: at 16px it fills in.
// Run: node scripts/gen-favicon.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const svg = (size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">` +
  `<rect width="64" height="64" rx="12" fill="#fbfbfd"/>` +
  `<g transform="translate(-1.92 -1.92) scale(1.06)">` +
  `<path d="M32 32 11.22 20 32 8 52.78 20Z" fill="#000080"/>` +
  `<path d="M32 8 52.78 20V44L32 56 11.22 44V20Z" fill="none" stroke="#16182b" stroke-width="7" stroke-linejoin="round"/>` +
  `<path d="M11.22 20 32 32 52.78 20" fill="none" stroke="#16182b" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>` +
  `</g></svg>`;

const sizes = [16, 32, 48];
const pngs = [];
for (const s of sizes) {
  const buf = await sharp(Buffer.from(svg(s))).resize(s, s).png().toBuffer();
  pngs.push({ size: s, buf });
}

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(pngs.length, 4); // image count

const entries = [];
let offset = 6 + pngs.length * 16;
for (const { size, buf } of pngs) {
  const e = Buffer.alloc(16);
  e.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 => 256)
  e.writeUInt8(size >= 256 ? 0 : size, 1); // height
  e.writeUInt8(0, 2); // palette colors
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(buf.length, 8); // bytes of image data
  e.writeUInt32LE(offset, 12); // offset of image data
  entries.push(e);
  offset += buf.length;
}

const ico = Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
const out = resolve(process.cwd(), "src/app/favicon.ico");
writeFileSync(out, ico);
console.log(`Wrote ${out} (${ico.length} bytes, sizes: ${sizes.join("/")})`);
