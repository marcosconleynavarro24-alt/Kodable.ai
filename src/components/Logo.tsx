import Link from "next/link";
import type { Locale } from "@/i18n/config";

// The kodable.ai mark: an isometric cube, ink outline with a navy top face,
// beside the lowercase wordmark where .ai is navy. Geometry matches
// public/brand/KodableNewLogo-mark.svg (source: tools/brand-kit/build.py);
// colours come from the site tokens.
export default function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} className="brand" aria-label="kodable.ai home">
      <svg className="mark" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 32 11.22 20 32 8 52.78 20Z" fill="var(--accent)" />
        <path
          d="M32 8 52.78 20V44L32 56 11.22 44V20Z"
          fill="none"
          stroke="var(--ink)"
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <path
          d="M11.22 20 32 32 52.78 20M32 32v24"
          fill="none"
          stroke="var(--ink)"
          strokeWidth={5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <span>
        kodable<span className="dot-ai">.ai</span>
      </span>
    </Link>
  );
}
