import { pricingTiers } from "@/content/pricing";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-[160px] max-w-[1280px] mx-auto px-5 md:px-20"
    >
      <div className="text-center mb-24">
        <span
          className="text-accent uppercase tracking-[0.2em] mb-4 block text-[12px] leading-[1.0] font-medium"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Transparent Investment
        </span>
        <h2
          className="text-[48px] md:text-[42px] leading-[1.2] font-normal"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Pricing for every growth stage.
        </h2>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-12 gap-8 items-start">
        {pricingTiers.map((tier) => {
          if (tier.featured) {
            return (
              <div
                key={tier.id}
                className="col-span-4 md:col-span-4 bg-white conic-border p-10 transform md:scale-105 z-20"
                style={{
                  boxShadow: "0px 20px 40px rgba(10,10,10,0.1)",
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4
                    className="text-accent uppercase text-[12px] font-medium"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {tier.label}
                  </h4>
                  {tier.badge && (
                    <span className="bg-accent text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {tier.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2 mb-8">
                  <span
                    className="text-5xl font-normal"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {tier.price}
                  </span>
                  <span className="text-ink-muted">{tier.period}</span>
                </div>
                <ul className="space-y-4 mb-12">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-ink text-[16px] leading-[1.6]"
                    >
                      <span
                        className="material-symbols-outlined text-accent text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="block w-full bg-ink text-white py-4 font-semibold text-center hover:bg-accent transition-all"
                >
                  {tier.cta}
                </a>
              </div>
            );
          }

          return (
            <div
              key={tier.id}
              className="col-span-4 md:col-span-4 bg-white border border-line p-10 print-shadow lift-hover"
            >
              <h4
                className="uppercase mb-2 text-[12px] font-medium text-ink-muted"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {tier.label}
              </h4>
              <div className="flex items-baseline gap-2 mb-8">
                <span
                  className="text-4xl font-normal"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {tier.price}
                </span>
                <span className="text-ink-muted">{tier.period}</span>
              </div>
              <ul className="space-y-4 mb-12">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-ink-muted text-[16px] leading-[1.6]"
                  >
                    <span className="material-symbols-outlined text-accent text-sm">
                      check
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block w-full border border-ink py-4 font-semibold text-center hover:bg-ink hover:text-white transition-all"
              >
                {tier.cta}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
