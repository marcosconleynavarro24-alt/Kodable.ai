"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { otherLocale, locales } from "@/i18n/config";
import Logo from "./Logo";
import Icon from "./Icon";

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
  const pathname = usePathname() || `/${locale}`;
  const other = otherLocale(locale);

  // Swap the leading locale segment to build the language-toggle href.
  const altHref = (() => {
    const segments = pathname.split("/");
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = other;
      return segments.join("/") || `/${other}`;
    }
    return `/${other}`;
  })();

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
          <Link className="lang" href={altHref} aria-label={langAria} hrefLang={other}>
            <span className={locale === "es" ? "on" : undefined}>ES</span>
            <span className="sep">·</span>
            <span className={locale === "en" ? "on" : undefined}>EN</span>
          </Link>
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
      </div>
    </header>
  );
}
