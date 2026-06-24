import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getServices, getService, serviceSlugs } from "@/content/services";
import Icon from "@/components/Icon";
import ServiceCard from "@/components/ServiceCard";
import FinalCta from "@/components/FinalCta";

// Pre-render every service detail page for both locales.
export async function generateStaticParams() {
  return locales.flatMap((l) => serviceSlugs.map((slug) => ({ locale: l, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const service = getService(locale, slug);
  if (!service) return {};
  const es = locale === "es";
  return {
    title: es
      ? `${service.title} para tu negocio — Kodable`
      : `${service.title} for your business — Kodable`,
    description: service.tagline,
    alternates: { canonical: `/${locale}/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const service = getService(locale, slug);
  if (!service) notFound();

  const site = getSite(locale);
  const others = getServices(locale).filter((s) => s.slug !== service.slug);
  const es = locale === "es";

  const copy = {
    en: {
      home: "Home",
      services: "Services",
      allServices: "All services",
      included: "What's included",
      whoFor: "Who it's for",
      underTheHood: "Under the hood",
      underNote: "The technical bits, for the curious — you don't need to know any of this.",
      others: "Other services",
      othersLead: "Pick what you need now, then add the rest when you're ready.",
    },
    es: {
      home: "Inicio",
      services: "Servicios",
      allServices: "Todos los servicios",
      included: "Qué incluye",
      whoFor: "Para quién es",
      underTheHood: "Por dentro",
      underNote: "La parte técnica, por curiosidad — no necesitas saber nada de esto.",
      others: "Otros servicios",
      othersLead: "Coge lo que necesitas ahora y añade el resto cuando quieras.",
    },
  }[locale];

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${locale}`}>{copy.home}</Link>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <Link href={`/${locale}/services`}>{copy.services}</Link>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <span>{service.title}</span>
          </nav>

          <div className="svc-top">
            <span className="svc-ico" aria-hidden="true">
              <Icon name={service.icon} />
            </span>
            <div className="svc-bucket">{service.bucket}</div>
          </div>

          <h1 className="page-h">{service.title}</h1>
          <p className="page-sub">{service.tagline}</p>

          <div className="hero-cta">
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {service.cta}
              <Icon name="arrow" />
            </Link>
            <Link href={`/${locale}/services`} className="btn btn-ghost">
              {copy.allServices}
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO + WHAT'S INCLUDED */}
      <section className="sec">
        <div className="wrap-narrow">
          <p className="sec-lead reveal">{service.intro}</p>

          <h2 className="sec-title" style={{ marginTop: "36px" }}>
            {copy.included}
          </h2>
          <div className="svc reveal" style={{ marginTop: "20px" }}>
            <ul>
              {service.included.map((item) => (
                <li key={item}>
                  <Icon name="check" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* WHO IT'S FOR */}
          <p className="reveal" style={{ marginTop: "28px" }}>
            <strong>{copy.whoFor}: </strong>
            {service.whoFor}
          </p>
        </div>
      </section>

      {/* UNDER THE HOOD */}
      <section className="sec-tight sec-warm">
        <div className="wrap-narrow">
          <div className="prose reveal">
            <h3>{copy.underTheHood}</h3>
            <p>{copy.underNote}</p>
            <ul>
              {service.underTheHood.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-kicker">
              <Icon name="list" />
              {copy.others}
            </span>
            <h2 className="sec-title">{copy.others}</h2>
            <p className="sec-lead">{copy.othersLead}</p>
          </div>
          <div className="svc-grid">
            {others.map((s) => (
              <ServiceCard key={s.slug} locale={locale} service={s} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta finalCta={site.finalCta} />
    </>
  );
}
