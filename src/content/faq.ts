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
    q: "Is the AI any good, or will it sound like a robot?",
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

const fr: FaqItem[] = [
  {
    q: "Que faites-vous exactement ?",
    a: "Nous utilisons l'IA pour construire ce dont un petit commerce a besoin pour grandir : un site web rapide, un assistant IA qui répond aux clients et prend les réservations, des outils sur mesure comme des applis de réservation ou de commande, et des automatisations qui connectent les applis que vous utilisez déjà. Vous pouvez commencer par l'un d'eux et ajouter le reste quand vous serez prêt.",
  },
  {
    q: "L'IA est-elle vraiment bonne, ou aura-t-elle l'air d'un robot ?",
    a: "Nous ajustons chaque assistant à votre activité, à votre ton et à vos vraies réponses, pour qu'il sonne comme vous, pas comme un bot générique. Il gère les questions et les réservations de routine, et dès que quelque chose demande une personne, il vous passe la conversation directement.",
  },
  {
    q: "Combien de temps ça prend ?",
    a: "Plus vite que vous ne le pensez, parce que l'IA fait le gros du travail. La plupart des sites web sont en ligne en deux semaines environ ; un assistant IA ou une automatisation simple peuvent être prêts en quelques jours. Nous vous donnons un calendrier clair après un échange rapide.",
  },
  {
    q: "Dois-je m'y connaître en technique ?",
    a: "Pas du tout. Vous nous parlez de votre activité avec des mots simples ; nous nous occupons de l'hébergement, du domaine, de la configuration de l'IA, de tout. Une fois en ligne, nous vous montrons les quelques petites choses que vous voudrez peut-être changer vous-même, comme vos horaires ou vos photos.",
  },
  {
    q: "Que se passe-t-il après le lancement ?",
    a: "Nous ne disparaissons pas. Chaque création est livrée avec un plan d'entretien qui la garde en ligne, sûre, sauvegardée et à jour, et nous répondons vraiment quand vous avez besoin d'un changement, généralement sous 24 heures. C'est là que vivent désormais l'hébergement et la maintenance.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Chaque projet fait l'objet d'un devis individuel, après une consultation gratuite, vous ne payez donc que ce dont vous avez vraiment besoin plutôt qu'un forfait figé. Parlez-nous de votre activité et nous vous renvoyons un prix clair, sans jargon, gratuit et sans pression. Pas de grille tarifaire, pas de surprises.",
  },
];

const de: FaqItem[] = [
  {
    q: "Was genau macht ihr?",
    a: "Wir nutzen KI, um die Dinge zu bauen, die ein kleines Unternehmen zum Wachsen braucht: eine schnelle Website, einen KI-Assistenten, der Kunden antwortet und Buchungen entgegennimmt, maßgeschneiderte Tools wie Buchungs- oder Bestell-Apps und Automatisierungen, die die Apps verbinden, die du schon nutzt. Du kannst mit einem anfangen und den Rest hinzufügen, wenn du so weit bist.",
  },
  {
    q: "Taugt die KI was, oder klingt sie nach einem Roboter?",
    a: "Wir stimmen jeden Assistenten auf dein Unternehmen, deinen Ton und deine echten Antworten ab, damit er nach dir klingt, nicht nach einem generischen Bot. Er erledigt die Routinefragen und Buchungen, und sobald etwas einen Menschen braucht, übergibt er das Gespräch direkt an dich.",
  },
  {
    q: "Wie lange dauert das?",
    a: "Schneller, als du denkst, weil die KI die schwere Arbeit übernimmt. Die meisten Websites sind innerhalb von ein paar Wochen live; ein einfacher KI-Assistent oder eine Automatisierung kann in Tagen fertig sein. Nach einem kurzen Gespräch geben wir dir einen klaren Zeitplan.",
  },
  {
    q: "Muss ich technisch was draufhaben?",
    a: "Kein bisschen. Du erzählst uns in einfachen Worten von deinem Unternehmen; wir kümmern uns um das Hosting, die Domain, das KI-Setup, alles. Wenn es live ist, zeigen wir dir die paar einfachen Dinge, die du vielleicht selbst ändern willst, wie deine Öffnungszeiten oder Fotos.",
  },
  {
    q: "Was passiert nach dem Launch?",
    a: "Wir verschwinden nicht. Jedes Projekt kommt mit einem Care-Plan, der es online, sicher, gesichert und aktuell hält, und wir antworten tatsächlich, wenn du eine Änderung brauchst, meist innerhalb von 24 Stunden. Da leben jetzt Hosting und Wartung.",
  },
  {
    q: "Was kostet das?",
    a: "Jedes Projekt wird einzeln kalkuliert, nach einer kostenlosen Beratung, sodass du nur für das zahlst, was du wirklich brauchst, statt für ein festes Paket. Erzähl uns von deinem Unternehmen und wir schicken dir einen klaren Preis ohne Fachjargon zurück, kostenlos und ohne Druck. Keine Preislisten, keine Überraschungen.",
  },
];

const it: FaqItem[] = [
  {
    q: "Cosa fate esattamente?",
    a: "Usiamo l'IA per costruire ciò di cui una piccola attività ha bisogno per crescere: un sito veloce, un assistente IA che risponde ai clienti e prende le prenotazioni, strumenti su misura come app di prenotazione o di ordini, e automazioni che collegano le app che già usi. Puoi iniziare con una e aggiungere il resto quando vuoi.",
  },
  {
    q: "L'IA è valida? Non suonerà come un robot?",
    a: "Calibriamo ogni assistente sulla tua attività, sul tuo tono e sulle tue risposte reali, così suona come te, non come un bot generico. Gestisce le domande e le prenotazioni di routine, e nel momento in cui serve una persona, ti passa la conversazione direttamente.",
  },
  {
    q: "Quanto tempo ci vuole?",
    a: "Più in fretta di quanto ti aspetti, perché l'IA fa il lavoro pesante. La maggior parte dei siti è online in un paio di settimane; un semplice assistente IA o un'automazione possono essere pronti in giorni. Ti diamo un piano chiaro dopo una chiacchierata veloce.",
  },
  {
    q: "Devo sapere qualcosa di tecnico?",
    a: "Niente di niente. Tu ci racconti della tua attività in parole semplici; al resto pensiamo noi: l'hosting, il dominio, la configurazione dell'IA, tutto. Quando è online, ti mostriamo le poche cose semplici che magari vuoi cambiare da solo, come i tuoi orari o le foto.",
  },
  {
    q: "Cosa succede dopo il lancio?",
    a: "Non spariamo. Ogni progetto include un piano di assistenza che lo tiene online, sicuro, con backup e aggiornato, e rispondiamo davvero quando ti serve una modifica, di solito entro 24 ore. È lì che vivono ora l'hosting e la manutenzione.",
  },
  {
    q: "Quanto costa?",
    a: "Ogni progetto viene preventivato singolarmente, dopo una consulenza gratuita, così paghi solo per ciò che ti serve davvero invece di un pacchetto fisso. Raccontaci della tua attività e ti rispondiamo con un prezzo chiaro e senza gergo, gratis e senza pressioni. Niente listini, niente sorprese.",
  },
];

const content: Record<Locale, FaqItem[]> = { en, es, fr, de, it };

export function getFaq(locale: Locale): FaqItem[] {
  return content[locale];
}
