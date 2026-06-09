type LogoProps = {
  className?: string;
};

/**
 * Kodable.ai logo — outlined lightning bolt (stroke only) with three spark
 * accents, beside the wordmark. Colors are pulled from the site's design
 * tokens (--color-accent, --color-ink) so the mark stays in sync with the
 * palette. Rendered as inline SVG + text so it's crisp at every size.
 */
export default function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-8 w-auto md:h-9 shrink-0"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Outlined lightning bolt */}
        <path d="M24 4 L12 22 L19 22 L15 36 L28 16 L21 16 L26 4 Z" />
        {/* Two spark accents near the upper-left */}
        <path d="M5 8 L9.5 9.5" strokeWidth={2} />
        <path d="M3 15.5 L7.5 16.5" strokeWidth={2} />
        {/* One spark accent near the lower-right */}
        <path d="M31.5 27 L35.5 29" strokeWidth={2} />
      </svg>
      <span
        className="text-[20px] md:text-[22px] font-semibold tracking-tight leading-none"
        style={{ color: "var(--color-ink)" }}
      >
        Kodable
        <span style={{ color: "var(--color-accent)" }}>.ai</span>
      </span>
    </span>
  );
}
