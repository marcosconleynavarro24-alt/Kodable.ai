import { reviews, reviewsHeadline } from "@/content/reviews";

// Honest trust block. Shows the 5-star headline always; renders individual
// quotes only once real ones are added to src/content/reviews.ts.
export default function Reviews() {
  return (
    <section
      aria-label="Customer reviews"
      className="py-[120px] max-w-[1280px] mx-auto px-5 md:px-20 text-center"
    >
      <div
        className="flex items-center justify-center gap-1 mb-5 text-accent"
        aria-hidden="true"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
        ))}
      </div>
      <h2
        className="text-[32px] md:text-[36px] leading-[1.2] font-normal"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {reviewsHeadline}
      </h2>

      {reviews.length > 0 && (
        <div className="grid grid-cols-4 md:grid-cols-12 gap-8 mt-16 text-left">
          {reviews.map((r) => (
            <figure
              key={r.author}
              className="col-span-4 md:col-span-4 bg-white border border-line p-10 print-shadow"
            >
              <blockquote
                className="text-ink text-[18px] leading-[1.6] mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption
                className="text-ink-muted text-[11px] uppercase tracking-wider"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {r.author}
                {r.location ? ` · ${r.location}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
