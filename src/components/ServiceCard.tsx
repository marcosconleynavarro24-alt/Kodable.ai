import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Service } from "@/content/services";
import Icon from "./Icon";

// One service card (used on the home grid and the services index). Links through
// to the service's detail page.
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
      <Link
        href={`/${locale}/services/${service.slug}`}
        className="btn btn-ghost btn-sm"
      >
        {service.cta}
      </Link>
    </article>
  );
}
