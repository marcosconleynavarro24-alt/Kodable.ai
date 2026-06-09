"use client";

import { useEffect, useRef, useState } from "react";
import { stats, type Stat } from "@/content/stats";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function StatItem({ stat, start }: { stat: Stat; start: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // Reduced motion (or not yet in view): show the true final value.
    if (reduced) {
      setDisplay(stat.value);
      return;
    }
    if (!start) return;

    let raf = 0;
    let startTs = 0;
    const duration = 1800;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(Math.round(eased * stat.value));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(stat.value); // land exactly on target
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, reduced, stat.value]);

  return (
    <div className="text-center md:text-left">
      <div
        className="text-[48px] md:text-[64px] leading-[1.0] font-normal text-ink tracking-[-0.02em]"
        style={{ fontFamily: "var(--font-serif)" }}
        aria-hidden="true"
      >
        {stat.prefix && <span className="text-accent">{stat.prefix}</span>}
        {display.toLocaleString("en-US")}
        {stat.suffix && <span className="text-accent">{stat.suffix}</span>}
      </div>
      <div
        className="mt-3 text-ink-muted uppercase tracking-[0.15em] text-[12px] leading-[1.4]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {stat.label}
      </div>
      <span className="sr-only">
        {stat.prefix ?? ""}
        {stat.value}
        {stat.suffix ?? ""} {stat.label}
      </span>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.disconnect(); // fire once only
            break;
          }
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Key metrics"
      className="py-[120px] max-w-[1280px] mx-auto px-5 md:px-20"
    >
      <span
        className="text-accent uppercase tracking-[0.2em] mb-12 block text-[12px] leading-[1.0] font-medium text-center md:text-left"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        By the numbers
      </span>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
        {stats.map((s) => (
          <StatItem key={s.label} stat={s} start={started} />
        ))}
      </div>
    </section>
  );
}
