import type { Locale } from "@/i18n/config";
import { SHOW_PRICING } from "./flags";

export interface FaqItem {
  q: string;
  a: string;
  /**
   * Answer used while SHOW_PRICING is off: same question, no figures. Set on
   * every entry whose normal answer quotes a price.
   */
  aNoPrice?: string;
  /** Entry exists only to explain how paying works, so it drops with the prices. */
  pricingOnly?: true;
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
    a: "Our prices are published, so you don't have to guess. Websites are a one-off: $245 Economy, $495 Business, $995 and up for Premium, VAT included. AI chat agents start at $23.75 a month plus setup, phone agents at $149.50 a month plus setup, and care plans at $19.50 a month. The pricing page lists every tier. The consultation is still free and the final quote is confirmed there, in plain language, with no pressure to go ahead.",
    aNoPrice:
      "It depends on what you actually need, so we quote it instead of guessing. A website is a one-off build, an AI agent is a monthly service plus a one-time setup, and a care plan is monthly if you want one. The free consultation is where you get the exact figure for your business, in plain language, with no pressure to go ahead.",
  },
  {
    q: "Do I have to pay for the whole website up front?",
    a: "No. You can pay the build monthly instead: $24.99 a month for 10 months on Economy, $50 a month for 10 months on Business, $100 a month for 10 months on Premium. Those are instalments, not a subscription: when the term ends the payments end and the site is yours. The care plan is separate. You pay by card through a secure checkout link we send you.",
    pricingOnly: true,
  },
  {
    q: "Can I see it before I commit?",
    a: "Yes. Before you pay anything we build a real demo of your own site, usually within 48 hours, on a live link you can open on your phone and share with whoever you want. If it isn't for you, you walk away and it has cost you nothing.",
  },
  {
    q: "What happens after you build it?",
    a: "We don't disappear. Every build includes 30 days of free support. After that a care plan keeps everything hosted, updated, backed up and monitored, from $19.50 a month. And if something ever needs changing, we're a WhatsApp message away.",
    aNoPrice:
      "We don't disappear. Every build includes 30 days of free support. After that a care plan keeps everything hosted, updated, backed up and monitored. And if something ever needs changing, we're a WhatsApp message away.",
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
    a: "Publicamos los precios, así no tienes que adivinar nada. Las webs son pago único: €245 la Económica, €495 la de Negocio y desde €995 la Premium, IVA incluido. Los agentes de chat con IA arrancan en €23,75 al mes más puesta en marcha, los agentes de teléfono en €149,50 al mes más puesta en marcha, y los planes de cuidado en €19,50 al mes. En la página de precios está cada plan. La consulta sigue siendo gratis y ahí confirmamos el presupuesto final, en lenguaje sencillo y sin ninguna presión para seguir adelante.",
    aNoPrice:
      "Depende de lo que necesites de verdad, así que lo presupuestamos en vez de adivinar. La web es un pago único, un agente de IA es un servicio mensual más una configuración inicial, y el plan de cuidado es mensual si lo quieres. En la consulta gratuita te damos la cifra exacta para tu negocio, en lenguaje sencillo y sin ninguna presión para seguir adelante.",
  },
  {
    q: "¿Tengo que pagar la web entera de golpe?",
    a: "No. Puedes pagar la construcción a plazos: €19,99 al mes durante 12 meses la Económica, €50 al mes durante 10 meses la de Negocio y €100 al mes durante 10 meses la Premium. Son plazos, no una suscripción: cuando termina el plazo se acaban los pagos y la web es tuya. El plan de cuidado va aparte. Se paga con tarjeta, por un enlace de pago seguro que te enviamos.",
    pricingOnly: true,
  },
  {
    q: "¿Puedo verla antes de comprometerme?",
    a: "Sí. Antes de pagar nada te montamos una demo real de tu propia web, normalmente en 48 horas, en un enlace que puedes abrir en el móvil y enseñar a quien quieras. Si no te convence, lo dejas ahí y no te ha costado nada.",
  },
  {
    q: "¿Qué pasa después de construirla?",
    a: "No desaparecemos. Cada proyecto incluye 30 días de soporte gratis. Después, un plan de cuidado lo mantiene alojado, actualizado, con copias de seguridad y vigilado, desde €19,50 al mes. Y si alguna vez hay que cambiar algo, estamos a un mensaje de WhatsApp.",
    aNoPrice:
      "No desaparecemos. Cada proyecto incluye 30 días de soporte gratis. Después, un plan de cuidado lo mantiene alojado, actualizado, con copias de seguridad y vigilado. Y si alguna vez hay que cambiar algo, estamos a un mensaje de WhatsApp.",
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
    a: "Nos prix sont publiés, vous n'avez rien à deviner. Les sites sont en paiement unique : €245 l'offre Économique, €495 la Business, à partir de €995 la Premium, TVA incluse. Les agents de chat IA démarrent à €23,75 par mois plus la mise en place, les agents téléphoniques à €149,50 par mois plus la mise en place, et les plans d'entretien à €19,50 par mois. La page des tarifs détaille chaque offre. La consultation reste gratuite : c'est là qu'on confirme le devis final, en langage simple et sans aucune obligation.",
    aNoPrice:
      "Cela dépend de ce dont vous avez réellement besoin, alors nous établissons un devis plutôt que de deviner. Un site est un paiement unique, un agent IA est un service mensuel plus une mise en place unique, et le plan d'entretien est mensuel si vous en voulez un. La consultation gratuite vous donne le chiffre exact pour votre activité, en langage simple et sans aucune obligation.",
  },
  {
    q: "Dois-je payer tout le site d'avance ?",
    a: "Non. Vous pouvez régler la création par mensualités : €19,99 par mois pendant 12 mois pour l'Économique, €50 par mois pendant 10 mois pour la Business, €100 par mois pendant 10 mois pour la Premium. Ce sont des mensualités, pas un abonnement : à la fin du terme, les paiements s'arrêtent et le site est à vous. Le plan d'entretien est séparé. Le paiement se fait par carte, via un lien sécurisé que nous vous envoyons.",
    pricingOnly: true,
  },
  {
    q: "Puis-je le voir avant de m'engager ?",
    a: "Oui. Avant tout paiement, nous construisons une vraie démo de votre propre site, généralement en 48 heures, sur un lien que vous pouvez ouvrir sur votre téléphone et partager à qui vous voulez. Si ça ne vous convient pas, vous en restez là et ça ne vous a rien coûté.",
  },
  {
    q: "Que se passe-t-il une fois le site construit ?",
    a: "On ne disparaît pas. Chaque création inclut 30 jours d'accompagnement gratuit. Ensuite, un forfait de suivi garde tout hébergé, à jour, sauvegardé et surveillé, à partir de €19,50 par mois. Et si quelque chose doit changer un jour, on est à un message WhatsApp de vous.",
    aNoPrice:
      "On ne disparaît pas. Chaque création inclut 30 jours d'accompagnement gratuit. Ensuite, un forfait de suivi garde tout hébergé, à jour, sauvegardé et surveillé. Et si quelque chose doit changer un jour, on est à un message WhatsApp de vous.",
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
    a: "Unsere Preise stehen öffentlich, du musst nichts raten. Websites sind einmalig: €245 Economy, €495 Business, ab €995 Premium, inkl. MwSt. KI-Chat-Agenten starten bei €23,75 im Monat plus Einrichtung, Telefon-Agenten bei €149,50 im Monat plus Einrichtung, Care-Pläne bei €19,50 im Monat. Auf der Preisseite steht jede Stufe. Die Beratung bleibt kostenlos: dort bestätigen wir das endgültige Angebot, in verständlicher Sprache und ohne Druck.",
    aNoPrice:
      "Das hängt davon ab, was du wirklich brauchst, also erstellen wir ein Angebot statt zu raten. Eine Website ist eine einmalige Sache, ein KI-Agent ist ein monatlicher Dienst plus einmalige Einrichtung, und ein Care-Plan läuft monatlich, wenn du ihn willst. In der kostenlosen Beratung bekommst du die genaue Zahl für dein Geschäft, in verständlicher Sprache und ohne Druck.",
  },
  {
    q: "Muss ich die Website komplett im Voraus bezahlen?",
    a: "Nein. Du kannst den Aufbau monatlich zahlen: €19,99 im Monat über 12 Monate bei Economy, €50 im Monat über 10 Monate bei Business, €100 im Monat über 10 Monate bei Premium. Das sind Raten, kein Abo: Wenn die Laufzeit endet, enden die Zahlungen und die Website gehört dir. Der Care-Plan läuft getrennt. Bezahlt wird per Karte, über einen sicheren Zahlungslink, den wir dir schicken.",
    pricingOnly: true,
  },
  {
    q: "Kann ich es sehen, bevor ich mich festlege?",
    a: "Ja. Bevor du irgendwas bezahlst, bauen wir eine echte Demo deiner eigenen Website, meist innerhalb von 48 Stunden, auf einem Link, den du am Handy öffnen und beliebig weitergeben kannst. Wenn es nichts für dich ist, lässt du es und es hat dich nichts gekostet.",
  },
  {
    q: "Was passiert, nachdem ihr es gebaut habt?",
    a: "Wir verschwinden nicht. Jedes Projekt enthält 30 Tage kostenlosen Support. Danach hält ein Care-Plan alles gehostet, aktuell, gesichert und überwacht, ab €19,50 im Monat. Und wenn mal etwas geändert werden muss, sind wir nur eine WhatsApp-Nachricht entfernt.",
    aNoPrice:
      "Wir verschwinden nicht. Jedes Projekt enthält 30 Tage kostenlosen Support. Danach hält ein Care-Plan alles gehostet, aktuell, gesichert und überwacht. Und wenn mal etwas geändert werden muss, sind wir nur eine WhatsApp-Nachricht entfernt.",
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
    a: "I nostri prezzi sono pubblici, non devi indovinare niente. I siti sono a pagamento unico: €245 l'Economy, €495 la Business, da €995 la Premium, IVA inclusa. Gli agenti di chat con IA partono da €23,75 al mese più attivazione, gli agenti telefonici da €149,50 al mese più attivazione, i piani di assistenza da €19,50 al mese. Nella pagina dei prezzi trovi ogni fascia. La consulenza resta gratuita: lì confermiamo il preventivo finale, in parole semplici e senza nessuna pressione.",
    aNoPrice:
      "Dipende da quello che ti serve davvero, quindi facciamo un preventivo invece di indovinare. Il sito è un pagamento unico, un agente di IA è un servizio mensile più un'attivazione iniziale, e il piano di assistenza è mensile se lo vuoi. Nella consulenza gratuita ti diamo la cifra esatta per la tua attività, in parole semplici e senza nessuna pressione.",
  },
  {
    q: "Devo pagare tutto il sito in anticipo?",
    a: "No. Puoi pagare la realizzazione a rate: €19,99 al mese per 12 mesi con l'Economy, €50 al mese per 10 mesi con la Business, €100 al mese per 10 mesi con la Premium. Sono rate, non un abbonamento: finito il periodo i pagamenti si fermano e il sito è tuo. Il piano di assistenza è a parte. Si paga con carta, tramite un link di pagamento sicuro che ti inviamo.",
    pricingOnly: true,
  },
  {
    q: "Posso vederlo prima di impegnarmi?",
    a: "Sì. Prima di pagare qualsiasi cosa costruiamo una demo vera del tuo sito, di solito in 48 ore, su un link che puoi aprire dal telefono e mostrare a chi vuoi. Se non fa per te, ti fermi lì e non ti è costato nulla.",
  },
  {
    q: "Cosa succede dopo che lo avete costruito?",
    a: "Non spariamo. Ogni progetto include 30 giorni di supporto gratuito. Poi un piano di assistenza tiene tutto ospitato, aggiornato, salvato e monitorato, da €19,50 al mese. E se mai serve cambiare qualcosa, siamo a un messaggio WhatsApp di distanza.",
    aNoPrice:
      "Non spariamo. Ogni progetto include 30 giorni di supporto gratuito. Poi un piano di assistenza tiene tutto ospitato, aggiornato, salvato e monitorato. E se mai serve cambiare qualcosa, siamo a un messaggio WhatsApp di distanza.",
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
  const items = content[locale];
  if (SHOW_PRICING) return items;
  // Prices are off (see content/flags.ts): drop the payment-mechanics entry and
  // serve the figure-free answer wherever one exists. The FAQPage schema reads
  // the same list, so the structured data loses the prices with the copy.
  return items
    .filter((item) => !item.pricingOnly)
    .map((item) => (item.aNoPrice ? { ...item, a: item.aNoPrice } : item));
}
