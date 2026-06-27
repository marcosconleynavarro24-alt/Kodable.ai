import type { Locale } from "@/i18n/config";

export interface FaqItem {
  q: string;
  a: string;
}

const en: FaqItem[] = [
  {
    q: "Will the AI sound robotic?",
    a: "No. We tune every assistant to your business, your tone, and the real answers you'd give yourself. Customers regularly don't realise they're talking to an AI, until they're already booked in.",
  },
  {
    q: "I'm not technical. Is this going to be complicated?",
    a: "Not at all. You tell us about your business in plain words. We handle the hosting, the AI setup, the domain, the lot. When it's live, we show you the two or three things you might ever want to change yourself, like your hours or photos. That's it.",
  },
  {
    q: "How long does it take?",
    a: "Faster than you'd expect. Most websites are live within a couple of weeks. A simple AI assistant or automation can be ready in days. We'll give you a clear timeline after a quick chat, before anything is agreed.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on what you actually need, which is why we don't publish a price list. Most clients are surprised by how affordable it is. The consultation is free, the quote is plain-language, and there's no pressure to go ahead.",
  },
  {
    q: "What happens after you build it?",
    a: "We don't disappear. We offer a care plan that keeps everything running, updated and backed up. And if something ever needs changing, we're a WhatsApp message away.",
  },
];

const es: FaqItem[] = [
  {
    q: "¿La IA sonará a robot?",
    a: "No. Afinamos cada asistente a tu negocio, tu tono y las respuestas reales que darías tú. Es habitual que los clientes ni se den cuenta de que hablan con una IA, hasta que ya tienen la reserva hecha.",
  },
  {
    q: "No soy nada técnico. ¿Esto va a ser un lío?",
    a: "Para nada. Tú nos cuentas tu negocio con palabras normales. Nosotros nos encargamos del hosting, de la IA, del dominio, de todo. Cuando esté online, te enseñamos las dos o tres cosas que quizá quieras cambiar tú mismo alguna vez, como el horario o las fotos. Y ya está.",
  },
  {
    q: "¿Cuánto se tarda?",
    a: "Menos de lo que crees. La mayoría de webs están online en un par de semanas. Un asistente de IA sencillo o una automatización pueden estar listos en días. Te damos un plazo claro tras una charla rápida, antes de cerrar nada.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende de lo que de verdad necesites, y por eso no publicamos lista de precios. A la mayoría de clientes les sorprende lo asequible que es. La consulta es gratis, el presupuesto va en lenguaje sencillo y no hay ninguna presión para seguir adelante.",
  },
  {
    q: "¿Qué pasa después de construirla?",
    a: "No desaparecemos. Tenemos un plan de cuidado que lo mantiene todo online, actualizado y con copias de seguridad. Y si alguna vez hay que cambiar algo, estamos a un mensaje de WhatsApp.",
  },
];

const fr: FaqItem[] = [
  {
    q: "Est-ce que l'IA aura l'air d'un robot ?",
    a: "Non. Nous réglons chaque assistant sur votre entreprise, votre ton, et les vraies réponses que vous donneriez vous-même. Bien souvent, les clients ne se rendent même pas compte qu'ils parlent à une IA, jusqu'à ce qu'ils aient déjà réservé.",
  },
  {
    q: "Je ne suis pas du tout technique. Est-ce que ça va être compliqué ?",
    a: "Pas du tout. Vous nous parlez de votre activité avec des mots simples. On s'occupe de l'hébergement, de la configuration de l'IA, du nom de domaine, de tout. Une fois en ligne, on vous montre les deux ou trois choses que vous voudriez éventuellement modifier vous-même, comme vos horaires ou vos photos. C'est tout.",
  },
  {
    q: "Combien de temps ça prend ?",
    a: "Plus vite que vous ne le pensez. La plupart des sites sont en ligne en deux semaines environ. Un assistant IA ou une automatisation simple peut être prêt en quelques jours. On vous donne un calendrier clair après un court échange, avant que rien ne soit décidé.",
  },
  {
    q: "Combien ça coûte ?",
    a: "Ça dépend de ce dont vous avez réellement besoin, et c'est pour ça qu'on ne publie pas de grille tarifaire. La plupart de nos clients sont surpris de voir à quel point c'est abordable. La consultation est gratuite, le devis est en langage simple, et rien ne vous oblige à aller plus loin.",
  },
  {
    q: "Que se passe-t-il une fois le site construit ?",
    a: "On ne disparaît pas. Nous proposons un forfait de suivi qui garde tout en marche, à jour et sauvegardé. Et si quelque chose doit changer un jour, on est à un message WhatsApp de vous.",
  },
];

const de: FaqItem[] = [
  {
    q: "Klingt die KI roboterhaft?",
    a: "Nein. Wir stimmen jeden Assistenten auf dein Geschäft ab, auf deinen Ton und auf die echten Antworten, die du selbst geben würdest. Kunden merken oft gar nicht, dass sie mit einer KI sprechen, bis sie schon gebucht haben.",
  },
  {
    q: "Ich kenne mich mit Technik nicht aus. Wird das kompliziert?",
    a: "Überhaupt nicht. Du erzählst uns mit einfachen Worten von deinem Geschäft. Wir kümmern uns um das Hosting, die KI-Einrichtung, die Domain, das ganze Drumherum. Wenn alles live ist, zeigen wir dir die zwei, drei Dinge, die du vielleicht mal selbst ändern willst, etwa deine Öffnungszeiten oder Fotos. Das war's.",
  },
  {
    q: "Wie lange dauert das?",
    a: "Schneller, als du denkst. Die meisten Websites sind innerhalb von ein, zwei Wochen live. Ein einfacher KI-Assistent oder eine Automatisierung kann in Tagen fertig sein. Nach einem kurzen Gespräch geben wir dir einen klaren Zeitplan, bevor irgendwas vereinbart ist.",
  },
  {
    q: "Was kostet das?",
    a: "Das hängt davon ab, was du wirklich brauchst, deshalb veröffentlichen wir keine Preisliste. Die meisten Kunden sind überrascht, wie bezahlbar es ist. Die Beratung ist kostenlos, das Angebot in verständlicher Sprache, und es gibt keinen Druck, mitzumachen.",
  },
  {
    q: "Was passiert, nachdem ihr es gebaut habt?",
    a: "Wir verschwinden nicht. Wir bieten einen Pflegeplan, der alles am Laufen, aktuell und gesichert hält. Und wenn mal etwas geändert werden muss, sind wir nur eine WhatsApp-Nachricht entfernt.",
  },
];

const it: FaqItem[] = [
  {
    q: "L'IA suonerà come un robot?",
    a: "No. Mettiamo a punto ogni assistente sulla tua attività, sul tuo tono e sulle risposte vere che daresti tu. Spesso i clienti non si accorgono nemmeno di parlare con un'IA, finché non hanno già prenotato.",
  },
  {
    q: "Non me ne intendo di tecnologia. Sarà complicato?",
    a: "Per niente. Tu ci racconti la tua attività con parole semplici. A hosting, impostazione dell'IA, dominio e tutto il resto pensiamo noi. Quando è online, ti mostriamo le due o tre cose che magari vorrai cambiare da solo, tipo gli orari o le foto. Tutto qui.",
  },
  {
    q: "Quanto tempo ci vuole?",
    a: "Meno di quanto pensi. La maggior parte dei siti è online in un paio di settimane. Un assistente IA semplice o un'automazione possono essere pronti in pochi giorni. Ti diamo tempi chiari dopo una breve chiacchierata, prima di accordarci su qualsiasi cosa.",
  },
  {
    q: "Quanto costa?",
    a: "Dipende da cosa ti serve davvero, ed è per questo che non pubblichiamo un listino. Quasi tutti i clienti restano sorpresi da quanto sia accessibile. La consulenza è gratis, il preventivo è in parole semplici e non c'è nessuna pressione ad andare avanti.",
  },
  {
    q: "Cosa succede dopo che lo avete costruito?",
    a: "Non spariamo. Offriamo un piano di assistenza che tiene tutto funzionante, aggiornato e salvato. E se mai serve cambiare qualcosa, siamo a un messaggio WhatsApp di distanza.",
  },
];

const content: Record<Locale, FaqItem[]> = { en, es, fr, de, it };

export function getFaq(locale: Locale): FaqItem[] {
  return content[locale];
}
