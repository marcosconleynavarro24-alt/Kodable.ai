import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getFaq } from "@/content/faq";
import Icon from "@/components/Icon";
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
      title: "Frequently asked questions",
      description:
        "Plain, jargon-free answers about timing, costs and what happens after your website goes live.",
    },
    es: {
      title: "Preguntas frecuentes",
      description:
        "Respuestas claras y sin tecnicismos sobre plazos, costes y qué pasa después de lanzar tu web.",
    },
    fr: {
      title: "Questions fréquentes",
      description:
        "Des réponses claires et sans jargon sur les délais, les coûts et ce qui se passe une fois votre site web en ligne.",
    },
    de: {
      title: "Häufig gestellte Fragen",
      description:
        "Klare Antworten ohne Fachjargon zu Zeitplan, Kosten und was nach dem Launch deiner Website passiert.",
    },
    it: {
      title: "Domande frequenti",
      description:
        "Risposte chiare e senza tecnicismi su tempi, costi e cosa succede dopo che il tuo sito va online.",
    },
  };
  const key: Locale = isLocale(locale) ? locale : "en";
  return {
    title: meta[key].title,
    description: meta[key].description,
    alternates: { canonical: `/${locale}/faq`, languages: hreflangs("/faq") },
  };
}

const copy: Record<Locale, {
  crumbHome: string;
  crumbHere: string;
  h1: string;
  sub: string;
  stillTitle: string;
  stillBody: string;
  stillCta: string;
}> = {
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
  fr: { crumbHome: "Accueil", crumbHere: "FAQ", h1: "Vos questions, des réponses claires.", sub: "Pas de jargon, pas de petites lignes. Voici ce que les commerçants veulent généralement savoir avant qu'on commence.", stillTitle: "Une question reste ?", stillBody: "Si la vôtre n'est pas ici, demandez-nous sans hésiter. Nous vous répondons clairement, généralement le jour même.", stillCta: "Parlez-nous" },
  de: { crumbHome: "Start", crumbHere: "Fragen", h1: "Fragen, klar beantwortet.", sub: "Kein Fachjargon, kein Kleingedrucktes. Das wollen Unternehmer meist wissen, bevor wir loslegen.", stillTitle: "Hast du noch eine Frage?", stillBody: "Wenn deine nicht dabei ist, frag einfach. Wir geben dir eine klare Antwort, meist noch am selben Tag.", stillCta: "Sprich mit uns" },
  it: { crumbHome: "Home", crumbHere: "Domande frequenti", h1: "Domande, con risposte chiare.", sub: "Niente gergo, niente clausole nascoste. Ecco cosa i titolari di solito vogliono sapere prima di iniziare.", stillTitle: "Hai ancora una domanda?", stillBody: "Se la tua non è qui, chiedila senza problemi. Ti diamo una risposta diretta, di solito in giornata.", stillCta: "Parla con noi" },
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
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }}
      />
    </>
  );
}
