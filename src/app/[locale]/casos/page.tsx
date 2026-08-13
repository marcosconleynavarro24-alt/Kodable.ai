import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import Icon from "@/components/Icon";
import FinalCta from "@/components/FinalCta";
import { breadcrumbList, jsonLdDoc, jsonLdHtml } from "@/lib/jsonld";
import { hreflangs } from "@/lib/hreflang";
import { getClientStats } from "@/lib/clientStats";
import StatBand from "@/components/StatBand";
import { getStatBand } from "@/content/statBand";

// Honest portfolio, two layers:
// 1. REAL RESULTS BAND — SaaS-style flat aggregate stats (owner directive
//    2026-08-12: no per-client case framing, no name/screenshot/link; big
//    numbers only). Figures come from the analytics of client sites we manage
//    via getClientStats() (Supabase overlay when configured, baked snapshot
//    otherwise) and must stay verbatim-checkable against the dashboard.
// 2. DEMO sites we built ourselves as outreach samples, not client work. The
//    screenshots are cropped to the menu section so no real business name,
//    rating or neighbourhood shows (we never publish a name without consent).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const key: Locale = isLocale(locale) ? locale : defaultLocale;
  const meta: Record<Locale, { title: string; description: string }> = {
    en: {
      title: "Client cases & work samples",
      description:
        "Real traffic figures from the client websites we build and manage — visitors, pageviews, visit time — plus demo websites built in 48 hours for hospitality and local businesses.",
    },
    es: {
      title: "Casos y muestras de trabajo",
      description:
        "Cifras reales de tráfico de las webs de clientes que construimos y gestionamos — visitantes, páginas vistas, tiempo de visita — más webs de demostración construidas en 48 horas.",
    },
    fr: {
      title: "Cas clients et exemples de travail",
      description:
        "De vrais chiffres de trafic des sites clients que nous construisons et gérons — visiteurs, pages vues, durée de visite — plus des sites de démonstration construits en 48 heures.",
    },
    de: {
      title: "Kundenprojekte & Arbeitsbeispiele",
      description:
        "Echte Besucherzahlen der Kunden-Websites, die wir bauen und betreiben — Besucher, Seitenaufrufe, Besuchsdauer — plus Demo-Websites, in 48 Stunden gebaut.",
    },
    it: {
      title: "Casi e esempi di lavoro",
      description:
        "Numeri di traffico reali dei siti dei clienti che costruiamo e gestiamo — visitatori, pagine viste, durata della visita — più siti dimostrativi costruiti in 48 ore.",
    },
  };
  return {
    title: meta[key].title,
    description: meta[key].description,
    alternates: { canonical: `/${locale}/casos`, languages: hreflangs("/casos") },
  };
}

type Sample = {
  img: string;
  alt: string;
  bucket: string;
  sector: string;
  tagline: string;
  includes: string[];
  note: string;
};

type Copy = {
  crumbHome: string;
  crumbHere: string;
  h1: string;
  sub: string;
  honestKicker: string;
  honestTitle: string;
  honestLead: string;
  samples: Sample[];
  ctaTitle: string;
  ctaBody: string;
  ctaBtn: string;
};

// Copy is maintained natively in all five locales (en/es/fr/de/it).
const copy: Record<Locale, Copy> = {
  en: {
    crumbHome: "Home",
    crumbHere: "Cases & samples",
    h1: "Client cases & work samples",
    sub: "We build complete websites for hospitality and local businesses: menu, bookings, several languages and technical SEO groundwork, in 48 hours. Below: real traffic figures from client sites we manage, plus demo sites we built as honest examples of our work.",
    honestKicker: "Being upfront",
    honestTitle: "And below: demos, clearly labelled as demos.",
    honestLead:
      "The three sites below are demo websites we built in 48 hours for real hospitality and local businesses: samples of our work, not client projects. You won't see business names anywhere on this page because we never publish anyone's name without permission. The figures above come from the analytics of real client websites we manage.",
    samples: [
      {
        img: "/casos/demo-mediterraneo.png",
        alt: "Menu section of a demo website for a Mediterranean restaurant, built by our studio",
        bucket: "Sample demo · 48 h",
        sector: "Mediterranean restaurant",
        tagline:
          "Mediterranean cooking and rice dishes: a bright, calm design with the menu front and centre.",
        includes: [
          "Digital menu with sample prices",
          "Online bookings from any phone",
          "Language switcher for international guests",
          "Technical SEO groundwork and fast loading",
        ],
        note: "Demo site: this is not a client project.",
      },
      {
        img: "/casos/demo-taberna.png",
        alt: "Menu section of a demo website for a traditional tavern, built by our studio",
        bucket: "Sample demo · 48 h",
        sector: "Traditional tavern",
        tagline:
          "A neighbourhood tavern: a dark, warm design that respects the character of the place.",
        includes: [
          "Tapas and bar menu with sample prices",
          "Integrated online bookings",
          "Multilingual version built in",
          "Technical SEO groundwork and fast loading",
        ],
        note: "Demo site: this is not a client project.",
      },
      {
        img: "/casos/demo-marinera.png",
        alt: "Menu section of a demo website for a seafood tavern, built by our studio",
        bucket: "Sample demo · 48 h",
        sector: "Seafood tavern",
        tagline:
          "Seafood cooking: classic typography and ink tones for a place with history.",
        includes: [
          "Digital menu organised by sections",
          "Online bookings from any device",
          "Language switcher included",
          "Technical SEO groundwork and fast loading",
        ],
        note: "Demo site: this is not a client project.",
      },
    ],
    ctaTitle: "Want to see a demo built for YOUR business?",
    ctaBody:
      "Ask for it free. Tell us about your business and we'll show you what its website could look like, before you decide anything.",
    ctaBtn: "Request your free demo",
  },
  es: {
    crumbHome: "Inicio",
    crumbHere: "Casos y muestras",
    h1: "Casos y muestras de trabajo",
    sub: "Construimos webs completas para hostelería y comercio local: carta, reservas, varios idiomas y SEO técnico de base, en 48 horas. Abajo: cifras reales de tráfico de webs de clientes que gestionamos, y webs de demostración como muestra honesta de nuestro trabajo.",
    honestKicker: "Con transparencia",
    honestTitle: "Y debajo: demos, señaladas claramente como demos.",
    honestLead:
      "Las tres webs de abajo son demos que construimos en 48 horas para negocios reales de hostelería y comercio local: muestras de nuestro trabajo, no proyectos de clientes. No verás nombres de negocios en esta página porque nunca publicamos el nombre de nadie sin su permiso. Las cifras de arriba salen de la analítica de webs reales de clientes que gestionamos.",
    samples: [
      {
        img: "/casos/demo-mediterraneo.png",
        alt: "Sección de la carta en una web de demostración para un restaurante mediterráneo, hecha por nuestro estudio",
        bucket: "Demo de muestra · 48 h",
        sector: "Restaurante mediterráneo",
        tagline:
          "Cocina mediterránea y arroces: un diseño luminoso y sereno con la carta como protagonista.",
        includes: [
          "Carta digital con precios de muestra",
          "Reservas online desde el móvil",
          "Selector de idioma para clientela internacional",
          "SEO técnico de base y carga rápida",
        ],
        note: "Web de demostración: no es un proyecto de cliente.",
      },
      {
        img: "/casos/demo-taberna.png",
        alt: "Sección de la carta en una web de demostración para una taberna tradicional, hecha por nuestro estudio",
        bucket: "Demo de muestra · 48 h",
        sector: "Taberna tradicional",
        tagline:
          "Una taberna de barrio de toda la vida: diseño oscuro y cálido que respeta el carácter del local.",
        includes: [
          "Carta de tapas y barra con precios de muestra",
          "Reservas online integradas",
          "Versión multilingüe incorporada",
          "SEO técnico de base y carga rápida",
        ],
        note: "Web de demostración: no es un proyecto de cliente.",
      },
      {
        img: "/casos/demo-marinera.png",
        alt: "Sección de la carta en una web de demostración para una taberna marinera, hecha por nuestro estudio",
        bucket: "Demo de muestra · 48 h",
        sector: "Taberna marinera",
        tagline:
          "Cocina de mar: tipografía clásica y tonos tinta para un local con historia.",
        includes: [
          "Carta digital organizada por secciones",
          "Reservas online desde cualquier dispositivo",
          "Selector de idioma incluido",
          "SEO técnico de base y carga rápida",
        ],
        note: "Web de demostración: no es un proyecto de cliente.",
      },
    ],
    ctaTitle: "¿Quieres ver una demo hecha para TU negocio?",
    ctaBody:
      "Pídela gratis. Nos cuentas qué negocio tienes y te enseñamos cómo podría quedar su web, antes de decidir nada.",
    ctaBtn: "Pide tu demo gratis",
  },
  fr: {
    crumbHome: "Accueil",
    crumbHere: "Cas et exemples",
    h1: "Cas clients et exemples de travail",
    sub: "Nous construisons des sites web complets pour la restauration et les commerces de proximité : carte, réservations, plusieurs langues et bases de SEO technique, en 48 heures. Ci-dessous : de vrais chiffres de trafic des sites clients que nous gérons, et des sites de démonstration comme exemples honnêtes de notre travail.",
    honestKicker: "En toute transparence",
    honestTitle: "Et en dessous : des démos, clairement signalées comme telles.",
    honestLead:
      "Les trois sites ci-dessous sont des démos construites en 48 heures pour de vrais restaurants et commerces de proximité : des exemples de notre travail, pas des projets clients. Vous ne verrez aucun nom d'établissement sur cette page car nous ne publions jamais le nom de personne sans autorisation. Les chiffres ci-dessus proviennent des statistiques de vrais sites clients que nous gérons.",
    samples: [
      {
        img: "/casos/demo-mediterraneo.png",
        alt: "Section de la carte d'un site de démonstration pour un restaurant méditerranéen, réalisé par notre studio",
        bucket: "Démo d'exemple · 48 h",
        sector: "Restaurant méditerranéen",
        tagline:
          "Cuisine méditerranéenne et plats de riz : un design lumineux et paisible avec la carte au premier plan.",
        includes: [
          "Carte numérique avec des prix d'exemple",
          "Réservations en ligne depuis n'importe quel téléphone",
          "Sélecteur de langue pour la clientèle internationale",
          "Bases de SEO technique et chargement rapide",
        ],
        note: "Site de démonstration : ce n'est pas un projet de client.",
      },
      {
        img: "/casos/demo-taberna.png",
        alt: "Section de la carte d'un site de démonstration pour une taverne traditionnelle, réalisé par notre studio",
        bucket: "Démo d'exemple · 48 h",
        sector: "Taverne traditionnelle",
        tagline:
          "Une taverne de quartier : un design sombre et chaleureux qui respecte le caractère du lieu.",
        includes: [
          "Carte de tapas et de bar avec des prix d'exemple",
          "Réservations en ligne intégrées",
          "Version multilingue intégrée",
          "Bases de SEO technique et chargement rapide",
        ],
        note: "Site de démonstration : ce n'est pas un projet de client.",
      },
      {
        img: "/casos/demo-marinera.png",
        alt: "Section de la carte d'un site de démonstration pour une taverne de poissons et fruits de mer, réalisé par notre studio",
        bucket: "Démo d'exemple · 48 h",
        sector: "Taverne de fruits de mer",
        tagline:
          "Cuisine de la mer : une typographie classique et des tons encre pour un lieu chargé d'histoire.",
        includes: [
          "Carte numérique organisée par sections",
          "Réservations en ligne depuis n'importe quel appareil",
          "Sélecteur de langue inclus",
          "Bases de SEO technique et chargement rapide",
        ],
        note: "Site de démonstration : ce n'est pas un projet de client.",
      },
    ],
    ctaTitle: "Vous voulez voir une démo réalisée pour VOTRE commerce ?",
    ctaBody:
      "Demandez-la gratuitement. Parlez-nous de votre commerce et nous vous montrerons à quoi pourrait ressembler son site web, avant que vous ne décidiez quoi que ce soit.",
    ctaBtn: "Demandez votre démo gratuite",
  },
  de: {
    crumbHome: "Startseite",
    crumbHere: "Projekte & Beispiele",
    h1: "Kundenprojekte & Arbeitsbeispiele",
    sub: "Wir bauen komplette Websites für Gastronomie und lokale Geschäfte: Speisekarte, Reservierungen, mehrere Sprachen und eine technische SEO-Grundlage, in 48 Stunden. Unten: echte Besucherzahlen der Kunden-Websites, die wir betreiben, plus Demo-Websites als ehrliche Beispiele unserer Arbeit.",
    honestKicker: "Ehrlich gesagt",
    honestTitle: "Und darunter: Demos, klar als Demos gekennzeichnet.",
    honestLead:
      "Die drei Websites unten sind Demos, die wir in 48 Stunden für echte Gastronomie- und lokale Geschäfte gebaut haben: Beispiele unserer Arbeit, keine Kundenprojekte. Auf dieser Seite siehst du nirgendwo Geschäftsnamen, weil wir niemals den Namen von jemandem ohne Erlaubnis veröffentlichen. Die Zahlen oben stammen aus der Analyse echter Kunden-Websites, die wir betreiben.",
    samples: [
      {
        img: "/casos/demo-mediterraneo.png",
        alt: "Speisekarten-Bereich einer Demo-Website für ein mediterranes Restaurant, gebaut von unserem Studio",
        bucket: "Beispiel-Demo · 48 h",
        sector: "Mediterranes Restaurant",
        tagline:
          "Mediterrane Küche und Reisgerichte: ein helles, ruhiges Design mit der Speisekarte im Mittelpunkt.",
        includes: [
          "Digitale Speisekarte mit Beispielpreisen",
          "Online-Reservierungen von jedem Telefon aus",
          "Sprachumschalter für internationale Gäste",
          "Technische SEO-Grundlage und schnelle Ladezeiten",
        ],
        note: "Demo-Website: Dies ist kein Kundenprojekt.",
      },
      {
        img: "/casos/demo-taberna.png",
        alt: "Speisekarten-Bereich einer Demo-Website für eine traditionelle Taverne, gebaut von unserem Studio",
        bucket: "Beispiel-Demo · 48 h",
        sector: "Traditionelle Taverne",
        tagline:
          "Eine Taverne im Viertel: ein dunkles, warmes Design, das den Charakter des Lokals respektiert.",
        includes: [
          "Tapas- und Bar-Karte mit Beispielpreisen",
          "Integrierte Online-Reservierungen",
          "Mehrsprachige Version eingebaut",
          "Technische SEO-Grundlage und schnelle Ladezeiten",
        ],
        note: "Demo-Website: Dies ist kein Kundenprojekt.",
      },
      {
        img: "/casos/demo-marinera.png",
        alt: "Speisekarten-Bereich einer Demo-Website für eine Fisch- und Meeresfrüchte-Taverne, gebaut von unserem Studio",
        bucket: "Beispiel-Demo · 48 h",
        sector: "Fisch- und Meeresfrüchte-Taverne",
        tagline:
          "Küche vom Meer: klassische Typografie und Tintentöne für ein Lokal mit Geschichte.",
        includes: [
          "Digitale Speisekarte nach Bereichen gegliedert",
          "Online-Reservierungen von jedem Gerät aus",
          "Sprachumschalter inklusive",
          "Technische SEO-Grundlage und schnelle Ladezeiten",
        ],
        note: "Demo-Website: Dies ist kein Kundenprojekt.",
      },
    ],
    ctaTitle: "Möchtest du eine Demo sehen, die für DEIN Geschäft gebaut wurde?",
    ctaBody:
      "Fordere sie kostenlos an. Erzähl uns von deinem Geschäft und wir zeigen dir, wie seine Website aussehen könnte, bevor du dich für irgendetwas entscheidest.",
    ctaBtn: "Fordere deine kostenlose Demo an",
  },
  it: {
    crumbHome: "Home",
    crumbHere: "Casi ed esempi",
    h1: "Casi e esempi di lavoro",
    sub: "Costruiamo siti web completi per la ristorazione e le attività locali: menu, prenotazioni, più lingue e basi di SEO tecnica, in 48 ore. Qui sotto: numeri di traffico reali dei siti dei clienti che gestiamo, più siti dimostrativi come esempi onesti del nostro lavoro.",
    honestKicker: "In tutta trasparenza",
    honestTitle: "E qui sotto: demo, chiaramente indicate come demo.",
    honestLead:
      "I tre siti qui sotto sono demo costruite in 48 ore per veri ristoranti e attività locali: esempi del nostro lavoro, non progetti di clienti. In questa pagina non vedrai nomi di attività perché non pubblichiamo mai il nome di nessuno senza permesso. I numeri qui sopra arrivano dalle statistiche di veri siti di clienti che gestiamo.",
    samples: [
      {
        img: "/casos/demo-mediterraneo.png",
        alt: "Sezione del menu di un sito dimostrativo per un ristorante mediterraneo, realizzato dal nostro studio",
        bucket: "Demo di esempio · 48 h",
        sector: "Ristorante mediterraneo",
        tagline:
          "Cucina mediterranea e piatti di riso: un design luminoso e sereno con il menu in primo piano.",
        includes: [
          "Menu digitale con prezzi di esempio",
          "Prenotazioni online da qualsiasi telefono",
          "Selettore di lingua per la clientela internazionale",
          "Basi di SEO tecnica e caricamento veloce",
        ],
        note: "Sito dimostrativo: non è un progetto di un cliente.",
      },
      {
        img: "/casos/demo-taberna.png",
        alt: "Sezione del menu di un sito dimostrativo per una taverna tradizionale, realizzato dal nostro studio",
        bucket: "Demo di esempio · 48 h",
        sector: "Taverna tradizionale",
        tagline:
          "Una taverna di quartiere: un design scuro e caldo che rispetta il carattere del locale.",
        includes: [
          "Menu di tapas e bar con prezzi di esempio",
          "Prenotazioni online integrate",
          "Versione multilingue incorporata",
          "Basi di SEO tecnica e caricamento veloce",
        ],
        note: "Sito dimostrativo: non è un progetto di un cliente.",
      },
      {
        img: "/casos/demo-marinera.png",
        alt: "Sezione del menu di un sito dimostrativo per una taverna di pesce, realizzato dal nostro studio",
        bucket: "Demo di esempio · 48 h",
        sector: "Taverna di pesce",
        tagline:
          "Cucina di mare: tipografia classica e toni inchiostro per un locale con una storia.",
        includes: [
          "Menu digitale organizzato per sezioni",
          "Prenotazioni online da qualsiasi dispositivo",
          "Selettore di lingua incluso",
          "Basi di SEO tecnica e caricamento veloce",
        ],
        note: "Sito dimostrativo: non è un progetto di un cliente.",
      },
    ],
    ctaTitle: "Vuoi vedere una demo realizzata per la TUA attività?",
    ctaBody:
      "Richiedila gratis. Raccontaci della tua attività e ti mostreremo come potrebbe essere il suo sito web, prima che tu decida qualcosa.",
    ctaBtn: "Richiedi la tua demo gratuita",
  },
};

export default async function CasosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const t = copy[locale];
  const site = getSite(locale);

  // Real client figures (Supabase overlay when configured, baked snapshot
  // otherwise — see src/lib/clientStats.ts). Formatting mirrors pricing.ts:
  // numbers via Intl so amounts never drift between languages.
  const band = getStatBand(locale, await getClientStats("valenciacamperpark"));

  const jsonLd = jsonLdDoc(
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

      {/* REAL RESULTS BAND — SaaS-style figures from client-site analytics,
          headerless, counting up from zero on first view (StatBand). */}
      <section className="sec sec-warm" id="resultados" style={{ scrollMarginTop: "84px" }}>
        <div className="wrap">
          <div className="sec-head center" style={{ maxWidth: "none" }}>
            <h2 className="sec-title">{band.title}</h2>
          </div>
          <StatBand items={band.items} numLocale={band.numLocale} />
          <p className="center" style={{ marginTop: "26px", fontSize: ".8rem", color: "var(--ink-mute)" }}>
            {band.source}
          </p>
        </div>
      </section>

      {/* SAMPLES */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-kicker">
              <Icon name="shield" />
              {t.honestKicker}
            </div>
            <h2 className="sec-title">{t.honestTitle}</h2>
            <p className="sec-lead">{t.honestLead}</p>
          </div>

          <div className="blog-grid">
            {t.samples.map((s) => (
              <article key={s.img} className="svc reveal">
                <Image
                  src={s.img}
                  alt={s.alt}
                  width={1200}
                  height={540}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "12px",
                    border: "1px solid var(--line)",
                    marginBottom: "18px",
                  }}
                />
                <div className="svc-top">
                  <span className="svc-ico" aria-hidden="true">
                    <Icon name="restaurant" />
                  </span>
                  <div>
                    <div className="svc-bucket">{s.bucket}</div>
                    <h3>{s.sector}</h3>
                  </div>
                </div>
                <p className="svc-tag">{s.tagline}</p>
                <ul>
                  {s.includes.map((item) => (
                    <li key={item}>
                      <Icon name="check" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p
                  style={{
                    marginTop: "auto",
                    fontSize: ".85rem",
                    color: "var(--ink-mute)",
                  }}
                >
                  {s.note}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-cta center" style={{ flexDirection: "column", alignItems: "center" }}>
            <p style={{ maxWidth: "48ch" }}>
              <strong>{t.ctaTitle}</strong> {t.ctaBody}
            </p>
            <Link href={`/${locale}/contact`} className="btn btn-primary">
              {t.ctaBtn}
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
