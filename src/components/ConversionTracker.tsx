"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Records WhatsApp / call / email taps (cookieless) so the owner can see what
// drives leads. Listens once for clicks on any element with data-track and posts
// to /api/event via sendBeacon, which survives the page navigation a tel:/wa.me
// link triggers. No personal data leaves the browser.
const TYPE_MAP: Record<string, string> = {
  whatsapp: "whatsapp_click",
  call: "call_click",
  email: "email_click",
};

export default function ConversionTracker({ locale }: { locale: string }) {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.("[data-track]");
      if (!el) return;
      const key = el.getAttribute("data-track") ?? "";
      const type = TYPE_MAP[key];
      if (!type) return;

      const payload = JSON.stringify({ type, path: pathname, locale });
      try {
        if (typeof navigator.sendBeacon === "function") {
          navigator.sendBeacon(
            "/api/event",
            new Blob([payload], { type: "application/json" }),
          );
        } else {
          void fetch("/api/event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true,
          });
        }
      } catch {
        /* analytics is best-effort; never block the click */
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, locale]);

  return null;
}
