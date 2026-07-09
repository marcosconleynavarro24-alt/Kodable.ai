import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getPricing } from "@/content/pricing";
import type { ServiceSlug } from "@/content/services";
import Icon from "./Icon";
import PriceGroupList from "./PriceGroupList";

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

        <PriceGroupList groups={pricing.groups} contactHref={contactHref} />

        <p className="price-foot price-disclaimer">
          {pricing.disclaimer}{" "}
          <Link href={contactHref}>{pricing.cta}</Link>
        </p>
      </div>
    </section>
  );
}
