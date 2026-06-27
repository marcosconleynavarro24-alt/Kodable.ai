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
    label: string;
  };
  problem: {
    kicker: string;
    title: string;
    body: string[];
    stakePre: string;
    stakeHi: string;
    stakePost: string;
  };
  guide: {
    kicker: string;
    title: string;
    body: string[];
  };
  plan: {
    kicker: string;
    title: string;
    lead: string;
    steps: { n: string; title: string; body: string }[];
    cta: string;
  };
  vision: {
    kicker: string;
    title: string;
    body: string[];
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
  { key: "blog", href: "/blog" },
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
        blog: "Blog",
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
    servicesTitle: "Everything you need to get found, get booked, and stop losing hours to busywork.",
    servicesLead: "Start with what you need now. Add the rest when you're ready.",
    faqKicker: "Common questions",
    faqTitle: "Still not sure? Here's what most people want to know first.",
    faqSeeAll: "See all questions",
  },
  hero: {
    headingPre: "Your competitor just got the ",
    headingHi: "booking",
    headingMid: ". You got the ",
    headingHi2: "voicemail",
    headingPost: ".",
    sub: "When someone nearby searches for what you do, they pick the business with a fast site, instant replies, and easy booking. We make sure that business is yours, without you touching a line of code.",
    ctaPrimary: "Book a free 15-minute chat",
    ctaSecondary: "See how it works",
    label: "This is what your customers experience.",
  },
  problem: {
    kicker: "Sound familiar?",
    title: "Running a local business is hard enough.",
    body: [
      "You shouldn't also have to worry about your website being slow, calls going unanswered after hours, or losing a booking because replying took too long.",
      "Most small businesses aren't losing to better businesses. They're losing to better-looking ones, ones with slick sites, instant responses, and booking systems that work around the clock.",
    ],
    stakePre: "You're better than that. You just need the ",
    stakeHi: "tools to show it",
    stakePost: ".",
  },
  guide: {
    kicker: "Why Kodable",
    title: "We've been where you are.",
    body: [
      "We're a small studio that's helped local restaurants, clinics, tradespeople and shops look as sharp online as the work they do in person, using AI to do it faster and more affordably than a traditional agency ever could.",
      "We don't do jargon. We don't do unnecessary complexity. And we don't disappear after launch. You tell us about your business in plain words. We handle everything else.",
    ],
  },
  plan: {
    kicker: "The plan",
    title: "Getting started takes 15 minutes. Everything else is on us.",
    lead: "Most people put off improving their online presence because it feels complicated, expensive, or like it'll take forever. It doesn't have to.",
    steps: [
      { n: "1", title: "Tell us about your business", body: "A relaxed 15-minute chat about what you do, who you serve, and what's not working right now. No jargon, no cost, no commitment." },
      { n: "2", title: "We build and launch", body: "We handle everything: the site, the AI setup, the integrations, the hosting. You get a clear timeline and a plain-language quote before we start anything." },
      { n: "3", title: "You get more customers", body: "Your site finds people searching nearby. Your AI agent answers them instantly. Your calendar fills itself. You get on with running your business." },
    ],
    cta: "Book your free 15-minute chat",
  },
  vision: {
    kicker: "Picture this",
    title: "Imagine finishing a Tuesday like this.",
    body: [
      "You wrap up at 6. You check your phone. Three new bookings are in your calendar: people who found you on Google, had their questions answered by your AI assistant, and booked themselves in while you were with another customer.",
      "No missed calls. No chasing enquiries. No Sunday evening catching up on messages.",
      "That's what Kodable sets up. And it keeps running after we're done.",
    ],
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
    title: "Every week without this is a booking someone else is getting.",
    body: "When a customer searches nearby and books the competitor with a faster site and instant replies, it isn't because they were better. It's because they were easier to find and faster to answer. That's fixable, and it starts with a 15-minute chat that costs nothing.",
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
        blog: "Blog",
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
    servicesTitle: "Todo lo que necesitas para que te encuentren, te reserven y dejar de perder horas en tareas que no llevan a nada.",
    servicesLead: "Empieza por lo que necesitas ahora. Añade el resto cuando quieras.",
    faqKicker: "Preguntas frecuentes",
    faqTitle: "¿Aún con dudas? Esto es lo que casi todo el mundo quiere saber primero.",
    faqSeeAll: "Ver todas las preguntas",
  },
  hero: {
    headingPre: "Tu competencia se ha llevado la ",
    headingHi: "reserva",
    headingMid: ". A ti te ha quedado el ",
    headingHi2: "buzón de voz",
    headingPost: ".",
    sub: "Cuando alguien cerca busca lo que tú haces, elige al negocio con una web rápida, respuestas al instante y reserva fácil. Nos aseguramos de que ese negocio seas tú, sin que toques una sola línea de código.",
    ctaPrimary: "Reserva una charla gratis de 15 minutos",
    ctaSecondary: "Mira cómo funciona",
    label: "Esto es lo que viven tus clientes.",
  },
  problem: {
    kicker: "¿Te suena?",
    title: "Llevar un negocio local ya es bastante duro.",
    body: [
      "Encima no deberías tener que preocuparte por si tu web va lenta, por las llamadas que se quedan sin responder fuera de horario o por perder una reserva porque tardaste demasiado en contestar.",
      "La mayoría de pequeños negocios no pierden frente a negocios mejores. Pierden frente a los que se ven mejor, los que tienen webs cuidadas, respuestas al instante y sistemas de reserva que funcionan a todas horas.",
    ],
    stakePre: "Tú vales más que eso. Solo te faltan las ",
    stakeHi: "herramientas para demostrarlo",
    stakePost: ".",
  },
  guide: {
    kicker: "Por qué Kodable",
    title: "Hemos estado donde estás tú.",
    body: [
      "Somos un pequeño estudio que ha ayudado a restaurantes, clínicas, profesionales de oficios y comercios locales a verse online tan bien como el trabajo que hacen en persona, usando IA para hacerlo más rápido y más asequible de lo que jamás podría una agencia tradicional.",
      "Nada de jerga. Nada de complicaciones innecesarias. Y no desaparecemos después de lanzar. Tú nos cuentas tu negocio con palabras normales. De todo lo demás nos encargamos nosotros.",
    ],
  },
  plan: {
    kicker: "El plan",
    title: "Empezar son 15 minutos. De todo lo demás nos encargamos nosotros.",
    lead: "La mayoría de la gente va aplazando lo de mejorar su presencia online porque le parece complicado, caro o que va a tardar una eternidad. No tiene por qué.",
    steps: [
      { n: "1", title: "Cuéntanos tu negocio", body: "Una charla tranquila de 15 minutos sobre lo que haces, a quién atiendes y qué no está funcionando ahora mismo. Sin jerga, sin coste y sin compromiso." },
      { n: "2", title: "Lo construimos y lo lanzamos", body: "Nos encargamos de todo: la web, la IA, las integraciones, el hosting. Tú recibes un plazo claro y un presupuesto en lenguaje sencillo antes de empezar nada." },
      { n: "3", title: "Te llegan más clientes", body: "Tu web encuentra a quien busca cerca. Tu agente de IA le responde al instante. Tu agenda se llena sola. Y tú, a lo tuyo: a llevar tu negocio." },
    ],
    cta: "Reserva tu charla gratis de 15 minutos",
  },
  vision: {
    kicker: "Imagínate esto",
    title: "Imagina terminar un martes así.",
    body: [
      "Cierras a las 6. Miras el móvil. Tienes tres reservas nuevas en la agenda: gente que te encontró en Google, que resolvió sus dudas con tu asistente de IA y que se apuntó sola mientras tú estabas con otro cliente.",
      "Sin llamadas perdidas. Sin perseguir consultas. Sin el domingo por la tarde poniéndote al día con los mensajes.",
      "Eso es lo que monta Kodable. Y sigue funcionando cuando nosotros ya hemos terminado.",
    ],
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
    title: "Cada semana sin esto es una reserva que se está llevando otro.",
    body: "Cuando un cliente busca cerca y reserva con la competencia, que tiene una web más rápida y responde al instante, no es porque fueran mejores: es porque eran más fáciles de encontrar y más rápidos respondiendo. Eso tiene solución, y empieza con una charla de 15 minutos que no te cuesta nada.",
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
        blog: "Blog",
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
    servicesTitle: "Tout ce qu'il vous faut pour être trouvé, être réservé, et arrêter de perdre des heures sur des tâches répétitives.",
    servicesLead: "Commencez par ce dont vous avez besoin maintenant. Ajoutez le reste quand vous serez prêt.",
    faqKicker: "Questions fréquentes",
    faqTitle: "Encore un doute ? Voici ce que la plupart des gens veulent savoir en premier.",
    faqSeeAll: "Voir toutes les questions",
  },
  hero: {
    headingPre: "Votre concurrent vient de décrocher la ",
    headingHi: "réservation",
    headingMid: ". Vous, vous avez eu la ",
    headingHi2: "messagerie",
    headingPost: ".",
    sub: "Quand quelqu'un près de chez vous cherche ce que vous proposez, il choisit l'entreprise au site rapide, aux réponses instantanées et à la réservation facile. Nous faisons en sorte que cette entreprise, ce soit la vôtre, sans que vous touchiez la moindre ligne de code.",
    ctaPrimary: "Réservez un échange gratuit de 15 minutes",
    ctaSecondary: "Voir comment ça marche",
    label: "Voilà ce que vivent vos clients.",
  },
  problem: {
    kicker: "Ça vous parle ?",
    title: "Gérer une entreprise locale, c'est déjà bien assez dur.",
    body: [
      "Vous ne devriez pas avoir, en plus, à vous soucier d'un site trop lent, d'appels sans réponse après la fermeture, ou d'une réservation perdue parce que vous avez mis trop de temps à répondre.",
      "La plupart des petites entreprises ne perdent pas face à de meilleures entreprises. Elles perdent face à des entreprises qui ont meilleure allure, un site soigné, des réponses instantanées et des réservations qui tournent jour et nuit.",
    ],
    stakePre: "Vous valez mieux que ça. Il vous manque juste les ",
    stakeHi: "bons outils pour le montrer",
    stakePost: ".",
  },
  guide: {
    kicker: "Pourquoi Kodable",
    title: "On est passé par là, nous aussi.",
    body: [
      "Nous sommes un petit studio qui a aidé restaurants, cliniques, artisans et commerces de quartier à être aussi soignés en ligne que le travail qu'ils font en personne, en utilisant l'IA pour le faire plus vite et à un prix bien plus abordable qu'une agence traditionnelle.",
      "Pas de jargon. Pas de complexité inutile. Et on ne disparaît pas une fois le site lancé. Vous nous parlez de votre activité avec des mots simples. On s'occupe de tout le reste.",
    ],
  },
  plan: {
    kicker: "Le plan",
    title: "Démarrer prend 15 minutes. Tout le reste, c'est pour nous.",
    lead: "La plupart des gens repoussent l'amélioration de leur présence en ligne parce que ça semble compliqué, cher, ou interminable. Pourtant, ça n'a rien d'une fatalité.",
    steps: [
      { n: "1", title: "Parlez-nous de votre activité", body: "Un échange détendu de 15 minutes sur ce que vous faites, à qui vous vous adressez, et ce qui coince en ce moment. Sans jargon, sans frais, sans engagement." },
      { n: "2", title: "On construit et on lance", body: "On s'occupe de tout : le site, la configuration de l'IA, les intégrations, l'hébergement. Vous recevez un calendrier clair et un devis en langage simple avant qu'on ne commence quoi que ce soit." },
      { n: "3", title: "Vous gagnez plus de clients", body: "Votre site trouve les gens qui cherchent près de chez vous. Votre agent IA leur répond instantanément. Votre agenda se remplit tout seul. Vous, vous continuez à faire tourner votre entreprise." },
    ],
    cta: "Réservez votre échange gratuit de 15 minutes",
  },
  vision: {
    kicker: "Imaginez",
    title: "Imaginez terminer un mardi comme celui-ci.",
    body: [
      "Vous bouclez à 18 h. Vous jetez un œil à votre téléphone. Trois nouvelles réservations sont déjà dans votre agenda, des gens qui vous ont trouvé sur Google, ont obtenu des réponses de votre assistant IA, et ont réservé eux-mêmes pendant que vous étiez avec un autre client.",
      "Aucun appel manqué. Aucune demande à relancer. Aucun dimanche soir à rattraper ses messages.",
      "C'est ça que Kodable met en place. Et ça continue de tourner une fois qu'on a fini.",
    ],
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
    title: "Chaque semaine sans ça, c'est une réservation qui part chez un autre.",
    body: "Quand un client cherche près de chez vous et réserve chez le concurrent au site plus rapide et aux réponses instantanées, ce n'est pas parce qu'il était meilleur, c'est parce qu'il était plus facile à trouver et plus rapide à répondre. Ça se corrige, et ça commence par un échange de 15 minutes qui ne coûte rien.",
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
        blog: "Blog",
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
    servicesTitle: "Alles, was du brauchst, um gefunden und gebucht zu werden, und keine Stunden mehr mit Kleinkram zu verlieren.",
    servicesLead: "Fang mit dem an, was du jetzt brauchst. Den Rest holst du dir, wenn du bereit bist.",
    faqKicker: "Häufige Fragen",
    faqTitle: "Noch unsicher? Das wollen die meisten zuerst wissen.",
    faqSeeAll: "Alle Fragen ansehen",
  },
  hero: {
    headingPre: "Dein Mitbewerber hat gerade die ",
    headingHi: "Buchung",
    headingMid: " bekommen. Du nur die ",
    headingHi2: "Mailbox",
    headingPost: ".",
    sub: "Wenn jemand in deiner Nähe nach dem sucht, was du machst, wählt er das Geschäft mit der schnellen Seite, sofortigen Antworten und einfacher Buchung. Wir sorgen dafür, dass das dein Geschäft ist, ohne dass du auch nur eine Zeile Code anfassen musst.",
    ctaPrimary: "Buch dir ein kostenloses 15-Minuten-Gespräch",
    ctaSecondary: "So funktioniert's",
    label: "Genau das erleben deine Kunden.",
  },
  problem: {
    kicker: "Kommt dir das bekannt vor?",
    title: "Ein lokales Geschäft zu führen ist schon hart genug.",
    body: [
      "Du solltest dir nicht auch noch Sorgen machen müssen, dass deine Website lahm ist, Anrufe nach Feierabend ins Leere laufen oder du eine Buchung verlierst, weil die Antwort zu lange gedauert hat.",
      "Die meisten kleinen Geschäfte verlieren nicht gegen die besseren. Sie verlieren gegen die, die besser aussehen, mit schicken Seiten, sofortigen Antworten und Buchungssystemen, die rund um die Uhr laufen.",
    ],
    stakePre: "Das hast du nicht nötig. Dir fehlen nur die ",
    stakeHi: "Mittel, um es zu zeigen",
    stakePost: ".",
  },
  guide: {
    kicker: "Warum Kodable",
    title: "Wir waren schon da, wo du jetzt stehst.",
    body: [
      "Wir sind ein kleines Studio und haben lokalen Restaurants, Praxen, Handwerkern und Läden geholfen, online genauso überzeugend rüberzukommen wie bei ihrer Arbeit vor Ort, mit KI, schneller und günstiger, als es eine klassische Agentur je könnte.",
      "Wir machen keinen Fachjargon. Wir machen keine unnötige Komplexität. Und wir verschwinden nicht nach dem Launch. Du erzählst uns mit einfachen Worten von deinem Geschäft. Um alles andere kümmern wir uns.",
    ],
  },
  plan: {
    kicker: "Der Plan",
    title: "Der Start dauert 15 Minuten. Den Rest übernehmen wir.",
    lead: "Die meisten schieben es auf, ihren Online-Auftritt zu verbessern, weil es kompliziert, teuer oder als würde es ewig dauern wirkt. Muss es aber nicht.",
    steps: [
      { n: "1", title: "Erzähl uns von deinem Geschäft", body: "Ein entspanntes 15-Minuten-Gespräch darüber, was du machst, für wen du da bist und was gerade nicht rundläuft. Kein Fachjargon, keine Kosten, keine Verpflichtung." },
      { n: "2", title: "Wir bauen und gehen live", body: "Wir kümmern uns um alles: die Seite, die KI-Einrichtung, die Integrationen, das Hosting. Du bekommst einen klaren Zeitplan und ein Angebot in verständlicher Sprache, bevor wir irgendwas anfangen." },
      { n: "3", title: "Du bekommst mehr Kunden", body: "Deine Seite findet Leute, die in der Nähe suchen. Dein KI-Agent antwortet ihnen sofort. Dein Kalender füllt sich von selbst. Und du kümmerst dich um dein Geschäft." },
    ],
    cta: "Buch dir dein kostenloses 15-Minuten-Gespräch",
  },
  vision: {
    kicker: "Stell dir das vor",
    title: "Stell dir vor, du beendest einen Dienstag so.",
    body: [
      "Du machst um 18 Uhr Feierabend. Du schaust aufs Handy. Drei neue Buchungen stehen in deinem Kalender: Leute, die dich bei Google gefunden haben, deren Fragen dein KI-Assistent beantwortet hat und die sich selbst eingetragen haben, während du bei einem anderen Kunden warst.",
      "Keine verpassten Anrufe. Kein Hinterherrennen bei Anfragen. Kein Sonntagabend, an dem du Nachrichten aufarbeitest.",
      "Genau das richtet Kodable ein. Und es läuft weiter, wenn wir längst fertig sind.",
    ],
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
    title: "Jede Woche ohne das ist eine Buchung, die jemand anderes bekommt.",
    body: "Wenn ein Kunde in der Nähe sucht und beim Mitbewerber mit der schnelleren Seite und den sofortigen Antworten bucht, dann nicht, weil der besser war, sondern weil er leichter zu finden und schneller zu erreichen war. Das lässt sich beheben, und es fängt mit einem 15-Minuten-Gespräch an, das nichts kostet.",
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
        blog: "Blog",
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
    servicesTitle: "Tutto quello che ti serve per farti trovare, riempire l'agenda e smettere di perdere ore in cose inutili.",
    servicesLead: "Inizia da ciò che ti serve ora. Aggiungi il resto quando sei pronto.",
    faqKicker: "Domande frequenti",
    faqTitle: "Hai ancora dei dubbi? Ecco cosa vogliono sapere quasi tutti, prima di tutto.",
    faqSeeAll: "Vedi tutte le domande",
  },
  hero: {
    headingPre: "Il tuo concorrente ha appena preso la ",
    headingHi: "prenotazione",
    headingMid: ". Tu ti ritrovi con la ",
    headingHi2: "segreteria",
    headingPost: ".",
    sub: "Quando qualcuno qui vicino cerca quello che fai, sceglie l'attività con il sito veloce, le risposte immediate e la prenotazione facile. Noi facciamo in modo che quell'attività sia la tua, senza che tu tocchi una sola riga di codice.",
    ctaPrimary: "Prenota una chiacchierata gratis di 15 minuti",
    ctaSecondary: "Guarda come funziona",
    label: "Questo è ciò che vivono i tuoi clienti.",
  },
  problem: {
    kicker: "Ti suona familiare?",
    title: "Mandare avanti un'attività locale è già abbastanza difficile.",
    body: [
      "Non dovresti anche preoccuparti di un sito lento, delle chiamate che restano senza risposta dopo l'orario, o di una prenotazione persa perché hai risposto troppo tardi.",
      "Quasi nessuna piccola attività perde contro chi lavora meglio. Perde contro chi si presenta meglio, chi ha siti curati, risposte immediate e sistemi di prenotazione che lavorano giorno e notte.",
    ],
    stakePre: "Tu vali di più di così. Ti servono solo gli ",
    stakeHi: "strumenti per dimostrarlo",
    stakePost: ".",
  },
  guide: {
    kicker: "Perché Kodable",
    title: "Siamo passati anche noi da dove sei tu.",
    body: [
      "Siamo uno studio piccolo che ha aiutato ristoranti, cliniche, artigiani e negozi di quartiere a essere online curati quanto il lavoro che fanno di persona, usando l'IA per farlo più in fretta e a un costo più accessibile di quanto potrebbe mai un'agenzia tradizionale.",
      "Niente gergo. Niente complicazioni inutili. E non spariamo dopo il lancio. Tu ci racconti la tua attività con parole semplici. A tutto il resto pensiamo noi.",
    ],
  },
  plan: {
    kicker: "Il piano",
    title: "Per partire bastano 15 minuti. Al resto pensiamo noi.",
    lead: "Quasi tutti rimandano il momento di migliorare la propria presenza online perché sembra complicato, costoso o lunghissimo. Non deve essere così.",
    steps: [
      { n: "1", title: "Raccontaci la tua attività", body: "Una chiacchierata rilassata di 15 minuti su cosa fai, chi servi e cosa al momento non funziona. Niente gergo, niente costi, nessun impegno." },
      { n: "2", title: "Costruiamo e lanciamo", body: "Pensiamo a tutto noi: il sito, l'impostazione dell'IA, le integrazioni, l'hosting. Tu ricevi tempi chiari e un preventivo in parole semplici prima che iniziamo qualsiasi cosa." },
      { n: "3", title: "Arrivano più clienti", body: "Il tuo sito intercetta chi cerca qui vicino. Il tuo agente IA risponde all'istante. L'agenda si riempie da sola. Tu pensi a mandare avanti la tua attività." },
    ],
    cta: "Prenota la tua chiacchierata gratis di 15 minuti",
  },
  vision: {
    kicker: "Immagina",
    title: "Immagina di chiudere un martedì così.",
    body: [
      "Stacchi alle 18. Guardi il telefono. In agenda ci sono tre nuove prenotazioni: persone che ti hanno trovato su Google, hanno avuto risposta dal tuo assistente IA e si sono prenotate da sole mentre eri con un altro cliente.",
      "Nessuna chiamata persa. Nessuna richiesta da rincorrere. Nessuna domenica sera passata a recuperare i messaggi.",
      "Questo è ciò che Kodable ti mette in piedi. E continua a funzionare anche dopo che abbiamo finito.",
    ],
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
    title: "Ogni settimana senza tutto questo è una prenotazione che sta prendendo qualcun altro.",
    body: "Quando un cliente cerca qui vicino e prenota dal concorrente con il sito più veloce e le risposte immediate, non è perché era migliore, è perché era più facile da trovare e più rapido a rispondere. Si può risolvere, e parte da una chiacchierata di 15 minuti che non costa niente.",
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
