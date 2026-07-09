import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { getPricing } from "@/content/pricing";
import PricingTabs from "@/components/PricingTabs";
import FinalCta from "@/components/FinalCta";
import Icon from "@/components/Icon";
import { breadcrumbList, jsonLdDoc, jsonLdHtml } from "@/lib/jsonld";
import { hreflangs } from "@/lib/hreflang";

// Combined pricing page: switch between websites and AI-agents price tables
// only (owner directive 2026-07-10: no custom-tools / automations here — those
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
  }
> = {
  en: {
    home: "Home",
    kicker: "Simple, honest pricing",
    title: "Pricing",
    sub: "Everything VAT included, no small print. Pick websites or AI agents to see the plans — pay once or monthly.",
    tabWebs: "Websites",
    tabAgents: "AI agents",
  },
  es: {
    home: "Inicio",
    kicker: "Precios claros y sin sorpresas",
    title: "Precios",
    sub: "Todo con IVA incluido y sin letra pequeña. Elige entre webs o agentes IA para ver los planes — pago único o mensual.",
    tabWebs: "Webs",
    tabAgents: "Agentes IA",
  },
  fr: {
    home: "Accueil",
    kicker: "Des tarifs clairs, sans surprises",
    title: "Tarifs",
    sub: "Tout TVA incluse, sans petites lignes. Choisissez sites web ou agents IA pour voir les offres — paiement unique ou mensuel.",
    tabWebs: "Sites web",
    tabAgents: "Agents IA",
  },
  de: {
    home: "Start",
    kicker: "Klare Preise, keine Überraschungen",
    title: "Preise",
    sub: "Alles inkl. MwSt., kein Kleingedrucktes. Wähle Websites oder KI-Agenten, um die Pläne zu sehen — einmalig oder monatlich.",
    tabWebs: "Websites",
    tabAgents: "KI-Agenten",
  },
  it: {
    home: "Home",
    kicker: "Prezzi chiari, senza sorprese",
    title: "Prezzi",
    sub: "Tutto IVA inclusa, senza sorprese. Scegli tra siti web o agenti IA per vedere i piani — pagamento unico o mensile.",
    tabWebs: "Siti web",
    tabAgents: "Agenti IA",
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

  const jsonLd = jsonLdDoc(
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

      <section className="sec sec-warm" id="pricing" style={{ scrollMarginTop: "84px" }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-kicker">
              <Icon name="card" />
              {c.kicker}
            </span>
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
