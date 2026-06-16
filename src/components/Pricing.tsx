import { pricingTiers, carePlans, type PricingTier } from "@/content/pricing";

function TierCard({ tier }: { tier: PricingTier }) {
  if (tier.featured) {
    return (
      <div
        className="col-span-4 md:col-span-4 bg-white conic-border p-10 transform md:scale-105 z-20"
        style={{ boxShadow: "0px 20px 40px rgba(10,10,10,0.1)" }}
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
    <div className="col-span-4 md:col-span-4 bg-white border border-line p-10 print-shadow lift-hover">
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
}

function GroupHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-12">
      <span
        className="text-accent uppercase tracking-[0.2em] mb-3 block text-[12px] leading-[1.0] font-medium"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {eyebrow}
      </span>
      <h3
        className="text-[32px] leading-[1.2] font-normal"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {title}
      </h3>
    </div>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-[160px] max-w-[1280px] mx-auto px-5 md:px-20"
    >
      <div className="text-center mb-12">
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
        <p className="text-ink-muted text-[16px] leading-[1.6] max-w-[560px] mx-auto mt-5">
          Fixed price, known before we start. No hourly meter, no surprises.
          Every site comes with a care plan — we don&apos;t disappear after
          launch.
        </p>
      </div>

      {/* Build it — one-off projects */}
      <GroupHeading eyebrow="Build it" title="Your website, built to perform." />
      <div className="grid grid-cols-4 md:grid-cols-12 gap-8 items-start mb-8">
        {pricingTiers.map((tier) => (
          <TierCard key={tier.id} tier={tier} />
        ))}
      </div>
      <p
        className="text-ink-muted text-[12px] mb-24"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        All prices shown from, + IVA. Prefer to spread the cost? Ask about our{" "}
        <a href="#contact" className="text-accent hover:underline">
          pay-monthly websites from €39/mo
        </a>
        .
      </p>

      {/* Keep it running — recurring care plans */}
      <GroupHeading
        eyebrow="Keep it running"
        title="A site that stays healthy — and so do you."
      />
      <div className="grid grid-cols-4 md:grid-cols-12 gap-8 items-start">
        {carePlans.map((plan) => (
          <TierCard key={plan.id} tier={plan} />
        ))}
      </div>
      <p
        className="text-ink-muted text-[12px] mt-8"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Monthly, + IVA. Cancel anytime.
      </p>
    </section>
  );
}
