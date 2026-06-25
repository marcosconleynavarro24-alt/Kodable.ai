import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getServices } from "@/content/services";
import SectionHead from "@/components/SectionHead";
import ServiceCard from "@/components/ServiceCard";
import FinalCta from "@/components/FinalCta";
import { breadcrumbList, jsonLdDoc } from "@/lib/jsonld";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const es = locale === "es";
  return {
    title: es
      ? "Webs, agentes de IA, herramientas y automatización"
      : "Websites, AI Agents, Custom Tools & Automations",
    description: es
      ? "Cuatro formas de hacer crecer tu negocio con IA: webs, agentes de IA, herramientas a medida y automatizaciones. Coge lo que necesitas ahora y añade el resto cuando quieras."
      : "Four ways we grow your business with AI: websites, AI agents, custom tools and automations. Pick what you need now, add the rest when you're ready.",
    alternates: { canonical: `/${locale}/services` },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const site = getSite(locale);
  const services = getServices(locale);

  const copy = {
    en: {
      home: "Home",
      services: "Services",
      title: "Four ways we grow your business with AI.",
      sub: "A website that gets you found and chosen, an AI assistant that answers customers around the clock, custom tools built around how you work, and automations that handle the busywork. Pick what you need now, then add the rest when you're ready.",
      reassureKicker: "No nasty surprises",
      reassureTitle: "Every build comes with a hand on it after launch.",
      reassureLead:
        "Launch day is the start, not the finish. Everything we build ships with 30 days of free support, and a small monthly care plan keeps it online, safe and up to date so you never have to think about it. Want a change? You message us, and we're the ones who make it.",
      bookConsult: "Book a free consultation",
      talk: "Read the FAQ",
    },
    es: {
      home: "Inicio",
      services: "Servicios",
      title: "Cuatro formas de hacer crecer tu negocio con IA.",
      sub: "Una web que hace que te encuentren y te elijan, un asistente de IA que atiende a tus clientes a todas horas, herramientas hechas a la medida de cómo trabajas y automatizaciones que se ocupan del trabajo repetitivo. Coge lo que necesitas ahora y añade el resto cuando quieras.",
      reassureKicker: "Sin sorpresas desagradables",
      reassureTitle: "Cada proyecto sigue teniendo a alguien encima tras el lanzamiento.",
      reassureLead:
        "El día del lanzamiento es el principio, no el final. Todo lo que construimos incluye 30 días de soporte gratis, y un pequeño plan de cuidado mensual lo mantiene online, seguro y al día para que no tengas que pensar en ello. ¿Quieres un cambio? Nos escribes y lo hacemos nosotros.",
      bookConsult: "Reserva una consulta gratis",
      talk: "Leer las preguntas",
    },
  }[locale];

  const jsonLd = jsonLdDoc(
    breadcrumbList([
      { name: copy.home, path: `/${locale}` },
      { name: copy.services },
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
            <span>{copy.services}</span>
          </nav>
          <h1 className="page-h">{copy.title}</h1>
          <p className="page-sub">{copy.sub}</p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="sec">
        <div className="wrap">
          <div className="svc-grid">
            {services.map((service) => (
              <ServiceCard key={service.slug} locale={locale} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* REASSURANCE */}
      <section className="sec sec-warm">
        <div className="wrap">
          <SectionHead
            kicker={copy.reassureKicker}
            kickerIcon="shield"
            title={copy.reassureTitle}
            lead={copy.reassureLead}
          />
          <div className="mt-cta">
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {copy.bookConsult}
            </Link>
            <Link href={`/${locale}/faq`} className="btn btn-ghost">
              {copy.talk}
            </Link>
          </div>
        </div>
      </section>

      <FinalCta finalCta={site.finalCta} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
