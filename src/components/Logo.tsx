import Link from "next/link";
import type { Locale } from "@/i18n/config";

// The kodable.ai mark: an open ink ring with an emerald arc riding its right
// edge, beside the lowercase wordmark where .ai is emerald. Geometry matches
// public/brand/KodableNewLogo-mark.svg; colours come from the site tokens.
export default function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} className="brand" aria-label="kodable.ai home">
      <svg className="mark" viewBox="0 0 64 64" aria-hidden="true">
        <circle
          cx="32"
          cy="32"
          r="20"
          fill="none"
          stroke="var(--ink)"
          strokeWidth={5}
          strokeLinecap="round"
        />
        <path
          d="M44 16a20 20 0 0 1 0 32"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={5}
          strokeLinecap="round"
        />
      </svg>
      <span>
        kodable<span className="dot-ai">.ai</span>
      </span>
    </Link>
  );
}
