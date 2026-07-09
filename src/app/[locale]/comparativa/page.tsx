import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getSite } from "@/content/site";
import Icon from "@/components/Icon";
import FinalCta from "@/components/FinalCta";
import SectionHead from "@/components/SectionHead";
import { breadcrumbList, jsonLdDoc, jsonLdHtml } from "@/lib/jsonld";
import { hreflangs } from "@/lib/hreflang";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta: Record<Locale, { title: string; description: string }> = {
    es: {
      title: "¿Creador de webs con IA o una agencia? Comparativa honesta",
      description:
        "Comparamos los creadores de webs DIY con un estudio que lo hace por ti: tiempo, textos, SEO técnico, mantenimiento y automatizaciones. Incluye los casos en los que el builder es la mejor opción.",
    },
    en: {
      title: "AI website builder or an agency? An honest comparison",
      description:
        "We compare DIY website builders with a done-for-you studio: time, copy, technical SEO, maintenance and automations. Including the cases where the builder is the better choice.",
    },
    fr: {
      title: "Créateur de site avec IA ou une agence ? Comparatif honnête",
      description:
        "Nous comparons les créateurs de sites DIY avec un studio qui le fait pour vous : temps, textes, SEO technique, maintenance et automatisations. Y compris les cas où le créateur DIY est le meilleur choix.",
    },
    de: {
      title: "KI-Website-Baukasten oder eine Agentur? Ein ehrlicher Vergleich",
      description:
        "Wir vergleichen DIY-Website-Baukästen mit einem Studio, das es für dich übernimmt: Zeit, Texte, technisches SEO, Wartung und Automatisierungen. Inklusive der Fälle, in denen der Baukasten die bessere Wahl ist.",
    },
    it: {
      title: "Website builder con IA o un'agenzia? Un confronto onesto",
      description:
        "Confrontiamo i website builder fai-da-te con uno studio che lo fa per te: tempo, testi, SEO tecnica, manutenzione e automazioni. Inclusi i casi in cui il builder è la scelta migliore.",
    },
  };
  const chosen = isLocale(locale) ? meta[locale] : meta.en;
  return {
    title: chosen.title,
    description: chosen.description,
    alternates: {
      canonical: `/${locale}/comparativa`,
      languages: hreflangs("/comparativa"),
    },
  };
}

type Copy = {
  crumbHome: string;
  crumbHere: string;
  h1: string;
  sub: string;
  intro: string[];
  tableKicker: string;
  tableTitle: string;
  tableLead: string;
  colFeature: string;
  colDiy: string;
  colStudio: string;
  rows: { label: string; diy: string; studio: string }[];
  tableNote: string;
  whenKicker: string;
  whenTitle: string;
  whenLead: string;
  whenDiyTitle: string;
  whenDiy: string[];
  whenStudioTitle: string;
  whenStudio: string[];
  faqKicker: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaBtn: string;
};

// Comparison copy is maintained natively in all five locales.
const copy: Record<Locale, Copy> = {
  es: {
    crumbHome: "Inicio",
    crumbHere: "Comparativa",
    h1: "¿Creador de webs con IA o una agencia que lo hace por ti?",
    sub: "Respuesta corta: depende de tu tiempo y de lo que necesite tu negocio. Aquí va la comparativa honesta, incluidos los casos en los que no nos necesitas.",
    intro: [
      "Si tienes horas libres y te gusta trastear, un creador de webs con IA tipo Wix, Squarespace o el editor de tu hosting puede darte una página digna pagando una cuota mensual. Si prefieres que alguien se encargue de principio a fin, con textos, SEO, mantenimiento y automatizaciones incluidos, un estudio como Kodable te la entrega hecha y funcionando.",
      "Los creadores DIY han mejorado mucho con la IA: hoy generan un diseño base en minutos. Lo que no generan es el trabajo que viene después: escribir textos que convenzan, cuidar el SEO técnico, conectar reservas o un agente de IA y mantener la web al día cuando algo cambia. Ese trabajo lo haces tú, o lo hace un estudio por ti.",
      "Abajo comparamos las dos opciones punto por punto, y te decimos también cuándo el creador DIY es la elección correcta.",
    ],
    tableKicker: "La comparativa",
    tableTitle: "Punto por punto, sin trampas",
    tableLead:
      "Lo que de verdad cambia entre montarte la web con un creador DIY y encargársela a un estudio.",
    colFeature: "Qué comparamos",
    colDiy: "Creador DIY",
    colStudio: "Estudio como Kodable",
    rows: [
      {
        label: "Tiempo que te quita",
        diy: "Horas tuyas: elegir plantilla, montar páginas, comprobar que se vea bien en el móvil.",
        studio: "Un par de conversaciones: el resto lo construimos nosotros.",
      },
      {
        label: "Quién escribe los textos",
        diy: "Tú, o la IA del builder con revisión tuya.",
        studio: "Nosotros, contigo: textos pensados para convertir visitas en clientes.",
      },
      {
        label: "SEO técnico",
        diy: "Depende de la plantilla y de lo que tú sepas configurar.",
        studio: "Incluido de serie: velocidad, datos estructurados, sitemap y versiones en varios idiomas.",
      },
      {
        label: "Mantenimiento",
        diy: "Tú actualizas y tú arreglas lo que se rompe.",
        studio: "Nos encargamos nosotros: cambios, revisiones y mejoras.",
      },
      {
        label: "Agente IA y automatizaciones",
        diy: "Plugins genéricos, con los límites del builder.",
        studio: "A medida: un agente que responde al instante, reservas, avisos y tareas que se hacen solas.",
      },
      {
        label: "Coste inicial",
        diy: "Cuota mensual del builder, más extras como dominio o plugins.",
        studio: "Proyecto cerrado, con presupuesto claro antes de empezar.",
      },
      {
        label: "Soporte",
        diy: "Chat y foros del proveedor.",
        studio: "Personas concretas que conocen tu web y tu negocio.",
      },
    ],
    tableNote:
      "Hablamos en general: cada builder y cada agencia son distintos. Esta tabla refleja cómo trabajamos nosotros y lo que suelen incluir los creadores DIY más conocidos.",
    whenKicker: "¿Cuál te conviene?",
    whenTitle: "Cuándo elegir cada opción",
    whenLead: "Las dos son buenas elecciones, para situaciones distintas.",
    whenDiyTitle: "El creador DIY es buena idea si...",
    whenDiy: [
      "Te gusta trastear y tienes horas libres para dedicárselas.",
      "Solo necesitas una página sencilla: un portfolio, un proyecto personal, una idea que quieres probar.",
      "Prefieres empezar gastando lo mínimo y pagar mes a mes.",
      "No te importa encargarte del mantenimiento y de los pequeños arreglos técnicos.",
    ],
    whenStudioTitle: "Un estudio como Kodable encaja si...",
    whenStudio: [
      "Tu tiempo rinde más atendiendo a tus clientes que peleándote con una plantilla.",
      "Quieres textos, SEO técnico y mantenimiento resueltos, no otra lista de tareas pendientes.",
      "Necesitas algo más que una web: reservas, un agente de IA que responde por ti, automatizaciones.",
      "Quieres a alguien concreto a quien escribir cuando algo falla o toca cambiar algo.",
    ],
    faqKicker: "Preguntas frecuentes",
    faqTitle: "Lo que la gente pregunta antes de decidir",
    faq: [
      {
        q: "¿Puedo empezar con un creador y pasar a una agencia después?",
        a: "Sí, y es un camino muy habitual. Tu dominio es tuyo y se lleva contigo sin perder nada, y los textos o fotos que funcionan se aprovechan. La web en sí normalmente se rehace, porque cada builder guarda el diseño en su propio sistema, pero llegar con una web anterior ayuda: ya sabes qué te gusta y qué no.",
      },
      {
        q: "¿Qué incluye un estudio que un builder no?",
        a: "Personas trabajando en tu proyecto. Un builder te da la herramienta; un estudio te da el resultado: estrategia, textos escritos para vender, SEO técnico bien montado, integraciones a medida como reservas, agente de IA o automatizaciones, y mantenimiento cuando la web ya está en marcha.",
      },
      {
        q: "¿Cuánto tiempo se tarda de cada forma?",
        a: "Con un builder depende de tus ratos libres: una primera versión puede salir en un fin de semana, y afinarla suele llevar semanas de tardes sueltas. Con un estudio las horas las ponemos nosotros: tú dedicas un par de conversaciones y revisiones, y el plazo lo acordamos antes de empezar.",
      },
      {
        q: "¿Y si ya tengo una web hecha con un builder?",
        a: "Ningún problema, es un punto de partida frecuente. La revisamos contigo, aprovechamos lo que funciona, como tu dominio, los textos, las fotos y lo que Google ya conoce de ti, y te decimos con claridad si compensa mejorarla o rehacerla. Si tu web actual está bien, también te lo diremos.",
      },
    ],
    ctaTitle: "¿Sigues dudando?",
    ctaBody:
      "Cuéntanos tu caso y te decimos con honestidad qué opción te conviene, aunque la respuesta sea un creador DIY.",
    ctaBtn: "Cuéntanos tu caso",
  },
  en: {
    crumbHome: "Home",
    crumbHere: "Comparison",
    h1: "AI website builder or an agency that does it for you?",
    sub: "Short answer: it depends on your time and on what your business needs. Here's the honest comparison, including the cases where you don't need us.",
    intro: [
      "If you have spare hours and enjoy tinkering, an AI website builder like Wix, Squarespace or your host's editor can give you a decent page for a monthly fee. If you'd rather have it handled end to end, with copy, SEO, maintenance and automations included, a done-for-you studio like Kodable delivers it built and working.",
      "DIY builders have improved a lot with AI: they generate a design base in minutes. What they don't generate is the work that comes after: writing copy that convinces, getting technical SEO right, wiring up bookings or an AI agent, and keeping the site up to date when things change. That work is done by you, or by a studio for you.",
      "Below we compare both options point by point, and we also tell you when the DIY builder is the right call.",
    ],
    tableKicker: "The comparison",
    tableTitle: "Point by point, no tricks",
    tableLead:
      "What actually changes between building your site with a DIY builder and handing it to a studio.",
    colFeature: "What we compare",
    colDiy: "DIY builder",
    colStudio: "A studio like Kodable",
    rows: [
      {
        label: "Time it takes from you",
        diy: "Your hours: picking a template, building pages, checking it looks right on mobile.",
        studio: "A couple of conversations: we build the rest.",
      },
      {
        label: "Who writes the copy",
        diy: "You, or the builder's AI with your review.",
        studio: "We do, with you: copy written to turn visits into customers.",
      },
      {
        label: "Technical SEO",
        diy: "Depends on the template and on what you know how to configure.",
        studio: "Included by default: speed, structured data, sitemap and multilingual versions.",
      },
      {
        label: "Maintenance",
        diy: "You update it and you fix what breaks.",
        studio: "We handle it: changes, check-ups and improvements.",
      },
      {
        label: "AI agent and automations",
        diy: "Generic plugins, within the builder's limits.",
        studio: "Custom-built: an agent that replies instantly, bookings, alerts and tasks that run themselves.",
      },
      {
        label: "Upfront cost",
        diy: "The builder's monthly fee, plus extras like a domain or plugins.",
        studio: "A fixed project, with a clear quote before we start.",
      },
      {
        label: "Support",
        diy: "The provider's chat and forums.",
        studio: "Real people who know your site and your business.",
      },
    ],
    tableNote:
      "We're speaking in general terms: every builder and every agency is different. This table reflects how we work and what the best-known DIY builders usually include.",
    whenKicker: "Which one fits you?",
    whenTitle: "When to choose each option",
    whenLead: "Both are good choices, for different situations.",
    whenDiyTitle: "The DIY builder is a good idea if...",
    whenDiy: [
      "You enjoy tinkering and have spare hours to give it.",
      "You only need a simple page: a portfolio, a personal project, an idea you want to test.",
      "You'd rather start with minimal spend and pay month to month.",
      "You don't mind handling maintenance and small technical fixes yourself.",
    ],
    whenStudioTitle: "A studio like Kodable fits if...",
    whenStudio: [
      "Your time is worth more serving your customers than wrestling with a template.",
      "You want copy, technical SEO and maintenance solved, not another to-do list.",
      "You need more than a website: bookings, an AI agent that replies for you, automations.",
      "You want a real person to message when something breaks or needs changing.",
    ],
    faqKicker: "Frequently asked questions",
    faqTitle: "What people ask before deciding",
    faq: [
      {
        q: "Can I start with a builder and move to an agency later?",
        a: "Yes, and it's a very common path. Your domain is yours and moves with you without losing anything, and any copy or photos that work can be reused. The site itself is usually rebuilt, because each builder stores the design in its own system, but arriving with a previous site helps: you already know what you like and what you don't.",
      },
      {
        q: "What does a studio include that a builder doesn't?",
        a: "People working on your project. A builder gives you the tool; a studio gives you the result: strategy, copy written to sell, technical SEO done properly, custom integrations such as bookings, an AI agent or automations, and maintenance once the site is live.",
      },
      {
        q: "How long does each option take?",
        a: "With a builder, it depends on your free time: a first version can be up in a weekend, and polishing it usually takes weeks of spare evenings. With a studio, we put in the hours: you invest a couple of conversations and reviews, and we agree the deadline before starting.",
      },
      {
        q: "What if I already have a website made with a builder?",
        a: "No problem, it's a common starting point. We review it with you, keep what works, such as your domain, copy, photos and what Google already knows about you, and tell you plainly whether it's worth improving or rebuilding. If your current site is fine, we'll tell you that too.",
      },
    ],
    ctaTitle: "Still torn?",
    ctaBody:
      "Tell us about your case and we'll tell you honestly which option suits you, even if the answer is a DIY builder.",
    ctaBtn: "Tell us about your project",
  },
  fr: {
    crumbHome: "Accueil",
    crumbHere: "Comparatif",
    h1: "Créateur de site avec IA ou une agence qui le fait pour vous ?",
    sub: "Réponse courte : cela dépend de votre temps et des besoins de votre entreprise. Voici le comparatif honnête, y compris les cas où vous n'avez pas besoin de nous.",
    intro: [
      "Si vous avez des heures libres et que vous aimez bricoler, un créateur de site avec IA comme Wix, Squarespace ou l'éditeur de votre hébergeur peut vous donner une page correcte moyennant un abonnement mensuel. Si vous préférez que tout soit pris en charge de bout en bout, avec les textes, le SEO, la maintenance et les automatisations inclus, un studio comme Kodable vous la livre construite et opérationnelle.",
      "Les créateurs DIY se sont beaucoup améliorés avec l'IA : aujourd'hui, ils génèrent une base de design en quelques minutes. Ce qu'ils ne génèrent pas, c'est le travail qui vient après : écrire des textes qui convainquent, soigner le SEO technique, connecter les réservations ou un agent IA, et maintenir le site à jour quand quelque chose change. Ce travail, c'est vous qui le faites, ou un studio qui le fait pour vous.",
      "Ci-dessous, nous comparons les deux options point par point, et nous vous disons aussi quand le créateur DIY est le bon choix.",
    ],
    tableKicker: "Le comparatif",
    tableTitle: "Point par point, sans piège",
    tableLead:
      "Ce qui change vraiment entre construire votre site avec un créateur DIY et le confier à un studio.",
    colFeature: "Ce que nous comparons",
    colDiy: "Créateur DIY",
    colStudio: "Un studio comme Kodable",
    rows: [
      {
        label: "Le temps que ça vous prend",
        diy: "Vos heures : choisir un modèle, monter les pages, vérifier que tout s'affiche bien sur mobile.",
        studio: "Quelques conversations : nous construisons le reste.",
      },
      {
        label: "Qui écrit les textes",
        diy: "Vous, ou l'IA du créateur avec votre relecture.",
        studio: "Nous, avec vous : des textes pensés pour transformer les visites en clients.",
      },
      {
        label: "SEO technique",
        diy: "Cela dépend du modèle et de ce que vous savez configurer.",
        studio: "Inclus d'office : vitesse, données structurées, sitemap et versions en plusieurs langues.",
      },
      {
        label: "Maintenance",
        diy: "Vous mettez à jour et vous réparez ce qui casse.",
        studio: "Nous nous en occupons : changements, contrôles et améliorations.",
      },
      {
        label: "Agent IA et automatisations",
        diy: "Des plugins génériques, avec les limites du créateur.",
        studio: "Sur mesure : un agent qui répond à l'instant, réservations, alertes et tâches qui se font toutes seules.",
      },
      {
        label: "Coût initial",
        diy: "L'abonnement mensuel du créateur, plus des extras comme un domaine ou des plugins.",
        studio: "Un projet à prix fixe, avec un devis clair avant de commencer.",
      },
      {
        label: "Support",
        diy: "Le chat et les forums du fournisseur.",
        studio: "De vraies personnes qui connaissent votre site et votre entreprise.",
      },
    ],
    tableNote:
      "Nous parlons en termes généraux : chaque créateur et chaque agence sont différents. Ce tableau reflète notre façon de travailler et ce qu'incluent généralement les créateurs DIY les plus connus.",
    whenKicker: "Lequel vous convient ?",
    whenTitle: "Quand choisir chaque option",
    whenLead: "Les deux sont de bons choix, pour des situations différentes.",
    whenDiyTitle: "Le créateur DIY est une bonne idée si...",
    whenDiy: [
      "Vous aimez bricoler et vous avez des heures libres à y consacrer.",
      "Vous avez juste besoin d'une page simple : un portfolio, un projet personnel, une idée que vous voulez tester.",
      "Vous préférez commencer en dépensant le minimum et payer mois par mois.",
      "Cela ne vous dérange pas de gérer vous-même la maintenance et les petites réparations techniques.",
    ],
    whenStudioTitle: "Un studio comme Kodable convient si...",
    whenStudio: [
      "Votre temps rapporte plus à servir vos clients qu'à vous battre avec un modèle.",
      "Vous voulez des textes, un SEO technique et une maintenance réglés, pas une liste de tâches de plus.",
      "Vous avez besoin de plus qu'un site : réservations, un agent IA qui répond à votre place, des automatisations.",
      "Vous voulez une vraie personne à qui écrire quand quelque chose casse ou qu'il faut changer un détail.",
    ],
    faqKicker: "Questions fréquentes",
    faqTitle: "Ce que les gens demandent avant de décider",
    faq: [
      {
        q: "Puis-je commencer avec un créateur et passer à une agence plus tard ?",
        a: "Oui, et c'est un parcours très courant. Votre domaine vous appartient et vous suit sans rien perdre, et les textes ou photos qui fonctionnent se réutilisent. Le site lui-même est généralement refait, car chaque créateur stocke le design dans son propre système, mais arriver avec un site précédent aide : vous savez déjà ce que vous aimez et ce que vous n'aimez pas.",
      },
      {
        q: "Qu'est-ce qu'un studio inclut qu'un créateur n'a pas ?",
        a: "Des personnes qui travaillent sur votre projet. Un créateur vous donne l'outil ; un studio vous donne le résultat : stratégie, textes écrits pour vendre, SEO technique bien fait, intégrations sur mesure comme les réservations, un agent IA ou des automatisations, et la maintenance une fois le site en ligne.",
      },
      {
        q: "Combien de temps prend chaque option ?",
        a: "Avec un créateur, cela dépend de votre temps libre : une première version peut être prête en un week-end, et la peaufiner prend souvent des semaines de soirées éparses. Avec un studio, ce sont nous qui mettons les heures : vous consacrez quelques conversations et relectures, et nous convenons du délai avant de commencer.",
      },
      {
        q: "Et si j'ai déjà un site fait avec un créateur ?",
        a: "Aucun problème, c'est un point de départ fréquent. Nous le passons en revue avec vous, nous gardons ce qui fonctionne, comme votre domaine, les textes, les photos et ce que Google connaît déjà de vous, et nous vous disons clairement s'il vaut mieux l'améliorer ou le refaire. Si votre site actuel est bien, nous vous le dirons aussi.",
      },
    ],
    ctaTitle: "Toujours hésitant ?",
    ctaBody:
      "Parlez-nous de votre cas et nous vous dirons honnêtement quelle option vous convient, même si la réponse est un créateur DIY.",
    ctaBtn: "Parlez-nous de votre projet",
  },
  de: {
    crumbHome: "Startseite",
    crumbHere: "Vergleich",
    h1: "KI-Website-Baukasten oder eine Agentur, die es für dich macht?",
    sub: "Kurze Antwort: Es hängt von deiner Zeit und davon ab, was dein Unternehmen braucht. Hier kommt der ehrliche Vergleich, inklusive der Fälle, in denen du uns nicht brauchst.",
    intro: [
      "Wenn du freie Stunden hast und gern bastelst, kann dir ein KI-Website-Baukasten wie Wix, Squarespace oder der Editor deines Hosters gegen eine monatliche Gebühr eine ordentliche Seite liefern. Wenn du es lieber von Anfang bis Ende erledigt haben möchtest, mit Texten, SEO, Wartung und Automatisierungen inklusive, liefert dir ein Studio wie Kodable die Seite fertig und einsatzbereit.",
      "DIY-Baukästen sind mit KI viel besser geworden: Heute erzeugen sie in Minuten ein Design-Grundgerüst. Was sie nicht erzeugen, ist die Arbeit, die danach kommt: überzeugende Texte schreiben, das technische SEO sauber aufsetzen, Buchungen oder einen KI-Agenten anbinden und die Seite aktuell halten, wenn sich etwas ändert. Diese Arbeit machst du selbst, oder ein Studio macht sie für dich.",
      "Unten vergleichen wir beide Optionen Punkt für Punkt und sagen dir auch, wann der DIY-Baukasten die richtige Wahl ist.",
    ],
    tableKicker: "Der Vergleich",
    tableTitle: "Punkt für Punkt, ohne Tricks",
    tableLead:
      "Was sich wirklich unterscheidet, ob du deine Seite mit einem DIY-Baukasten baust oder sie einem Studio überlässt.",
    colFeature: "Was wir vergleichen",
    colDiy: "DIY-Baukasten",
    colStudio: "Ein Studio wie Kodable",
    rows: [
      {
        label: "Zeit, die es dich kostet",
        diy: "Deine Stunden: Vorlage auswählen, Seiten aufbauen, prüfen, ob alles auf dem Handy gut aussieht.",
        studio: "Ein paar Gespräche: den Rest bauen wir.",
      },
      {
        label: "Wer die Texte schreibt",
        diy: "Du, oder die KI des Baukastens mit deiner Überprüfung.",
        studio: "Wir, gemeinsam mit dir: Texte, die aus Besuchen Kunden machen.",
      },
      {
        label: "Technisches SEO",
        diy: "Hängt von der Vorlage ab und davon, was du einzurichten weißt.",
        studio: "Standardmäßig inklusive: Geschwindigkeit, strukturierte Daten, Sitemap und Versionen in mehreren Sprachen.",
      },
      {
        label: "Wartung",
        diy: "Du aktualisierst und reparierst, was kaputtgeht.",
        studio: "Wir kümmern uns darum: Änderungen, Checks und Verbesserungen.",
      },
      {
        label: "KI-Agent und Automatisierungen",
        diy: "Generische Plugins, mit den Grenzen des Baukastens.",
        studio: "Maßgeschneidert: ein Agent, der sofort antwortet, Buchungen, Benachrichtigungen und Aufgaben, die sich von selbst erledigen.",
      },
      {
        label: "Anfangskosten",
        diy: "Die monatliche Gebühr des Baukastens, plus Extras wie Domain oder Plugins.",
        studio: "Ein Festpreis-Projekt, mit klarem Angebot, bevor wir anfangen.",
      },
      {
        label: "Support",
        diy: "Chat und Foren des Anbieters.",
        studio: "Echte Menschen, die deine Seite und dein Unternehmen kennen.",
      },
    ],
    tableNote:
      "Wir sprechen allgemein: Jeder Baukasten und jede Agentur ist anders. Diese Tabelle spiegelt wider, wie wir arbeiten und was die bekanntesten DIY-Baukästen üblicherweise enthalten.",
    whenKicker: "Was passt zu dir?",
    whenTitle: "Wann du welche Option wählst",
    whenLead: "Beide sind gute Entscheidungen, für unterschiedliche Situationen.",
    whenDiyTitle: "Der DIY-Baukasten ist eine gute Idee, wenn...",
    whenDiy: [
      "Du gern bastelst und freie Stunden hast, um dich damit zu beschäftigen.",
      "Du nur eine einfache Seite brauchst: ein Portfolio, ein persönliches Projekt, eine Idee, die du testen willst.",
      "Du lieber mit minimalen Ausgaben startest und Monat für Monat zahlst.",
      "Es dir nichts ausmacht, Wartung und kleine technische Reparaturen selbst zu übernehmen.",
    ],
    whenStudioTitle: "Ein Studio wie Kodable passt, wenn...",
    whenStudio: [
      "Deine Zeit mehr wert ist, wenn du deine Kunden betreust, als wenn du dich mit einer Vorlage herumschlägst.",
      "Du Texte, technisches SEO und Wartung gelöst haben willst, nicht noch eine To-do-Liste.",
      "Du mehr als eine Website brauchst: Buchungen, einen KI-Agenten, der für dich antwortet, Automatisierungen.",
      "Du eine konkrete Person haben willst, der du schreiben kannst, wenn etwas kaputtgeht oder geändert werden muss.",
    ],
    faqKicker: "Häufige Fragen",
    faqTitle: "Was Leute fragen, bevor sie sich entscheiden",
    faq: [
      {
        q: "Kann ich mit einem Baukasten anfangen und später zu einer Agentur wechseln?",
        a: "Ja, und das ist ein sehr üblicher Weg. Deine Domain gehört dir und zieht mit dir um, ohne dass etwas verloren geht, und Texte oder Fotos, die funktionieren, lassen sich weiterverwenden. Die Seite selbst wird meist neu gebaut, weil jeder Baukasten das Design in seinem eigenen System speichert, aber mit einer früheren Seite anzukommen hilft: Du weißt bereits, was dir gefällt und was nicht.",
      },
      {
        q: "Was bietet ein Studio, das ein Baukasten nicht hat?",
        a: "Menschen, die an deinem Projekt arbeiten. Ein Baukasten gibt dir das Werkzeug; ein Studio gibt dir das Ergebnis: Strategie, Texte, die verkaufen, sauber aufgesetztes technisches SEO, maßgeschneiderte Integrationen wie Buchungen, einen KI-Agenten oder Automatisierungen, und Wartung, sobald die Seite live ist.",
      },
      {
        q: "Wie lange dauert jede Option?",
        a: "Mit einem Baukasten hängt es von deiner freien Zeit ab: Eine erste Version kann an einem Wochenende stehen, und sie zu verfeinern dauert oft Wochen voller einzelner Abende. Mit einem Studio bringen wir die Stunden ein: Du investierst ein paar Gespräche und Durchsichten, und den Termin vereinbaren wir, bevor wir anfangen.",
      },
      {
        q: "Und wenn ich schon eine Seite mit einem Baukasten habe?",
        a: "Kein Problem, das ist ein häufiger Ausgangspunkt. Wir sehen sie gemeinsam mit dir durch, behalten, was funktioniert, wie deine Domain, die Texte, die Fotos und das, was Google bereits über dich weiß, und sagen dir klar, ob es sich lohnt, sie zu verbessern oder neu zu bauen. Wenn deine aktuelle Seite gut ist, sagen wir dir das auch.",
      },
    ],
    ctaTitle: "Noch unentschlossen?",
    ctaBody:
      "Erzähl uns von deinem Fall und wir sagen dir ehrlich, welche Option zu dir passt, auch wenn die Antwort ein DIY-Baukasten ist.",
    ctaBtn: "Erzähl uns von deinem Projekt",
  },
  it: {
    crumbHome: "Home",
    crumbHere: "Confronto",
    h1: "Website builder con IA o un'agenzia che lo fa per te?",
    sub: "Risposta breve: dipende dal tuo tempo e da ciò di cui ha bisogno la tua attività. Ecco il confronto onesto, inclusi i casi in cui non hai bisogno di noi.",
    intro: [
      "Se hai ore libere e ti piace smanettare, un website builder con IA come Wix, Squarespace o l'editor del tuo hosting può darti una pagina dignitosa pagando un canone mensile. Se preferisci che se ne occupi qualcuno dall'inizio alla fine, con testi, SEO, manutenzione e automazioni inclusi, uno studio come Kodable te la consegna fatta e funzionante.",
      "I builder fai-da-te sono migliorati molto con l'IA: oggi generano una base di design in pochi minuti. Ciò che non generano è il lavoro che viene dopo: scrivere testi che convincono, curare la SEO tecnica, collegare le prenotazioni o un agente IA e tenere il sito aggiornato quando qualcosa cambia. Quel lavoro lo fai tu, oppure lo fa uno studio per te.",
      "Qui sotto confrontiamo le due opzioni punto per punto e ti diciamo anche quando il builder fai-da-te è la scelta giusta.",
    ],
    tableKicker: "Il confronto",
    tableTitle: "Punto per punto, senza trucchi",
    tableLead:
      "Ciò che cambia davvero tra costruire il sito con un builder fai-da-te e affidarlo a uno studio.",
    colFeature: "Cosa confrontiamo",
    colDiy: "Builder fai-da-te",
    colStudio: "Uno studio come Kodable",
    rows: [
      {
        label: "Il tempo che ti richiede",
        diy: "Le tue ore: scegliere un modello, montare le pagine, controllare che si veda bene sul cellulare.",
        studio: "Un paio di conversazioni: il resto lo costruiamo noi.",
      },
      {
        label: "Chi scrive i testi",
        diy: "Tu, o l'IA del builder con la tua revisione.",
        studio: "Noi, insieme a te: testi pensati per trasformare le visite in clienti.",
      },
      {
        label: "SEO tecnica",
        diy: "Dipende dal modello e da ciò che sai configurare.",
        studio: "Inclusa di serie: velocità, dati strutturati, sitemap e versioni in più lingue.",
      },
      {
        label: "Manutenzione",
        diy: "Aggiorni tu e ripari tu ciò che si rompe.",
        studio: "Ce ne occupiamo noi: modifiche, controlli e miglioramenti.",
      },
      {
        label: "Agente IA e automazioni",
        diy: "Plugin generici, con i limiti del builder.",
        studio: "Su misura: un agente che risponde all'istante, prenotazioni, avvisi e attività che si svolgono da sole.",
      },
      {
        label: "Costo iniziale",
        diy: "Il canone mensile del builder, più extra come dominio o plugin.",
        studio: "Un progetto a prezzo fisso, con un preventivo chiaro prima di iniziare.",
      },
      {
        label: "Assistenza",
        diy: "Chat e forum del fornitore.",
        studio: "Persone reali che conoscono il tuo sito e la tua attività.",
      },
    ],
    tableNote:
      "Parliamo in generale: ogni builder e ogni agenzia sono diversi. Questa tabella riflette come lavoriamo noi e ciò che di solito includono i builder fai-da-te più conosciuti.",
    whenKicker: "Quale fa per te?",
    whenTitle: "Quando scegliere ciascuna opzione",
    whenLead: "Entrambe sono buone scelte, per situazioni diverse.",
    whenDiyTitle: "Il builder fai-da-te è una buona idea se...",
    whenDiy: [
      "Ti piace smanettare e hai ore libere da dedicarci.",
      "Ti serve solo una pagina semplice: un portfolio, un progetto personale, un'idea che vuoi testare.",
      "Preferisci iniziare spendendo il minimo e pagare mese per mese.",
      "Non ti dispiace occuparti tu della manutenzione e delle piccole riparazioni tecniche.",
    ],
    whenStudioTitle: "Uno studio come Kodable è adatto se...",
    whenStudio: [
      "Il tuo tempo rende di più servendo i clienti che lottando con un modello.",
      "Vuoi testi, SEO tecnica e manutenzione già risolti, non un'altra lista di cose da fare.",
      "Ti serve più di un sito: prenotazioni, un agente IA che risponde per te, automazioni.",
      "Vuoi una persona concreta a cui scrivere quando qualcosa si rompe o va cambiato.",
    ],
    faqKicker: "Domande frequenti",
    faqTitle: "Cosa chiede la gente prima di decidere",
    faq: [
      {
        q: "Posso iniziare con un builder e passare a un'agenzia più avanti?",
        a: "Sì, ed è un percorso molto comune. Il tuo dominio è tuo e ti segue senza perdere nulla, e i testi o le foto che funzionano si riutilizzano. Il sito in sé di solito si rifà, perché ogni builder salva il design nel proprio sistema, ma arrivare con un sito precedente aiuta: sai già cosa ti piace e cosa no.",
      },
      {
        q: "Cosa include uno studio che un builder non ha?",
        a: "Persone che lavorano al tuo progetto. Un builder ti dà lo strumento; uno studio ti dà il risultato: strategia, testi scritti per vendere, SEO tecnica fatta bene, integrazioni su misura come prenotazioni, un agente IA o automazioni, e manutenzione una volta che il sito è online.",
      },
      {
        q: "Quanto tempo richiede ciascuna opzione?",
        a: "Con un builder dipende dai tuoi ritagli di tempo: una prima versione può essere pronta in un fine settimana, e rifinirla richiede spesso settimane di serate sparse. Con uno studio le ore le mettiamo noi: tu dedichi un paio di conversazioni e revisioni, e la scadenza la concordiamo prima di iniziare.",
      },
      {
        q: "E se ho già un sito fatto con un builder?",
        a: "Nessun problema, è un punto di partenza frequente. Lo esaminiamo insieme a te, sfruttiamo ciò che funziona, come il tuo dominio, i testi, le foto e ciò che Google già conosce di te, e ti diciamo con chiarezza se conviene migliorarlo o rifarlo. Se il tuo sito attuale va bene, te lo diremo anche.",
      },
    ],
    ctaTitle: "Ancora indeciso?",
    ctaBody:
      "Raccontaci il tuo caso e ti diremo onestamente quale opzione fa per te, anche se la risposta è un builder fai-da-te.",
    ctaBtn: "Raccontaci il tuo progetto",
  },
};

// Inline table styles: globals.css has no table rules (this is the first data
// table outside the blog), so we match the card look (.faq-item) by hand.
const tableWrapStyle: CSSProperties = {
  border: "1px solid var(--line)",
  borderRadius: "var(--radius-m)",
  background: "var(--card)",
  boxShadow: "var(--shadow-s)",
  overflowX: "auto",
};

const tableStyle: CSSProperties = {
  width: "100%",
  minWidth: 640,
  borderCollapse: "collapse",
  fontSize: ".98rem",
  textAlign: "left",
};

const headCellStyle: CSSProperties = {
  padding: "16px 18px",
  fontFamily: "var(--font-display)",
  fontWeight: 800,
  fontSize: "1.02rem",
  color: "var(--ink)",
  borderBottom: "1px solid var(--line)",
  verticalAlign: "bottom",
};

const rowLabelStyle: CSSProperties = {
  padding: "14px 18px",
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  color: "var(--ink)",
  verticalAlign: "top",
  width: "24%",
};

const cellStyle: CSSProperties = {
  padding: "14px 18px",
  color: "var(--ink-mute)",
  verticalAlign: "top",
  width: "38%",
};

export default async function ComparativaPage({
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
    {
      "@type": "FAQPage",
      mainEntity: t.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
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

      {/* ANSWER-SHAPED INTRO */}
      <section className="sec-tight">
        <div className="wrap">
          <div className="guide-lede">
            {t.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="sec-tight">
        <div className="wrap">
          <SectionHead
            kicker={t.tableKicker}
            kickerIcon="layers"
            title={t.tableTitle}
            lead={t.tableLead}
          />
          <div className="reveal" style={tableWrapStyle}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th scope="col" style={headCellStyle}>
                    {t.colFeature}
                  </th>
                  <th scope="col" style={headCellStyle}>
                    {t.colDiy}
                  </th>
                  <th
                    scope="col"
                    style={{ ...headCellStyle, color: "var(--accent-deep)" }}
                  >
                    {t.colStudio}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.rows.map((row, i) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      style={
                        i === 0
                          ? rowLabelStyle
                          : { ...rowLabelStyle, borderTop: "1px solid var(--line)" }
                      }
                    >
                      {row.label}
                    </th>
                    <td
                      style={
                        i === 0
                          ? cellStyle
                          : { ...cellStyle, borderTop: "1px solid var(--line)" }
                      }
                    >
                      {row.diy}
                    </td>
                    <td
                      style={
                        i === 0
                          ? cellStyle
                          : { ...cellStyle, borderTop: "1px solid var(--line)" }
                      }
                    >
                      {row.studio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            style={{
              marginTop: 14,
              fontSize: ".9rem",
              color: "var(--ink-mute)",
              maxWidth: "64ch",
            }}
          >
            {t.tableNote}
          </p>
        </div>
      </section>

      {/* WHEN TO CHOOSE EACH */}
      <section className="sec-tight">
        <div className="wrap">
          <SectionHead
            kicker={t.whenKicker}
            kickerIcon="list"
            title={t.whenTitle}
            lead={t.whenLead}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 18,
            }}
          >
            <div className="takeaways reveal">
              <h2>{t.whenDiyTitle}</h2>
              <ul>
                {t.whenDiy.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="takeaways reveal">
              <h2>{t.whenStudioTitle}</h2>
              <ul>
                {t.whenStudio.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec-tight">
        <div className="wrap">
          <SectionHead
            kicker={t.faqKicker}
            kickerIcon="chat"
            title={t.faqTitle}
            center
          />
          <div className="faq-list">
            {t.faq.map((item) => (
              <details key={item.q} className="faq-item reveal">
                <summary>
                  {item.q}
                  <Icon name="chevron" className="chev" />
                </summary>
                <p className="faq-a">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-cta center">
            <p>
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
