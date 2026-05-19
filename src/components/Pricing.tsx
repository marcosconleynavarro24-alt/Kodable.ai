import { pricingTiers } from "@/content/pricing";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-[160px] max-w-[1280px] mx-auto px-5 md:px-20"
    >
      <div className="text-center mb-24">
        <span
          className="text-[#5B3FA8] uppercase tracking-[0.2em] mb-4 block text-[12px] leading-[1.0] font-medium"
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
                    className="text-[#5B3FA8] uppercase text-[12px] font-medium"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {tier.label}
                  </h4>
                  {tier.badge && (
                    <span className="bg-[#5B3FA8] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
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
                  <span className="text-[#444748]">{tier.period}</span>
                </div>
                <ul className="space-y-4 mb-12">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-[#1A1A1A] text-[16px] leading-[1.6]"
                    >
                      <span
                        className="material-symbols-outlined text-[#5B3FA8] text-sm"
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
                  className="block w-full bg-[#0A0A0A] text-white py-4 font-semibold text-center hover:bg-[#5B3FA8] transition-all"
                >
                  {tier.cta}
                </a>
              </div>
            );
          }

          const accentStyle = tier.accentColor
            ? {
                borderTop: `4px solid ${tier.accentColor}`,
              }
            : {};

          return (
            <div
              key={tier.id}
              className="col-span-4 md:col-span-4 bg-white border border-[#E8E5DD] p-10 print-shadow lift-hover"
              style={accentStyle}
            >
              <h4
                className="uppercase mb-2 text-[12px] font-medium"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: tier.accentColor ?? "#747878",
                }}
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
                <span className="text-[#444748]">{tier.period}</span>
              </div>
              <ul className="space-y-4 mb-12">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-[#444748] text-[16px] leading-[1.6]"
                  >
                    <span className="material-symbols-outlined text-[#5B3FA8] text-sm">
                      check
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block w-full border border-[#0A0A0A] py-4 font-semibold text-center hover:bg-[#0A0A0A] hover:text-white transition-all"
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
