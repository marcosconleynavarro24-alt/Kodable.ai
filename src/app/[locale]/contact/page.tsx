import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { contactInfo } from "@/content/contact-info";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import BookingWidget from "@/components/BookingWidget";
import { getBooking } from "@/content/booking";
import { breadcrumbList, jsonLdDoc, jsonLdHtml } from "@/lib/jsonld";
import { hreflangs } from "@/lib/hreflang";
import { pageOg } from "@/lib/og";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta: Record<Locale, { title: string; description: string }> = {
    en: {
      title: "Book a free 15-minute consultation",
      description:
        "Pick a day and time and book a free 15-minute online consultation. Prefer to write? Send us a message and we reply within 24 hours.",
    },
    es: {
      title: "Reserva una consulta gratis de 15 minutos",
      description:
        "Elige día y hora y reserva una consulta online gratis de 15 minutos. ¿Prefieres escribir? Envíanos un mensaje y respondemos en menos de 24 horas.",
    },
    fr: {
      title: "Réservez une consultation gratuite de 15 minutes",
      description:
        "Choisissez un jour et une heure et réservez une consultation en ligne gratuite de 15 minutes. Vous préférez écrire ? Envoyez-nous un message, nous répondons sous 24 heures.",
    },
    de: {
      title: "Buch ein kostenloses 15-Minuten-Gespräch",
      description:
        "Wähl Tag und Uhrzeit und buch ein kostenloses 15-Minuten-Gespräch online. Lieber schreiben? Schick uns eine Nachricht, wir antworten innerhalb von 24 Stunden.",
    },
    it: {
      title: "Prenota una consulenza gratuita di 15 minuti",
      description:
        "Scegli giorno e ora e prenota una consulenza online gratuita di 15 minuti. Preferisci scrivere? Mandaci un messaggio, rispondiamo entro 24 ore.",
    },
  };
  const key: Locale = isLocale(locale) ? locale : "en";
  return {
    title: meta[key].title,
    description: meta[key].description,
    alternates: { canonical: `/${locale}/contact`, languages: hreflangs("/contact") },
    ...pageOg({
      locale: key,
      path: `/${key}/contact`,
      title: meta[key].title,
      description: meta[key].description,
    }),
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
  const booking = getBooking(locale);

  const copy = {
    en: {
      home: "Home",
      crumb: "Contact",
      title: "Book your free consultation.",
      sub: "Pick a day and a time below. 15 minutes online, no tech words needed, no commitment.",
      ways: "Or reach us directly",
      writeTitle: "Prefer to write?",
      writeSub: "Tell us about your business in plain language and we reply within 24 hours.",
      labels: {
        whatsapp: "WhatsApp",
        call: "Call us",
        email: "Email",
      },
    },
    es: {
      home: "Inicio",
      crumb: "Contacto",
      title: "Reserva tu consulta gratis.",
      sub: "Elige día y hora abajo. 15 minutos online, sin tecnicismos y sin compromiso.",
      ways: "O contáctanos directamente",
      writeTitle: "¿Prefieres escribir?",
      writeSub: "Cuéntanos sobre tu negocio en lenguaje normal y te respondemos en menos de 24 horas.",
      labels: {
        whatsapp: "WhatsApp",
        call: "Llámanos",
        email: "Email",
      },
    },
    fr: { home: "Accueil", crumb: "Contact", title: "Réservez votre consultation gratuite.", sub: "Choisissez un jour et une heure ci-dessous. 15 minutes en ligne, sans jargon, sans engagement.", ways: "Ou joignez-nous directement", writeTitle: "Vous préférez écrire ?", writeSub: "Parlez-nous de votre activité en langage simple et nous vous répondons sous 24 heures.", labels: { whatsapp: "WhatsApp", call: "Appelez-nous", email: "Email" } },
    de: { home: "Start", crumb: "Kontakt", title: "Buch dein kostenloses Gespräch.", sub: "Wähl unten Tag und Uhrzeit. 15 Minuten online, keine Fachwörter, unverbindlich.", ways: "Oder erreich uns direkt", writeTitle: "Lieber schreiben?", writeSub: "Erzähl uns in einfacher Sprache von deinem Unternehmen und wir antworten innerhalb von 24 Stunden.", labels: { whatsapp: "WhatsApp", call: "Ruf uns an", email: "Email" } },
    it: { home: "Home", crumb: "Contatti", title: "Prenota la tua consulenza gratuita.", sub: "Scegli giorno e ora qui sotto. 15 minuti online, senza termini tecnici e senza impegno.", ways: "Oppure contattaci direttamente", writeTitle: "Preferisci scrivere?", writeSub: "Raccontaci della tua attività in parole semplici e ti rispondiamo entro 24 ore.", labels: { whatsapp: "WhatsApp", call: "Chiamaci", email: "Email" } },
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

      {/* BOOKING WIDGET + CONTACT CARD (booking is the primary path; every
          "free consultation" CTA on the site lands here) */}
      <section className="sec" id="book">
        <div className="wrap contact-wrap">
          <BookingWidget locale={locale} copy={booking} />

          <div>
            <p className="contact-ways">{copy.ways}</p>
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

      {/* SECONDARY: written enquiry */}
      <section className="sec sec-warm" id="write">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">{copy.writeTitle}</h2>
            <p className="sec-lead">{copy.writeSub}</p>
          </div>
          <div className="contact-form-wrap">
            <ContactForm locale={locale} />
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
