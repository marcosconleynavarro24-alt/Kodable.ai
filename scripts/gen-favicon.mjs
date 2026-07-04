// Generates src/app/favicon.ico — the brand bolt on a light tile, at 16/32/48px,
// packed into a single multi-size .ico (PNG-compressed entries).
// Google's favicon crawler prefers /favicon.ico; the light tile keeps the green
// bolt legible on Google's dark-mode result background. Run: node scripts/gen-favicon.mjs
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const svg = (size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">` +
  `<rect width="32" height="32" rx="6" fill="#fbfcfb"/>` +
  `<g transform="translate(16 16) scale(0.82) translate(-16 -16)">` +
  `<path d="M18 3L7 18h7l-2 11 11-15h-7l2-11z" fill="#0e8266" stroke="#0e8266" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>` +
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
