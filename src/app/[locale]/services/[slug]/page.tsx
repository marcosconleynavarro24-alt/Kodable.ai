import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getServices, getService, serviceSlugs } from "@/content/services";
import Icon from "@/components/Icon";
import ServiceCard from "@/components/ServiceCard";
import Pricing from "@/components/Pricing";
import FinalCta from "@/components/FinalCta";
import { breadcrumbList, jsonLdDoc, jsonLdHtml, SITE_URL } from "@/lib/jsonld";
import { hreflangs } from "@/lib/hreflang";

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
  const suffix: Record<Locale, string> = {
    en: "for your business",
    es: "para tu negocio",
    fr: "pour votre activité",
    de: "für dein Unternehmen",
    it: "per la tua attività",
  };
  return {
    title: `${service.title} ${suffix[locale]}`,
    description: service.tagline,
    alternates: {
      canonical: `/${locale}/services/${service.slug}`,
      languages: hreflangs(`/services/${service.slug}`),
    },
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

  const copy = {
    en: {
      home: "Home",
      services: "Services",
      allServices: "All services",
      included: "What's included",
      whoFor: "Who it's for",
      underTheHood: "Under the hood",
      underNote: "The technical bits, for the curious. You don't need to know any of this.",
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
      underNote: "La parte técnica, por curiosidad. No necesitas saber nada de esto.",
      others: "Otros servicios",
      othersLead: "Coge lo que necesitas ahora y añade el resto cuando quieras.",
    },
    fr: { home: "Accueil", services: "Services", allServices: "Tous les services", included: "Ce qui est inclus", whoFor: "Pour qui c'est", underTheHood: "Sous le capot", underNote: "La partie technique, pour les curieux. Vous n'avez besoin de rien savoir de tout ça.", others: "Autres services", othersLead: "Prenez ce dont vous avez besoin maintenant, puis ajoutez le reste quand vous serez prêt." },
    de: { home: "Start", services: "Leistungen", allServices: "Alle Leistungen", included: "Was enthalten ist", whoFor: "Für wen es ist", underTheHood: "Unter der Haube", underNote: "Die technischen Details, für die Neugierigen. Du musst nichts davon wissen.", others: "Weitere Leistungen", othersLead: "Nimm, was du jetzt brauchst, und füge den Rest hinzu, wenn du so weit bist." },
    it: { home: "Home", services: "Servizi", allServices: "Tutti i servizi", included: "Cosa include", whoFor: "Per chi è", underTheHood: "Dietro le quinte", underNote: "La parte tecnica, per i curiosi. Non hai bisogno di sapere nulla di tutto questo.", others: "Altri servizi", othersLead: "Scegli ciò che ti serve ora e aggiungi il resto quando vuoi." },
  }[locale];

  // serviceType mirrors the array on the #service node in layout.tsx.
  const serviceTypeBySlug: Record<string, string> = {
    websites: "Website Development",
    "ai-agents": "AI Agents",
    "custom-tools": "Custom Software",
    automations: "Automation & Integrations",
  };

  const jsonLd = jsonLdDoc(
    {
      "@type": "Service",
      name: service.title,
      description: service.tagline,
      serviceType: serviceTypeBySlug[service.slug],
      url: `${SITE_URL}/${locale}/services/${service.slug}`,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Spain" },
      availableLanguage: [...locales],
    },
    breadcrumbList([
      { name: copy.home, path: `/${locale}` },
      { name: copy.services, path: `/${locale}/services` },
      { name: service.title },
    ]),
  );

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

      {/* PRICING (replaces "Under the hood") */}
      <Pricing locale={locale} slug={service.slug} />

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }}
      />
    </>
  );
}
