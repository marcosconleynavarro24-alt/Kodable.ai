import Link from "next/link";
import type { PriceGroup } from "@/content/pricing";
import Icon from "./Icon";

// Pure presentational renderer for pricing groups — shared by the server-side
// Pricing section (service pages), the client-side PricingTabs (/pricing) and
// the post-checkout care upsell (/contratar/gracias).
export default function PriceGroupList({
  groups,
  contactHref,
}: {
  groups: PriceGroup[];
  contactHref: string;
}) {
  return (
    <>
      {groups.map((group) => (
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
                {tier.altPay ? (
                  <div className="unit" style={{ fontWeight: 600, color: "var(--accent-deep)" }}>
                    {tier.altPay}
                  </div>
                ) : null}
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
    </>
  );
}
