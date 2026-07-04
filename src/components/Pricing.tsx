import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getPricing } from "@/content/pricing";
import type { ServiceSlug } from "@/content/services";
import Icon from "./Icon";

// Pricing section shown on each service detail page (replaces "Under the hood").
// Every CTA routes to the free consultation, keeping a single conversion path.
export default function Pricing({
  locale,
  slug,
}: {
  locale: Locale;
  slug: ServiceSlug;
}) {
  const pricing = getPricing(locale, slug);
  const contactHref = `/${locale}/contact`;

  return (
    <section className="sec sec-warm" id="pricing" style={{ scrollMarginTop: "84px" }}>
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-kicker">
            <Icon name="card" />
            {pricing.title}
          </span>
          <h2 className="sec-title">{pricing.title}</h2>
          <p className="sec-lead">{pricing.lead}</p>
        </div>

        {pricing.groups.map((group) => (
          <div key={group.title} className="price-group">
            <div className="price-group-h">
              <h3>{group.title}</h3>
              {group.note ? <span>{group.note}</span> : null}
            </div>
            <div className="price-grid">
              {group.tiers.map((tier) => (
                <div key={tier.name} className={tier.featured ? "price feat" : "price"}>
                  {tier.featured && tier.badge ? (
                    <span className="price-badge">{tier.badge}</span>
                  ) : null}
                  <h4>{tier.name}</h4>
                  {tier.fromPrefix ? <span className="from">{tier.fromPrefix}</span> : null}
                  <div className="amt">
                    {tier.amount}
                    {tier.unit ? <small>{tier.unit}</small> : null}
                  </div>
                  <div className="unit">{tier.meta}</div>
                  <ul>
                    {tier.features.map((f) => (
                      <li key={f}>
                        <Icon name="check" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={contactHref}
                    className={tier.ctaPrimary ? "btn btn-primary" : "btn btn-ghost"}
                  >
                    {tier.cta}
                  </Link>
                </div>
              ))}
            </div>
            {group.foot ? <p className="price-foot">{group.foot}</p> : null}
          </div>
        ))}

        <p className="price-foot price-disclaimer">
          {pricing.disclaimer}{" "}
          <Link href={contactHref}>{pricing.cta}</Link>
        </p>
      </div>
    </section>
  );
}
