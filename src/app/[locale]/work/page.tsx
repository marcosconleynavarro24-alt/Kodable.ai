import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import Icon, { type IconName } from "@/components/Icon";
import SectionHead from "@/components/SectionHead";
import ChatMockup from "@/components/ChatMockup";
import BookingMockup from "@/components/BookingMockup";
import FinalCta from "@/components/FinalCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const es = locale === "es";
  return {
    title: es
      ? "¿Eres tú? Negocios con los que trabajamos"
      : "Is this you? The businesses we work with",
    description: es
      ? "Restaurantes, peluquerías, oficios y tiendas. Mira el tipo de negocios para los que construimos y lo que las webs y los asistentes de IA hacen de verdad por tus clientes."
      : "Restaurants, salons, trades and shops. See the kinds of businesses we build for, and what AI-powered sites and assistants actually do for your customers.",
    alternates: { canonical: `/${locale}/work` },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const site = getSite(locale);

  const copy = {
    en: {
      crumbHome: "Home",
      crumbHere: "Is this you?",
      h1: "Is this you?",
      sub: "We build for small business owners — restaurants, salons, trades and shops. If any of these sounds like your week, you're in the right place.",
      proofKicker: "See it in action",
      proofTitle: "This is what your customers actually do.",
      proofLead:
        "No jargon, no dashboards to learn. They open your site on their phone, message you or book a table — done. Here's exactly how that looks.",
      captionChatTitle: "Your AI assistant replies in one tap",
      captionChatBody:
        "A customer taps the chat button and your AI assistant answers in seconds — booking the table or answering the question, even when you're closed. No app, no login, no forms they give up on.",
      captionBookTitle: "They book without calling",
      captionBookBody:
        "Pick a day, pick a time, done. The booking comes to you while you're busy serving — even at 11pm when you're closed.",
      examplesTitle: "Real client examples are on the way",
      examplesBody:
        "We'd rather show you nothing than make something up. We're a young studio just getting started, so you won't find fake five-star reviews or stock-photo \"clients\" on this page. As we finish real local sites, we'll add them here with the owner's permission — names, photos and all.",
      examplesBody2:
        "In the meantime, the mockups above are the genuine product, and we're happy to walk you through one over a coffee or a quick call.",
      cta: "Talk to us",
      ctaServices: "See what we do",
    },
    es: {
      crumbHome: "Inicio",
      crumbHere: "¿Eres tú?",
      h1: "¿Eres tú?",
      sub: "Construimos para pequeños negocios: restaurantes, peluquerías, oficios y tiendas. Si alguna de estas situaciones te suena, estás en el sitio correcto.",
      proofKicker: "Míralo en acción",
      proofTitle: "Esto es lo que hacen de verdad tus clientes.",
      proofLead:
        "Sin tecnicismos, sin paneles que aprender. Abren tu web en el móvil, te escriben o reservan una mesa, y ya está. Así se ve exactamente.",
      captionChatTitle: "Tu asistente de IA responde al instante",
      captionChatBody:
        "El cliente pulsa el botón de chat y tu asistente de IA responde en segundos — reservando la mesa o resolviendo la duda, incluso cuando has cerrado. Sin app, sin registro, sin formularios que abandonan.",
      captionBookTitle: "Reservan sin llamar",
      captionBookBody:
        "Eligen día, eligen hora, listo. La reserva te llega mientras estás atendiendo, incluso a las 11 de la noche cuando ya has cerrado.",
      examplesTitle: "Pronto, ejemplos reales de clientes",
      examplesBody:
        "Preferimos no enseñarte nada antes que inventárnoslo. Somos un estudio joven que está empezando, así que no vas a encontrar reseñas de cinco estrellas falsas ni «clientes» de foto de archivo en esta página. A medida que terminemos webs locales de verdad, las añadiremos aquí con el permiso del dueño: nombres, fotos y todo.",
      examplesBody2:
        "Mientras tanto, los ejemplos de arriba son el producto real, y estaremos encantados de enseñártelo con calma tomando un café o en una llamada rápida.",
      cta: "Hablamos",
      ctaServices: "Ver lo que hacemos",
    },
  }[locale];

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${locale}`}>{copy.crumbHome}</Link>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <span>{copy.crumbHere}</span>
          </nav>
          <h1 className="page-h">{copy.h1}</h1>
          <p className="page-sub">{copy.sub}</p>
        </div>
      </section>

      {/* SCENARIOS */}
      <section className="sec">
        <div className="wrap">
          <SectionHead
            kicker={site.scenarios.kicker}
            kickerIcon="chat"
            title={site.scenarios.title}
            lead={site.scenarios.lead}
          />
          <div className="you-grid">
            {site.scenarios.items.map((s) => (
              <div key={s.title} className="you-card reveal">
                <span className="you-ico" aria-hidden="true">
                  <Icon name={s.icon as IconName} />
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF — PRODUCT MOCKUPS */}
      <section className="sec sec-warm">
        <div className="wrap">
          <SectionHead
            kicker={copy.proofKicker}
            kickerIcon="spark"
            title={copy.proofTitle}
            lead={copy.proofLead}
          />
          <div className="how-wrap">
            <div className="reveal">
              <ChatMockup chat={site.chat} />
              <div className="msg" style={{ marginTop: "18px" }}>
                <h3>{copy.captionChatTitle}</h3>
                <p>{copy.captionChatBody}</p>
              </div>
            </div>
            <div className="reveal">
              <BookingMockup locale={locale} booking={site.how.booking} />
              <div className="msg" style={{ marginTop: "18px" }}>
                <h3>{copy.captionBookTitle}</h3>
                <p>{copy.captionBookBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HONEST NOTE — NO FAKE TESTIMONIALS */}
      <section className="sec">
        <div className="wrap-narrow prose reveal">
          <h2>{copy.examplesTitle}</h2>
          <p>{copy.examplesBody}</p>
          <p>{copy.examplesBody2}</p>
          <div className="mt-cta">
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {copy.cta}
              <Icon name="arrow" />
            </Link>
            <Link href={`/${locale}/services`} className="btn btn-ghost">
              {copy.ctaServices}
            </Link>
          </div>
        </div>
      </section>

      <FinalCta finalCta={site.finalCta} />
    </>
  );
}
