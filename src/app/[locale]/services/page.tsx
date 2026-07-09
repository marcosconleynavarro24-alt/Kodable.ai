import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getServices } from "@/content/services";
import SectionHead from "@/components/SectionHead";
import ServiceCard from "@/components/ServiceCard";
import FinalCta from "@/components/FinalCta";
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
      title: "Websites, AI Agents, Custom Tools & Automations",
      description:
        "Ways we grow your business with AI: websites, AI agents, custom tools and automations. Pick what you need now, add the rest when you're ready.",
    },
    es: {
      title: "Webs, agentes de IA, herramientas y automatización",
      description:
        "Formas de hacer crecer tu negocio con IA: webs, agentes de IA, herramientas a medida y automatizaciones. Coge lo que necesitas y añade el resto después.",
    },
    fr: {
      title: "Sites web, agents IA, outils sur mesure et automatisations",
      description:
        "Façons de faire grandir votre activité avec l'IA : sites web, agents IA, outils sur mesure et automatisations. À composer selon vos besoins.",
    },
    de: {
      title: "Websites, KI-Agenten, Tools & Automatisierung",
      description:
        "Wege, dein Unternehmen mit KI wachsen zu lassen: Websites, KI-Agenten, Tools nach Maß und Automatisierungen. Nimm, was du jetzt brauchst.",
    },
    it: {
      title: "Siti web, agenti IA, strumenti e automazioni",
      description:
        "Modi per far crescere la tua attività con l'IA: siti web, agenti IA, strumenti su misura e automazioni. Scegli ciò che ti serve, il resto quando vuoi.",
    },
  };
  const key: Locale = isLocale(locale) ? locale : "en";
  return {
    title: meta[key].title,
    description: meta[key].description,
    alternates: { canonical: `/${locale}/services`, languages: hreflangs("/services") },
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
      title: "Ways we grow your business with AI.",
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
      title: "Formas de hacer crecer tu negocio con IA.",
      sub: "Una web que hace que te encuentren y te elijan, un asistente de IA que atiende a tus clientes a todas horas, herramientas hechas a la medida de cómo trabajas y automatizaciones que se ocupan del trabajo repetitivo. Coge lo que necesitas ahora y añade el resto cuando quieras.",
      reassureKicker: "Sin sorpresas desagradables",
      reassureTitle: "Cada proyecto sigue teniendo a alguien encima tras el lanzamiento.",
      reassureLead:
        "El día del lanzamiento es el principio, no el final. Todo lo que construimos incluye 30 días de soporte gratis, y un pequeño plan de cuidado mensual lo mantiene online, seguro y al día para que no tengas que pensar en ello. ¿Quieres un cambio? Nos escribes y lo hacemos nosotros.",
      bookConsult: "Reserva una consulta gratis",
      talk: "Leer las preguntas",
    },
    fr: { home: "Accueil", services: "Services", title: "Façons de faire grandir votre activité avec l'IA.", sub: "Un site web qui vous fait trouver et choisir, un assistant IA qui répond aux clients à toute heure, des outils conçus autour de votre façon de travailler, et des automatisations qui gèrent les tâches ingrates. Prenez ce dont vous avez besoin maintenant, puis ajoutez le reste quand vous serez prêt.", reassureKicker: "Pas de mauvaises surprises", reassureTitle: "Chaque création reste suivie après le lancement.", reassureLead: "Le jour du lancement est le début, pas la fin. Tout ce que nous construisons est livré avec 30 jours d'accompagnement gratuit, et un petit plan d'entretien mensuel le garde en ligne, sûr et à jour pour que vous n'ayez jamais à y penser. Vous voulez un changement ? Vous nous écrivez, et c'est nous qui le faisons.", bookConsult: "Réservez une consultation gratuite", talk: "Lire la FAQ" },
    de: { home: "Start", services: "Leistungen", title: "Wege, wie wir dein Unternehmen mit KI wachsen lassen.", sub: "Eine Website, die dich gefunden und gewählt werden lässt, ein KI-Assistent, der deinen Kunden rund um die Uhr antwortet, maßgeschneiderte Tools rund um deine Arbeitsweise und Automatisierungen, die die Fleißarbeit übernehmen. Nimm, was du jetzt brauchst, und füge den Rest hinzu, wenn du so weit bist.", reassureKicker: "Keine bösen Überraschungen", reassureTitle: "Bei jedem Projekt bleibt nach dem Launch jemand dran.", reassureLead: "Der Launch-Tag ist der Anfang, nicht das Ende. Alles, was wir bauen, kommt mit 30 Tagen kostenlosem Support, und ein kleiner monatlicher Care-Plan hält es online, sicher und aktuell, sodass du nie daran denken musst. Du willst eine Änderung? Du schreibst uns, und wir sind die, die sie machen.", bookConsult: "Kostenlose Beratung buchen", talk: "Fragen lesen" },
    it: { home: "Home", services: "Servizi", title: "Modi per far crescere la tua attività con l'IA.", sub: "Un sito che ti fa trovare e scegliere, un assistente IA che risponde ai clienti a ogni ora, strumenti costruiti su come lavori e automazioni che gestiscono il lavoro ripetitivo. Scegli ciò che ti serve ora e aggiungi il resto quando vuoi.", reassureKicker: "Nessuna brutta sorpresa", reassureTitle: "Ogni progetto resta seguito anche dopo il lancio.", reassureLead: "Il giorno del lancio è l'inizio, non la fine. Tutto ciò che costruiamo include 30 giorni di supporto gratuito, e un piccolo piano di assistenza mensile lo tiene online, sicuro e aggiornato così non devi pensarci. Vuoi una modifica? Ci scrivi e la facciamo noi.", bookConsult: "Prenota una consulenza gratuita", talk: "Leggi le domande" },
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
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }}
      />
    </>
  );
}
