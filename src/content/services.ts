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

const fr: Record<ServiceSlug, Service> = {
  websites: {
    slug: "websites",
    icon: "globe",
    bucket: "Soyez trouvé et choisi",
    title: "Sites web",
    tagline: "Un site rapide, conçu avec l'IA, qui apparaît quand les gens cherchent près de chez vous et transforme un visiteur curieux en réservation.",
    intro:
      "Votre site web est la première impression que la plupart de vos clients auront de vous. Nous vous en construisons un qui paraît établi, se charge en un clin d'œil et apparaît quand quelqu'un près de chez vous cherche ce que vous faites. Comme l'IA fait le gros du travail, il est prêt en quelques jours, pas en quelques mois, et chaque page vise la seule chose que vous voulez qu'ils fassent : réserver, commander, appeler ou écrire.",
    included: [
      "Paraît établi et professionnel dès la première seconde",
      "Apparaît quand les gens près de chez vous cherchent ce que vous faites",
      "Se charge instantanément, personne n'attend devant un site lent",
      "Réserver, commander, appeler ou écrire en un geste, même en dehors des horaires",
      "Prêt en quelques jours, pas en quelques mois, parce que l'IA fait le gros du travail",
    ],
    whoFor: "Les commerces qui lancent un nouveau site, ou qui remplacent un site daté et standardisé.",
    underTheHood: [
      "Création assistée par IA avec Next.js",
      "SEO local, schema et Google Business Profile",
      "Core Web Vitals et accessibilité niveau WCAG AA",
    ],
    cta: "Construire mon site",
  },
  "ai-agents": {
    slug: "ai-agents",
    icon: "chat",
    bucket: "Répondez à tous, 24h/24",
    title: "Agents IA",
    tagline: "Un assistant chaleureux qui répond aux clients, prend les réservations et fait l'accueil, sur WhatsApp et sur votre site, même à minuit.",
    intro:
      "La plupart des demandes arrivent quand vous êtes occupé ou fermé, et une question laissée sans réponse, c'est un client perdu. Nous mettons en place un assistant chaleureux qui répond en quelques secondes, prend les rendez-vous lui-même et gère les questions qu'on vous pose toute la journée : horaires, prix, où vous êtes. Quand quelque chose vous demande, il vous passe la conversation directement. Il sonne comme votre activité, pas comme un robot.",
    included: [
      "Répond en quelques secondes, de jour comme de nuit",
      "Prend les rendez-vous et les tables tout seul",
      "Répond aux mêmes questions qu'on vous pose toute la journée",
      "Vous passe la conversation dès que ça compte",
      "Fonctionne sur WhatsApp et directement sur votre site",
    ],
    whoFor: "Les commerces qui croulent sous les questions répétées, ou qui perdent les demandes en dehors des horaires.",
    underTheHood: [
      "IA conversationnelle, ajustée à votre activité",
      "WhatsApp Business et chat sur le site",
      "Intégrations de réservation avec passage à une personne",
    ],
    cta: "Mettre en place mon agent",
  },
  "custom-tools": {
    slug: "custom-tools",
    icon: "layers",
    bucket: "Un logiciel qui vous va parfaitement",
    title: "Outils et applis sur mesure",
    tagline: "Applis de réservation, calculatrices de devis, tableaux de bord simples et outils internes, conçus autour de votre vraie façon de travailler.",
    intro:
      "Les applis toutes faites s'adaptent rarement à un vrai commerce, et celles qui le font coûtent une fortune. Comme l'IA nous permet de construire vite, nous pouvons créer l'outil exact dont vous avez besoin : une appli de commande à votre marque, une calculatrice de devis que vos clients remplissent eux-mêmes, un tableau de bord simple avec ce qui compte vraiment, ou un outil interne qui élimine les tâches ingrates. Le vôtre, pas un abonnement standardisé.",
    included: [
      "Une appli de réservation ou de commande à votre marque",
      "Une calculatrice de devis que vos clients remplissent eux-mêmes",
      "Un tableau de bord simple avec les chiffres qui comptent",
      "Des outils internes qui réduisent les tâches répétitives du quotidien",
      "Construit vite, parce que l'IA fait le gros du travail",
    ],
    whoFor: "Les dirigeants qui débordent de leurs tableurs, ou qui ont des applis qui ne collent pas tout à fait.",
    underTheHood: [
      "Applis sur mesure en React / Next.js",
      "Données sécurisées, connexions et rôles",
      "Développement assisté par IA",
    ],
    cta: "Construire mon outil",
  },
  automations: {
    slug: "automations",
    icon: "code",
    bucket: "Gagnez des heures chaque semaine",
    title: "Automatisations et intégrations",
    tagline: "Connectez les outils que vous utilisez déjà (Stripe, WhatsApp, email, Google) pour que les tâches ingrates se fassent toutes seules.",
    intro:
      "Chaque semaine, vous perdez des heures à recopier des choses d'une appli à l'autre et à courir après ce qui vous a échappé. Nous relions vos outils pour que les tâches ingrates se fassent toutes seules : une réservation atterrit directement dans votre agenda, un paiement envoie son propre reçu, une nouvelle demande arrive là où vous la verrez, et les rappels partent sans que vous leviez le petit doigt. Vous cessez d'être le lien entre vos applis.",
    included: [
      "Les réservations atterrissent directement dans votre agenda",
      "Paiements et reçus gérés automatiquement",
      "Les nouvelles demandes arrivent là où vous les verrez vraiment",
      "Rappels et relances envoyés sans que vous leviez le petit doigt",
      "Vos outils se parlent enfin entre eux",
    ],
    whoFor: "Les dirigeants qui copient-collent d'une appli à l'autre, ou qui oublient les relances.",
    underTheHood: [
      "Intégrations avec Stripe, WhatsApp, Google et email",
      "Automatisation des flux et webhooks",
      "Connexions fiables et surveillées",
    ],
    cta: "Automatiser mes tâches ingrates",
  },
};

const de: Record<ServiceSlug, Service> = {
  websites: {
    slug: "websites",
    icon: "globe",
    bucket: "Gefunden und gewählt werden",
    title: "Websites",
    tagline: "Eine schnelle, mit KI gebaute Website, die auftaucht, wenn Leute in der Nähe suchen, und einen neugierigen Besucher in eine Buchung verwandelt.",
    intro:
      "Deine Website ist der erste Eindruck, den die meisten Kunden je von dir bekommen. Wir bauen dir eine, die etabliert wirkt, in einem Wimpernschlag lädt und auftaucht, wenn jemand in der Nähe nach dem sucht, was du machst. Weil die KI die schwere Arbeit übernimmt, ist sie in Tagen fertig, nicht in Monaten, und jede Seite zielt auf das Eine, das sie tun sollen: buchen, bestellen, anrufen oder schreiben.",
    included: [
      "Wirkt von der ersten Sekunde an etabliert und professionell",
      "Taucht auf, wenn Leute in der Nähe nach dem suchen, was du machst",
      "Lädt sofort, sodass niemand auf eine lahme Website wartet",
      "Buchen, bestellen, anrufen oder schreiben mit einem Tipp, auch nach Feierabend",
      "In Tagen fertig, nicht in Monaten, weil die KI die schwere Arbeit übernimmt",
    ],
    whoFor: "Unternehmen, die eine neue Website starten oder eine veraltete Vorlagen-Website ersetzen.",
    underTheHood: [
      "KI-gestützte Entwicklung auf Next.js",
      "Lokales SEO, schema und Google Business Profile",
      "Core Web Vitals und Barrierefreiheit nach WCAG AA",
    ],
    cta: "Meine Website bauen",
  },
  "ai-agents": {
    slug: "ai-agents",
    icon: "chat",
    bucket: "Allen antworten, rund um die Uhr",
    title: "KI-Agenten",
    tagline: "Ein freundlicher Assistent, der Kunden antwortet, Buchungen entgegennimmt und den Empfang macht, auf WhatsApp und auf deiner Website, auch um Mitternacht.",
    intro:
      "Die meisten Anfragen kommen, wenn du beschäftigt oder geschlossen hast, und eine unbeantwortete Frage ist ein verlorener Kunde. Wir richten einen freundlichen Assistenten ein, der in Sekunden antwortet, selbst Termine bucht und die Fragen beantwortet, die dir den ganzen Tag gestellt werden: Öffnungszeiten, Preise, wo ihr seid. Wenn etwas dich braucht, übergibt er das Gespräch direkt an dich. Er klingt nach deinem Unternehmen, nicht nach einem Roboter.",
    included: [
      "Antwortet in Sekunden, Tag und Nacht",
      "Bucht Termine und Tische ganz von selbst",
      "Beantwortet dieselben Fragen, die dir den ganzen Tag gestellt werden",
      "Übergibt dir das Gespräch in dem Moment, in dem es zählt",
      "Funktioniert auf WhatsApp und direkt auf deiner Website",
    ],
    whoFor: "Unternehmen, die in wiederkehrenden Fragen ertrinken oder Anfragen nach Feierabend verlieren.",
    underTheHood: [
      "Konversations-KI, auf dein Unternehmen abgestimmt",
      "WhatsApp Business und Chat auf der Website",
      "Buchungsintegrationen mit Übergabe an einen Menschen",
    ],
    cta: "Meinen Agenten einrichten",
  },
  "custom-tools": {
    slug: "custom-tools",
    icon: "layers",
    bucket: "Software, die genau passt",
    title: "Maßgeschneiderte Tools & Apps",
    tagline: "Buchungs-Apps, Angebotsrechner, einfache Dashboards und interne Tools, gebaut um die Art, wie du tatsächlich arbeitest.",
    intro:
      "Apps von der Stange passen selten zu einem echten Unternehmen, und die, die passen, kosten ein Vermögen. Weil die KI uns schnell bauen lässt, können wir genau das Tool machen, das du brauchst: eine Bestell-App mit deinem Branding, einen Angebotsrechner, den deine Kunden selbst ausfüllen, ein einfaches Dashboard mit dem, was wirklich zählt, oder ein internes Tool, das die Fleißarbeit beseitigt. Deins, kein Abo nach dem Einheitsprinzip.",
    included: [
      "Eine Buchungs- oder Bestell-App mit deinem Branding",
      "Ein Angebotsrechner, den deine Kunden selbst ausfüllen",
      "Ein einfaches Dashboard mit den Zahlen, die zählen",
      "Interne Tools, die die tägliche Fleißarbeit kürzen",
      "Schnell gebaut, weil die KI die schwere Arbeit übernimmt",
    ],
    whoFor: "Inhaber, denen Tabellen zu eng werden oder deren Apps nicht ganz passen.",
    underTheHood: [
      "Maßgeschneiderte React- / Next.js-Apps",
      "Sichere Daten, Logins und Rollen",
      "KI-gestützte Entwicklung",
    ],
    cta: "Mein Tool bauen",
  },
  automations: {
    slug: "automations",
    icon: "code",
    bucket: "Spar jede Woche Stunden",
    title: "Automatisierungen & Integrationen",
    tagline: "Verbinde die Tools, die du schon nutzt (Stripe, WhatsApp, Email, Google), sodass die Fleißarbeit sich von selbst erledigt.",
    intro:
      "Jede Woche verlierst du Stunden damit, Dinge zwischen Apps zu kopieren und dem hinterherzulaufen, was durchgerutscht ist. Wir verdrahten deine Tools miteinander, sodass die Fleißarbeit sich von selbst erledigt: Eine Buchung landet direkt in deinem Kalender, eine Zahlung verschickt ihre eigene Quittung, eine neue Anfrage geht dahin, wo du sie siehst, und Erinnerungen gehen raus, ohne dass du einen Finger rührst. Du hörst auf, der Klebstoff zwischen deinen Apps zu sein.",
    included: [
      "Buchungen landen direkt in deinem Kalender",
      "Zahlungen und Quittungen werden automatisch abgewickelt",
      "Neue Anfragen landen dort, wo du sie wirklich siehst",
      "Erinnerungen und Nachfassen, verschickt ohne dass du einen Finger rührst",
      "Deine Tools reden endlich miteinander",
    ],
    whoFor: "Inhaber, die zwischen Apps kopieren und einfügen oder das Nachfassen vergessen.",
    underTheHood: [
      "Integrationen mit Stripe, WhatsApp, Google und Email",
      "Workflow-Automatisierung und Webhooks",
      "Zuverlässige, überwachte Verbindungen",
    ],
    cta: "Meine Fleißarbeit automatisieren",
  },
};

const it: Record<ServiceSlug, Service> = {
  websites: {
    slug: "websites",
    icon: "globe",
    bucket: "Fatti trovare e fatti scegliere",
    title: "Siti web",
    tagline: "Un sito veloce, costruito con l'IA, che compare quando cercano vicino a te e trasforma un visitatore curioso in una prenotazione.",
    intro:
      "Il tuo sito è la prima impressione che la maggior parte dei clienti avrà di te. Te ne costruiamo uno che sembra affermato, si carica in un battito di ciglia e compare quando qualcuno vicino cerca quello che fai. Siccome l'IA fa il lavoro pesante, è pronto in giorni, non in mesi, e ogni pagina punta all'unica cosa che vuoi facciano: prenotare, ordinare, chiamare o scrivere.",
    included: [
      "Sembra affermato e professionale fin dal primo secondo",
      "Compare quando la gente vicino cerca quello che fai",
      "Si carica all'istante, nessuno aspetta un sito lento",
      "Prenotare, ordinare, chiamare o scrivere con un tocco, anche fuori orario",
      "Pronto in giorni, non in mesi, perché l'IA fa il lavoro pesante",
    ],
    whoFor: "Attività che lanciano un sito nuovo o sostituiscono uno datato e da modello.",
    underTheHood: [
      "Realizzazione assistita dall'IA su Next.js",
      "SEO locale, schema e Google Business Profile",
      "Core Web Vitals e accessibilità a livello WCAG AA",
    ],
    cta: "Costruisci il mio sito",
  },
  "ai-agents": {
    slug: "ai-agents",
    icon: "chat",
    bucket: "Rispondi a tutti, 24/7",
    title: "Agenti IA",
    tagline: "Un assistente cordiale che risponde ai clienti, prende le prenotazioni e fa da reception, su WhatsApp e sul tuo sito, anche a mezzanotte.",
    intro:
      "La maggior parte delle richieste arriva quando sei occupato o chiuso, e una domanda senza risposta è un cliente perso. Configuriamo un assistente cordiale che risponde in pochi secondi, prenota gli appuntamenti da solo e gestisce le domande che ti fanno tutto il giorno: orari, prezzi, dove ti trovi. Quando serve te, ti passa la conversazione direttamente. Suona come la tua attività, non come un robot.",
    included: [
      "Risponde in pochi secondi, di giorno o di notte",
      "Prenota appuntamenti e tavoli da solo",
      "Risponde alle stesse domande che ti fanno tutto il giorno",
      "Ti passa la conversazione nel momento in cui conta",
      "Funziona su WhatsApp e direttamente sul tuo sito",
    ],
    whoFor: "Attività sommerse da domande ripetute o che perdono richieste fuori orario.",
    underTheHood: [
      "IA conversazionale, calibrata sulla tua attività",
      "WhatsApp Business e chat sul sito",
      "Integrazioni con le prenotazioni e passaggio a una persona",
    ],
    cta: "Configura il mio agente",
  },
  "custom-tools": {
    slug: "custom-tools",
    icon: "layers",
    bucket: "Software che calza alla perfezione",
    title: "Strumenti e app su misura",
    tagline: "App di prenotazione, calcolatori di preventivi, dashboard semplici e strumenti interni, costruiti su come lavori davvero.",
    intro:
      "Le app preconfezionate raramente si adattano a un'attività vera, e quelle che lo fanno costano una fortuna. Siccome l'IA ci permette di costruire in fretta, possiamo creare lo strumento esatto che ti serve: un'app di ordini con il tuo marchio, un calcolatore di preventivi che i clienti compilano da soli, una dashboard semplice con ciò che conta davvero, o uno strumento interno che elimina il lavoro ripetitivo. Tuo, non un abbonamento uguale per tutti.",
    included: [
      "Un'app di prenotazione o di ordini con il tuo marchio",
      "Un calcolatore di preventivi che i clienti compilano da soli",
      "Una dashboard semplice con i numeri che contano",
      "Strumenti interni che riducono il lavoro ripetitivo quotidiano",
      "Costruito in fretta, perché l'IA fa il lavoro pesante",
    ],
    whoFor: "Titolari che hanno superato i fogli di calcolo, o le app che non calzano del tutto.",
    underTheHood: [
      "App su misura in React / Next.js",
      "Dati sicuri, accessi e ruoli",
      "Sviluppo assistito dall'IA",
    ],
    cta: "Costruisci il mio strumento",
  },
  automations: {
    slug: "automations",
    icon: "code",
    bucket: "Risparmia ore ogni settimana",
    title: "Automazioni e integrazioni",
    tagline: "Collega gli strumenti che già usi (Stripe, WhatsApp, email, Google) così il lavoro ripetitivo si fa da solo.",
    intro:
      "Ogni settimana perdi ore a copiare cose tra le app e a rincorrere ciò che ti è sfuggito. Colleghiamo i tuoi strumenti così il lavoro ripetitivo si fa da solo: una prenotazione finisce dritta nel tuo calendario, un pagamento invia da solo la sua ricevuta, una nuova richiesta arriva dove la vedi, e i promemoria partono senza che tu muova un dito. Smetti di essere il collante tra le tue app.",
    included: [
      "Le prenotazioni finiscono dritte nel tuo calendario",
      "Pagamenti e ricevute gestiti automaticamente",
      "Le nuove richieste arrivano dove le vedi davvero",
      "Promemoria e follow-up inviati senza che tu muova un dito",
      "I tuoi strumenti finalmente si parlano tra loro",
    ],
    whoFor: "Titolari che copiano e incollano tra le app, o che si dimenticano dei follow-up.",
    underTheHood: [
      "Integrazioni con Stripe, WhatsApp, Google ed email",
      "Automazione dei flussi e webhook",
      "Connessioni affidabili e monitorate",
    ],
    cta: "Automatizza il lavoro ripetitivo",
  },
};

const content: Record<Locale, Record<ServiceSlug, Service>> = { en, es, fr, de, it };

export function getServices(locale: Locale): Service[] {
  return serviceSlugs.map((slug) => content[locale][slug]);
}

export function getService(locale: Locale, slug: string): Service | undefined {
  if (!(slug in content[locale])) return undefined;
  return content[locale][slug as ServiceSlug];
}
