// Inline SVG icon set used across the site (stroke-based, 24×24). Size is set by
// the parent via CSS (e.g. .svc-ico svg { width: 26px }). Decorative by default.
import type { JSX } from "react";

export type IconName =
  | "arrow"
  | "send"
  | "pin"
  | "check"
  | "search"
  | "layers"
  | "chat"
  | "shield"
  | "design"
  | "code"
  | "globe"
  | "star"
  | "calendar"
  | "phone"
  | "mail"
  | "menu"
  | "chevron"
  | "clock"
  | "list"
  | "card"
  | "spark"
  | "restaurant"
  | "salon"
  | "trades"
  | "shop";

const paths: Record<IconName, JSX.Element> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  send: <path d="M4 12l16-7-7 16-2-7-7-2z" strokeLinejoin="round" />,
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: <path d="M5 12l5 5L20 7" strokeWidth={2.2} />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  layers: (
    <>
      <path d="M4 7l8-4 8 4-8 4-8-4z" strokeLinejoin="round" />
      <path d="M4 7v6l8 4 8-4V7" strokeLinejoin="round" />
    </>
  ),
  chat: <path d="M21 11.5a8.5 8.5 0 01-12.4 7.6L3 21l1.9-5.6A8.5 8.5 0 1121 11.5z" strokeLinejoin="round" />,
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinejoin="round" />
    </>
  ),
  design: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M3 8h18M7 12h6" />
    </>
  ),
  code: <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" strokeLinejoin="round" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </>
  ),
  star: <path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 8.7l5.4-.8L12 3z" strokeLinejoin="round" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  phone: <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" strokeLinejoin="round" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" strokeLinejoin="round" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />,
  chevron: <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" strokeLinecap="round" />
    </>
  ),
  list: <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />,
  card: <path d="M3 7h18v10H3zM3 11h18" strokeLinejoin="round" />,
  spark: <path d="M21 11.5a8.5 8.5 0 01-12.4 7.6L3 21l1.9-5.6A8.5 8.5 0 1121 11.5z" strokeLinejoin="round" />,
  restaurant: (
    <>
      <path d="M4 3v6a2 2 0 002 2v10M4 3v5M8 3v5M8 3v6a2 2 0 01-2 2" />
      <path d="M17 3c-1.4 1-2 3-2 5s.6 3 2 3v10" />
    </>
  ),
  salon: (
    <>
      <circle cx="6" cy="6" r="2.6" />
      <circle cx="6" cy="18" r="2.6" />
      <path d="M8.1 7.9L20 19M20 5L8.1 16.1" strokeLinejoin="round" />
    </>
  ),
  trades: (
    <path
      d="M15 6.5a3.6 3.6 0 00-4.7 4.5l-6 6a1.8 1.8 0 002.5 2.5l6-6A3.6 3.6 0 0017.5 9l-2.2 2.2-1.8-1.8L15.7 7"
      strokeLinejoin="round"
    />
  ),
  shop: (
    <>
      <path d="M4 9h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1V9z" strokeLinejoin="round" />
      <path d="M3 9l2-5h14l2 5" strokeLinejoin="round" />
      <path d="M9.5 20v-5h5v5" />
    </>
  ),
};

export default function Icon({
  name,
  title,
  className,
}: {
  name: IconName;
  title?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
              aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
