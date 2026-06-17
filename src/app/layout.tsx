import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Web Design on the Costa Blanca — in English & Spanish | Kodable.ai",
    template: "%s | Kodable.ai",
  },
  description:
    "Kodable.ai builds high-performance, beautifully designed bilingual (ES/EN) websites for Costa Blanca small businesses. Fixed transparent pricing, WhatsApp & booking built in, and a studio that's still here after launch.",
  applicationName: "Kodable.ai",
  authors: [{ name: "Kodable.ai", url: "https://kodable.ai" }],
  creator: "Kodable.ai",
  publisher: "Kodable.ai",
  keywords: [
    "web design Costa Blanca",
    "diseño web Costa Blanca",
    "bilingual website Spain",
    "small business websites Alicante",
    "online booking website",
    "WhatsApp website",
    "SEO Costa Blanca",
    "web designer Alicante",
  ],
  category: "technology",
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    title: "Web Design on the Costa Blanca — in English & Spanish | Kodable.ai",
    description:
      "Bilingual websites that win you customers — for Spanish and expat businesses on the Costa Blanca. Fixed pricing, no surprises, real support after launch.",
    url: "https://kodable.ai",
    siteName: "Kodable.ai",
    type: "website",
    locale: "en_GB",
    alternateLocale: ["es_ES"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Design on the Costa Blanca — in English & Spanish | Kodable.ai",
    description:
      "Bilingual websites that win you customers — for Spanish and expat businesses on the Costa Blanca.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  metadataBase: new URL("https://kodable.ai"),
  alternates: {
    canonical: "https://kodable.ai",
  },
};

// A cross-referenced @graph: the Organization and WebSite identify the brand,
// the ProfessionalService describes the offering. Keep every field truthful —
// no invented ratings, review counts, address detail or phone numbers.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://kodable.ai/#organization",
      name: "Kodable.ai",
      url: "https://kodable.ai",
      email: "help@kodable.ai",
      logo: "https://kodable.ai/opengraph-image",
      image: "https://kodable.ai/opengraph-image",
      description:
        "Bilingual (ES/EN) web design and development studio for Costa Blanca small businesses.",
      areaServed: "Costa Blanca",
      knowsLanguage: ["en", "es"],
    },
    {
      "@type": "WebSite",
      "@id": "https://kodable.ai/#website",
      url: "https://kodable.ai",
      name: "Kodable.ai",
      inLanguage: "en",
      publisher: { "@id": "https://kodable.ai/#organization" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://kodable.ai/#service",
      name: "Kodable.ai",
      description:
        "Web design and development for local small businesses. We build high-conversion, bilingual websites with editorial aesthetics and production-grade engineering.",
      url: "https://kodable.ai",
      email: "help@kodable.ai",
      image: "https://kodable.ai/opengraph-image",
      parentOrganization: { "@id": "https://kodable.ai/#organization" },
      address: {
        "@type": "PostalAddress",
        addressRegion: "Alicante",
        addressCountry: "ES",
      },
      areaServed: "Costa Blanca",
      availableLanguage: ["es", "en"],
      serviceType: [
        "Web Design",
        "Web Development",
        "SEO Optimization",
        "AI Agent Integration",
      ],
      priceRange: "€€",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
