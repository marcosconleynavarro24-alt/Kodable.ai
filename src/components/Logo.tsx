import Link from "next/link";
import type { Locale } from "@/i18n/config";

// The Kodable.ai mark: a solid lightning bolt beside the wordmark. The thin
// same-colour stroke with round joins keeps the points clean at small sizes.
// Colour comes from the accent token so it stays on-brand.
export default function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} className="brand" aria-label="Kodable.ai home">
      <svg className="bolt" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M18 3L7 18h7l-2 11 11-15h-7l2-11z"
          fill="var(--accent)"
          stroke="var(--accent)"
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <span>
        Kodable<span className="dot-ai">.ai</span>
      </span>
    </Link>
  );
}
