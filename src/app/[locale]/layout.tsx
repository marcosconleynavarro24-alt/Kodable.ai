import type { Metadata } from "next";
import { Hanken_Grotesk, Spline_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import { contactInfo } from "@/content/contact-info";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ConversionTracker from "@/components/ConversionTracker";

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
      "We use AI to scale small businesses: fast websites, AI agents that answer customers 24/7, custom tools and automations. A free no-pressure consultation, and real people who answer after launch.",
  },
  es: {
    title: "Webs, agentes de IA y automatizaciones para pequeños negocios | Kodable.ai",
    description:
      "Usamos IA para hacer crecer pequeños negocios: webs rápidas, agentes de IA que atienden 24/7, herramientas a medida y automatizaciones. Una consulta gratis y sin compromiso, y personas reales que responden tras el lanzamiento.",
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
      languages: { en: "/en", es: "/es", "x-default": "/en" },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${key}`,
      siteName: "Kodable.ai",
      type: "website",
      locale: key === "es" ? "es_ES" : "en_GB",
      alternateLocale: key === "es" ? ["en_GB"] : ["es_ES"],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
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
        description: site.brand.tagline,
          knowsLanguage: ["en", "es"],
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
          availableLanguage: ["es", "en"],
        serviceType: ["Website Development", "AI Agents", "Custom Software", "Automation & Integrations"],
        priceRange: "€€",
      },
    ],
  };

  return (
    <html lang={locale} className={`${hanken.variable} ${spline.variable}`}>
      <body>
        <a className="skip" href="#main">
          {locale === "es" ? "Saltar al contenido" : "Skip to content"}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
