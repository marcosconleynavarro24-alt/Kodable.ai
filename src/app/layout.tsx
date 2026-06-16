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
  title: "Web Design on the Costa Blanca — in English & Spanish | Kodable.ai",
  description:
    "Kodable.ai builds high-performance, beautifully designed bilingual (ES/EN) websites for Costa Blanca small businesses. Fixed transparent pricing, WhatsApp & booking built in, and a studio that's still here after launch.",
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
  metadataBase: new URL("https://kodable.ai"),
  alternates: {
    canonical: "https://kodable.ai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kodable.ai",
  description:
    "Web design and development agency for local small businesses. We build high-conversion websites with editorial aesthetics and production-grade engineering.",
  url: "https://kodable.ai",
  email: "help@kodable.ai",
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
