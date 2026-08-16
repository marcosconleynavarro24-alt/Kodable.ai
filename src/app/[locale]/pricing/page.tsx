import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getPricing, getSchemaOffers, formatPrice } from "@/content/pricing";
import PricingTabs from "@/components/PricingTabs";
import FinalCta from "@/components/FinalCta";
import Icon from "@/components/Icon";
import { breadcrumbList, jsonLdDoc, jsonLdHtml, SITE_URL } from "@/lib/jsonld";
import { hreflangs } from "@/lib/hreflang";
import { pageOg } from "@/lib/og";

// Combined pricing page: switch between websites and AI-agents price tables
// only (owner directive 2026-07-10: no custom-tools / automations here, those
// stay quote-led on their service pages).

const COPY: Record<
  Locale,
  {
    home: string;
    kicker: string;
    title: string;
    sub: string;
    tabWebs: string;
    tabAgents: string;
    introTitle: string;
    intro: (webFrom: string, webTo: string, chatFrom: string) => string;
    introCompare: string;
    plansTitle: string;
  }
> = {
  en: {
    home: "Home",
    kicker: "Simple, honest pricing",
    title: "Pricing",
    sub: "Everything VAT included, no small print. Pick websites or AI agents to see the plans. Pay once or monthly.",
    tabWebs: "Websites",
    tabAgents: "AI agents",
    introTitle: "What does a website or an AI agent cost?",
    intro: (webFrom, webTo, chatFrom) =>
      `A new website is a one-off ${webFrom} to ${webTo}, VAT included, and you can split it into monthly payments. An AI agent that answers your customers runs from ${chatFrom} a month plus a one-time setup.`,
    introCompare: "Not sure you need a studio at all? See the honest builder-vs-agency comparison",
    plansTitle: "The plans",
  },
  es: {
    home: "Inicio",
    kicker: "Precios claros y sin sorpresas",
    title: "Precios",
    sub: "Todo con IVA incluido y sin letra pequeña. Elige entre webs o agentes IA para ver los planes. Pago único o mensual.",
    tabWebs: "Webs",
    tabAgents: "Agentes IA",
    introTitle: "¿Cuánto cuesta una web o un agente de IA?",
    intro: (webFrom, webTo, chatFrom) =>
      `Una web nueva es un pago único de ${webFrom} a ${webTo}, IVA incluido, y puedes dividirlo en cuotas mensuales. Un agente de IA que responde a tus clientes cuesta desde ${chatFrom} al mes más una configuración inicial única.`,
    introCompare: "¿No tienes claro si necesitas un estudio? Mira la comparativa honesta entre creador de webs y agencia",
    plansTitle: "Los planes",
  },
  fr: {
    home: "Accueil",
    kicker: "Des tarifs clairs, sans surprises",
    title: "Tarifs",
    sub: "Tout TVA incluse, sans petites lignes. Choisissez sites web ou agents IA pour voir les offres. Paiement unique ou mensuel.",
    tabWebs: "Sites web",
    tabAgents: "Agents IA",
    introTitle: "Combien coûte un site web ou un agent IA ?",
    intro: (webFrom, webTo, chatFrom) =>
      `Un nouveau site web est un paiement unique de ${webFrom} à ${webTo}, TVA incluse, que vous pouvez répartir en mensualités. Un agent IA qui répond à vos clients coûte à partir de ${chatFrom} par mois plus une mise en place unique.`,
    introCompare: "Pas sûr d'avoir besoin d'un studio ? Consultez le comparatif honnête entre créateur de site et agence",
    plansTitle: "Les offres",
  },
  de: {
    home: "Start",
    kicker: "Klare Preise, keine Überraschungen",
    title: "Preise",
    sub: "Alles inkl. MwSt., kein Kleingedrucktes. Wähle Websites oder KI-Agenten, um die Pläne zu sehen. Einmalig oder monatlich.",
    tabWebs: "Websites",
    tabAgents: "KI-Agenten",
    introTitle: "Was kostet eine Website oder ein KI-Agent?",
    intro: (webFrom, webTo, chatFrom) =>
      `Eine neue Website kostet einmalig ${webFrom} bis ${webTo} inkl. MwSt., auf Wunsch in monatlichen Raten. Ein KI-Agent, der deine Kunden beantwortet, kostet ab ${chatFrom} im Monat plus einmalige Einrichtung.`,
    introCompare: "Nicht sicher, ob du überhaupt ein Studio brauchst? Hier ist der ehrliche Vergleich Baukasten oder Agentur",
    plansTitle: "Die Pläne",
  },
  it: {
    home: "Home",
    kicker: "Prezzi chiari, senza sorprese",
    title: "Prezzi",
    sub: "Tutto IVA inclusa, senza sorprese. Scegli tra siti web o agenti IA per vedere i piani. Pagamento unico o mensile.",
    tabWebs: "Siti web",
    tabAgents: "Agenti IA",
    introTitle: "Quanto costa un sito web o un agente IA?",
    intro: (webFrom, webTo, chatFrom) =>
      `Un nuovo sito web è un pagamento unico da ${webFrom} a ${webTo}, IVA inclusa, divisibile in rate mensili. Un agente IA che risponde ai tuoi clienti costa da ${chatFrom} al mese più una configurazione iniziale una tantum.`,
    introCompare: "Non sai se ti serve davvero uno studio? Guarda il confronto onesto tra website builder e agenzia",
    plansTitle: "I piani",
  },
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = COPY[locale];
  return {
    title: c.title,
    description: c.sub,
    alternates: {
      canonical: `/${locale}/pricing`,
      languages: hreflangs("/pricing"),
    },
    ...pageOg({
      locale,
      path: `/${locale}/pricing`,
      title: c.title,
      description: c.sub,
    }),
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const c = COPY[locale];
  const site = getSite(locale);
  const contactHref = `/${locale}/contact`;

  const tabs = [
    { key: "websites", label: c.tabWebs, pricing: getPricing(locale, "websites") },
    { key: "ai-agents", label: c.tabAgents, pricing: getPricing(locale, "ai-agents") },
  ];

  // Machine-readable offers from the same numbers the cards render. The
  // intro sentence below quotes the first/last website tiers and the entry
  // chat plan through the same source, so copy cannot drift from the cards.
  const offerGroups = getSchemaOffers(locale);
  const introText = c.intro(
    formatPrice(locale, offerGroups[0].offers[0].price),
    formatPrice(locale, offerGroups[0].offers[2].price),
    formatPrice(locale, offerGroups[1].offers[0].price),
  );

  const jsonLd = jsonLdDoc(
    {
      "@type": "Service",
      "@id": `${SITE_URL}/${locale}/pricing#offers`,
      name: c.title,
      url: `${SITE_URL}/${locale}/pricing`,
      provider: { "@id": `${SITE_URL}/#organization` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: c.title,
        itemListElement: offerGroups.map((g) => ({
          "@type": "OfferCatalog",
          name: g.name,
          itemListElement: g.offers.map((o) => ({
            "@type": "Offer",
            name: o.name,
            price: o.price,
            priceCurrency: o.priceCurrency,
            priceSpecification: o.oneOff
              ? {
                  "@type": "PriceSpecification",
                  price: o.price,
                  priceCurrency: o.priceCurrency,
                  valueAddedTaxIncluded: true,
                }
              : o.setup
                ? {
                    "@type": "CompoundPriceSpecification",
                    priceComponent: [
                      {
                        "@type": "UnitPriceSpecification",
                        price: o.price,
                        priceCurrency: o.priceCurrency,
                        unitCode: "MON",
                        valueAddedTaxIncluded: true,
                      },
                      {
                        "@type": "UnitPriceSpecification",
                        name: o.setup.label,
                        price: o.setup.price,
                        priceCurrency: o.priceCurrency,
                        valueAddedTaxIncluded: true,
                      },
                    ],
                  }
                : {
                    "@type": "UnitPriceSpecification",
                    price: o.price,
                    priceCurrency: o.priceCurrency,
                    unitCode: "MON",
                    valueAddedTaxIncluded: true,
                  },
          })),
        })),
      },
    },
    breadcrumbList([
      { name: c.home, path: `/${locale}` },
      { name: c.title },
    ]),
  );

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={`/${locale}`}>{c.home}</Link>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <span>{c.title}</span>
          </nav>
          <h1 className="page-h">{c.title}</h1>
          <p className="page-sub">{c.sub}</p>
        </div>
      </section>

      {/* Direct answer first: the page had an h1 and no prose or h2 at all,
          nothing an answer engine could quote. */}
      <section className="sec">
        <div className="wrap-narrow">
          <h2 className="sec-title center">{c.introTitle}</h2>
          <p className="sec-lead reveal center" style={{ marginTop: "16px" }}>
            {introText}{" "}
            <Link href={`/${locale}/comparativa`}>{c.introCompare}</Link>.
          </p>
        </div>
      </section>

      <section className="sec sec-warm" id="pricing" style={{ scrollMarginTop: "84px" }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-kicker">
              <Icon name="card" />
              {c.kicker}
            </span>
            <h2 className="sec-title">{c.plansTitle}</h2>
          </div>
          <PricingTabs tabs={tabs} contactHref={contactHref} />
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
