"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Scroll-reveal controller. Elements with class `reveal` are visible by default
// (see globals.css); this only *enhances* them by fading/sliding them in once.
// Re-scans on route change so client-navigated pages animate too. Respects
// reduced-motion and degrades gracefully without IntersectionObserver.
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (els.length === 0) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
