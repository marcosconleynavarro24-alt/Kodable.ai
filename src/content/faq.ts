import type { Locale } from "@/i18n/config";

export interface FaqItem {
  q: string;
  a: string;
}

const en: FaqItem[] = [
  {
    q: "What exactly do you do?",
    a: "We use AI to build the things a small business needs to grow: a fast website, an AI assistant that answers customers and takes bookings, custom tools like booking or ordering apps, and automations that connect the apps you already use. You can start with one and add the rest when you're ready.",
  },
  {
    q: "Is the AI any good — won't it sound like a robot?",
    a: "We tune each assistant to your business, your tone and your real answers, so it sounds like you, not a generic bot. It handles the routine questions and bookings, and the moment something needs a human, it hands the conversation straight to you.",
  },
  {
    q: "How long does it take?",
    a: "Faster than you'd expect, because AI does the heavy lifting. Most websites are live within a couple of weeks; a simple AI assistant or automation can be ready in days. We'll give you a clear timeline after a quick chat.",
  },
  {
    q: "Do I need to know anything technical?",
    a: "Not a thing. You tell us about your business in plain words; we handle the hosting, the domain, the AI setup, the lot. When it's live, we show you the few simple bits you might want to change yourself, like your hours or photos.",
  },
  {
    q: "What happens after launch?",
    a: "We don't disappear. Every build ships with a care plan that keeps it online, safe, backed up and updated, and we actually answer when you need a change, usually within 24 hours. That's where hosting and maintenance live now.",
  },
  {
    q: "How much does it cost?",
    a: "Every project is quoted individually, after a free consultation, so you only pay for what you actually need rather than a fixed package. Tell us about your business and we'll send back a clear, jargon-free price, free and with no pressure. No price lists, no surprises.",
  },
];

const es: FaqItem[] = [
  {
    q: "¿Qué hacéis exactamente?",
    a: "Usamos IA para construir lo que un pequeño negocio necesita para crecer: una web rápida, un asistente de IA que atiende a los clientes y coge reservas, herramientas a medida como apps de reservas o pedidos, y automatizaciones que conectan las apps que ya usas. Puedes empezar con una y añadir el resto cuando quieras.",
  },
  {
    q: "¿La IA es buena? ¿No sonará a robot?",
    a: "Ajustamos cada asistente a tu negocio, tu tono y tus respuestas reales, así que suena a ti, no a un bot genérico. Se ocupa de las preguntas y reservas de siempre, y en cuanto algo necesita a una persona, te pasa la conversación directamente.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "Más rápido de lo que crees, porque la IA hace el trabajo pesado. La mayoría de webs están online en un par de semanas; un asistente de IA o una automatización sencilla pueden estar listos en días. Te damos un plazo claro tras una charla rápida.",
  },
  {
    q: "¿Necesito saber de tecnología?",
    a: "Nada de nada. Tú nos cuentas sobre tu negocio en palabras normales; nosotros nos ocupamos del hosting, el dominio, la configuración de la IA, todo. Cuando esté online, te enseñamos las pocas cosas sencillas que quizá quieras cambiar tú, como tus horarios o las fotos.",
  },
  {
    q: "¿Qué pasa después del lanzamiento?",
    a: "No desaparecemos. Cada proyecto incluye un plan de cuidado que lo mantiene online, seguro, con copias y actualizado, y respondemos de verdad cuando necesitas un cambio, normalmente en 24 horas. Ahí es donde viven ahora el hosting y el mantenimiento.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Cada proyecto se presupuesta de forma individual, tras una consulta gratis, así pagas solo por lo que de verdad necesitas en lugar de un paquete cerrado. Cuéntanos sobre tu negocio y te devolvemos un precio claro y en lenguaje sencillo, gratis y sin presión. Sin listas de precios, sin sorpresas.",
  },
];

const content: Record<Locale, FaqItem[]> = { en, es };

export function getFaq(locale: Locale): FaqItem[] {
  return content[locale];
}
