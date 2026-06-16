import { scenarios, scenariosHeadline } from "@/content/scenarios";

// "Is this you?" — owners recognise themselves in a single line. Tight row of
// four cards, reusing the existing card system. Sits right after the four
// promises so the offer lands before anything technical.
export default function Scenarios() {
  return (
    <section className="pb-[160px] max-w-[1280px] mx-auto px-5 md:px-20">
      <div className="grid grid-cols-4 md:grid-cols-12 gap-8 mb-16">
        <div className="col-span-4 md:col-span-7">
          <span
            className="text-accent uppercase tracking-[0.2em] mb-4 block text-[12px] leading-[1.0] font-medium"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Is this you?
          </span>
          <h2
            className="text-[42px] leading-[1.2] font-normal text-ink"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {scenariosHeadline}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-12 gap-8">
        {scenarios.map((s) => (
          <div
            key={s.type}
            className="col-span-4 md:col-span-3 bg-white border border-line p-8 print-shadow lift-hover flex flex-col"
          >
            <span
              className="material-symbols-outlined text-accent mb-5 text-3xl block"
              aria-hidden="true"
            >
              {s.icon}
            </span>
            <h3
              className="text-[20px] leading-[1.3] font-normal mb-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {s.type}
            </h3>
            <p className="text-ink-muted text-[15px] leading-[1.6]">
              {s.outcome}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
