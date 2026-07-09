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
  {
    q: "Who builds AI-powered websites in Spain?",
    a: "In Spain you'll find everything from traditional agencies that are starting to use AI to specialised studios like Kodable, where designers work with AI tools to build professional websites in a fraction of the usual time. Whoever you choose, look for three things: end-to-end delivery (design, copy, domain and hosting), maintenance after launch, and the ability to work in several languages if your business needs it.",
  },
  {
    q: "How long does it take to get a professional website?",
    a: "With a traditional agency, one to three months is typical. A studio working with AI brings that down to days or weeks: we build a working demo in 48 hours, and a complete website is usually live within 1-2 weeks. What really slows projects down isn't the tech, it's the content, so having your photos and text ready speeds everything up.",
  },
  {
    q: "Should I get a new website or fix the one I have?",
    a: "It depends on the foundations. If your current site loads fast, looks good on a phone and just has outdated text or photos, a refresh is usually enough. If it's slow, doesn't work well on mobile, doesn't show up on Google, or sits on a platform nobody knows how to touch any more, rebuilding from scratch almost always gives a better result, and often a faster one, than patching it. A ten-minute look usually makes the answer obvious.",
  },
  {
    q: "What does an AI agent do for a local business?",
    a: "Very concrete things: it answers WhatsApp instantly while you're busy, takes bookings and appointments outside opening hours, handles the questions you hear every day (opening times, prices, how to get there) and replies to reviews in your tone. It doesn't replace anyone: it takes care of the repetitive work so no customer goes unanswered while you're working.",
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
  {
    q: "¿Quién hace páginas web con IA en España?",
    a: "En España hay de todo: desde agencias tradicionales que empiezan a usar IA hasta estudios especializados como Kodable, donde los diseñadores trabajan con herramientas de IA para construir webs profesionales en una fracción del tiempo habitual. Elijas a quien elijas, fíjate en tres cosas: que entreguen el proyecto completo (diseño, textos, dominio y hosting), que ofrezcan mantenimiento después del lanzamiento y que puedan trabajar en varios idiomas si tu negocio lo necesita.",
  },
  {
    q: "¿Cuánto se tarda en tener una web profesional?",
    a: "Con una agencia tradicional, lo normal es de uno a tres meses. Un estudio que trabaja con IA lo baja a días o semanas: nosotros construimos una demo funcional en 48 horas y una web completa suele estar online en 1-2 semanas. Lo que de verdad frena un proyecto no es la técnica, son los contenidos, así que tener las fotos y los textos a mano lo acelera todo.",
  },
  {
    q: "¿Web nueva o arreglar la que ya tengo?",
    a: "Depende de la base. Si tu web actual carga rápido, se ve bien en el móvil y solo tiene textos o fotos anticuados, con retocarla suele bastar. Si va lenta, no funciona bien en el móvil, no aparece en Google o está montada en una plataforma que ya nadie sabe tocar, rehacerla desde cero da casi siempre mejor resultado, y a menudo más rápido, que ir poniendo parches. Un vistazo de diez minutos suele dejar clara la respuesta.",
  },
  {
    q: "¿Qué hace un agente de IA por un negocio local?",
    a: "Cosas muy concretas: responde el WhatsApp al momento cuando tú estás ocupado, coge citas y reservas fuera de horario, contesta las preguntas de todos los días (horarios, precios, cómo llegar) y responde a las reseñas con tu tono. No sustituye a nadie: se ocupa de lo repetitivo para que ningún cliente se quede sin respuesta mientras tú trabajas.",
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
  {
    q: "Qui crée des sites web avec l'IA en Espagne ?",
    a: "En Espagne, on trouve de tout : des agences classiques qui commencent à utiliser l'IA, mais aussi des studios spécialisés comme Kodable, où des designers travaillent avec des outils d'IA pour livrer des sites professionnels en une fraction du temps habituel. Quel que soit votre choix, vérifiez trois choses : une livraison complète (design, textes, domaine et hébergement), un suivi après la mise en ligne, et la capacité de travailler en plusieurs langues si votre activité le demande.",
  },
  {
    q: "Combien de temps faut-il pour avoir un site web professionnel ?",
    a: "Avec une agence classique, comptez un à trois mois. Un studio qui travaille avec l'IA ramène ça à quelques jours ou semaines : nous construisons une démo fonctionnelle en 48 heures, et un site complet est généralement en ligne en 1 à 2 semaines. Ce qui ralentit vraiment un projet, ce n'est pas la technique, c'est le contenu : avoir ses photos et ses textes sous la main accélère tout.",
  },
  {
    q: "Refaire mon site ou réparer celui que j'ai ?",
    a: "Tout dépend des fondations. Si votre site actuel charge vite, s'affiche bien sur mobile et n'a que des textes ou des photos datés, une simple remise à jour suffit souvent. S'il est lent, mal adapté au mobile, invisible sur Google ou construit sur une plateforme que plus personne ne sait modifier, repartir de zéro donne presque toujours un meilleur résultat, et souvent plus vite, que d'empiler les rustines. Un coup d'œil de dix minutes suffit généralement à trancher.",
  },
  {
    q: "Que fait un agent IA pour un commerce de proximité ?",
    a: "Des choses très concrètes : il répond sur WhatsApp à la seconde quand vous êtes occupé, prend les rendez-vous et les réservations en dehors des horaires d'ouverture, répond aux questions qui reviennent chaque jour (horaires, prix, itinéraire) et aux avis clients avec votre ton. Il ne remplace personne : il s'occupe du répétitif pour qu'aucun client ne reste sans réponse pendant que vous travaillez.",
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
  {
    q: "Wer baut KI-gestützte Websites in Spanien?",
    a: "In Spanien gibt es alles: klassische Agenturen, die anfangen, KI einzusetzen, und spezialisierte Studios wie Kodable, in denen Designer mit KI-Werkzeugen arbeiten und professionelle Websites in einem Bruchteil der üblichen Zeit bauen. Egal, für wen du dich entscheidest, achte auf drei Dinge: Komplettlieferung (Design, Texte, Domain und Hosting), Betreuung nach dem Launch und die Fähigkeit, in mehreren Sprachen zu arbeiten, falls dein Geschäft das braucht.",
  },
  {
    q: "Wie lange dauert es bis zu einer professionellen Website?",
    a: "Bei einer klassischen Agentur sind ein bis drei Monate üblich. Ein Studio, das mit KI arbeitet, schafft es in Tagen oder Wochen: Wir bauen eine funktionierende Demo in 48 Stunden, und eine komplette Website ist meist in 1-2 Wochen live. Was Projekte wirklich bremst, ist nicht die Technik, sondern der Inhalt. Wer Fotos und Texte parat hat, beschleunigt alles.",
  },
  {
    q: "Neue Website oder die alte reparieren?",
    a: "Das hängt vom Fundament ab. Wenn deine aktuelle Seite schnell lädt, auf dem Handy gut aussieht und nur veraltete Texte oder Fotos hat, reicht meist eine Auffrischung. Wenn sie langsam ist, auf dem Handy nicht funktioniert, bei Google nicht auftaucht oder auf einer Plattform läuft, die niemand mehr anfassen kann, bringt ein Neuaufbau fast immer das bessere und oft schnellere Ergebnis als ständiges Flicken. Ein Blick von zehn Minuten macht die Antwort meist klar.",
  },
  {
    q: "Was bringt ein KI-Agent einem lokalen Geschäft?",
    a: "Ganz konkrete Dinge: Er beantwortet WhatsApp sofort, wenn du gerade beschäftigt bist, nimmt Termine und Reservierungen außerhalb der Öffnungszeiten an, beantwortet die immer gleichen Fragen (Öffnungszeiten, Preise, Anfahrt) und reagiert in deinem Ton auf Bewertungen. Er ersetzt niemanden: Er übernimmt das Wiederkehrende, damit kein Kunde ohne Antwort bleibt, während du arbeitest.",
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
  {
    q: "Chi realizza siti web con l'IA in Spagna?",
    a: "In Spagna c'è di tutto: dalle agenzie tradizionali che iniziano a usare l'IA agli studi specializzati come Kodable, dove i designer lavorano con strumenti di IA per costruire siti professionali in una frazione del tempo abituale. Chiunque tu scelga, guarda tre cose: consegna completa (design, testi, dominio e hosting), assistenza dopo il lancio e la capacità di lavorare in più lingue se la tua attività lo richiede.",
  },
  {
    q: "Quanto ci vuole per avere un sito web professionale?",
    a: "Con un'agenzia tradizionale, la norma è da uno a tre mesi. Uno studio che lavora con l'IA scende a giorni o settimane: noi costruiamo una demo funzionante in 48 ore e un sito completo di solito è online in 1-2 settimane. A rallentare davvero i progetti non è la tecnica ma i contenuti: avere foto e testi già pronti accelera tutto.",
  },
  {
    q: "Sito nuovo o sistemare quello che ho già?",
    a: "Dipende dalle fondamenta. Se il tuo sito attuale carica veloce, si vede bene sul telefono e ha solo testi o foto datati, di solito basta una rinfrescata. Se è lento, non funziona bene sul telefono, non compare su Google o è costruito su una piattaforma che nessuno sa più toccare, rifarlo da zero dà quasi sempre un risultato migliore, e spesso più in fretta, che continuare a mettere pezze. Un'occhiata di dieci minuti di solito chiarisce la risposta.",
  },
  {
    q: "Cosa fa un agente IA per un'attività locale?",
    a: "Cose molto concrete: risponde su WhatsApp all'istante quando sei occupato, prende appuntamenti e prenotazioni fuori orario, risponde alle domande di sempre (orari, prezzi, come arrivare) e alle recensioni con il tuo tono. Non sostituisce nessuno: si occupa delle cose ripetitive perché nessun cliente resti senza risposta mentre tu lavori.",
  },
];

const content: Record<Locale, FaqItem[]> = { en, es, fr, de, it };

export function getFaq(locale: Locale): FaqItem[] {
  return content[locale];
}
