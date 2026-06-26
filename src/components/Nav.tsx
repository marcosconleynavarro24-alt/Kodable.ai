"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { locales, localeNames, localeShort } from "@/i18n/config";
import Logo from "./Logo";
import Icon from "./Icon";
import Flag from "./Flag";

type NavLink = { key: string; href: string; label: string };

export default function Nav({
  locale,
  links,
  ctaLabel,
  langAria,
}: {
  locale: Locale;
  links: NavLink[];
  ctaLabel: string;
  langAria: string;
}) {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || `/${locale}`;

  // Build the href for a given locale by swapping the leading locale segment,
  // keeping the rest of the current path (so the language switch stays on-page).
  const switchHref = (target: Locale) => {
    const segments = pathname.split("/");
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = target;
      return segments.join("/") || `/${target}`;
    }
    return `/${target}`;
  };

  // Close the language dropdown on outside click or Escape.
  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Logo locale={locale} />

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.key}
              href={`/${locale}${l.href}`}
              className={isActive(l.href) ? "active" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          {/* Flag language switcher */}
          <div className="lang-switch" ref={langRef}>
            <button
              type="button"
              className="lang"
              aria-label={langAria}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((v) => !v)}
            >
              <Flag locale={locale} />
              <span>{localeShort[locale]}</span>
              <Icon name="chevron" className="lang-chev" />
            </button>
            {langOpen ? (
              <div className="lang-menu" role="menu">
                {locales.map((l) => (
                  <Link
                    key={l}
                    href={switchHref(l)}
                    hrefLang={l}
                    role="menuitem"
                    className={`lang-opt${l === locale ? " on" : ""}`}
                    aria-current={l === locale ? "true" : undefined}
                    onClick={() => setLangOpen(false)}
                  >
                    <Flag locale={l} />
                    <span>{localeNames[l]}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <Link href={`/${locale}/contact`} className="btn btn-primary btn-sm desktop-cta">
            {ctaLabel}
          </Link>
          <button
            className="menu-btn"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobileMenu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>

      <div className={`mobile-menu${open ? " open" : ""}`} id="mobileMenu">
        {links.map((l) => (
          <Link key={l.key} href={`/${locale}${l.href}`} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link
          href={`/${locale}/contact`}
          className="btn btn-primary"
          onClick={() => setOpen(false)}
        >
          {ctaLabel}
        </Link>

        {/* Language flags inside the burger menu */}
        <div className="mobile-lang" aria-label={langAria}>
          {locales.map((l) => (
            <Link
              key={l}
              href={switchHref(l)}
              hrefLang={l}
              className={`mobile-lang-opt${l === locale ? " on" : ""}`}
              aria-current={l === locale ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              <Flag locale={l} />
              <span>{localeShort[l]}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
