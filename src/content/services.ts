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
    tagline: "Stop losing customers to a slow or invisible website.",
    intro:
      "Right now, people nearby are searching for what you do. Whether they find you, or your competitor, comes down to your website. We build sites that load fast, show up in local search, and turn visitors into bookings before they scroll away.",
    included: [
      "Shows up when nearby customers search for what you do",
      "Loads in under a second, because slow sites lose people",
      "One-tap booking, calling or messaging, from any device",
      "Looks established and professional from the very first visit",
      "Ready in days, not months, because AI does the heavy lifting",
    ],
    whoFor: "Businesses launching a new site, or replacing a dated, templated one.",
    underTheHood: [
      "AI-assisted build on Next.js",
      "Local SEO, schema & Google Business Profile",
      "Core Web Vitals & accessibility to WCAG AA",
    ],
    cta: "Get a site that brings people in",
  },
  "ai-agents": {
    slug: "ai-agents",
    icon: "chat",
    bucket: "Answer everyone, 24/7",
    title: "AI Agents",
    tagline: "Never lose a customer to an unanswered message again.",
    intro:
      "Every time a customer messages you after hours and doesn't hear back, there's a good chance they've already booked somewhere else. Our AI agents reply in seconds, answer your most common questions, and handle bookings, even at midnight, even when you're with another customer.",
    included: [
      "Replies in seconds, day or night, on WhatsApp and your site",
      "Books appointments and tables without you lifting a finger",
      "Sounds like you, not a generic bot",
      "Passes the conversation to you the moment it actually needs you",
      "Answers the same questions you get asked all day",
    ],
    whoFor: "Businesses drowning in repeat questions, or losing after-hours enquiries.",
    underTheHood: [
      "Conversational AI, tuned to your business",
      "WhatsApp Business & on-site chat",
      "Booking integrations with human handoff",
    ],
    cta: "Stop missing enquiries after hours",
  },
  "custom-tools": {
    slug: "custom-tools",
    icon: "layers",
    bucket: "Software that fits exactly",
    title: "Custom Tools & Apps",
    tagline: "Stop running your business on tools that almost fit.",
    intro:
      "Off-the-shelf software is built for everyone, which means it's built perfectly for no one. We build the specific thing you actually need: a booking app that works the way you work, a quote calculator your customers fill in themselves, a dashboard showing the only numbers that matter to you.",
    included: [
      "A booking or ordering app, branded and built for your business",
      "A quote calculator that turns enquiries into serious leads",
      "A simple dashboard with only the numbers you actually check",
      "Internal tools that cut the daily tasks you're doing manually",
      "Built fast, because AI does the heavy lifting",
    ],
    whoFor: "Owners outgrowing spreadsheets, or apps that don't quite fit.",
    underTheHood: [
      "Custom React / Next.js apps",
      "Secure data, logins & roles",
      "AI-assisted development",
    ],
    cta: "Tell us what you need built",
  },
  automations: {
    slug: "automations",
    icon: "code",
    bucket: "Save hours every week",
    title: "Automations & Integrations",
    tagline: "Win back the hours you spend on tasks that should run themselves.",
    intro:
      "If you're manually copying bookings into your calendar, chasing payment confirmations, or sending the same follow-up message over and over, those hours add up. We connect the tools you already use so all of that happens automatically, in the background, without you.",
    included: [
      "Bookings land straight in your calendar the moment they're made",
      "Payments and receipts handled without you logging in",
      "New enquiries appear exactly where you'll see them",
      "Reminders and follow-ups sent automatically, every time",
      "Your tools finally talk to each other",
    ],
    whoFor: "Owners copy-pasting between apps, or forgetting follow-ups.",
    underTheHood: [
      "Integrations with Stripe, WhatsApp, Google & email",
      "Workflow automation & webhooks",
      "Reliable, monitored connections",
    ],
    cta: "Automate the tasks eating your week",
  },
};

const es: Record<ServiceSlug, Service> = {
  websites: {
    slug: "websites",
    icon: "globe",
    bucket: "Que te encuentren y te elijan",
    title: "Webs",
    tagline: "Deja de perder clientes por una web lenta o invisible.",
    intro:
      "Ahora mismo hay gente cerca buscando lo que tú haces. Que te encuentren a ti, o a tu competencia, depende de tu web. Creamos webs que cargan rápido, aparecen en las búsquedas de tu zona y convierten a quien entra en una reserva antes de que se vaya.",
    included: [
      "Apareces cuando la gente de tu zona busca lo que haces",
      "Carga en menos de un segundo, porque las webs lentas espantan a la gente",
      "Reservar, llamar o escribirte con un solo toque, desde cualquier dispositivo",
      "Transmite seriedad y profesionalidad desde la primera visita",
      "Lista en días, no en meses, porque la IA hace el trabajo pesado",
    ],
    whoFor: "Negocios que lanzan una web nueva o sustituyen una antigua y de plantilla.",
    underTheHood: [
      "Construcción asistida por IA sobre Next.js",
      "SEO local, schema y Perfil de Empresa en Google",
      "Core Web Vitals y accesibilidad nivel WCAG AA",
    ],
    cta: "Consigue una web que te traiga clientes",
  },
  "ai-agents": {
    slug: "ai-agents",
    icon: "chat",
    bucket: "Atiende a todos, 24/7",
    title: "Agentes IA",
    tagline: "No vuelvas a perder un cliente por un mensaje sin responder.",
    intro:
      "Cada vez que un cliente te escribe fuera de horario y no recibe respuesta, hay muchas papeletas de que ya haya reservado en otro sitio. Nuestros agentes de IA responden en segundos, contestan las preguntas más frecuentes y gestionan reservas, aunque sea medianoche, aunque estés con otro cliente.",
    included: [
      "Responde en segundos, de día o de noche, en WhatsApp y en tu web",
      "Reserva citas y mesas sin que tú muevas un dedo",
      "Suena a ti, no a un bot genérico",
      "Te pasa la conversación en cuanto de verdad te necesita",
      "Contesta las mismas preguntas que te hacen todo el día",
    ],
    whoFor: "Negocios que se ahogan en preguntas repetidas o pierden consultas fuera de hora.",
    underTheHood: [
      "IA conversacional, ajustada a tu negocio",
      "WhatsApp Business y chat en la web",
      "Integración con reservas y paso a una persona",
    ],
    cta: "Deja de perder consultas fuera de horario",
  },
  "custom-tools": {
    slug: "custom-tools",
    icon: "layers",
    bucket: "Software a tu medida",
    title: "Herramientas y apps a medida",
    tagline: "Deja de llevar tu negocio con herramientas que casi te valen.",
    intro:
      "El software estándar está hecho para todo el mundo, lo que significa que no está hecho a la perfección para nadie. Construimos justo lo que de verdad necesitas: una app de reservas que funciona como trabajas tú, una calculadora de presupuestos que rellenan tus propios clientes, un panel que muestra solo los números que te importan.",
    included: [
      "Una app de reservas o pedidos, con tu marca y hecha para tu negocio",
      "Una calculadora de presupuestos que convierte consultas en clientes de verdad",
      "Un panel sencillo solo con los números que de verdad miras",
      "Herramientas internas que recortan las tareas que haces a mano cada día",
      "Hecho rápido, porque la IA hace el trabajo pesado",
    ],
    whoFor: "Dueños que se quedan cortos con hojas de cálculo, o con apps que no acaban de encajar.",
    underTheHood: [
      "Apps a medida en React / Next.js",
      "Datos seguros, accesos y permisos",
      "Desarrollo asistido por IA",
    ],
    cta: "Cuéntanos qué necesitas que construyamos",
  },
  automations: {
    slug: "automations",
    icon: "code",
    bucket: "Ahorra horas cada semana",
    title: "Automatizaciones e integraciones",
    tagline: "Recupera las horas que pierdes en tareas que deberían hacerse solas.",
    intro:
      "Si estás copiando reservas a mano en tu agenda, persiguiendo confirmaciones de pago o mandando el mismo mensaje de seguimiento una y otra vez, esas horas suman. Conectamos las herramientas que ya usas para que todo eso pase de forma automática, en segundo plano, sin ti.",
    included: [
      "Las reservas caen directas en tu agenda en cuanto se hacen",
      "Pagos y recibos gestionados sin que tengas que entrar a nada",
      "Las consultas nuevas aparecen justo donde las vas a ver",
      "Recordatorios y seguimientos enviados solos, siempre",
      "Tus herramientas por fin hablan entre ellas",
    ],
    whoFor: "Dueños que copian y pegan entre apps, o que se olvidan de los seguimientos.",
    underTheHood: [
      "Integraciones con Stripe, WhatsApp, Google y email",
      "Automatización de flujos y webhooks",
      "Conexiones fiables y monitorizadas",
    ],
    cta: "Automatiza las tareas que te comen la semana",
  },
};

const fr: Record<ServiceSlug, Service> = {
  websites: {
    slug: "websites",
    icon: "globe",
    bucket: "Soyez trouvé et choisi",
    title: "Sites web",
    tagline: "Arrêtez de perdre des clients à cause d'un site lent ou invisible.",
    intro:
      "En ce moment même, des gens près de chez vous cherchent ce que vous proposez. Qu'ils vous trouvent vous, ou votre concurrent, tout se joue sur votre site. Nous créons des sites qui se chargent vite, apparaissent dans les recherches locales, et transforment les visiteurs en réservations avant qu'ils ne fassent défiler la page.",
    included: [
      "Apparaît quand des clients proches cherchent ce que vous proposez",
      "Se charge en moins d'une seconde, parce qu'un site lent fait fuir les gens",
      "Réservation, appel ou message en un geste, sur n'importe quel appareil",
      "Inspire confiance et sérieux dès la toute première visite",
      "Prêt en quelques jours, pas en quelques mois, parce que l'IA fait le gros du travail",
    ],
    whoFor: "Les commerces qui lancent un nouveau site, ou qui remplacent un site daté et standardisé.",
    underTheHood: [
      "Création assistée par IA avec Next.js",
      "SEO local, schema et Google Business Profile",
      "Core Web Vitals et accessibilité niveau WCAG AA",
    ],
    cta: "Obtenez un site qui fait venir les gens",
  },
  "ai-agents": {
    slug: "ai-agents",
    icon: "chat",
    bucket: "Répondez à tous, 24h/24",
    title: "Agents IA",
    tagline: "Ne perdez plus jamais un client à cause d'un message sans réponse.",
    intro:
      "Chaque fois qu'un client vous écrit après la fermeture sans recevoir de réponse, il y a de fortes chances qu'il ait déjà réservé ailleurs. Nos agents IA répondent en quelques secondes, traitent vos questions les plus fréquentes et gèrent les réservations, même à minuit, même quand vous êtes avec un autre client.",
    included: [
      "Répond en quelques secondes, jour et nuit, sur WhatsApp et sur votre site",
      "Prend les rendez-vous et les tables sans que vous leviez le petit doigt",
      "Parle comme vous, pas comme un robot générique",
      "Vous passe la conversation au moment précis où vous êtes vraiment nécessaire",
      "Répond aux mêmes questions qu'on vous pose à longueur de journée",
    ],
    whoFor: "Les commerces qui croulent sous les questions répétées, ou qui perdent les demandes en dehors des horaires.",
    underTheHood: [
      "IA conversationnelle, ajustée à votre activité",
      "WhatsApp Business et chat sur le site",
      "Intégrations de réservation avec passage à une personne",
    ],
    cta: "Ne ratez plus aucune demande après la fermeture",
  },
  "custom-tools": {
    slug: "custom-tools",
    icon: "layers",
    bucket: "Un logiciel qui vous va parfaitement",
    title: "Outils et applis sur mesure",
    tagline: "Arrêtez de faire tourner votre entreprise avec des outils qui ne collent qu'à peu près.",
    intro:
      "Les logiciels standards sont conçus pour tout le monde, ce qui veut dire qu'ils ne sont parfaits pour personne. Nous construisons exactement ce dont vous avez besoin, une appli de réservation qui fonctionne à votre façon, un calculateur de devis que vos clients remplissent eux-mêmes, un tableau de bord qui n'affiche que les chiffres qui comptent pour vous.",
    included: [
      "Une appli de réservation ou de commande, à votre image et pensée pour vous",
      "Un calculateur de devis qui transforme les demandes en prospects sérieux",
      "Un tableau de bord simple, avec uniquement les chiffres que vous consultez vraiment",
      "Des outils internes qui éliminent les tâches que vous faites encore à la main",
      "Construit vite, parce que l'IA fait le gros du travail",
    ],
    whoFor: "Les dirigeants qui débordent de leurs tableurs, ou qui ont des applis qui ne collent pas tout à fait.",
    underTheHood: [
      "Applis sur mesure en React / Next.js",
      "Données sécurisées, connexions et rôles",
      "Développement assisté par IA",
    ],
    cta: "Dites-nous ce que vous voulez faire construire",
  },
  automations: {
    slug: "automations",
    icon: "code",
    bucket: "Gagnez des heures chaque semaine",
    title: "Automatisations et intégrations",
    tagline: "Récupérez les heures perdues sur des tâches qui devraient se faire toutes seules.",
    intro:
      "Si vous recopiez à la main des réservations dans votre agenda, relancez des confirmations de paiement, ou envoyez encore et encore le même message de suivi, ces heures s'accumulent. Nous connectons les outils que vous utilisez déjà pour que tout ça se fasse automatiquement, en arrière-plan, sans vous.",
    included: [
      "Les réservations atterrissent directement dans votre agenda dès qu'elles sont faites",
      "Paiements et reçus gérés sans que vous ayez à vous connecter",
      "Les nouvelles demandes apparaissent exactement là où vous les verrez",
      "Rappels et relances envoyés automatiquement, à chaque fois",
      "Vos outils se parlent enfin entre eux",
    ],
    whoFor: "Les dirigeants qui copient-collent d'une appli à l'autre, ou qui oublient les relances.",
    underTheHood: [
      "Intégrations avec Stripe, WhatsApp, Google et email",
      "Automatisation des flux et webhooks",
      "Connexions fiables et surveillées",
    ],
    cta: "Automatisez les tâches qui dévorent votre semaine",
  },
};

const de: Record<ServiceSlug, Service> = {
  websites: {
    slug: "websites",
    icon: "globe",
    bucket: "Gefunden und gewählt werden",
    title: "Websites",
    tagline: "Verlier keine Kunden mehr an eine langsame oder unsichtbare Website.",
    intro:
      "Gerade jetzt suchen Leute in deiner Nähe nach dem, was du machst. Ob sie dich finden, oder deinen Mitbewerber, hängt an deiner Website. Wir bauen Seiten, die schnell laden, in der lokalen Suche auftauchen und Besucher zu Buchungen machen, bevor sie weiterscrollen.",
    included: [
      "Taucht auf, wenn Kunden in der Nähe nach dem suchen, was du machst",
      "Lädt in unter einer Sekunde, denn lahme Seiten verlieren Leute",
      "Buchen, anrufen oder schreiben mit einem Tipp, von jedem Gerät",
      "Wirkt vom ersten Besuch an etabliert und professionell",
      "Fertig in Tagen, nicht Monaten, weil die KI die Schwerarbeit macht",
    ],
    whoFor: "Unternehmen, die eine neue Website starten oder eine veraltete Vorlagen-Website ersetzen.",
    underTheHood: [
      "KI-gestützte Entwicklung auf Next.js",
      "Lokales SEO, schema und Google Business Profile",
      "Core Web Vitals und Barrierefreiheit nach WCAG AA",
    ],
    cta: "Hol dir eine Seite, die Leute reinbringt",
  },
  "ai-agents": {
    slug: "ai-agents",
    icon: "chat",
    bucket: "Allen antworten, rund um die Uhr",
    title: "KI-Agenten",
    tagline: "Verlier nie wieder einen Kunden an eine unbeantwortete Nachricht.",
    intro:
      "Jedes Mal, wenn dir ein Kunde nach Feierabend schreibt und keine Antwort bekommt, hat er ziemlich sicher schon woanders gebucht. Unsere KI-Agenten antworten in Sekunden, beantworten deine häufigsten Fragen und übernehmen Buchungen, auch um Mitternacht, auch wenn du gerade bei einem anderen Kunden bist.",
    included: [
      "Antwortet in Sekunden, Tag und Nacht, auf WhatsApp und deiner Seite",
      "Bucht Termine und Tische, ohne dass du einen Finger rührst",
      "Klingt wie du, nicht wie ein 08/15-Bot",
      "Gibt das Gespräch an dich ab, sobald es dich wirklich braucht",
      "Beantwortet die Fragen, die dir den ganzen Tag gestellt werden",
    ],
    whoFor: "Unternehmen, die in wiederkehrenden Fragen ertrinken oder Anfragen nach Feierabend verlieren.",
    underTheHood: [
      "Konversations-KI, auf dein Unternehmen abgestimmt",
      "WhatsApp Business und Chat auf der Website",
      "Buchungsintegrationen mit Übergabe an einen Menschen",
    ],
    cta: "Verpass keine Anfragen mehr nach Feierabend",
  },
  "custom-tools": {
    slug: "custom-tools",
    icon: "layers",
    bucket: "Software, die genau passt",
    title: "Maßgeschneiderte Tools & Apps",
    tagline: "Führ dein Geschäft nicht mehr mit Tools, die nur fast passen.",
    intro:
      "Software von der Stange ist für alle gebaut, und damit für niemanden perfekt. Wir bauen genau das, was du wirklich brauchst: eine Buchungs-App, die so funktioniert wie du arbeitest, einen Angebotsrechner, den deine Kunden selbst ausfüllen, ein Dashboard mit genau den Zahlen, die für dich zählen.",
    included: [
      "Eine Buchungs- oder Bestell-App, gebrandet und gebaut für dein Geschäft",
      "Ein Angebotsrechner, der aus Anfragen ernsthafte Leads macht",
      "Ein einfaches Dashboard mit nur den Zahlen, die du wirklich checkst",
      "Interne Tools, die dir die täglichen Handgriffe abnehmen",
      "Schnell gebaut, weil die KI die Schwerarbeit macht",
    ],
    whoFor: "Inhaber, denen Tabellen zu eng werden oder deren Apps nicht ganz passen.",
    underTheHood: [
      "Maßgeschneiderte React- / Next.js-Apps",
      "Sichere Daten, Logins und Rollen",
      "KI-gestützte Entwicklung",
    ],
    cta: "Sag uns, was du gebaut haben willst",
  },
  automations: {
    slug: "automations",
    icon: "code",
    bucket: "Spar jede Woche Stunden",
    title: "Automatisierungen & Integrationen",
    tagline: "Hol dir die Stunden zurück, die du für Aufgaben verlierst, die sich von selbst erledigen sollten.",
    intro:
      "Wenn du Buchungen von Hand in deinen Kalender überträgst, Zahlungsbestätigungen hinterherjagst oder dieselbe Nachricht immer und immer wieder schickst, diese Stunden summieren sich. Wir verbinden die Tools, die du schon nutzt, sodass all das automatisch im Hintergrund passiert, ganz ohne dich.",
    included: [
      "Buchungen landen direkt in deinem Kalender, sobald eine Buchung reinkommt",
      "Zahlungen und Belege erledigt, ohne dass du dich einloggst",
      "Neue Anfragen tauchen genau da auf, wo du sie siehst",
      "Erinnerungen und Nachfass-Nachrichten automatisch verschickt, jedes Mal",
      "Deine Tools reden endlich miteinander",
    ],
    whoFor: "Inhaber, die zwischen Apps kopieren und einfügen oder das Nachfassen vergessen.",
    underTheHood: [
      "Integrationen mit Stripe, WhatsApp, Google und Email",
      "Workflow-Automatisierung und Webhooks",
      "Zuverlässige, überwachte Verbindungen",
    ],
    cta: "Automatisier die Aufgaben, die deine Woche auffressen",
  },
};

const it: Record<ServiceSlug, Service> = {
  websites: {
    slug: "websites",
    icon: "globe",
    bucket: "Fatti trovare e fatti scegliere",
    title: "Siti web",
    tagline: "Smetti di perdere clienti per un sito lento o invisibile.",
    intro:
      "Proprio ora, qui vicino, c'è chi cerca quello che fai. Che trovi te, o il tuo concorrente, dipende dal tuo sito. Noi costruiamo siti che caricano veloci, compaiono nelle ricerche locali e trasformano i visitatori in prenotazioni prima che scrollino via.",
    included: [
      "Compare quando i clienti qui vicino cercano quello che fai",
      "Carica in meno di un secondo, perché i siti lenti fanno perdere persone",
      "Prenoti, chiami o scrivi con un tocco, da qualsiasi dispositivo",
      "Trasmette un'immagine solida e professionale fin dal primo sguardo",
      "Pronto in giorni, non in mesi, perché il grosso lo fa l'IA",
    ],
    whoFor: "Attività che lanciano un sito nuovo o sostituiscono uno datato e da modello.",
    underTheHood: [
      "Realizzazione assistita dall'IA su Next.js",
      "SEO locale, schema e Google Business Profile",
      "Core Web Vitals e accessibilità a livello WCAG AA",
    ],
    cta: "Voglio un sito che mi porta gente",
  },
  "ai-agents": {
    slug: "ai-agents",
    icon: "chat",
    bucket: "Rispondi a tutti, 24/7",
    title: "Agenti IA",
    tagline: "Non perdere mai più un cliente per un messaggio senza risposta.",
    intro:
      "Ogni volta che un cliente ti scrive fuori orario e non riceve risposta, è molto probabile che abbia già prenotato altrove. I nostri agenti IA rispondono in pochi secondi, sciolgono i dubbi più comuni e gestiscono le prenotazioni, anche a mezzanotte, anche quando sei con un altro cliente.",
    included: [
      "Risponde in pochi secondi, giorno e notte, su WhatsApp e sul tuo sito",
      "Prenota appuntamenti e tavoli senza che tu muova un dito",
      "Parla come parli tu, non come un bot qualsiasi",
      "Passa la conversazione a te nel momento in cui serve davvero",
      "Risponde alle stesse domande che ti fanno tutto il giorno",
    ],
    whoFor: "Attività sommerse da domande ripetute o che perdono richieste fuori orario.",
    underTheHood: [
      "IA conversazionale, calibrata sulla tua attività",
      "WhatsApp Business e chat sul sito",
      "Integrazioni con le prenotazioni e passaggio a una persona",
    ],
    cta: "Basta richieste perse fuori orario",
  },
  "custom-tools": {
    slug: "custom-tools",
    icon: "layers",
    bucket: "Software che calza alla perfezione",
    title: "Strumenti e app su misura",
    tagline: "Smetti di mandare avanti l'attività con strumenti che vanno quasi bene.",
    intro:
      "Il software pronto all'uso è fatto per tutti, e quindi non è fatto su misura per nessuno. Noi costruiamo la cosa precisa che ti serve davvero: un'app di prenotazione che funziona come lavori tu, un calcolatore di preventivi che i clienti compilano da soli, una dashboard con solo i numeri che contano per te.",
    included: [
      "Un'app di prenotazione o ordini, col tuo marchio e su misura per la tua attività",
      "Un calcolatore di preventivi che trasforma le richieste in contatti seri",
      "Una dashboard semplice con solo i numeri che guardi davvero",
      "Strumenti interni che eliminano le attività che ogni giorno fai a mano",
      "Costruito in fretta, perché il grosso lo fa l'IA",
    ],
    whoFor: "Titolari che hanno superato i fogli di calcolo, o le app che non calzano del tutto.",
    underTheHood: [
      "App su misura in React / Next.js",
      "Dati sicuri, accessi e ruoli",
      "Sviluppo assistito dall'IA",
    ],
    cta: "Dicci cosa vuoi costruire",
  },
  automations: {
    slug: "automations",
    icon: "code",
    bucket: "Risparmia ore ogni settimana",
    title: "Automazioni e integrazioni",
    tagline: "Riprenditi le ore che spendi in attività che dovrebbero andare da sole.",
    intro:
      "Se copi a mano le prenotazioni in agenda, rincorri le conferme di pagamento o invii sempre lo stesso messaggio di follow-up, quelle ore si sommano. Noi colleghiamo gli strumenti che già usi così tutto questo avviene in automatico, in sottofondo, senza di te.",
    included: [
      "Le prenotazioni finiscono in agenda nell'istante in cui arrivano",
      "Pagamenti e ricevute gestiti senza che tu faccia il login",
      "Le nuove richieste compaiono esattamente dove le vedrai",
      "Promemoria e follow-up inviati in automatico, ogni volta",
      "I tuoi strumenti finalmente si parlano tra loro",
    ],
    whoFor: "Titolari che copiano e incollano tra le app, o che si dimenticano dei follow-up.",
    underTheHood: [
      "Integrazioni con Stripe, WhatsApp, Google ed email",
      "Automazione dei flussi e webhook",
      "Connessioni affidabili e monitorate",
    ],
    cta: "Automatizza le attività che ti mangiano la settimana",
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
