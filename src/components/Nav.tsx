"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-shadow duration-300 bg-[#FAFAF7]/85 backdrop-blur-xl border-b border-[#E8E5DD]/30 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="flex justify-between items-center w-full px-5 md:px-20 py-4 max-w-[1280px] mx-auto">
        <a href="#" aria-label="Kodable.ai home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Kodable.ai"
            width={178}
            height={45}
            priority
            className="h-8 w-auto md:h-9"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[#444748] font-medium text-[16px] leading-[1.6] hover:text-[#5B3FA8] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <span className="hidden lg:inline text-[#747878] uppercase tracking-widest text-[10px] font-mono">
            Available for projects
          </span>
          <a
            href="#contact"
            className="bg-[#0A0A0A] text-white px-6 py-2.5 rounded-[4px] font-medium text-[16px] hover:bg-[#5B3FA8] transition-colors duration-300"
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
        <div className="md:hidden bg-[#FAFAF7] border-t border-[#E8E5DD]/30 px-5 py-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-[#444748] font-medium text-[16px] hover:text-[#5B3FA8] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
