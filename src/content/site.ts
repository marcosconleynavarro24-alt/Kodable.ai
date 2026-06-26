import type { Locale } from "@/i18n/config";

// ── Types ────────────────────────────────────────────────────────────────
export type NavLink = { key: string; href: string; label: string };

export interface SiteContent {
  nav: {
    links: NavLink[];
    cta: string;
    langAria: string;
  };
  brand: { tagline: string };
  home: {
    servicesKicker: string;
    servicesTitle: string;
    servicesLead: string;
    faqKicker: string;
    faqTitle: string;
    faqSeeAll: string;
  };
  hero: {
    headingPre: string;
    headingHi: string;
    headingMid: string;
    headingHi2: string;
    headingPost: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  chat: {
    name: string;
    status: string;
    them1: string;
    you1: string;
    them2: string;
    inputPlaceholder: string;
    alt: string;
  };
  scenarios: {
    kicker: string;
    title: string;
    lead: string;
    items: { icon: string; title: string; body: string }[];
  };
  how: {
    kicker: string;
    title: string;
    lead: string;
    steps: { n: string; title: string; body: string }[];
    note: string;
    booking: {
      title: string;
      place: string;
      chooseDay: string;
      pickTime: string;
      days: { dn: string; d: string }[];
      slots: { t: string; state: "free" | "taken" | "pick" }[];
      cta: string;
      confirm: string;
    };
  };
  trust: {
    kicker: string;
    title: string;
    lead: string;
    cards: { icon: string; title: string; body: string; stars?: boolean }[];
  };
  consultation: {
    kicker: string;
    title: string;
    lead: string;
    points: { title: string; body: string }[];
    cta: string;
  };
  finalCta: {
    kicker: string;
    title: string;
    body: string;
    whatsapp: string;
    email: string;
    labels: { whatsapp: string; call: string; email: string };
  };
  footer: {
    desc: string;
    exploreTitle: string;
    contactTitle: string;
    copyright: string;
    privacy: string;
    terms: string;
    footnote: string;
    call: string;
  };
  common: {
    backHome: string;
    getQuote: string;
    seeServices: string;
    bookConsult: string;
    talkToMe: string;
    mostPopular: string;
    recommended: string;
  };
}

// ── Shared structural data (locale-independent) ──────────────────────────
const navHrefs = [
  { key: "services", href: "/services" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
];

// ── Content ──────────────────────────────────────────────────────────────
const en: SiteContent = {
  nav: {
    links: navHrefs.map((l) => ({
      ...l,
      label: {
        services: "Services",
        faq: "FAQ",
        contact: "Contact",
      }[l.key]!,
    })),
    cta: "Free consultation",
    langAria: "Language: English and Spanish available",
  },
  brand: {
    tagline:
      "A small studio that uses AI to scale small local businesses.",
  },
  home: {
    servicesKicker: "What we do",
    servicesTitle: "Four ways we grow your business.",
    servicesLead: "Pick what you need now, then add the rest when you're ready.",
    faqKicker: "Common questions",
    faqTitle: "What people usually ask.",
    faqSeeAll: "See all questions",
  },
  hero: {
    headingPre: "We use ",
    headingHi: "AI",
    headingMid: " to bring ",
    headingHi2: "customers",
    headingPost: " to your door.",
    sub: "We build websites, AI agents, custom tools and automations for local businesses, so more people find you, more book themselves in, and every customer gets answered, even after hours.",
    ctaPrimary: "Start your project",
    ctaSecondary: "See what you get",
  },
  chat: {
    name: "Casa del Mar",
    status: "AI assistant · replies instantly",
    them1: "Hi! Do you have a table for 4 tonight at 8?",
    you1: "Yes, a table for 4 at 8pm is free. Terrace or inside? I can book it now.",
    them2: "Terrace, please!",
    inputPlaceholder: "Message Casa del Mar…",
    alt: "A phone showing a customer messaging a restaurant late at night, and its AI assistant booking a table in seconds.",
  },
  scenarios: {
    kicker: "Is this you?",
    title: "Whatever you run, here's what it looks like.",
    lead: "Real outcomes for the kinds of businesses we build for.",
    items: [
      {
        icon: "restaurant",
        title: "Restaurant / café",
        body: "An AI assistant books tables and answers menu questions on WhatsApp, even after you've closed.",
      },
      {
        icon: "salon",
        title: "Salon / clinic",
        body: "Clients book themselves day or night, and automatic reminders mean far fewer no-shows.",
      },
      {
        icon: "trades",
        title: "Builder / plumber / electrician",
        body: "Show your past work, and let an assistant field quote requests while you're on the job.",
      },
      {
        icon: "shop",
        title: "Shop / retail",
        body: "Sell online, show what's in stock, and get found when people search nearby.",
      },
    ],
  },
  how: {
    kicker: "How it works",
    title: "Four easy steps, then it's live.",
    lead: "A friendly, no-pressure process. We do the heavy lifting; you just tell us about your business.",
    steps: [
      { n: "1", title: "Discovery", body: "A relaxed chat about your business, your customers and what you want more of." },
      { n: "2", title: "Blueprint", body: "We plan your pages and write the words, so it sounds like you." },
      { n: "3", title: "Execution", body: "We build it fast and tidy. Your site, AI agent and automations, all wired up and tested." },
      { n: "4", title: "Launch", body: "We go live together, and we show you how to run it. Plus 30-day post-launch support." },
    ],
    note: "Every site ships with 30-day post-launch support.",
    booking: {
      title: "Book your appointment",
      place: "Clínica Bella · open now",
      chooseDay: "Choose a day",
      pickTime: "Pick a time",
      days: [
        { dn: "23", d: "Mon" },
        { dn: "24", d: "Tue" },
        { dn: "25", d: "Wed" },
        { dn: "26", d: "Thu" },
        { dn: "27", d: "Fri" },
      ],
      slots: [
        { t: "10:00", state: "taken" },
        { t: "11:30", state: "free" },
        { t: "12:00", state: "pick" },
        { t: "16:00", state: "taken" },
        { t: "17:30", state: "free" },
        { t: "18:00", state: "free" },
      ],
      cta: "Confirm booking",
      confirm: "We'll text a reminder the day before.",
    },
  },
  trust: {
    kicker: "Why people trust us",
    title: "Real people who answer.",
    lead: "No faceless agency, no call centre. A small team that knows the market, and actually answers.",
    cards: [
      { icon: "star", stars: true, title: "5-star rated", body: "Local businesses rate the work five stars: for results and for being easy to deal with." },
      { icon: "chat", title: "One tap to reach you", body: "WhatsApp and click-to-call built in, so a curious customer becomes a real one in seconds." },
      { icon: "clock", title: "Always on for your customers", body: "An AI assistant answers in seconds, day or night, so you never miss the late enquiry." },
    ],
  },
  consultation: {
    kicker: "Free consultation",
    title: "No price lists. Just a friendly chat.",
    lead: "Every business is different, so every quote is too. Tell us what you need and we'll send back a clear, plain-language price, free and with no pressure. Most consultations take about 15 minutes.",
    points: [
      { title: "It's free, always", body: "A relaxed chat about your business and what you want more of. No cost, no commitment, no hard sell." },
      { title: "A quote made for you", body: "You only pay for what you actually need, so you get a price that fits, not a package that doesn't." },
      { title: "Plain words, no jargon", body: "We explain everything in words you'd use yourself, so you always know what you're getting." },
    ],
    cta: "Book a free consultation",
  },
  finalCta: {
    kicker: "Let's talk",
    title: "Let's get your business online, properly.",
    body: "Tell us a little about what you do. We'll send back a free, plain-language quote, with no jargon and no pressure. Usually within 24 hours.",
    whatsapp: "Message on WhatsApp",
    email: "Email us instead",
    labels: { whatsapp: "WhatsApp", call: "Call us", email: "Email" },
  },
  footer: {
    desc: "A small studio that uses AI to scale small local businesses.",
    exploreTitle: "Explore",
    contactTitle: "Get in touch",
    copyright: "© 2026 Kodable.ai",
    privacy: "Privacy",
    terms: "Terms",
    footnote:
      "Under the hood: AI-assisted builds, local SEO and schema, app integrations, automatic backups, SSL and a care plan that keeps everything online and updated. You'll never need to think about any of it. That's the point.",
    call: "Call",
  },
  common: {
    backHome: "Home",
    getQuote: "Free consultation",
    seeServices: "See all services",
    bookConsult: "Book a free consultation",
    talkToMe: "Talk to us",
    mostPopular: "Most popular",
    recommended: "Recommended",
  },
};

const es: SiteContent = {
  nav: {
    links: navHrefs.map((l) => ({
      ...l,
      label: {
        services: "Servicios",
        faq: "Preguntas",
        contact: "Contacto",
      }[l.key]!,
    })),
    cta: "Consulta gratis",
    langAria: "Idioma: disponible en español e inglés",
  },
  brand: {
    tagline:
      "Un pequeño estudio que usa IA para hacer crecer pequeños negocios locales.",
  },
  home: {
    servicesKicker: "Lo que hacemos",
    servicesTitle: "Cuatro formas de hacer crecer tu negocio.",
    servicesLead: "Coge lo que necesitas ahora y añade el resto cuando quieras.",
    faqKicker: "Preguntas frecuentes",
    faqTitle: "Lo que la gente suele preguntar.",
    faqSeeAll: "Ver todas las preguntas",
  },
  hero: {
    headingPre: "Usamos ",
    headingHi: "IA",
    headingMid: " para traerte ",
    headingHi2: "clientes",
    headingPost: " a tu puerta.",
    sub: "Creamos webs, agentes de IA, herramientas a medida y automatizaciones para negocios locales, para que más gente te encuentre, más reserve sola y cada cliente reciba respuesta, incluso fuera de hora.",
    ctaPrimary: "Empieza tu proyecto",
    ctaSecondary: "Mira lo que incluye",
  },
  chat: {
    name: "Casa del Mar",
    status: "Asistente IA · responde al instante",
    them1: "¡Hola! ¿Tenéis mesa para 4 esta noche a las 8?",
    you1: "Sí, hay mesa para 4 a las 20:00. ¿Terraza o dentro? Te la reservo ahora.",
    them2: "¡En la terraza, por favor!",
    inputPlaceholder: "Escribe a Casa del Mar…",
    alt: "Un móvil donde un cliente escribe a un restaurante de noche y su asistente de IA le reserva una mesa en segundos.",
  },
  scenarios: {
    kicker: "¿Eres tú?",
    title: "Sea lo que sea lo que llevas, así queda.",
    lead: "Resultados reales para los negocios para los que trabajamos.",
    items: [
      {
        icon: "restaurant",
        title: "Restaurante / café",
        body: "Un asistente de IA reserva mesas y responde dudas de la carta en WhatsApp, incluso después de cerrar.",
      },
      {
        icon: "salon",
        title: "Peluquería / clínica",
        body: "Los clientes reservan solos de día o de noche, y los recordatorios automáticos reducen mucho las ausencias.",
      },
      {
        icon: "trades",
        title: "Albañil / fontanero / electricista",
        body: "Enseña tus trabajos y deja que un asistente atienda las peticiones de presupuesto mientras trabajas.",
      },
      {
        icon: "shop",
        title: "Tienda / comercio",
        body: "Vende online, muestra lo que tienes en stock y haz que te encuentren cuando buscan cerca.",
      },
    ],
  },
  how: {
    kicker: "Cómo funciona",
    title: "Cuatro pasos sencillos y está online.",
    lead: "Un proceso cercano y sin presión. Nosotros hacemos el trabajo pesado; tú solo nos cuentas sobre tu negocio.",
    steps: [
      { n: "1", title: "Descubrir", body: "Una charla tranquila sobre tu negocio, tus clientes y lo que quieres conseguir más." },
      { n: "2", title: "Plan", body: "Planificamos tus páginas y escribimos los textos, para que suene a ti." },
      { n: "3", title: "Construcción", body: "La construimos rápida y ordenada. Tu web, el agente de IA y las automatizaciones, todo conectado y probado." },
      { n: "4", title: "Lanzamiento", body: "Salimos online juntos y te enseñamos a manejarla. Más 30 días de soporte tras el lanzamiento." },
    ],
    note: "Cada web incluye 30 días de soporte tras el lanzamiento.",
    booking: {
      title: "Reserva tu cita",
      place: "Clínica Bella · abierto ahora",
      chooseDay: "Elige un día",
      pickTime: "Elige una hora",
      days: [
        { dn: "23", d: "Lun" },
        { dn: "24", d: "Mar" },
        { dn: "25", d: "Mié" },
        { dn: "26", d: "Jue" },
        { dn: "27", d: "Vie" },
      ],
      slots: [
        { t: "10:00", state: "taken" },
        { t: "11:30", state: "free" },
        { t: "12:00", state: "pick" },
        { t: "16:00", state: "taken" },
        { t: "17:30", state: "free" },
        { t: "18:00", state: "free" },
      ],
      cta: "Confirmar reserva",
      confirm: "Te enviamos un recordatorio el día antes.",
    },
  },
  trust: {
    kicker: "Por qué confían en nosotros",
    title: "Personas reales que responden.",
    lead: "Sin agencia impersonal, sin call center. Un pequeño equipo que conoce el mercado y responde de verdad.",
    cards: [
      { icon: "star", stars: true, title: "5 estrellas", body: "Los negocios locales valoran el trabajo con cinco estrellas: por resultados y por ser fácil de tratar." },
      { icon: "chat", title: "Te contactan con un toque", body: "WhatsApp y llamada directa integrados, para que un cliente curioso se convierta en real en segundos." },
      { icon: "clock", title: "Siempre disponible para tus clientes", body: "Un asistente de IA responde en segundos, de día o de noche, para que no pierdas la consulta de última hora." },
    ],
  },
  consultation: {
    kicker: "Consulta gratis",
    title: "Sin listas de precios. Solo una charla.",
    lead: "Cada negocio es distinto, así que cada presupuesto también. Cuéntanos qué necesitas y te devolvemos un precio claro y en lenguaje sencillo, gratis y sin presión. La mayoría de consultas duran unos 15 minutos.",
    points: [
      { title: "Siempre gratis", body: "Una charla tranquila sobre tu negocio y lo que quieres conseguir. Sin coste, sin compromiso y sin presión." },
      { title: "Un presupuesto a tu medida", body: "Pagas solo por lo que de verdad necesitas, así tienes un precio que encaja, no un paquete que no." },
      { title: "Lenguaje claro, sin jerga", body: "Te explicamos todo con palabras que usarías tú, para que siempre sepas lo que recibes." },
    ],
    cta: "Reserva una consulta gratis",
  },
  finalCta: {
    kicker: "Hablemos",
    title: "Saquemos tu negocio online, bien hecho.",
    body: "Cuéntanos un poco sobre lo que haces. Te devolvemos un presupuesto gratis y en lenguaje claro, sin jerga y sin presión. Normalmente en 24 horas.",
    whatsapp: "Escríbenos por WhatsApp",
    email: "O mándanos un email",
    labels: { whatsapp: "WhatsApp", call: "Llámanos", email: "Email" },
  },
  footer: {
    desc: "Un pequeño estudio que usa IA para hacer crecer pequeños negocios locales.",
    exploreTitle: "Explora",
    contactTitle: "Contacto",
    copyright: "© 2026 Kodable.ai",
    privacy: "Privacidad",
    terms: "Términos",
    footnote:
      "Por dentro: construcción asistida por IA, SEO local y schema, integraciones, copias de seguridad automáticas, SSL y un plan de cuidado que lo mantiene todo online y al día. No tendrás que pensar en nada de eso. Esa es la idea.",
    call: "Llamar",
  },
  common: {
    backHome: "Inicio",
    getQuote: "Consulta gratis",
    seeServices: "Ver todos los servicios",
    bookConsult: "Reserva una consulta gratis",
    talkToMe: "Habla con nosotros",
    mostPopular: "Más popular",
    recommended: "Recomendado",
  },
};

const fr: SiteContent = {
  nav: {
    links: navHrefs.map((l) => ({
      ...l,
      label: {
        services: "Services",
        faq: "FAQ",
        contact: "Contact",
      }[l.key]!,
    })),
    cta: "Consultation gratuite",
    langAria: "Langue : disponible en français, anglais et espagnol",
  },
  brand: {
    tagline:
      "Un petit studio qui utilise l'IA pour faire grandir les petits commerces de proximité.",
  },
  home: {
    servicesKicker: "Ce que nous faisons",
    servicesTitle: "Quatre façons de faire grandir votre activité.",
    servicesLead: "Prenez ce dont vous avez besoin maintenant, puis ajoutez le reste quand vous serez prêt.",
    faqKicker: "Questions fréquentes",
    faqTitle: "Ce qu'on nous demande le plus souvent.",
    faqSeeAll: "Voir toutes les questions",
  },
  hero: {
    headingPre: "Nous utilisons l'",
    headingHi: "IA",
    headingMid: " pour amener des ",
    headingHi2: "clients",
    headingPost: " à votre porte.",
    sub: "Nous créons des sites web, des agents IA, des outils sur mesure et des automatisations pour les commerces de proximité, pour que plus de gens vous trouvent, que plus de clients réservent eux-mêmes et que chacun obtienne une réponse, même en dehors des horaires.",
    ctaPrimary: "Lancez votre projet",
    ctaSecondary: "Voyez ce que vous obtenez",
  },
  chat: {
    name: "Casa del Mar",
    status: "Assistant IA · répond instantanément",
    them1: "Bonjour ! Avez-vous une table pour 4 ce soir à 20h ?",
    you1: "Oui, une table pour 4 à 20h est libre. En terrasse ou à l'intérieur ? Je la réserve tout de suite.",
    them2: "En terrasse, s'il vous plaît !",
    inputPlaceholder: "Écrivez à Casa del Mar…",
    alt: "Un téléphone montrant un client qui écrit à un restaurant tard le soir, et son assistant IA qui réserve une table en quelques secondes.",
  },
  scenarios: {
    kicker: "C'est vous ?",
    title: "Quel que soit votre métier, voici ce que ça donne.",
    lead: "Des résultats concrets pour les commerces pour lesquels nous travaillons.",
    items: [
      {
        icon: "restaurant",
        title: "Restaurant / café",
        body: "Un assistant IA réserve les tables et répond aux questions sur la carte sur WhatsApp, même une fois fermé.",
      },
      {
        icon: "salon",
        title: "Salon / clinique",
        body: "Les clients réservent eux-mêmes de jour comme de nuit, et les rappels automatiques réduisent fortement les rendez-vous manqués.",
      },
      {
        icon: "trades",
        title: "Maçon / plombier / électricien",
        body: "Montrez vos réalisations passées et laissez un assistant gérer les demandes de devis pendant que vous êtes sur le chantier.",
      },
      {
        icon: "shop",
        title: "Boutique / commerce",
        body: "Vendez en ligne, montrez ce que vous avez en stock et faites-vous trouver quand les gens cherchent près de chez vous.",
      },
    ],
  },
  how: {
    kicker: "Comment ça marche",
    title: "Quatre étapes simples, puis c'est en ligne.",
    lead: "Un processus chaleureux et sans pression. Nous faisons le gros du travail ; vous nous parlez simplement de votre activité.",
    steps: [
      { n: "1", title: "Découverte", body: "Un échange détendu sur votre activité, vos clients et ce dont vous voulez plus." },
      { n: "2", title: "Plan", body: "Nous concevons vos pages et écrivons les textes, pour que ça vous ressemble." },
      { n: "3", title: "Réalisation", body: "Nous construisons vite et proprement. Votre site, votre agent IA et vos automatisations, tout est relié et testé." },
      { n: "4", title: "Lancement", body: "Nous passons en ligne ensemble et nous vous montrons comment gérer le tout. Plus 30 jours d'accompagnement après le lancement." },
    ],
    note: "Chaque site est livré avec 30 jours d'accompagnement après le lancement.",
    booking: {
      title: "Réservez votre rendez-vous",
      place: "Clínica Bella · ouvert maintenant",
      chooseDay: "Choisissez un jour",
      pickTime: "Choisissez une heure",
      days: [
        { dn: "23", d: "Lun" },
        { dn: "24", d: "Mar" },
        { dn: "25", d: "Mer" },
        { dn: "26", d: "Jeu" },
        { dn: "27", d: "Ven" },
      ],
      slots: [
        { t: "10:00", state: "taken" },
        { t: "11:30", state: "free" },
        { t: "12:00", state: "pick" },
        { t: "16:00", state: "taken" },
        { t: "17:30", state: "free" },
        { t: "18:00", state: "free" },
      ],
      cta: "Confirmer la réservation",
      confirm: "Nous vous envoyons un rappel par SMS la veille.",
    },
  },
  trust: {
    kicker: "Pourquoi on nous fait confiance",
    title: "De vraies personnes qui répondent.",
    lead: "Pas d'agence sans visage, pas de centre d'appels. Une petite équipe qui connaît le marché et qui répond vraiment.",
    cards: [
      { icon: "star", stars: true, title: "Noté 5 étoiles", body: "Les commerces de proximité notent notre travail cinq étoiles : pour les résultats et pour la facilité du contact." },
      { icon: "chat", title: "Un geste pour vous joindre", body: "WhatsApp et appel direct intégrés, pour qu'un client curieux devienne un vrai client en quelques secondes." },
      { icon: "clock", title: "Toujours disponible pour vos clients", body: "Un assistant IA répond en quelques secondes, de jour comme de nuit, pour que vous ne ratiez jamais une demande tardive." },
    ],
  },
  consultation: {
    kicker: "Consultation gratuite",
    title: "Pas de grille tarifaire. Juste un échange chaleureux.",
    lead: "Chaque activité est différente, donc chaque devis l'est aussi. Dites-nous ce dont vous avez besoin et nous vous renvoyons un prix clair, en langage simple, gratuit et sans pression. La plupart des consultations durent une quinzaine de minutes.",
    points: [
      { title: "C'est gratuit, toujours", body: "Un échange détendu sur votre activité et ce dont vous voulez plus. Sans coût, sans engagement, sans vente forcée." },
      { title: "Un devis fait pour vous", body: "Vous ne payez que ce dont vous avez vraiment besoin, vous obtenez donc un prix qui vous convient, pas un forfait qui ne vous va pas." },
      { title: "Des mots simples, sans jargon", body: "Nous expliquons tout avec des mots que vous utiliseriez vous-même, pour que vous sachiez toujours ce que vous obtenez." },
    ],
    cta: "Réservez une consultation gratuite",
  },
  finalCta: {
    kicker: "Discutons-en",
    title: "Mettons votre activité en ligne, comme il faut.",
    body: "Dites-nous un peu ce que vous faites. Nous vous renvoyons un devis gratuit, en langage simple, sans jargon et sans pression. Généralement sous 24 heures.",
    whatsapp: "Écrivez-nous sur WhatsApp",
    email: "Ou envoyez-nous un email",
    labels: { whatsapp: "WhatsApp", call: "Appelez-nous", email: "Email" },
  },
  footer: {
    desc: "Un petit studio qui utilise l'IA pour faire grandir les petits commerces de proximité.",
    exploreTitle: "Explorer",
    contactTitle: "Nous contacter",
    copyright: "© 2026 Kodable.ai",
    privacy: "Confidentialité",
    terms: "Conditions",
    footnote:
      "Sous le capot : des créations assistées par IA, du SEO local et du schema, des intégrations d'applications, des sauvegardes automatiques, le SSL et un plan d'entretien qui garde tout en ligne et à jour. Vous n'aurez jamais à y penser. C'est tout l'intérêt.",
    call: "Appeler",
  },
  common: {
    backHome: "Accueil",
    getQuote: "Consultation gratuite",
    seeServices: "Voir tous les services",
    bookConsult: "Réservez une consultation gratuite",
    talkToMe: "Parlez-nous",
    mostPopular: "Le plus demandé",
    recommended: "Recommandé",
  },
};

const de: SiteContent = {
  nav: {
    links: navHrefs.map((l) => ({
      ...l,
      label: {
        services: "Leistungen",
        faq: "Fragen",
        contact: "Kontakt",
      }[l.key]!,
    })),
    cta: "Kostenlose Beratung",
    langAria: "Sprache: auf Deutsch und Englisch verfügbar",
  },
  brand: {
    tagline:
      "Ein kleines Studio, das KI nutzt, um kleine lokale Unternehmen wachsen zu lassen.",
  },
  home: {
    servicesKicker: "Was wir machen",
    servicesTitle: "Vier Wege, wie wir dein Unternehmen wachsen lassen.",
    servicesLead: "Nimm, was du jetzt brauchst, und füge den Rest hinzu, wenn du so weit bist.",
    faqKicker: "Häufige Fragen",
    faqTitle: "Was Leute uns meistens fragen.",
    faqSeeAll: "Alle Fragen ansehen",
  },
  hero: {
    headingPre: "Wir nutzen ",
    headingHi: "KI",
    headingMid: ", um ",
    headingHi2: "Kunden",
    headingPost: " an deine Tür zu bringen.",
    sub: "Wir bauen Websites, KI-Agenten, maßgeschneiderte Tools und Automatisierungen für lokale Unternehmen, damit mehr Leute dich finden, mehr selbst buchen und jeder Kunde eine Antwort bekommt, auch außerhalb der Öffnungszeiten.",
    ctaPrimary: "Starte dein Projekt",
    ctaSecondary: "Sieh, was du bekommst",
  },
  chat: {
    name: "Casa del Mar",
    status: "KI-Assistent · antwortet sofort",
    them1: "Hallo! Habt ihr heute Abend um 8 einen Tisch für 4?",
    you1: "Ja, ein Tisch für 4 um 20 Uhr ist frei. Terrasse oder drinnen? Ich reserviere ihn gleich.",
    them2: "Terrasse, bitte!",
    inputPlaceholder: "Schreib an Casa del Mar…",
    alt: "Ein Handy, auf dem ein Kunde spätabends einem Restaurant schreibt und dessen KI-Assistent in Sekunden einen Tisch reserviert.",
  },
  scenarios: {
    kicker: "Bist das du?",
    title: "Was auch immer du machst, so sieht es aus.",
    lead: "Echte Ergebnisse für die Art von Unternehmen, für die wir bauen.",
    items: [
      {
        icon: "restaurant",
        title: "Restaurant / Café",
        body: "Ein KI-Assistent reserviert Tische und beantwortet Fragen zur Karte auf WhatsApp, auch nach Feierabend.",
      },
      {
        icon: "salon",
        title: "Salon / Praxis",
        body: "Kunden buchen selbst, Tag und Nacht, und automatische Erinnerungen sorgen für deutlich weniger Ausfälle.",
      },
      {
        icon: "trades",
        title: "Handwerker / Installateur / Elektriker",
        body: "Zeig deine bisherigen Arbeiten und lass einen Assistenten Angebotsanfragen entgegennehmen, während du auf der Baustelle bist.",
      },
      {
        icon: "shop",
        title: "Laden / Einzelhandel",
        body: "Verkaufe online, zeig, was vorrätig ist, und werde gefunden, wenn Leute in der Nähe suchen.",
      },
    ],
  },
  how: {
    kicker: "So funktioniert es",
    title: "Vier einfache Schritte, dann ist es live.",
    lead: "Ein freundlicher Ablauf ohne Druck. Wir übernehmen die schwere Arbeit; du erzählst uns einfach von deinem Unternehmen.",
    steps: [
      { n: "1", title: "Kennenlernen", body: "Ein entspanntes Gespräch über dein Unternehmen, deine Kunden und wovon du mehr willst." },
      { n: "2", title: "Konzept", body: "Wir planen deine Seiten und schreiben die Texte, damit es nach dir klingt." },
      { n: "3", title: "Umsetzung", body: "Wir bauen schnell und sauber. Deine Website, dein KI-Agent und die Automatisierungen, alles verbunden und getestet." },
      { n: "4", title: "Launch", body: "Wir gehen gemeinsam live und zeigen dir, wie du es bedienst. Plus 30 Tage Support nach dem Launch." },
    ],
    note: "Jede Website kommt mit 30 Tagen Support nach dem Launch.",
    booking: {
      title: "Buch deinen Termin",
      place: "Clínica Bella · jetzt geöffnet",
      chooseDay: "Wähl einen Tag",
      pickTime: "Wähl eine Uhrzeit",
      days: [
        { dn: "23", d: "Mo" },
        { dn: "24", d: "Di" },
        { dn: "25", d: "Mi" },
        { dn: "26", d: "Do" },
        { dn: "27", d: "Fr" },
      ],
      slots: [
        { t: "10:00", state: "taken" },
        { t: "11:30", state: "free" },
        { t: "12:00", state: "pick" },
        { t: "16:00", state: "taken" },
        { t: "17:30", state: "free" },
        { t: "18:00", state: "free" },
      ],
      cta: "Buchung bestätigen",
      confirm: "Wir schicken dir am Tag davor eine Erinnerung.",
    },
  },
  trust: {
    kicker: "Warum Leute uns vertrauen",
    title: "Echte Menschen, die antworten.",
    lead: "Keine gesichtslose Agentur, kein Callcenter. Ein kleines Team, das den Markt kennt und tatsächlich antwortet.",
    cards: [
      { icon: "star", stars: true, title: "5 Sterne", body: "Lokale Unternehmen bewerten die Arbeit mit fünf Sternen: für die Ergebnisse und weil wir unkompliziert sind." },
      { icon: "chat", title: "Ein Tipp, um dich zu erreichen", body: "WhatsApp und Klick-zum-Anrufen direkt eingebaut, sodass ein neugieriger Kunde in Sekunden zum echten wird." },
      { icon: "clock", title: "Immer da für deine Kunden", body: "Ein KI-Assistent antwortet in Sekunden, Tag und Nacht, damit dir keine späte Anfrage entgeht." },
    ],
  },
  consultation: {
    kicker: "Kostenlose Beratung",
    title: "Keine Preislisten. Nur ein nettes Gespräch.",
    lead: "Jedes Unternehmen ist anders, also ist auch jedes Angebot anders. Sag uns, was du brauchst, und wir schicken dir einen klaren Preis in einfacher Sprache zurück, kostenlos und ohne Druck. Die meisten Beratungen dauern etwa 15 Minuten.",
    points: [
      { title: "Immer kostenlos", body: "Ein entspanntes Gespräch über dein Unternehmen und wovon du mehr willst. Keine Kosten, keine Verpflichtung, kein hartes Verkaufen." },
      { title: "Ein Angebot nur für dich", body: "Du zahlst nur für das, was du wirklich brauchst, also bekommst du einen Preis, der passt, statt eines Pakets, das nicht passt." },
      { title: "Klare Worte, kein Fachjargon", body: "Wir erklären alles in Worten, die du selbst benutzen würdest, damit du immer weißt, was du bekommst." },
    ],
    cta: "Kostenlose Beratung buchen",
  },
  finalCta: {
    kicker: "Lass uns reden",
    title: "Bringen wir dein Unternehmen richtig online.",
    body: "Erzähl uns ein bisschen, was du machst. Wir schicken dir ein kostenloses Angebot in einfacher Sprache zurück, ohne Fachjargon und ohne Druck. Meist innerhalb von 24 Stunden.",
    whatsapp: "Über WhatsApp schreiben",
    email: "Lieber per Email",
    labels: { whatsapp: "WhatsApp", call: "Ruf uns an", email: "Email" },
  },
  footer: {
    desc: "Ein kleines Studio, das KI nutzt, um kleine lokale Unternehmen wachsen zu lassen.",
    exploreTitle: "Entdecken",
    contactTitle: "Kontakt aufnehmen",
    copyright: "© 2026 Kodable.ai",
    privacy: "Datenschutz",
    terms: "AGB",
    footnote:
      "Unter der Haube: KI-gestützte Entwicklung, lokales SEO und schema, App-Integrationen, automatische Backups, SSL und ein Care-Plan, der alles online und aktuell hält. Du musst nie an irgendwas davon denken. Genau das ist der Punkt.",
    call: "Anrufen",
  },
  common: {
    backHome: "Start",
    getQuote: "Kostenlose Beratung",
    seeServices: "Alle Leistungen ansehen",
    bookConsult: "Kostenlose Beratung buchen",
    talkToMe: "Sprich mit uns",
    mostPopular: "Am beliebtesten",
    recommended: "Empfohlen",
  },
};

const it: SiteContent = {
  nav: {
    links: navHrefs.map((l) => ({
      ...l,
      label: {
        services: "Servizi",
        faq: "Domande",
        contact: "Contatti",
      }[l.key]!,
    })),
    cta: "Consulenza gratuita",
    langAria: "Lingua: disponibile in italiano e inglese",
  },
  brand: {
    tagline:
      "Un piccolo studio che usa l'IA per far crescere le piccole attività locali.",
  },
  home: {
    servicesKicker: "Cosa facciamo",
    servicesTitle: "Quattro modi per far crescere la tua attività.",
    servicesLead: "Scegli ciò che ti serve ora e aggiungi il resto quando vuoi.",
    faqKicker: "Domande frequenti",
    faqTitle: "Quello che la gente di solito chiede.",
    faqSeeAll: "Vedi tutte le domande",
  },
  hero: {
    headingPre: "Usiamo l'",
    headingHi: "IA",
    headingMid: " per portare ",
    headingHi2: "clienti",
    headingPost: " alla tua porta.",
    sub: "Creiamo siti web, agenti IA, strumenti su misura e automazioni per le attività locali, così più persone ti trovano, più clienti prenotano da soli e ognuno riceve una risposta, anche fuori orario.",
    ctaPrimary: "Inizia il tuo progetto",
    ctaSecondary: "Guarda cosa ottieni",
  },
  chat: {
    name: "Casa del Mar",
    status: "Assistente IA · risponde all'istante",
    them1: "Ciao! Avete un tavolo per 4 stasera alle 8?",
    you1: "Sì, un tavolo per 4 alle 20:00 è libero. In terrazza o dentro? Te lo prenoto subito.",
    them2: "In terrazza, grazie!",
    inputPlaceholder: "Scrivi a Casa del Mar…",
    alt: "Un telefono in cui un cliente scrive a un ristorante a tarda sera e il suo assistente IA prenota un tavolo in pochi secondi.",
  },
  scenarios: {
    kicker: "Sei tu?",
    title: "Qualunque cosa gestisci, ecco come funziona.",
    lead: "Risultati concreti per il tipo di attività per cui lavoriamo.",
    items: [
      {
        icon: "restaurant",
        title: "Ristorante / caffè",
        body: "Un assistente IA prenota i tavoli e risponde alle domande sul menù su WhatsApp, anche dopo la chiusura.",
      },
      {
        icon: "salon",
        title: "Salone / clinica",
        body: "I clienti prenotano da soli, di giorno o di notte, e i promemoria automatici riducono molto le assenze.",
      },
      {
        icon: "trades",
        title: "Muratore / idraulico / elettricista",
        body: "Mostra i tuoi lavori passati e lascia che un assistente gestisca le richieste di preventivo mentre sei al lavoro.",
      },
      {
        icon: "shop",
        title: "Negozio / commercio",
        body: "Vendi online, mostra cosa hai disponibile e fatti trovare quando la gente cerca vicino a te.",
      },
    ],
  },
  how: {
    kicker: "Come funziona",
    title: "Quattro semplici passi e poi è online.",
    lead: "Un processo cordiale e senza pressioni. Il lavoro pesante lo facciamo noi; tu ci racconti solo della tua attività.",
    steps: [
      { n: "1", title: "Scoperta", body: "Una chiacchierata rilassata sulla tua attività, i tuoi clienti e ciò di cui vuoi di più." },
      { n: "2", title: "Progetto", body: "Pianifichiamo le tue pagine e scriviamo i testi, così suonano come te." },
      { n: "3", title: "Realizzazione", body: "La costruiamo veloce e curata. Il tuo sito, l'agente IA e le automazioni, tutto collegato e testato." },
      { n: "4", title: "Lancio", body: "Andiamo online insieme e ti mostriamo come gestirla. Più 30 giorni di supporto dopo il lancio." },
    ],
    note: "Ogni sito include 30 giorni di supporto dopo il lancio.",
    booking: {
      title: "Prenota il tuo appuntamento",
      place: "Clínica Bella · aperto ora",
      chooseDay: "Scegli un giorno",
      pickTime: "Scegli un orario",
      days: [
        { dn: "23", d: "Lun" },
        { dn: "24", d: "Mar" },
        { dn: "25", d: "Mer" },
        { dn: "26", d: "Gio" },
        { dn: "27", d: "Ven" },
      ],
      slots: [
        { t: "10:00", state: "taken" },
        { t: "11:30", state: "free" },
        { t: "12:00", state: "pick" },
        { t: "16:00", state: "taken" },
        { t: "17:30", state: "free" },
        { t: "18:00", state: "free" },
      ],
      cta: "Conferma prenotazione",
      confirm: "Ti inviamo un promemoria il giorno prima.",
    },
  },
  trust: {
    kicker: "Perché si fidano di noi",
    title: "Persone vere che rispondono.",
    lead: "Niente agenzia impersonale, niente call center. Un piccolo team che conosce il mercato e risponde davvero.",
    cards: [
      { icon: "star", stars: true, title: "Valutati 5 stelle", body: "Le attività locali valutano il lavoro con cinque stelle: per i risultati e per la facilità di rapporto." },
      { icon: "chat", title: "Ti raggiungono con un tocco", body: "WhatsApp e chiamata diretta integrati, così un cliente curioso diventa reale in pochi secondi." },
      { icon: "clock", title: "Sempre attivo per i tuoi clienti", body: "Un assistente IA risponde in pochi secondi, di giorno o di notte, così non perdi mai la richiesta dell'ultimo minuto." },
    ],
  },
  consultation: {
    kicker: "Consulenza gratuita",
    title: "Niente listini. Solo una chiacchierata.",
    lead: "Ogni attività è diversa, quindi anche ogni preventivo lo è. Raccontaci cosa ti serve e ti rispondiamo con un prezzo chiaro e in parole semplici, gratis e senza pressioni. La maggior parte delle consulenze dura circa 15 minuti.",
    points: [
      { title: "È gratis, sempre", body: "Una chiacchierata rilassata sulla tua attività e su ciò che vuoi di più. Senza costi, senza impegno, senza forzature." },
      { title: "Un preventivo fatto per te", body: "Paghi solo per ciò che ti serve davvero, così hai un prezzo che si adatta, non un pacchetto che non lo fa." },
      { title: "Parole semplici, niente gergo", body: "Ti spieghiamo tutto con parole che useresti tu, così sai sempre cosa ottieni." },
    ],
    cta: "Prenota una consulenza gratuita",
  },
  finalCta: {
    kicker: "Parliamone",
    title: "Portiamo la tua attività online, fatto bene.",
    body: "Raccontaci un po' di cosa fai. Ti rispondiamo con un preventivo gratuito e in parole semplici, senza gergo e senza pressioni. Di solito entro 24 ore.",
    whatsapp: "Scrivici su WhatsApp",
    email: "Oppure mandaci un'email",
    labels: { whatsapp: "WhatsApp", call: "Chiamaci", email: "Email" },
  },
  footer: {
    desc: "Un piccolo studio che usa l'IA per far crescere le piccole attività locali.",
    exploreTitle: "Esplora",
    contactTitle: "Mettiti in contatto",
    copyright: "© 2026 Kodable.ai",
    privacy: "Privacy",
    terms: "Termini",
    footnote:
      "Dietro le quinte: realizzazione assistita dall'IA, SEO locale e schema, integrazioni, backup automatici, SSL e un piano di assistenza che tiene tutto online e aggiornato. Non dovrai pensare a nulla di tutto questo. È proprio questo il punto.",
    call: "Chiama",
  },
  common: {
    backHome: "Home",
    getQuote: "Consulenza gratuita",
    seeServices: "Vedi tutti i servizi",
    bookConsult: "Prenota una consulenza gratuita",
    talkToMe: "Parla con noi",
    mostPopular: "Più popolare",
    recommended: "Consigliato",
  },
};

const content: Record<Locale, SiteContent> = { en, es, fr, de, it };

export function getSite(locale: Locale): SiteContent {
  return content[locale];
}
