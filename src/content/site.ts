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
  hero: {
    headingPre: string;
    headingHi: string;
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
  promises: {
    kicker: string;
    title: string;
    lead: string;
    items: { key: string; title: string; body: string; side: "left" | "right" }[];
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
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
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
        work: "Work",
        about: "About",
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
  hero: {
    headingPre: "We use AI to bring ",
    headingHi: "real customers",
    headingPost: " to your door.",
    sub: "We build websites, AI agents, custom tools and automations for local businesses, so more people find you, more book themselves in, and every customer gets answered, even after hours.",
    ctaPrimary: "Start your project",
    ctaSecondary: "See what you get",
  },
  chat: {
    name: "Casa del Mar",
    status: "AI assistant · replies instantly",
    them1: "Hi! Do you have a table for 4 tonight at 8?",
    you1: "Yes — a table for 4 at 8pm is free. Terrace or inside? I can book it now.",
    them2: "Terrace, please!",
    inputPlaceholder: "Message Casa del Mar…",
    alt: "A phone showing a customer messaging a restaurant late at night, and its AI assistant booking a table in seconds.",
  },
  promises: {
    kicker: "What you get",
    title: "Four plain promises. No jargon.",
    lead: "Here's what we do for you, in your own words, not web-speak.",
    items: [
      {
        key: "found",
        side: "left",
        title: "Get found",
        body: "When someone nearby searches for a business like yours, you show up, not just your competitors. Fast, and perfect on a phone.",
      },
      {
        key: "answer",
        side: "right",
        title: "Never miss a customer",
        body: "An AI assistant answers questions and takes bookings in seconds, day or night, even when you're closed.",
      },
      {
        key: "tools",
        side: "left",
        title: "Tools that fit you",
        body: "Booking apps, quote calculators, simple dashboards, built around how you actually work, not a generic subscription.",
      },
      {
        key: "automate",
        side: "right",
        title: "The busywork runs itself",
        body: "Your tools talk to each other, so bookings, payments and reminders just happen, without you in the middle.",
      },
    ],
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
      { n: "3", title: "Execution", body: "We build it fast and tidy — your site, AI agent and automations, all wired up and tested." },
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
        work: "Ejemplos",
        about: "Sobre mí",
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
  hero: {
    headingPre: "Usamos IA para traerte ",
    headingHi: "clientes de verdad",
    headingPost: " a tu puerta.",
    sub: "Creamos webs, agentes de IA, herramientas a medida y automatizaciones para negocios locales, para que más gente te encuentre, más reserve sola y cada cliente reciba respuesta, incluso fuera de hora.",
    ctaPrimary: "Empieza tu proyecto",
    ctaSecondary: "Mira lo que incluye",
  },
  chat: {
    name: "Casa del Mar",
    status: "Asistente IA · responde al instante",
    them1: "¡Hola! ¿Tenéis mesa para 4 esta noche a las 8?",
    you1: "Sí — hay mesa para 4 a las 20:00. ¿Terraza o dentro? Te la reservo ahora.",
    them2: "¡En la terraza, por favor!",
    inputPlaceholder: "Escribe a Casa del Mar…",
    alt: "Un móvil donde un cliente escribe a un restaurante de noche y su asistente de IA le reserva una mesa en segundos.",
  },
  promises: {
    kicker: "Lo que consigues",
    title: "Cuatro promesas claras. Sin tecnicismos.",
    lead: "Esto es lo que hacemos por ti, en tus palabras, no en jerga web.",
    items: [
      {
        key: "found",
        side: "left",
        title: "Que te encuentren",
        body: "Cuando alguien cerca busca un negocio como el tuyo, apareces tú, no solo tu competencia. Rápido y perfecto en el móvil.",
      },
      {
        key: "answer",
        side: "right",
        title: "No pierdas ni un cliente",
        body: "Un asistente de IA responde preguntas y coge reservas en segundos, de día o de noche, incluso cuando estás cerrado.",
      },
      {
        key: "tools",
        side: "left",
        title: "Herramientas a tu medida",
        body: "Apps de reservas, calculadoras de presupuesto y paneles sencillos, hechos a la medida de cómo trabajas, no una suscripción genérica.",
      },
      {
        key: "automate",
        side: "right",
        title: "El trabajo repetitivo se hace solo",
        body: "Tus herramientas se hablan entre ellas, así que reservas, pagos y recordatorios pasan solos, sin ti en medio.",
      },
    ],
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
      { n: "3", title: "Construcción", body: "La construimos rápida y ordenada — tu web, el agente de IA y las automatizaciones, todo conectado y probado." },
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

const content: Record<Locale, SiteContent> = { en, es };

export function getSite(locale: Locale): SiteContent {
  return content[locale];
}
