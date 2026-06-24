import type { Locale } from "@/i18n/config";

export type ServiceSlug =
  | "websites"
  | "ai-agents"
  | "custom-tools"
  | "automations";

export interface Service {
  slug: ServiceSlug;
  icon: "globe" | "chat" | "layers" | "code";
  bucket: string;
  title: string;
  tagline: string;
  intro: string;
  included: string[];
  whoFor: string;
  underTheHood: string[];
  cta: string;
}

export const serviceSlugs: ServiceSlug[] = [
  "websites",
  "ai-agents",
  "custom-tools",
  "automations",
];

const en: Record<ServiceSlug, Service> = {
  websites: {
    slug: "websites",
    icon: "globe",
    bucket: "Get found & get chosen",
    title: "Websites",
    tagline: "A fast, AI-built site that shows up when people search nearby, and turns a curious visitor into a booking.",
    intro:
      "Your website is the first impression most customers ever get of you. We build you one that looks established, loads in a blink, and comes up when someone nearby searches for what you do. Because AI does the heavy lifting, it's ready in days, not months, and every page points at the one thing you want them to do: book, order, call or message.",
    included: [
      "Looks established and professional from the very first second",
      "Comes up when people nearby search for what you do",
      "Loads instantly, so nobody waits around for a slow site",
      "Book, order, call or message in one tap, even after hours",
      "Ready in days, not months, because AI does the heavy lifting",
    ],
    whoFor: "Businesses launching a new site, or replacing a dated, templated one.",
    underTheHood: [
      "AI-assisted build on Next.js",
      "Local SEO, schema & Google Business Profile",
      "Core Web Vitals & accessibility to WCAG AA",
    ],
    cta: "Build my site",
  },
  "ai-agents": {
    slug: "ai-agents",
    icon: "chat",
    bucket: "Answer everyone, 24/7",
    title: "AI Agents",
    tagline: "A friendly assistant that answers customers, takes bookings and handles reception, on WhatsApp and your site, even at midnight.",
    intro:
      "Most enquiries arrive when you're busy or closed, and a question left unanswered is a customer lost. We set up a friendly assistant that replies in seconds, books appointments itself, and handles the questions you get asked all day: hours, prices, where you are. When something needs you, it hands the conversation straight over. It sounds like your business, not a robot.",
    included: [
      "Replies in seconds, day or night",
      "Books appointments and tables by itself",
      "Answers the same questions you get asked all day",
      "Hands the conversation to you the moment it matters",
      "Works on WhatsApp and right on your site",
    ],
    whoFor: "Businesses drowning in repeat questions, or losing after-hours enquiries.",
    underTheHood: [
      "Conversational AI, tuned to your business",
      "WhatsApp Business & on-site chat",
      "Booking integrations with human handoff",
    ],
    cta: "Set up my agent",
  },
  "custom-tools": {
    slug: "custom-tools",
    icon: "layers",
    bucket: "Software that fits exactly",
    title: "Custom Tools & Apps",
    tagline: "Booking apps, quote calculators, simple dashboards and internal tools, built around how you actually work.",
    intro:
      "Off-the-shelf apps rarely fit a real business, and the ones that do cost a fortune. Because AI lets us build fast, we can make the exact tool you need: an ordering app branded as yours, a quote calculator customers fill in themselves, a simple dashboard of what actually matters, or an internal tool that kills the busywork. Yours, not a one-size-fits-all subscription.",
    included: [
      "A booking or ordering app branded as yours",
      "A quote calculator customers fill in themselves",
      "A simple dashboard of the numbers that matter",
      "Internal tools that cut the daily busywork",
      "Built fast, because AI does the heavy lifting",
    ],
    whoFor: "Owners outgrowing spreadsheets, or apps that don't quite fit.",
    underTheHood: [
      "Custom React / Next.js apps",
      "Secure data, logins & roles",
      "AI-assisted development",
    ],
    cta: "Build my tool",
  },
  automations: {
    slug: "automations",
    icon: "code",
    bucket: "Save hours every week",
    title: "Automations & Integrations",
    tagline: "Connect the tools you already use (Stripe, WhatsApp, email, Google) so the busywork runs itself.",
    intro:
      "Every week you lose hours copying things between apps and chasing what slipped through. We wire your tools together so the busywork runs itself: a booking lands straight in your calendar, a payment sends its own receipt, a new enquiry goes where you'll see it, and reminders go out without you lifting a finger. You stop being the glue between your apps.",
    included: [
      "Bookings drop straight into your calendar",
      "Payments and receipts handled automatically",
      "New enquiries land where you'll actually see them",
      "Reminders and follow-ups sent without you lifting a finger",
      "Your tools finally talk to each other",
    ],
    whoFor: "Owners copy-pasting between apps, or forgetting follow-ups.",
    underTheHood: [
      "Integrations with Stripe, WhatsApp, Google & email",
      "Workflow automation & webhooks",
      "Reliable, monitored connections",
    ],
    cta: "Automate my busywork",
  },
};

const es: Record<ServiceSlug, Service> = {
  websites: {
    slug: "websites",
    icon: "globe",
    bucket: "Que te encuentren y te elijan",
    title: "Webs",
    tagline: "Una web rápida, hecha con IA, que aparece cuando buscan cerca de ti y convierte a un visitante curioso en una reserva.",
    intro:
      "Tu web es la primera impresión que la mayoría de clientes tendrá de ti. Te construimos una que parece establecida, carga en un parpadeo y aparece cuando alguien cerca busca lo que haces. Como la IA hace el trabajo pesado, está lista en días, no en meses, y cada página apunta a lo único que quieres que hagan: reservar, pedir, llamar o escribir.",
    included: [
      "Parece establecida y profesional desde el primer segundo",
      "Aparece cuando la gente cerca busca lo que haces",
      "Carga al instante, nadie espera una web lenta",
      "Reservar, pedir, llamar o escribir con un toque, incluso fuera de hora",
      "Lista en días, no en meses, porque la IA hace el trabajo pesado",
    ],
    whoFor: "Negocios que lanzan una web nueva o sustituyen una antigua y de plantilla.",
    underTheHood: [
      "Construcción asistida por IA sobre Next.js",
      "SEO local, schema y Perfil de Empresa en Google",
      "Core Web Vitals y accesibilidad nivel WCAG AA",
    ],
    cta: "Construye mi web",
  },
  "ai-agents": {
    slug: "ai-agents",
    icon: "chat",
    bucket: "Atiende a todos, 24/7",
    title: "Agentes IA",
    tagline: "Un asistente cercano que atiende a tus clientes, coge reservas y hace de recepción, en WhatsApp y en tu web, incluso a medianoche.",
    intro:
      "La mayoría de las consultas llegan cuando estás ocupado o cerrado, y una pregunta sin responder es un cliente perdido. Configuramos un asistente cercano que responde en segundos, reserva citas solo y atiende las preguntas de siempre: horarios, precios, dónde estás. Cuando algo te necesita, te pasa la conversación directamente. Suena a tu negocio, no a un robot.",
    included: [
      "Responde en segundos, de día o de noche",
      "Reserva citas y mesas por sí solo",
      "Contesta las preguntas de siempre que te hacen todo el día",
      "Te pasa la conversación en cuanto importa",
      "Funciona en WhatsApp y en tu propia web",
    ],
    whoFor: "Negocios que se ahogan en preguntas repetidas o pierden consultas fuera de hora.",
    underTheHood: [
      "IA conversacional, ajustada a tu negocio",
      "WhatsApp Business y chat en la web",
      "Integración con reservas y paso a una persona",
    ],
    cta: "Configura mi agente",
  },
  "custom-tools": {
    slug: "custom-tools",
    icon: "layers",
    bucket: "Software a tu medida",
    title: "Herramientas y apps a medida",
    tagline: "Apps de reservas, calculadoras de presupuesto, paneles sencillos y herramientas internas, hechas a la medida de cómo trabajas.",
    intro:
      "Las apps genéricas rara vez encajan en un negocio real, y las que lo hacen cuestan una fortuna. Como la IA nos deja construir rápido, podemos hacer la herramienta exacta que necesitas: una app de pedidos con tu marca, una calculadora de presupuestos que rellenan tus clientes, un panel sencillo con lo que de verdad importa o una herramienta interna que acaba con el trabajo repetitivo. Tuya, no una suscripción genérica.",
    included: [
      "Una app de reservas o pedidos con tu marca",
      "Una calculadora de presupuestos que rellenan tus clientes",
      "Un panel sencillo con los números que importan",
      "Herramientas internas que recortan el trabajo diario",
      "Construido rápido, porque la IA hace el trabajo pesado",
    ],
    whoFor: "Dueños que se quedan cortos con hojas de cálculo, o con apps que no acaban de encajar.",
    underTheHood: [
      "Apps a medida en React / Next.js",
      "Datos seguros, accesos y permisos",
      "Desarrollo asistido por IA",
    ],
    cta: "Construye mi herramienta",
  },
  automations: {
    slug: "automations",
    icon: "code",
    bucket: "Ahorra horas cada semana",
    title: "Automatizaciones e integraciones",
    tagline: "Conecta las herramientas que ya usas (Stripe, WhatsApp, email, Google) para que el trabajo repetitivo se haga solo.",
    intro:
      "Cada semana pierdes horas copiando cosas entre apps y persiguiendo lo que se escapa. Conectamos tus herramientas para que el trabajo repetitivo se haga solo: una reserva entra directa en tu calendario, un pago manda su propio recibo, una consulta nueva llega donde la verás y los recordatorios salen sin que muevas un dedo. Dejas de ser el nexo entre tus apps.",
    included: [
      "Las reservas entran directas en tu calendario",
      "Pagos y recibos gestionados automáticamente",
      "Las consultas nuevas llegan donde de verdad las verás",
      "Recordatorios y seguimientos enviados sin que muevas un dedo",
      "Tus herramientas por fin se hablan entre ellas",
    ],
    whoFor: "Dueños que copian y pegan entre apps, o que se olvidan de los seguimientos.",
    underTheHood: [
      "Integraciones con Stripe, WhatsApp, Google y email",
      "Automatización de flujos y webhooks",
      "Conexiones fiables y monitorizadas",
    ],
    cta: "Automatiza lo repetitivo",
  },
};

const content: Record<Locale, Record<ServiceSlug, Service>> = { en, es };

export function getServices(locale: Locale): Service[] {
  return serviceSlugs.map((slug) => content[locale][slug]);
}

export function getService(locale: Locale, slug: string): Service | undefined {
  if (!(slug in content[locale])) return undefined;
  return content[locale][slug as ServiceSlug];
}
