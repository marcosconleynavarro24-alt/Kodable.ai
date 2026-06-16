import {
  whatYouGet,
  whatYouGetHeadline,
  whatYouGetIntro,
} from "@/content/whatYouGet";

// The four plain promises, sitting high on the page so a non-technical owner
// understands the offer before anything else. Reuses the existing card system
// (white card, hairline border, print shadow, lift on hover).
export default function WhatYouGet() {
  return (
    <section
      id="what-you-get"
      className="py-[160px] max-w-[1280px] mx-auto px-5 md:px-20"
    >
      <div className="grid grid-cols-4 md:grid-cols-12 gap-8 mb-24">
        <div className="col-span-4 md:col-span-7">
          <span
            className="text-accent uppercase tracking-[0.2em] mb-4 block text-[12px] leading-[1.0] font-medium"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            What you get
          </span>
          <h2
            className="text-[42px] leading-[1.2] font-normal text-ink mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {whatYouGetHeadline}
          </h2>
          <p className="text-ink-muted text-[18px] leading-[1.6] max-w-[560px]">
            {whatYouGetIntro}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-12 gap-8">
        {whatYouGet.map((b) => (
          <div
            key={b.title}
            className="col-span-4 md:col-span-6 bg-white border border-line p-10 print-shadow lift-hover flex flex-col"
          >
            <span
              className="material-symbols-outlined text-accent mb-6 text-4xl block"
              aria-hidden="true"
            >
              {b.icon}
            </span>
            <h3
              className="text-[32px] leading-[1.3] font-normal mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {b.title}
            </h3>
            <p className="text-ink-muted text-[16px] leading-[1.6] mb-8">
              {b.promise}
            </p>
            <ul className="space-y-3 mt-auto">
              {b.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-ink text-[15px] leading-[1.55]"
                >
                  <span
                    className="material-symbols-outlined text-accent text-[20px] mt-0.5 shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
