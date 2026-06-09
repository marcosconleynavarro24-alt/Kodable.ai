"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "/#services", label: "Services" },
    { href: "/#process", label: "Process" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#faq", label: "FAQ" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-shadow duration-300 bg-bg/85 backdrop-blur-xl border-b border-line/30 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="flex justify-between items-center w-full px-5 md:px-20 py-4 max-w-[1280px] mx-auto">
        <a href="/" aria-label="Kodable.ai home" className="flex items-center">
          <Logo />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-ink-muted font-medium text-[16px] leading-[1.6] hover:text-accent transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="/#contact"
            className="hidden sm:inline-block bg-ink text-white px-6 py-2.5 rounded-[4px] font-medium text-[16px] hover:bg-accent transition-colors duration-300"
          >
            Get a free quote
          </a>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg border-t border-line/30 px-5 py-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-ink-muted font-medium text-[16px] hover:text-accent transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="block text-center bg-ink text-white px-6 py-3 rounded-[4px] font-medium text-[16px] hover:bg-accent transition-colors"
          >
            Get a free quote
          </a>
        </div>
      )}
    </header>
  );
}
