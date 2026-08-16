import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import Icon, { type IconName } from "@/components/Icon";
import FinalCta from "@/components/FinalCta";
import { breadcrumbList, jsonLdDoc, jsonLdHtml, SITE_URL } from "@/lib/jsonld";
import { hreflangs } from "@/lib/hreflang";
import { pageOg } from "@/lib/og";

// Portfolio, two layers:
// 1. CLIENT WORK, real websites built for real clients, shown by name with
//    a screenshot and a link to the live site (owner directive 2026-08-13;
//    supersedes the /casos-only anonymity rule FOR THIS PAGE, /casos keeps
//    its anonymous stat band). Only list a client here once the owner has
//    confirmed the client is OK being shown.
// 2. WHAT WE COULD BUILD, demo sites we built ourselves as outreach samples,
//    clearly labelled as demos, anonymous (same screenshots as /casos).

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const key: Locale = isLocale(locale) ? locale : defaultLocale;
  const meta: Record<Locale, { title: string; description: string }> = {
    en: {
      title: "Portfolio · websites we've built",
      description:
        "Real websites built for real clients, a camping & motorhome park in Valencia and a book site for a US author, plus demo sites that show what we could build for you.",
    },
    es: {
      title: "Portfolio · webs que hemos construido",
      description:
        "Webs reales para clientes reales, un camping de autocaravanas en Valencia y la web de un libro para un autor de EE. UU., más demos que muestran lo que podríamos construir para ti.",
    },
    fr: {
      title: "Portfolio · les sites que nous avons créés",
      description:
        "De vrais sites pour de vrais clients, une aire de camping-cars à Valence et le site d'un livre pour un auteur américain, plus des démos qui montrent ce que nous pourrions créer pour vous.",
    },
    de: {
      title: "Portfolio · Websites, die wir gebaut haben",
      description:
        "Echte Websites für echte Kunden, ein Wohnmobil-Campingplatz in Valencia und eine Buch-Website für einen US-Autor, plus Demos, die zeigen, was wir für dich bauen könnten.",
    },
    it: {
      title: "Portfolio · i siti che abbiamo costruito",
      description:
        "Siti reali per clienti reali, un'area camper a Valencia e il sito di un libro per un autore statunitense, più demo che mostrano cosa potremmo costruire per te.",
    },
  };
  return {
    title: meta[key].title,
    description: meta[key].description,
    alternates: { canonical: `/${locale}/portfolio`, languages: hreflangs("/portfolio") },
    ...pageOg({
      locale: key,
      path: `/${key}/portfolio`,
      title: meta[key].title,
      description: meta[key].description,
    }),
  };
}

type Project = {
  src: string;
  alt: string;
  bucket: string;
  name: string;
  tagline: string;
  includes: string[];
};

type DemoSample = {
  src: string;
  alt: string;
  bucket: string;
  sector: string;
  tagline: string;
  icon: IconName;
};

type Copy = {
  crumbHome: string;
  crumbHere: string;
  clientsKicker: string;
  clientsTitle: string;
  clientsLead: string;
  browseHint: string;
  projects: Project[];
  demosKicker: string;
  demosTitle: string;
  demosLead: string;
  demoNote: string;
  openDemo: string;
  samples: DemoSample[];
  ctaTitle: string;
  ctaBody: string;
  ctaBtn: string;
};

// Locale-independent project facts. Each card embeds a self-contained HTML
// snapshot of the client site (all assets inlined, scripts and links stripped
// at snapshot time) served from our own origin, visitors can scroll through
// the real design without us linking out to the live site.
const vcp = { src: "/portfolio/valenciacamperpark.html" };
const taim = { src: "/portfolio/investmentmiser.html" };

// Copy is maintained natively in all five locales (en/es/fr/de/it).
const copy: Record<Locale, Copy> = {
  en: {
    crumbHome: "Home",
    crumbHere: "Portfolio",
    clientsKicker: "Client work",
    clientsTitle: "Just 2 of many: built, shipped, and running for real businesses.",
    clientsLead:
      "These are live client websites we designed, built and manage. Click through and try them, they're not mockups.",
    browseHint: "Live snapshot, scroll inside the frame to browse the design.",
    projects: [
      {
        ...vcp,
        alt: "Homepage of Valencia Camper Park: hero photo of the motorhome park with live availability and booking buttons",
        bucket: "Client project · Tourism",
        name: "Valencia Camper Park",
        tagline:
          "A camping & motorhome park near Valencia. Full redesign focused on one thing: getting travellers from 'found you on Google' to 'booked a pitch' in as few taps as possible.",
        includes: [
          "Online bookings with live day-by-day availability",
          "Six languages for an international travelling audience",
          "Rates, services and reviews up front, no PDF menus",
          "One-tap WhatsApp contact from every page",
        ],
      },
      {
        ...taim,
        alt: "Homepage of The Art of Investment Misery: book cover, subtitle and purchase buttons on a clean editorial layout",
        bucket: "Client project · Publishing",
        name: "The Art of Investment Misery",
        tagline:
          "Launch site for a US author's investing book. A calm, editorial one-pager that puts the book, and the buy button, front and centre.",
        includes: [
          "Editorial design matched to the book's cover art",
          "Video trailer and praise section",
          "Direct purchase funnel to Amazon",
          "Fast, single-page, no clutter between reader and book",
        ],
      },
    ],
    demosKicker: "What we could build for you",
    demosTitle: "Demo sites, clearly labelled as demos.",
    demosLead:
      "We also build full demo websites in 48 hours, for trades, e-commerce and local businesses. They're samples of our work, not client projects, and each one is designed from scratch for its sector: no two look alike.",
    demoNote: "Demo site: not a client project.",
    openDemo: "Open the full demo",
    samples: [
      {
        src: "/portfolio/demo-papis.html",
        alt: "Homepage of a demo online store for a beef jerky brand, with a vintage badge logo and product lineup",
        bucket: "Sample demo · E-commerce",
        sector: "Beef jerky brand",
        tagline: "Vintage badge branding on a full online-store layout.",
        icon: "shop",
      },
      {
        src: "/portfolio/demo-construction.html",
        alt: "Homepage of a demo website for a general contractor, dark industrial design with a construction site photo",
        bucket: "Sample demo · Trades",
        sector: "General contractor",
        tagline: "Heavy industrial look with projects, process and a bid pipeline.",
        icon: "trades",
      },
      {
        src: "/portfolio/demo-roofing.html",
        alt: "Homepage of a demo website for a roofing company, light editorial design with roofers on a roof",
        bucket: "Sample demo · Trades",
        sector: "Roofing company",
        tagline: "Storm-response focus with a free-inspection booking form.",
        icon: "trades",
      },
      {
        src: "/portfolio/demo-landscaping.html",
        alt: "Homepage of a demo website for a landscaping company, organic design with a landscaped garden photo",
        bucket: "Sample demo · Trades",
        sector: "Landscaping company",
        tagline: "Warm organic design with seasonal care plans and quote flow.",
        icon: "trades",
      },
    ],
    ctaTitle: "Want yours to be the next one here?",
    ctaBody:
      "Tell us about your business and we'll show you what its website could look like, free, before you decide anything.",
    ctaBtn: "Request your free demo",
  },
  es: {
    crumbHome: "Inicio",
    crumbHere: "Portfolio",
    clientsKicker: "Trabajo para clientes",
    clientsTitle: "Solo 2 de muchas: construidas, entregadas y funcionando para negocios reales.",
    clientsLead:
      "Estas son webs de clientes que diseñamos, construimos y gestionamos, en producción. Entra y pruébalas, no son maquetas.",
    browseHint: "Captura interactiva, desliza dentro del marco para recorrer el diseño.",
    projects: [
      {
        ...vcp,
        alt: "Portada de Valencia Camper Park: foto aérea del área de autocaravanas con disponibilidad en vivo y botones de reserva",
        bucket: "Proyecto de cliente · Turismo",
        name: "Valencia Camper Park",
        tagline:
          "Un camping y área de autocaravanas cerca de Valencia. Rediseño completo centrado en una cosa: llevar al viajero de «te encontré en Google» a «parcela reservada» en los mínimos toques posibles.",
        includes: [
          "Reservas online con disponibilidad día a día en vivo",
          "Seis idiomas para un público viajero internacional",
          "Tarifas, servicios y reseñas a la vista, sin PDFs",
          "Contacto por WhatsApp a un toque desde cualquier página",
        ],
      },
      {
        ...taim,
        alt: "Portada de The Art of Investment Misery: portada del libro, subtítulo y botones de compra en un diseño editorial limpio",
        bucket: "Proyecto de cliente · Editorial",
        name: "The Art of Investment Misery",
        tagline:
          "Web de lanzamiento del libro de inversión de un autor de EE. UU. Una página editorial y serena que pone el libro, y el botón de compra, en el centro.",
        includes: [
          "Diseño editorial a juego con la portada del libro",
          "Tráiler en vídeo y sección de reseñas",
          "Embudo de compra directo a Amazon",
          "Rápida y de una sola página, nada entre el lector y el libro",
        ],
      },
    ],
    demosKicker: "Lo que podríamos construir para ti",
    demosTitle: "Demos, señaladas claramente como demos.",
    demosLead:
      "También construimos webs de demostración completas en 48 horas, para oficios, e-commerce y negocios locales. Son muestras de nuestro trabajo, no proyectos de clientes, y cada una está diseñada desde cero para su sector: no hay dos iguales.",
    demoNote: "Web de demostración: no es un proyecto de cliente.",
    openDemo: "Ver la demo completa",
    samples: [
      {
        src: "/portfolio/demo-papis.html",
        alt: "Portada de una tienda online de demostración para una marca de cecina, con logo vintage y catálogo de productos",
        bucket: "Demo de muestra · E-commerce",
        sector: "Marca de beef jerky",
        tagline: "Marca vintage tipo sello sobre una tienda online completa.",
        icon: "shop",
      },
      {
        src: "/portfolio/demo-construction.html",
        alt: "Portada de una web de demostración para una constructora, diseño industrial oscuro con foto de obra",
        bucket: "Demo de muestra · Oficios",
        sector: "Constructora",
        tagline: "Estética industrial con proyectos, proceso y petición de presupuesto.",
        icon: "trades",
      },
      {
        src: "/portfolio/demo-roofing.html",
        alt: "Portada de una web de demostración para una empresa de tejados, diseño editorial claro con operarios en un tejado",
        bucket: "Demo de muestra · Oficios",
        sector: "Empresa de tejados",
        tagline: "Enfoque en emergencias con reserva de inspección gratuita.",
        icon: "trades",
      },
      {
        src: "/portfolio/demo-landscaping.html",
        alt: "Portada de una web de demostración para una empresa de jardinería, diseño orgánico con foto de jardín",
        bucket: "Demo de muestra · Oficios",
        sector: "Empresa de jardinería",
        tagline: "Diseño orgánico y cálido con planes de mantenimiento por temporada.",
        icon: "trades",
      },
    ],
    ctaTitle: "¿Quieres que la próxima de esta página sea la tuya?",
    ctaBody:
      "Cuéntanos qué negocio tienes y te enseñamos cómo podría quedar su web, gratis, antes de decidir nada.",
    ctaBtn: "Pide tu demo gratis",
  },
  fr: {
    crumbHome: "Accueil",
    crumbHere: "Portfolio",
    clientsKicker: "Projets clients",
    clientsTitle: "Seulement 2 parmi tant d'autres: conçus, livrés et en service pour de vraies entreprises.",
    clientsLead:
      "Voici des sites clients que nous avons conçus, construits et que nous gérons, en production. Cliquez et essayez-les, ce ne sont pas des maquettes.",
    browseHint: "Aperçu interactif, faites défiler à l\u2019intérieur du cadre pour parcourir le design.",
    projects: [
      {
        ...vcp,
        alt: "Page d'accueil de Valencia Camper Park : photo aérienne de l'aire de camping-cars avec disponibilité en direct et boutons de réservation",
        bucket: "Projet client · Tourisme",
        name: "Valencia Camper Park",
        tagline:
          "Une aire de camping-cars près de Valence. Refonte complète centrée sur une chose : faire passer le voyageur de « trouvé sur Google » à « emplacement réservé » en un minimum de gestes.",
        includes: [
          "Réservations en ligne avec disponibilité jour par jour",
          "Six langues pour une clientèle internationale",
          "Tarifs, services et avis mis en avant, pas de PDF",
          "Contact WhatsApp en un geste depuis chaque page",
        ],
      },
      {
        ...taim,
        alt: "Page d'accueil de The Art of Investment Misery : couverture du livre, sous-titre et boutons d'achat sur une mise en page éditoriale épurée",
        bucket: "Projet client · Édition",
        name: "The Art of Investment Misery",
        tagline:
          "Site de lancement du livre d'investissement d'un auteur américain. Une page éditoriale et sobre qui met le livre, et le bouton d'achat, au centre.",
        includes: [
          "Design éditorial assorti à la couverture du livre",
          "Bande-annonce vidéo et section d'éloges",
          "Tunnel d'achat direct vers Amazon",
          "Rapide, une seule page, rien entre le lecteur et le livre",
        ],
      },
    ],
    demosKicker: "Ce que nous pourrions créer pour vous",
    demosTitle: "Des démos, clairement signalées comme telles.",
    demosLead:
      "Nous construisons aussi des sites de démonstration complets en 48 heures, pour les métiers du bâtiment, l'e-commerce et les commerces de proximité. Ce sont des exemples de notre travail, pas des projets clients, et chacun est conçu sur mesure pour son secteur : il n'y en a pas deux pareils.",
    demoNote: "Site de démonstration : pas un projet client.",
    openDemo: "Voir la démo complète",
    samples: [
      {
        src: "/portfolio/demo-papis.html",
        alt: "Page d'accueil d'une boutique en ligne de démonstration pour une marque de viande séchée, avec un logo vintage et un catalogue de produits",
        bucket: "Démo d'exemple · E-commerce",
        sector: "Marque de beef jerky",
        tagline: "Une identité vintage façon tampon sur une boutique en ligne complète.",
        icon: "shop",
      },
      {
        src: "/portfolio/demo-construction.html",
        alt: "Page d'accueil d'un site de démonstration pour une entreprise de construction, design industriel sombre avec photo de chantier",
        bucket: "Démo d'exemple · Métiers",
        sector: "Entreprise de construction",
        tagline: "Une esthétique industrielle avec projets, méthode et demande de devis.",
        icon: "trades",
      },
      {
        src: "/portfolio/demo-roofing.html",
        alt: "Page d'accueil d'un site de démonstration pour un couvreur, design éditorial clair avec des couvreurs sur un toit",
        bucket: "Démo d'exemple · Métiers",
        sector: "Entreprise de couverture",
        tagline: "Axé intervention tempête avec réservation d'inspection gratuite.",
        icon: "trades",
      },
      {
        src: "/portfolio/demo-landscaping.html",
        alt: "Page d'accueil d'un site de démonstration pour un paysagiste, design organique avec photo de jardin aménagé",
        bucket: "Démo d'exemple · Métiers",
        sector: "Entreprise de paysagisme",
        tagline: "Un design organique et chaleureux avec des formules d'entretien saisonnières.",
        icon: "trades",
      },
    ],
    ctaTitle: "Vous voulez que le prochain site de cette page soit le vôtre ?",
    ctaBody:
      "Parlez-nous de votre entreprise et nous vous montrerons à quoi pourrait ressembler son site, gratuitement, avant toute décision.",
    ctaBtn: "Demandez votre démo gratuite",
  },
  de: {
    crumbHome: "Startseite",
    crumbHere: "Portfolio",
    clientsKicker: "Kundenprojekte",
    clientsTitle: "Nur 2 von vielen: gebaut, geliefert und im Einsatz für echte Unternehmen.",
    clientsLead:
      "Das sind Kunden-Websites, die wir entworfen und gebaut haben und betreiben, in Produktion. Klick dich durch und probiere sie aus, das sind keine Mockups.",
    browseHint: "Interaktive Momentaufnahme, scrolle im Rahmen, um das Design zu erkunden.",
    projects: [
      {
        ...vcp,
        alt: "Startseite von Valencia Camper Park: Luftaufnahme des Wohnmobil-Stellplatzes mit Live-Verfügbarkeit und Buchungs-Buttons",
        bucket: "Kundenprojekt · Tourismus",
        name: "Valencia Camper Park",
        tagline:
          "Ein Camping- und Wohnmobil-Stellplatz bei Valencia. Komplettes Redesign mit einem Ziel: Reisende mit so wenigen Taps wie möglich von „bei Google gefunden“ zu „Stellplatz gebucht“ zu bringen.",
        includes: [
          "Online-Buchungen mit tagesgenauer Live-Verfügbarkeit",
          "Sechs Sprachen für ein internationales Reisepublikum",
          "Preise, Services und Bewertungen sofort sichtbar, keine PDFs",
          "WhatsApp-Kontakt mit einem Tap von jeder Seite",
        ],
      },
      {
        ...taim,
        alt: "Startseite von The Art of Investment Misery: Buchcover, Untertitel und Kauf-Buttons in einem klaren redaktionellen Layout",
        bucket: "Kundenprojekt · Verlagswesen",
        name: "The Art of Investment Misery",
        tagline:
          "Launch-Website für das Investment-Buch eines US-Autors. Ein ruhiger, redaktioneller Onepager, der das Buch, und den Kauf-Button, in den Mittelpunkt stellt.",
        includes: [
          "Redaktionelles Design passend zum Buchcover",
          "Video-Trailer und Pressestimmen",
          "Direkter Kauf-Funnel zu Amazon",
          "Schnell, eine Seite, nichts zwischen Leser und Buch",
        ],
      },
    ],
    demosKicker: "Was wir für dich bauen könnten",
    demosTitle: "Demos, klar als Demos gekennzeichnet.",
    demosLead:
      "Wir bauen außerdem komplette Demo-Websites in 48 Stunden, für Handwerksbetriebe, E-Commerce und lokale Geschäfte. Es sind Beispiele unserer Arbeit, keine Kundenprojekte, und jede ist von Grund auf für ihre Branche gestaltet: keine zwei sehen gleich aus.",
    demoNote: "Demo-Website: kein Kundenprojekt.",
    openDemo: "Komplette Demo öffnen",
    samples: [
      {
        src: "/portfolio/demo-papis.html",
        alt: "Startseite eines Demo-Onlineshops für eine Beef-Jerky-Marke, mit Vintage-Logo und Produktsortiment",
        bucket: "Beispiel-Demo · E-Commerce",
        sector: "Beef-Jerky-Marke",
        tagline: "Vintage-Markenauftritt auf einem vollständigen Onlineshop.",
        icon: "shop",
      },
      {
        src: "/portfolio/demo-construction.html",
        alt: "Startseite einer Demo-Website für ein Bauunternehmen, dunkles Industrie-Design mit Baustellenfoto",
        bucket: "Beispiel-Demo · Handwerk",
        sector: "Bauunternehmen",
        tagline: "Industrielle Optik mit Projekten, Ablauf und Angebotsanfrage.",
        icon: "trades",
      },
      {
        src: "/portfolio/demo-roofing.html",
        alt: "Startseite einer Demo-Website für eine Dachdeckerei, helles redaktionelles Design mit Dachdeckern auf einem Dach",
        bucket: "Beispiel-Demo · Handwerk",
        sector: "Dachdeckerei",
        tagline: "Fokus auf Sturmeinsätze mit Buchung einer kostenlosen Inspektion.",
        icon: "trades",
      },
      {
        src: "/portfolio/demo-landscaping.html",
        alt: "Startseite einer Demo-Website für einen Garten- und Landschaftsbaubetrieb, organisches Design mit Gartenfoto",
        bucket: "Beispiel-Demo · Handwerk",
        sector: "Garten- und Landschaftsbau",
        tagline: "Warmes, organisches Design mit saisonalen Pflegeplänen.",
        icon: "trades",
      },
    ],
    ctaTitle: "Soll deine Website die nächste auf dieser Seite sein?",
    ctaBody:
      "Erzähl uns von deinem Geschäft und wir zeigen dir, wie seine Website aussehen könnte, kostenlos, bevor du dich entscheidest.",
    ctaBtn: "Fordere deine kostenlose Demo an",
  },
  it: {
    crumbHome: "Home",
    crumbHere: "Portfolio",
    clientsKicker: "Lavori per clienti",
    clientsTitle: "Solo 2 di tanti: costruiti, consegnati e in funzione per attività reali.",
    clientsLead:
      "Questi sono siti di clienti che abbiamo progettato, costruito e che gestiamo, in produzione. Entra e provali, non sono mockup.",
    browseHint: "Anteprima interattiva, scorri dentro il riquadro per esplorare il design.",
    projects: [
      {
        ...vcp,
        alt: "Homepage di Valencia Camper Park: foto aerea dell'area camper con disponibilità in tempo reale e pulsanti di prenotazione",
        bucket: "Progetto cliente · Turismo",
        name: "Valencia Camper Park",
        tagline:
          "Un campeggio e area camper vicino a Valencia. Redesign completo con un solo obiettivo: portare il viaggiatore da «trovato su Google» a «piazzola prenotata» nel minor numero di tocchi possibile.",
        includes: [
          "Prenotazioni online con disponibilità giorno per giorno",
          "Sei lingue per un pubblico di viaggiatori internazionale",
          "Tariffe, servizi e recensioni in primo piano, niente PDF",
          "Contatto WhatsApp con un tocco da ogni pagina",
        ],
      },
      {
        ...taim,
        alt: "Homepage di The Art of Investment Misery: copertina del libro, sottotitolo e pulsanti di acquisto in un layout editoriale pulito",
        bucket: "Progetto cliente · Editoria",
        name: "The Art of Investment Misery",
        tagline:
          "Sito di lancio del libro sugli investimenti di un autore statunitense. Una pagina editoriale e sobria che mette il libro, e il pulsante di acquisto, al centro.",
        includes: [
          "Design editoriale in armonia con la copertina del libro",
          "Trailer video e sezione con gli elogi",
          "Funnel di acquisto diretto verso Amazon",
          "Veloce, una sola pagina, niente tra il lettore e il libro",
        ],
      },
    ],
    demosKicker: "Cosa potremmo costruire per te",
    demosTitle: "Demo, chiaramente indicate come demo.",
    demosLead:
      "Costruiamo anche siti dimostrativi completi in 48 ore, per artigiani, e-commerce e attività locali. Sono esempi del nostro lavoro, non progetti di clienti, e ognuno è progettato da zero per il suo settore: non ce ne sono due uguali.",
    demoNote: "Sito dimostrativo: non è un progetto di un cliente.",
    openDemo: "Apri la demo completa",
    samples: [
      {
        src: "/portfolio/demo-papis.html",
        alt: "Homepage di un negozio online dimostrativo per un marchio di carne essiccata, con logo vintage e catalogo prodotti",
        bucket: "Demo di esempio · E-commerce",
        sector: "Marchio di beef jerky",
        tagline: "Identità vintage a timbro su un negozio online completo.",
        icon: "shop",
      },
      {
        src: "/portfolio/demo-construction.html",
        alt: "Homepage di un sito dimostrativo per un'impresa edile, design industriale scuro con foto di cantiere",
        bucket: "Demo di esempio · Artigiani",
        sector: "Impresa edile",
        tagline: "Estetica industriale con progetti, metodo e richiesta di preventivo.",
        icon: "trades",
      },
      {
        src: "/portfolio/demo-roofing.html",
        alt: "Homepage di un sito dimostrativo per un'impresa di coperture, design editoriale chiaro con operai su un tetto",
        bucket: "Demo di esempio · Artigiani",
        sector: "Impresa di coperture",
        tagline: "Focus sulle emergenze con prenotazione di un'ispezione gratuita.",
        icon: "trades",
      },
      {
        src: "/portfolio/demo-landscaping.html",
        alt: "Homepage di un sito dimostrativo per un'impresa di giardinaggio, design organico con foto di giardino curato",
        bucket: "Demo di esempio · Artigiani",
        sector: "Impresa di giardinaggio",
        tagline: "Design organico e caldo con piani di manutenzione stagionali.",
        icon: "trades",
      },
    ],
    ctaTitle: "Vuoi che il prossimo di questa pagina sia il tuo?",
    ctaBody:
      "Raccontaci della tua attività e ti mostreremo come potrebbe essere il suo sito, gratis, prima di decidere qualsiasi cosa.",
    ctaBtn: "Richiedi la tua demo gratuita",
  },
};

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const t = copy[locale];
  const site = getSite(locale);

  // The page's work as an ItemList of CreativeWorks: the two named client
  // projects first, then the sector demos. Names and descriptions come from
  // the same copy[locale] the cards render. Snapshots are served from our own
  // origin, so no external URLs are claimed.
  const jsonLd = jsonLdDoc(
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/${locale}/portfolio#work`,
      name: t.crumbHere,
      itemListElement: [...t.projects.map((p) => ({ name: p.name, description: p.tagline })),
        ...t.samples.map((s) => ({ name: s.sector, description: s.tagline })),
      ].map((w, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "CreativeWork", name: w.name, description: w.description },
      })),
    },
    breadcrumbList([
      { name: t.crumbHome, path: `/${locale}` },
      { name: t.crumbHere },
    ]),
  );

  return (
    <>
      {/* CLIENT WORK (doubles as the page opener; the old page hero was
          removed on owner directive 2026-08-15, so this section's heading is
          the page's h1) */}
      <section className="sec">
        <div className="wrap">
          <div className="sec-head center" style={{ maxWidth: "44rem" }}>
            <div className="sec-kicker">
              <Icon name="check" />
              {t.clientsKicker}
            </div>
            <h1 className="sec-title">{t.clientsTitle}</h1>
            <p className="sec-lead">{t.clientsLead}</p>
          </div>

          <div className="pf-grid">
            {t.projects.map((p) => (
              <article key={p.src} className="svc reveal">
                {/* Fully sandboxed (no tokens): scripts, navigation and form
                    submission are all inert; scrolling still works. */}
                <iframe
                  src={p.src}
                  title={p.alt}
                  sandbox=""
                  loading="lazy"
                  className="pf-frame"
                />
                <p className="pf-hint">{t.browseHint}</p>
                <div className="svc-top">
                  <div>
                    <div className="svc-bucket">{p.bucket}</div>
                    <h3>{p.name}</h3>
                  </div>
                </div>
                <p className="svc-tag">{p.tagline}</p>
                <ul>
                  {p.includes.map((item) => (
                    <li key={item}>
                      <Icon name="check" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DEMOS */}
      <section className="sec sec-warm">
        <div className="wrap">
          <div className="sec-head center" style={{ maxWidth: "44rem" }}>
            <div className="sec-kicker">
              <Icon name="shield" />
              {t.demosKicker}
            </div>
            <h2 className="sec-title">{t.demosTitle}</h2>
            <p className="sec-lead">{t.demosLead}</p>
          </div>

          <div className="pf-grid">
            {t.samples.map((s) => (
              <article key={s.src} className="svc reveal">
                {/* Same inert scrollable snapshot treatment as the client
                    projects above. Scripts stripped, sandboxed, scroll works. */}
                <iframe
                  src={s.src}
                  title={s.alt}
                  sandbox=""
                  loading="lazy"
                  className="pf-frame"
                />
                <p className="pf-hint">{t.browseHint}</p>
                <div className="svc-top">
                  <span className="svc-ico" aria-hidden="true">
                    <Icon name={s.icon} />
                  </span>
                  <div>
                    <div className="svc-bucket">{s.bucket}</div>
                    <h3>{s.sector}</h3>
                  </div>
                </div>
                <p className="svc-tag">{s.tagline}</p>
                <p
                  style={{
                    fontSize: ".85rem",
                    color: "var(--ink-mute)",
                  }}
                >
                  {t.demoNote}
                </p>
                <a
                  href={s.src}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-ghost"
                >
                  {t.openDemo}
                  <Icon name="arrow" />
                </a>
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
