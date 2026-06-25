import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getFaq } from "@/content/faq";
import Icon from "@/components/Icon";
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
    title: es ? "Preguntas frecuentes" : "Frequently asked questions",
    description: es
      ? "Respuestas claras y sin tecnicismos sobre plazos, costes y qué pasa después de lanzar tu web."
      : "Plain, jargon-free answers about timing, costs and what happens after your website goes live.",
    alternates: { canonical: `/${locale}/faq` },
  };
}

const copy = {
  en: {
    crumbHome: "Home",
    crumbHere: "FAQ",
    h1: "Questions, answered plainly.",
    sub: "No jargon, no small print. Here's what business owners usually want to know before we start.",
    stillTitle: "Still have a question?",
    stillBody:
      "If yours isn't here, just ask. We'll give you a straight answer, usually the same day.",
    stillCta: "Talk to us",
  },
  es: {
    crumbHome: "Inicio",
    crumbHere: "Preguntas frecuentes",
    h1: "Preguntas, respondidas claro.",
    sub: "Sin tecnicismos ni letra pequeña. Esto es lo que los pequeños negocios suelen querer saber antes de empezar.",
    stillTitle: "¿Te queda alguna duda?",
    stillBody:
      "Si la tuya no está aquí, pregúntanos sin más. Te respondemos claro, normalmente el mismo día.",
    stillCta: "Hablemos",
  },
};

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const t = copy[locale];
  const site = getSite(locale);
  const faq = getFaq(locale);

  const jsonLd = jsonLdDoc(
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
    breadcrumbList([
      { name: t.crumbHome, path: `/${locale}` },
      { name: t.crumbHere },
    ]),
  );

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${locale}`}>{t.crumbHome}</Link>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <span aria-current="page">{t.crumbHere}</span>
          </nav>
          <h1 className="page-h">{t.h1}</h1>
          <p className="page-sub">{t.sub}</p>
        </div>
      </section>

      {/* FAQ LIST */}
      <section className="sec">
        <div className="wrap">
          <div className="faq-list">
            {faq.map((item) => (
              <details key={item.q} className="faq-item reveal">
                <summary>
                  {item.q}
                  <Icon name="chevron" className="chev" />
                </summary>
                <p className="faq-a">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-cta center">
            <p>
              <strong>{t.stillTitle}</strong> {t.stillBody}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {t.stillCta}
              <Icon name="arrow" />
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
