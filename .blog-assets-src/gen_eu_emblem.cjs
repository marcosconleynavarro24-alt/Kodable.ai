#!/usr/bin/env node
/* Renders the official EU "Financiado por la Unión Europea / NextGenerationEU"
 * emblem as a crisp SVG (EU blue field + ring of 12 upright gold stars + text),
 * faithful to the standard horizontal emblem. Output: public/blog/eu-nextgen-emblem.svg */
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "..", "public", "blog", "eu-nextgen-emblem.svg");

const BLUE = "#003399", GOLD = "#FFCC00", GREY = "#5b6670";
// Flag rectangle (3:2), left of the text, with side whitespace so the figure
// reads as a centred emblem rather than a giant full-width banner.
const fx = 150, fy = 44, fw = 276, fh = 184;
const cx = fx + fw / 2, cy = fy + fh / 2;
const Rring = fh / 3;          // 12 stars on a circle of radius 1/3 of height
const Ro = fh / 18;            // star points on a circle of radius 1/18 of height
const Ri = Ro * 0.382;         // inner radius of a 5-point star

function star(scx, scy) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const ang = (-90 + i * 36) * Math.PI / 180;   // first point straight up
    const r = i % 2 === 0 ? Ro : Ri;
    pts.push((scx + r * Math.cos(ang)).toFixed(2) + "," + (scy + r * Math.sin(ang)).toFixed(2));
  }
  return `<polygon points="${pts.join(" ")}" fill="${GOLD}"/>`;
}

let stars = "";
for (let k = 0; k < 12; k++) {
  const t = k * 30 * Math.PI / 180;               // clock positions, k=0 at top
  stars += star(cx + Rring * Math.sin(t), cy - Rring * Math.cos(t));
}

const tx = 470;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 270" font-family="Arial, Helvetica, sans-serif">
  <rect width="900" height="270" fill="#ffffff"/>
  <rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" fill="${BLUE}"/>
  ${stars}
  <text x="${tx}" y="112" font-size="45" font-weight="700" fill="${BLUE}">Financiado por</text>
  <text x="${tx}" y="162" font-size="45" font-weight="700" fill="${BLUE}">la Unión Europea</text>
  <text x="${tx}" y="210" font-size="33" font-weight="400" fill="${GREY}">NextGenerationEU</text>
</svg>
`;
fs.writeFileSync(OUT, svg);
console.log("wrote", OUT, "(" + svg.length + " bytes, 12 stars)");
