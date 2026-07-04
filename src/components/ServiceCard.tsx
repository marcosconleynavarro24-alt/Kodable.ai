import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Service } from "@/content/services";
import { checkPricesLabel } from "@/content/pricing";
import Icon from "./Icon";

// One service card (used on the home grid and the services index). Links through
// to the service's detail page, with a secondary prompt to jump straight to that
// service's pricing.
export default function ServiceCard({
  locale,
  service,
}: {
  locale: Locale;
  service: Service;
}) {
  return (
    <article className="svc reveal">
      <div className="svc-top">
        <span className="svc-ico" aria-hidden="true">
          <Icon name={service.icon} />
        </span>
        <div>
          <div className="svc-bucket">{service.bucket}</div>
          <h3>{service.title}</h3>
        </div>
      </div>
      <p className="svc-tag">{service.tagline}</p>
      <ul>
        {service.included.slice(0, 4).map((item) => (
          <li key={item}>
            <Icon name="check" />
            {item}
          </li>
        ))}
      </ul>
      <div className="svc-foot">
        <Link
          href={`/${locale}/services/${service.slug}`}
          className="btn btn-ghost btn-sm"
        >
          {service.cta}
        </Link>
        <Link
          href={`/${locale}/services/${service.slug}#pricing`}
          className="svc-price-link"
        >
          {checkPricesLabel[locale]}
          <Icon name="arrow" />
        </Link>
      </div>
    </article>
  );
}
