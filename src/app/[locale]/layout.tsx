import type { Metadata } from "next";
import { Hanken_Grotesk, Spline_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isLocale, localeOg, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { contactInfo } from "@/content/contact-info";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ConversionTracker from "@/components/ConversionTracker";
import { Analytics } from "@vercel/analytics/next";
import { jsonLdHtml } from "@/lib/jsonld";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

const spline = Spline_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-spline",
  display: "swap",
});

const SITE_URL = "https://kodable.ai";

const META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "AI websites, agents & automations for small businesses | Kodable.ai",
    description:
      "Losing bookings to competitors with faster sites and instant replies? Kodable builds AI-powered websites, agents and automations for local businesses, so you get found, get booked, and never miss an enquiry again. Free 15-minute consultation.",
  },
  es: {
    title: "Webs, agentes de IA y automatizaciones para pequeños negocios | Kodable.ai",
    description:
      "Webs, agentes de IA y automatizaciones que hacen crecer pequeños negocios: webs rápidas, atención 24/7, herramientas a medida. Consulta gratis y sin compromiso.",
  },
  fr: {
    title: "Sites web, agents IA et automatisations pour petits commerces | Kodable.ai",
    description:
      "Des sites web, agents IA et automatisations qui font grandir les petits commerces : sites rapides, accueil client 24h/24, outils sur mesure. Consultation gratuite, de vraies personnes après le lancement.",
  },
  de: {
    title: "KI-Websites, Agenten & Automatisierungen für kleine Unternehmen | Kodable.ai",
    description:
      "KI-Websites, Agenten & Automatisierungen, die kleine Unternehmen wachsen lassen: schnelle Websites, Kundenchat rund um die Uhr, maßgeschneiderte Tools. Kostenlose Beratung, echte Menschen nach dem Launch.",
  },
  it: {
    title: "Siti web, agenti IA e automazioni per piccole attività | Kodable.ai",
    description:
      "Siti web, agenti IA e automazioni che fanno crescere le piccole attività: siti veloci, assistenza 24/7, strumenti su misura. Consulenza gratuita e persone vere dopo il lancio.",
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
  const key: Locale = isLocale(locale) ? locale : "en";
  const meta = META[key];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title, template: "%s | Kodable.ai" },
    description: meta.description,
    applicationName: "Kodable.ai",
    alternates: {
      canonical: `/${key}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}`])),
        // Matches the sitemap: the homepage cluster's x-default is the bare
        // locale-redirecting root, not /en. Conflicting x-defaults between
        // sitemap and <head> weaken the hreflang cluster.
        "x-default": "/",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${key}`,
      siteName: "Kodable.ai",
      type: "website",
      locale: localeOg[key],
      alternateLocale: locales.filter((l) => l !== key).map((l) => localeOg[l]),
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/twitter-image"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const site = getSite(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Kodable.ai",
        url: SITE_URL,
        email: contactInfo.email,
        telephone: contactInfo.phoneHref,
        description: site.brand.tagline,
        knowsLanguage: [...locales],
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: contactInfo.phoneHref,
            email: contactInfo.email,
            availableLanguage: [...locales],
            url: contactInfo.whatsappUrl,
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Kodable.ai",
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "Kodable.ai",
        description: site.brand.tagline,
        url: SITE_URL,
        email: contactInfo.email,
        telephone: contactInfo.phoneHref,
        knowsLanguage: [...locales],
        areaServed: { "@type": "Country", name: "Spain" },
        serviceType: ["Website Development", "AI Agents", "Custom Software", "Automation & Integrations"],
        provider: { "@id": `${SITE_URL}/#organization` },
        priceRange: "€€",
      },
    ],
  };

  return (
    <html lang={locale} className={`${hanken.variable} ${spline.variable}`}>
      <body>
        <a className="skip" href="#main">
          {{
            en: "Skip to content",
            es: "Saltar al contenido",
            fr: "Aller au contenu",
            de: "Zum Inhalt springen",
            it: "Vai al contenuto",
          }[locale]}
        </a>
        <Nav
          locale={locale}
          links={site.nav.links}
          ctaLabel={site.nav.cta}
          langAria={site.nav.langAria}
        />
        <Reveal />
        <ConversionTracker locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} site={site} />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }}
        />
      </body>
    </html>
  );
}
