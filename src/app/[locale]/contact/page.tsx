import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { contactInfo } from "@/content/contact-info";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import { breadcrumbList, jsonLdDoc, jsonLdHtml } from "@/lib/jsonld";
import { hreflangs } from "@/lib/hreflang";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta: Record<Locale, { title: string; description: string }> = {
    en: {
      title: "Let's talk, message us in plain language",
      description:
        "Tell us what your business needs in plain language, no jargon. We reply within 24 hours. Free quote.",
    },
    es: {
      title: "Hablemos, escríbenos en lenguaje normal",
      description:
        "Cuéntanos qué necesita tu negocio en lenguaje normal, sin tecnicismos. Respondemos en menos de 24 horas. Presupuesto gratis.",
    },
    fr: {
      title: "Discutons-en, écrivez-nous en langage simple",
      description:
        "Dites-nous ce dont votre activité a besoin en langage simple, sans jargon. Nous répondons sous 24 heures. Devis gratuit.",
    },
    de: {
      title: "Lass uns reden, schreib uns in einfacher Sprache",
      description:
        "Erzähl uns in einfacher Sprache, was dein Unternehmen braucht, ohne Fachjargon. Wir antworten innerhalb von 24 Stunden. Kostenloses Angebot.",
    },
    it: {
      title: "Parliamone, scrivici in parole semplici",
      description:
        "Raccontaci di cosa ha bisogno la tua attività in parole semplici, senza gergo. Rispondiamo entro 24 ore. Preventivo gratuito.",
    },
  };
  const key: Locale = isLocale(locale) ? locale : "en";
  return {
    title: meta[key].title,
    description: meta[key].description,
    alternates: { canonical: `/${locale}/contact`, languages: hreflangs("/contact") },
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
    fr: { home: "Accueil", crumb: "Contact", title: "Discutons-en.", sub: "Parlez-nous de votre activité en langage simple, aucun terme technique nécessaire. Écrivez-nous ci-dessous et nous vous répondons sous 24 heures.", ways: "Ou joignez-nous directement", labels: { whatsapp: "WhatsApp", call: "Appelez-nous", email: "Email" } },
    de: { home: "Start", crumb: "Kontakt", title: "Lass uns reden.", sub: "Erzähl uns in einfacher Sprache von deinem Unternehmen, keine Fachwörter nötig. Schreib uns unten ein paar Zeilen und wir antworten innerhalb von 24 Stunden.", ways: "Oder erreich uns direkt", labels: { whatsapp: "WhatsApp", call: "Ruf uns an", email: "Email" } },
    it: { home: "Home", crumb: "Contatti", title: "Parliamone.", sub: "Raccontaci della tua attività in parole semplici, senza termini tecnici. Scrivici qui sotto e ti rispondiamo entro 24 ore.", ways: "Oppure contattaci direttamente", labels: { whatsapp: "WhatsApp", call: "Chiamaci", email: "Email" } },
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
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }}
      />
    </>
  );
}
