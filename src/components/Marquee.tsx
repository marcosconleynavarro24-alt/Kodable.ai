import { marqueeLines } from "@/content/marquee";

// Horizontally auto-scrolling strip of benefit lines. Pure CSS animation:
// the track is duplicated so the loop is seamless. Pauses on hover. When the
// user prefers reduced motion the animation is dropped and the lines wrap
// statically into a centred grid (handled in globals.css).
export default function Marquee() {
  return (
    <section
      aria-label="What your site does for you"
      className="marquee border-y border-line py-4 overflow-hidden"
    >
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="marquee__group"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {marqueeLines.map((line) => (
              <li
                key={line}
                className="marquee__item text-ink-muted uppercase tracking-[0.18em] text-[11px] leading-none font-medium"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span className="text-accent" aria-hidden="true">
                  ✳
                </span>
                {line}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
