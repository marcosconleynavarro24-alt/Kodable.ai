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

// Honest pre-revenue portfolio: the three cards below are DEMO sites we built
// ourselves as outreach samples, not client work. The screenshots are cropped
// to the menu section so no real business name, rating or neighbourhood shows
// (we never publish a business's name without consent). Keep it that way.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const key: Locale = isLocale(locale) ? locale : defaultLocale;
  const meta: Record<Locale, { title: string; description: string }> = {
    en: {
      title: "Work samples",
      description:
        "Demo websites we built in 48 hours for real hospitality and local businesses: menu, bookings and multiple languages. No client names, just honest samples of what we do.",
    },
    es: {
      title: "Muestras de trabajo",
      description:
        "Webs de demostración que construimos en 48 horas para negocios reales de hostelería y comercio local: carta, reservas y varios idiomas. Sin nombres de clientes, solo muestras honestas.",
    },
    fr: {
      title: "Exemples de travail",
      description:
        "Sites web de démonstration que nous construisons en 48 heures pour de vrais restaurants et commerces de proximité : carte, réservations et plusieurs langues. Sans noms de clients, juste des exemples honnêtes de ce que nous faisons.",
    },
    de: {
      title: "Arbeitsbeispiele",
      description:
        "Demo-Websites, die wir in 48 Stunden für echte Gastronomie- und lokale Geschäfte bauen: Speisekarte, Reservierungen und mehrere Sprachen. Ohne Kundennamen, nur ehrliche Beispiele unserer Arbeit.",
    },
    it: {
      title: "Esempi di lavoro",
      description:
        "Siti web dimostrativi che costruiamo in 48 ore per veri ristoranti e attività locali: menu, prenotazioni e più lingue. Senza nomi di clienti, solo esempi onesti di ciò che facciamo.",
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
    crumbHere: "Work samples",
    h1: "Work samples",
    sub: "We build complete websites for hospitality and local businesses: menu, bookings, several languages and technical SEO groundwork, in 48 hours. The samples below are demo sites we built for real businesses as examples of our work, not client projects.",
    honestKicker: "Being upfront",
    honestTitle: "Demos, not client cases. Here's why.",
    honestLead:
      "We're a new studio, so we don't yet have client projects we can publish. Instead of inventing logos or results, we show the next best thing: real demo websites we built in 48 hours for real hospitality and local businesses. We removed the business names because we never publish anyone's name without permission. When we have client work we can share, you'll see it here.",
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
    crumbHere: "Muestras de trabajo",
    h1: "Muestras de trabajo",
    sub: "Construimos webs completas para hostelería y comercio local: carta, reservas, varios idiomas y SEO técnico de base, en 48 horas. Las muestras de abajo son webs de demostración que construimos para negocios reales como ejemplo de nuestro trabajo, no proyectos de clientes.",
    honestKicker: "Con transparencia",
    honestTitle: "Demos, no casos de clientes. Te explicamos por qué.",
    honestLead:
      "Somos un estudio nuevo, así que todavía no tenemos proyectos de clientes que podamos publicar. En vez de inventar logos o resultados, enseñamos lo siguiente mejor: webs de demostración que construimos en 48 horas para negocios reales de hostelería y comercio local. Retiramos los nombres porque nunca publicamos el nombre de nadie sin su permiso. Cuando tengamos trabajo de clientes que podamos compartir, lo verás aquí.",
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
    crumbHere: "Exemples de travail",
    h1: "Exemples de travail",
    sub: "Nous construisons des sites web complets pour la restauration et les commerces de proximité : carte, réservations, plusieurs langues et bases de SEO technique, en 48 heures. Les exemples ci-dessous sont des sites de démonstration que nous avons construits pour de vrais commerces comme exemples de notre travail, et non des projets de clients.",
    honestKicker: "En toute transparence",
    honestTitle: "Des démos, pas des cas clients. Voici pourquoi.",
    honestLead:
      "Nous sommes un studio récent, nous n'avons donc pas encore de projets clients que nous pouvons publier. Plutôt que d'inventer des logos ou des résultats, nous montrons la meilleure alternative : de vrais sites de démonstration que nous avons construits en 48 heures pour de vrais restaurants et commerces de proximité. Nous avons retiré les noms des établissements car nous ne publions jamais le nom de personne sans autorisation. Lorsque nous aurons des travaux de clients à partager, vous les verrez ici.",
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
    crumbHere: "Arbeitsbeispiele",
    h1: "Arbeitsbeispiele",
    sub: "Wir bauen komplette Websites für Gastronomie und lokale Geschäfte: Speisekarte, Reservierungen, mehrere Sprachen und eine technische SEO-Grundlage, in 48 Stunden. Die Beispiele unten sind Demo-Websites, die wir für echte Geschäfte als Beispiele unserer Arbeit gebaut haben, keine Kundenprojekte.",
    honestKicker: "Ehrlich gesagt",
    honestTitle: "Demos, keine Kundenfälle. Hier ist der Grund.",
    honestLead:
      "Wir sind ein junges Studio, deshalb haben wir noch keine Kundenprojekte, die wir veröffentlichen können. Statt Logos oder Ergebnisse zu erfinden, zeigen wir das Nächstbeste: echte Demo-Websites, die wir in 48 Stunden für echte Gastronomie- und lokale Geschäfte gebaut haben. Wir haben die Namen der Geschäfte entfernt, weil wir niemals den Namen von jemandem ohne Erlaubnis veröffentlichen. Sobald wir Kundenarbeit haben, die wir teilen können, siehst du sie hier.",
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
    crumbHere: "Esempi di lavoro",
    h1: "Esempi di lavoro",
    sub: "Costruiamo siti web completi per la ristorazione e le attività locali: menu, prenotazioni, più lingue e basi di SEO tecnica, in 48 ore. Gli esempi qui sotto sono siti dimostrativi che abbiamo costruito per attività reali come esempi del nostro lavoro, non progetti di clienti.",
    honestKicker: "In tutta trasparenza",
    honestTitle: "Demo, non casi di clienti. Ecco perché.",
    honestLead:
      "Siamo uno studio nuovo, quindi non abbiamo ancora progetti di clienti che possiamo pubblicare. Invece di inventare loghi o risultati, mostriamo la cosa migliore che possiamo: veri siti dimostrativi che abbiamo costruito in 48 ore per veri ristoranti e attività locali. Abbiamo rimosso i nomi delle attività perché non pubblichiamo mai il nome di nessuno senza permesso. Quando avremo lavori di clienti da condividere, li vedrai qui.",
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
