"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// The familiar bottom "cookie banner" - except this site sets no cookies, so
// it informs instead of asking consent (a consent dialog with nothing to
// consent to would be noise, and the AEPD frowns on decorative banners).
// The single localStorage flag below only remembers the dismissal; it's
// strictly necessary storage (art. 22.2 LSSI exemption) and is disclosed on
// the /cookies page - keep that page in sync if this changes.
const STORAGE_KEY = "kdl_cookie_notice_ok";

const COPY: Record<string, { text: string; link: string; ok: string }> = {
  en: {
    text: "This site uses no cookies. We only measure visits anonymously: no tracking, no ads.",
    link: "How it works",
    ok: "Got it",
  },
  es: {
    text: "Esta web no usa cookies. Solo medimos visitas de forma anónima: sin rastreo y sin publicidad.",
    link: "Cómo funciona",
    ok: "Entendido",
  },
  fr: {
    text: "Ce site n'utilise pas de cookies. Nous mesurons les visites de façon anonyme, sans traçage ni publicité.",
    link: "Comment ça marche",
    ok: "Compris",
  },
  de: {
    text: "Diese Website verwendet keine Cookies. Besuche messen wir nur anonym, kein Tracking, keine Werbung.",
    link: "Wie das funktioniert",
    ok: "Verstanden",
  },
  it: {
    text: "Questo sito non usa cookie. Misuriamo le visite solo in forma anonima: niente tracciamento, niente pubblicità.",
    link: "Come funziona",
    ok: "Ho capito",
  },
};

export default function CookieNotice({ locale }: { locale: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Storage blocked (private mode etc.): show it; dismissal just won't stick.
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const copy = COPY[locale] ?? COPY.en;

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* best effort */
    }
    setVisible(false);
  }

  return (
    <div className="cookie-notice" role="region" aria-label="Cookies">
      <p>
        {copy.text}{" "}
        <Link href={`/${locale}/cookies`} onClick={dismiss}>
          {copy.link}
        </Link>
      </p>
      <button type="button" className="btn btn-primary btn-sm" onClick={dismiss}>
        {copy.ok}
      </button>
    </div>
  );
}
