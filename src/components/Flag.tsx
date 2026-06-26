import type { Locale } from "@/i18n/config";

// Inline SVG flags, matching the language switcher used across the demo sites
// (viewBox 0 0 60 40, wrapped in a rounded .flag chip — no emoji).
const flags: Record<Locale, React.ReactNode> = {
  en: (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 60,40M60,0 0,40" stroke="#fff" strokeWidth="8" />
      <path d="M0,0 60,40M60,0 0,40" stroke="#c8102e" strokeWidth="4" />
      <path d="M30,0V40M0,20H60" stroke="#fff" strokeWidth="12" />
      <path d="M30,0V40M0,20H60" stroke="#c8102e" strokeWidth="7" />
    </svg>
  ),
  es: (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#c60b1e" />
      <rect y="10" width="60" height="20" fill="#ffc400" />
    </svg>
  ),
  fr: (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#fff" />
      <rect width="20" height="40" fill="#0055a4" />
      <rect x="40" width="20" height="40" fill="#ef4135" />
    </svg>
  ),
  de: (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#000" />
      <rect y="13.33" width="60" height="13.34" fill="#dd0000" />
      <rect y="26.67" width="60" height="13.33" fill="#ffce00" />
    </svg>
  ),
  it: (
    <svg viewBox="0 0 60 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="40" fill="#fff" />
      <rect width="20" height="40" fill="#009246" />
      <rect x="40" width="20" height="40" fill="#ce2b37" />
    </svg>
  ),
};

export default function Flag({ locale }: { locale: Locale }) {
  return (
    <span className="flag" aria-hidden="true">
      {flags[locale]}
    </span>
  );
}
