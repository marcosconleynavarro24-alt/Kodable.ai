"use client";

// SaaS-style count-up stat band (home hero). The server render carries the FINAL
// figures, so crawlers and no-JS visitors always see the real numbers; on the
// first scroll into view the values animate 0 → final. prefers-reduced-motion
// users keep the static figures (matching the site-wide .reveal rule).
import { useEffect, useRef, useState } from "react";

export interface StatItem {
  /** Final numeric value (visitors, pageviews, seconds, percent…). */
  target: number;
  /** "number" renders via Intl; "duration" renders as "N min N s". */
  kind: "number" | "duration";
  /** Appended verbatim after the formatted value, e.g. "%" / "+". */
  suffix?: string;
  label: string;
}

const COUNT_MS = 1400;
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

function fmt(item: StatItem, v: number, numLocale: string): string {
  if (item.kind === "duration") {
    const s = Math.round(v);
    const min = Math.floor(s / 60);
    const sec = s % 60;
    const base = min === 0 ? `${sec} s` : sec === 0 ? `${min} min` : `${min} min ${sec} s`;
    return base + (item.suffix ?? "");
  }
  return new Intl.NumberFormat(numLocale).format(Math.round(v)) + (item.suffix ?? "");
}

export default function StatBand({
  items,
  numLocale,
  compact = false,
}: {
  items: StatItem[];
  numLocale: string;
  /** Hero placement: smaller numerals, always one row, so the figures fit in
      the first screen without pushing the CTA out of view. */
  compact?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // 1 = final values: what the server renders and what no-JS keeps.
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / COUNT_MS);
          setProgress(easeOut(p));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        setProgress(0);
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        display: "grid",
        gridTemplateColumns: compact ? "repeat(3, 1fr)" : "repeat(auto-fit, minmax(180px, 1fr))",
        gap: compact ? "16px 12px" : "30px 20px",
        textAlign: "center",
        padding: compact ? 0 : "6px 0",
      }}
    >
      {items.map((m) => (
        <div key={m.label}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: compact ? "clamp(1.3rem, 4.2vw, 2.15rem)" : "clamp(2.2rem, 4.5vw, 3.2rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--accent-deep)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {fmt(m, m.target * progress, numLocale)}
          </div>
          <div
            style={{
              marginTop: compact ? "5px" : "8px",
              fontSize: compact ? ".67rem" : ".78rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".07em",
              color: "var(--ink-mute)",
            }}
          >
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}
