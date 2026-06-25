import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { contactInfo } from "@/content/contact-info";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
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
      ? "Hablemos, escríbenos en lenguaje normal"
      : "Let's talk, message us in plain language",
    description: es
      ? "Cuéntanos qué necesita tu negocio en lenguaje normal, sin tecnicismos. Respondemos en menos de 24 horas. Presupuesto gratis."
      : "Tell us what your business needs in plain language, no jargon. We reply within 24 hours. Free quote.",
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const copy = {
    en: {
      home: "Home",
      crumb: "Contact",
      title: "Let's talk.",
      sub: "Tell us about your business in plain language, no tech words needed. Drop us a line below and we'll reply within 24 hours.",
      ways: "Or reach us directly",
      labels: {
        whatsapp: "WhatsApp",
        call: "Call us",
        email: "Email",
      },
    },
    es: {
      home: "Inicio",
      crumb: "Contacto",
      title: "Hablemos.",
      sub: "Cuéntanos sobre tu negocio en lenguaje normal, sin tecnicismos. Escríbenos abajo y te respondemos en menos de 24 horas.",
      ways: "O contáctanos directamente",
      labels: {
        whatsapp: "WhatsApp",
        call: "Llámanos",
        email: "Email",
      },
    },
  }[locale];

  const jsonLd = jsonLdDoc(
    breadcrumbList([
      { name: copy.home, path: `/${locale}` },
      { name: copy.crumb },
    ]),
  );

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${locale}`}>{copy.home}</Link>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <span>{copy.crumb}</span>
          </nav>
          <h1 className="page-h">{copy.title}</h1>
          <p className="page-sub">{copy.sub}</p>
        </div>
      </section>

      {/* FORM + CONTACT CARD */}
      <section className="sec">
        <div className="wrap contact-wrap">
          <ContactForm locale={locale} />

          <div>
            <div className="contact-card light">
              <a
                className="row"
                href={contactInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp"
              >
                <span className="ci" aria-hidden="true">
                  <Icon name="chat" />
                </span>
                <span>
                  <span className="ct">{copy.labels.whatsapp}</span>
                  <br />
                  <span className="cv">{contactInfo.phoneDisplay}</span>
                </span>
              </a>
              <a className="row" href={`tel:${contactInfo.phoneHref}`} data-track="call">
                <span className="ci" aria-hidden="true">
                  <Icon name="phone" />
                </span>
                <span>
                  <span className="ct">{copy.labels.call}</span>
                  <br />
                  <span className="cv">{contactInfo.phoneDisplay}</span>
                </span>
              </a>
              <a className="row" href={`mailto:${contactInfo.email}`} data-track="email">
                <span className="ci" aria-hidden="true">
                  <Icon name="mail" />
                </span>
                <span>
                  <span className="ct">{copy.labels.email}</span>
                  <br />
                  <span className="cv">{contactInfo.email}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
