import type { Locale } from "@/i18n/config";
import type { ServiceSlug } from "./services";

/* ============================================================================
   Pricing data — shown on each service detail page (replaces "Under the hood").

   Numbers are the single source of truth in `N` (all IVA INCLUDED, the figure
   the owner actually pays). Only words are translated, so the euro amounts can
   never drift between languages. Formatting (thousands / decimals) is applied
   per-locale via Intl. Every CTA still routes to the free consultation, so
   publishing prices stays consistent with the consultation-led funnel.
   ========================================================================== */

// ---- numbers (IVA incl.) ----
// Halved across the board 2026-07-08 (owner directive). Previous values were
// exactly 2x each figure below.
const N = {
  web: { starter: 245, business: 495, premium: 995 },
  // Installment alternative shown on the same card (owner directive
  // 2026-07-10): "€245 one-off, or €25/mo for 10 months". Monthly × months ≈
  // one-off + small rounding premium; it ENDS after `months` — not a
  // subscription. Care plan stays separate.
  webPlan: { months: 10, starter: 25, business: 50, premium: 100 },
  chat: {
    // Halved 2026-07-08 (owner directive; previous values were 2x each).
    essential: { m: 23.75, s: 118.75 },
    pro: { m: 43.75, s: 148.75 },
    premium: { m: 73.75, s: 208.75 },
  },
  voice: {
    basic: { m: 149.5, s: 357.5, over: 0.21 },
    pro: { m: 239.5, s: 537.5, over: 0.18 },
    premium: { m: 362.5, s: 725, over: 0.15 },
  },
  tools: { quote: 900, app: 1500, dash: 1200 },
  auto: { single: 295, pack: 750, bespoke: 1450 },
  care: { basic: 19.5, plus: 39.5, pro: 74.5 },
} as const;

// Format locales: fr mapped to a dot-grouping locale to avoid the narrow-space
// thousands separator, keeping euro figures clean across the European languages.
const fmtLocale: Record<Locale, string> = {
  en: "en-GB",
  es: "es-ES",
  fr: "de-DE",
  de: "de-DE",
  it: "it-IT",
};

function euro(locale: Locale, n: number, decimals?: number): string {
  // Fractional amounts (e.g. 47.5 after the across-the-board halving) must
  // render as €47.50, never silently round to €48.
  const d = decimals ?? (Number.isInteger(n) ? 0 : 2);
  const num = new Intl.NumberFormat(fmtLocale[locale], {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  }).format(n);
  return `€${num}`;
}

// ---- display types consumed by the Pricing component ----
export interface PriceTier {
  name: string;
  featured?: boolean;
  badge?: string;
  fromPrefix?: string;
  amount: string;
  unit?: string;
  meta: string;
  /** Alternative payment line under the meta, e.g. "o €25/mes durante 10 meses". */
  altPay?: string;
  features: string[];
  cta: string;
  ctaPrimary?: boolean;
}
export interface PriceGroup {
  title: string;
  note?: string;
  foot?: string;
  tiers: PriceTier[];
}
export interface ServicePricing {
  title: string;
  lead: string;
  disclaimer: string;
  cta: string;
  groups: PriceGroup[];
}

// ---- text packs ----
type TierText = { name: string; features: string[] };

interface Pack {
  title: string;
  disclaimer: string;
  cta: string; // disclaimer link / fallback CTA
  lead: Record<ServiceSlug, string>;
  lbl: {
    from: string;
    mo: string;
    setup: string;
    vat: string;
    oneoff: string;
    popular: string;
    get: string;
  };
  // "or €25/mo for 10 months" — installment line on website tiers.
  orMonthly: (monthly: string, months: number) => string;
  perMin: string; // "/min"
  groups: {
    websites: { name: string; tiers: { starter: TierText; business: TierText; premium: TierText } };
    chat: { name: string; foot: string; tiers: { essential: TierText; pro: TierText; premium: TierText } };
    voice: { name: string; foot: (b: string, p: string, pr: string) => string; tiers: { basic: TierText; pro: TierText; premium: TierText } };
    tools: { name: string; foot: string; tiers: { quote: TierText; app: TierText; dash: TierText } };
    auto: { name: string; foot: string; tiers: { single: TierText; pack: TierText; bespoke: TierText } };
    care: { name: string; note: string; tiers: { basic: TierText; plus: TierText; pro: TierText } };
  };
}

const PACKS: Record<Locale, Pack> = {
  en: {
    title: "Pricing",
    disclaimer:
      "All prices include VAT and are starting points. Your exact quote is confirmed in a free consultation.",
    cta: "Book a free consultation",
    lead: {
      websites:
        "Clear, fixed pricing. VAT included, no small print. Every site ships with a care plan to keep it fast, safe and up to date.",
      "ai-agents":
        "Simple monthly pricing. VAT included. The fee covers the assistant, hosting and support; a busy month is billed in clear bundles.",
      "custom-tools":
        "Honest starting prices. VAT included. Custom work is scoped to exactly what you need, with a care plan to keep it running.",
      automations:
        "Honest starting prices. VAT included. Pay once to set it up, then keep it monitored under a simple care plan.",
    },
    lbl: { from: "from", mo: "/mo", setup: "setup", vat: "VAT incl.", oneoff: "one-off", popular: "Most popular", get: "Get started" },
    orMonthly: (m, n) => `or ${m}/mo for ${n} months`,
    perMin: "/min",
    groups: {
      websites: {
        name: "Websites",
        tiers: {
          starter: { name: "Economy", features: ["1–5 pages", "Mobile, WhatsApp & click-to-call", "Google Business + basic SEO", "One language"] },
          business: { name: "Business", features: ["Up to ~8 pages, custom design", "Bilingual ES/EN", "Booking or online-order built in", "Local SEO, reviews & blog"] },
          premium: { name: "Premium", features: ["Online shop or bespoke build", "Multilingual + payments", "Advanced integrations", "Priority delivery"] },
        },
      },
      chat: {
        name: "Chat agent: WhatsApp & web",
        foot: "Busy month? Extra conversations are billed in clear, fixed bundles.",
        tiers: {
          essential: { name: "Essential", features: ["~150 conversations/mo", "One channel: WhatsApp or web", "FAQs + handoff to you"] },
          pro: { name: "Pro", features: ["~500 conversations/mo", "WhatsApp + web, booking built in", "Review-collection nudge"] },
          premium: { name: "Premium", features: ["~1,500 conversations/mo", "Multiple locations", "Custom integrations"] },
        },
      },
      voice: {
        name: "Voice agent: phone",
        foot: (b, p, pr) => `Extra minutes after your allowance: ${b} / ${p} / ${pr} by tier. A receptionist costs €1,100+/mo. This does much of the job for a fraction, and never sleeps.`,
        tiers: {
          basic: { name: "Reception Basic", features: ["~500 min/mo included", "Answers, books & transfers to you", "Handles your usual questions"] },
          pro: { name: "Reception Pro", features: ["~1,500 min/mo included", "Multilingual, fuller booking", "Higher call volume"] },
          premium: { name: "Premium · Outbound", features: ["~3,000 min/mo included", "Outbound: fill tables, win back no-shows", "Highest volume"] },
        },
      },
      tools: {
        name: "Custom tools & apps",
        foot: "Custom work is scoped to you. These are starting points, with the final quote after a free chat.",
        tiers: {
          quote: { name: "Quote calculator", features: ["Customers price themselves", "Turns enquiries into qualified leads", "Branded to your business"] },
          app: { name: "Booking / ordering app", features: ["Built around how you work", "Takes bookings or orders directly", "Logins, roles & secure data"] },
          dash: { name: "Dashboard / internal tool", features: ["Only the numbers you check", "Cuts manual daily tasks", "Built fast with AI"] },
        },
      },
      auto: {
        name: "Automations & integrations",
        foot: "Most automations are billed once, then quietly maintained under a care plan.",
        tiers: {
          single: { name: "Single automation", features: ["One workflow, end-to-end", "e.g. bookings → calendar", "Set up and tested"] },
          pack: { name: "Automation pack", features: ["Three workflows", "Payments, reminders, follow-ups", "Monitored connections"] },
          bespoke: { name: "Bespoke / multi-system", features: ["Many tools joined up", "Custom logic & webhooks", "Built around your stack"] },
        },
      },
      care: {
        name: "Care plan",
        note: "Every build ships with 30 days of free support; a simple monthly plan then keeps it online, safe and up to date.",
        tiers: {
          basic: { name: "Care Basic", features: ["Hosting, SSL & backups", "Updates & security", "Uptime monitoring + monthly report"] },
          plus: { name: "Care Plus", features: ["Everything in Basic", "Monthly content edits", "Priority WhatsApp support"] },
          pro: { name: "Care Pro / Shop", features: ["Daily backups & store support", "Larger edit allowance", "Light monthly SEO check-in"] },
        },
      },
    },
  },

  es: {
    title: "Precios",
    disclaimer:
      "Todos los precios incluyen IVA y son orientativos: confirmamos tu precio exacto en una consulta gratuita.",
    cta: "Reserva una consulta gratis",
    lead: {
      websites:
        "Precios claros y fijos, con IVA incluido y sin letra pequeña. Cada web incluye un plan de cuidado para mantenerla rápida, segura y al día.",
      "ai-agents":
        "Precio mensual sencillo, con IVA incluido. La cuota cubre el asistente, el alojamiento y el soporte; un mes con mucho movimiento se factura por tramos claros.",
      "custom-tools":
        "Precios de partida honestos, con IVA incluido. El trabajo a medida se ajusta justo a lo que necesitas, con un plan de cuidado que lo mantiene en marcha.",
      automations:
        "Precios de partida honestos, con IVA incluido. Pagas una vez la puesta en marcha y luego lo mantenemos vigilado con un plan de cuidado sencillo.",
    },
    lbl: { from: "desde", mo: "/mes", setup: "puesta en marcha", vat: "IVA incl.", oneoff: "pago único", popular: "El más elegido", get: "Empezar" },
    orMonthly: (m, n) => `o ${m}/mes durante ${n} meses`,
    perMin: "/min",
    groups: {
      websites: {
        name: "Webs",
        tiers: {
          starter: { name: "Económica", features: ["1–5 páginas", "Móvil, WhatsApp y clic para llamar", "Perfil de Empresa en Google + SEO básico", "Un idioma"] },
          business: { name: "Negocio", features: ["Hasta ~8 páginas, diseño a medida", "Bilingüe ES/EN", "Reservas o pedidos integrados", "SEO local, reseñas y blog"] },
          premium: { name: "Premium", features: ["Tienda online o desarrollo a medida", "Multilingüe + pagos", "Integraciones avanzadas", "Entrega prioritaria"] },
        },
      },
      chat: {
        name: "Agente de chat: WhatsApp y web",
        foot: "¿Mes con mucho movimiento? Las conversaciones extra se facturan en tramos claros y fijos.",
        tiers: {
          essential: { name: "Esencial", features: ["~150 conversaciones/mes", "Un canal: WhatsApp o web", "Preguntas frecuentes + paso a ti"] },
          pro: { name: "Pro", features: ["~500 conversaciones/mes", "WhatsApp + web, reservas integradas", "Empujón para conseguir reseñas"] },
          premium: { name: "Premium", features: ["~1.500 conversaciones/mes", "Varios locales", "Integraciones a medida"] },
        },
      },
      voice: {
        name: "Agente de voz: teléfono",
        foot: (b, p, pr) => `Minutos extra al superar tu cuota: ${b} / ${p} / ${pr} según plan. Una recepcionista cuesta más de 1.100 €/mes. Esto hace gran parte del trabajo por una fracción, y nunca descansa.`,
        tiers: {
          basic: { name: "Recepción Básica", features: ["~500 min/mes incluidos", "Atiende, reserva y te transfiere", "Responde lo de siempre"] },
          pro: { name: "Recepción Pro", features: ["~1.500 min/mes incluidos", "Multilingüe, reservas más completas", "Más volumen de llamadas"] },
          premium: { name: "Premium · Salientes", features: ["~3.000 min/mes incluidos", "Salientes: llenar mesas, recuperar ausencias", "Máximo volumen"] },
        },
      },
      tools: {
        name: "Herramientas y apps a medida",
        foot: "El trabajo a medida se ajusta a ti: estos son puntos de partida y el precio final se cierra tras una charla gratis.",
        tiers: {
          quote: { name: "Calculadora de presupuestos", features: ["El cliente calcula su precio", "Convierte consultas en clientes serios", "Con tu marca"] },
          app: { name: "App de reservas/pedidos", features: ["Pensada para cómo trabajas", "Coge reservas o pedidos directos", "Accesos, permisos y datos seguros"] },
          dash: { name: "Panel / herramienta interna", features: ["Solo los números que miras", "Recorta tareas manuales diarias", "Hecho rápido con IA"] },
        },
      },
      auto: {
        name: "Automatizaciones e integraciones",
        foot: "La mayoría de automatizaciones se pagan una vez y luego se mantienen sin ruido con un plan de cuidado.",
        tiers: {
          single: { name: "Automatización única", features: ["Un flujo, de principio a fin", "p. ej. reservas → agenda", "Configurado y probado"] },
          pack: { name: "Pack de automatizaciones", features: ["Tres flujos", "Pagos, recordatorios, seguimientos", "Conexiones monitorizadas"] },
          bespoke: { name: "A medida / multisistema", features: ["Varias herramientas conectadas", "Lógica a medida y webhooks", "Hecho para tu stack"] },
        },
      },
      care: {
        name: "Plan de cuidado",
        note: "Cada proyecto incluye 30 días de soporte gratis; luego un plan mensual sencillo lo mantiene online, seguro y al día.",
        tiers: {
          basic: { name: "Cuidado Básico", features: ["Alojamiento, SSL y copias", "Actualizaciones y seguridad", "Monitorización + informe mensual"] },
          plus: { name: "Cuidado Plus", features: ["Todo lo del Básico", "Cambios de contenido al mes", "Soporte prioritario por WhatsApp"] },
          pro: { name: "Cuidado Pro / Tienda", features: ["Copias diarias y soporte de tienda", "Más margen de cambios", "Revisión SEO mensual ligera"] },
        },
      },
    },
  },

  fr: {
    title: "Tarifs",
    disclaimer:
      "Tous les prix incluent la TVA et sont indicatifs : votre devis exact est confirmé lors d'une consultation gratuite.",
    cta: "Réservez une consultation gratuite",
    lead: {
      websites:
        "Des prix clairs et fixes. TVA incluse, sans petites lignes. Chaque site est livré avec un plan d'entretien pour le garder rapide, sûr et à jour.",
      "ai-agents":
        "Un tarif mensuel simple. TVA incluse. L'abonnement couvre l'assistant, l'hébergement et le support ; un mois chargé est facturé par paliers clairs.",
      "custom-tools":
        "Des prix de départ honnêtes. TVA incluse. Le sur-mesure est calibré exactement sur vos besoins, avec un plan d'entretien pour le faire tourner.",
      automations:
        "Des prix de départ honnêtes. TVA incluse. Vous payez une fois la mise en place, puis tout est surveillé via un plan d'entretien simple.",
    },
    lbl: { from: "à partir de", mo: "/mois", setup: "mise en place", vat: "TVA incl.", oneoff: "paiement unique", popular: "Le plus choisi", get: "Commencer" },
    orMonthly: (m, n) => `ou ${m}/mois pendant ${n} mois`,
    perMin: "/min",
    groups: {
      websites: {
        name: "Sites web",
        tiers: {
          starter: { name: "Économique", features: ["1 à 5 pages", "Mobile, WhatsApp et clic-pour-appeler", "Profil Google + SEO de base", "Une langue"] },
          business: { name: "Business", features: ["Jusqu'à ~8 pages, design sur mesure", "Bilingue ES/EN", "Réservation ou commande intégrée", "SEO local, avis et blog"] },
          premium: { name: "Premium", features: ["Boutique en ligne ou sur-mesure", "Multilingue + paiements", "Intégrations avancées", "Livraison prioritaire"] },
        },
      },
      chat: {
        name: "Agent de chat : WhatsApp et web",
        foot: "Mois chargé ? Les conversations supplémentaires sont facturées par paliers clairs et fixes.",
        tiers: {
          essential: { name: "Essentiel", features: ["~150 conversations/mois", "Un canal : WhatsApp ou web", "FAQ + passage à vous"] },
          pro: { name: "Pro", features: ["~500 conversations/mois", "WhatsApp + web, réservation intégrée", "Incitation à récolter des avis"] },
          premium: { name: "Premium", features: ["~1 500 conversations/mois", "Plusieurs établissements", "Intégrations sur mesure"] },
        },
      },
      voice: {
        name: "Agent vocal : téléphone",
        foot: (b, p, pr) => `Minutes au-delà du forfait : ${b} / ${p} / ${pr} selon l'offre. Une réceptionniste coûte plus de 1 100 €/mois. Ceci en fait une grande partie pour une fraction, et ne dort jamais.`,
        tiers: {
          basic: { name: "Réception Basic", features: ["~500 min/mois incluses", "Répond, réserve et vous transfère", "Gère les questions habituelles"] },
          pro: { name: "Réception Pro", features: ["~1 500 min/mois incluses", "Multilingue, réservation complète", "Plus de volume d'appels"] },
          premium: { name: "Premium · Sortant", features: ["~3 000 min/mois incluses", "Sortant : remplir, récupérer les absents", "Volume maximal"] },
        },
      },
      tools: {
        name: "Outils et applis sur mesure",
        foot: "Le sur-mesure est calibré sur vous : ce sont des points de départ, le devis final se fait après un échange gratuit.",
        tiers: {
          quote: { name: "Calculateur de devis", features: ["Le client estime son prix", "Transforme les demandes en prospects", "À votre image"] },
          app: { name: "Appli de réservation/commande", features: ["Pensée pour votre façon de travailler", "Réservations ou commandes directes", "Accès, rôles et données sécurisées"] },
          dash: { name: "Tableau de bord / outil interne", features: ["Seulement les chiffres utiles", "Réduit les tâches manuelles", "Construit vite avec l'IA"] },
        },
      },
      auto: {
        name: "Automatisations et intégrations",
        foot: "La plupart des automatisations sont payées une fois, puis entretenues discrètement via un plan d'entretien.",
        tiers: {
          single: { name: "Automatisation simple", features: ["Un flux, de bout en bout", "ex. réservations → agenda", "Mis en place et testé"] },
          pack: { name: "Pack d'automatisations", features: ["Trois flux", "Paiements, rappels, relances", "Connexions surveillées"] },
          bespoke: { name: "Sur mesure / multi-système", features: ["Plusieurs outils reliés", "Logique sur mesure et webhooks", "Construit autour de votre stack"] },
        },
      },
      care: {
        name: "Plan d'entretien",
        note: "Chaque création inclut 30 jours d'accompagnement gratuit ; un petit forfait mensuel le garde ensuite en ligne, sûr et à jour.",
        tiers: {
          basic: { name: "Entretien Basic", features: ["Hébergement, SSL et sauvegardes", "Mises à jour et sécurité", "Surveillance + rapport mensuel"] },
          plus: { name: "Entretien Plus", features: ["Tout l'offre Basic", "Modifications de contenu mensuelles", "Support prioritaire WhatsApp"] },
          pro: { name: "Entretien Pro / Boutique", features: ["Sauvegardes quotidiennes et support boutique", "Plus de modifications incluses", "Point SEO mensuel léger"] },
        },
      },
    },
  },

  de: {
    title: "Preise",
    disclaimer:
      "Alle Preise inkl. MwSt. und Richtwerte. Dein genaues Angebot bestätigen wir in einem kostenlosen Gespräch.",
    cta: "Kostenlose Beratung buchen",
    lead: {
      websites:
        "Klare, feste Preise. Inkl. MwSt., kein Kleingedrucktes. Jede Website kommt mit einem Care-Plan, der sie schnell, sicher und aktuell hält.",
      "ai-agents":
        "Einfacher Monatspreis. Inkl. MwSt. Die Gebühr deckt Assistent, Hosting und Support; ein arbeitsreicher Monat wird in klaren Paketen abgerechnet.",
      "custom-tools":
        "Ehrliche Startpreise. Inkl. MwSt. Maßarbeit wird genau auf deinen Bedarf zugeschnitten, mit einem Care-Plan, der sie am Laufen hält.",
      automations:
        "Ehrliche Startpreise. Inkl. MwSt. Einmal einrichten, danach via einfachem Care-Plan überwacht.",
    },
    lbl: { from: "ab", mo: "/Mon.", setup: "Einrichtung", vat: "inkl. MwSt.", oneoff: "einmalig", popular: "Am beliebtesten", get: "Loslegen" },
    orMonthly: (m, n) => `oder ${m}/Mon. über ${n} Monate`,
    perMin: "/Min.",
    groups: {
      websites: {
        name: "Websites",
        tiers: {
          starter: { name: "Economy", features: ["1–5 Seiten", "Mobil, WhatsApp & Klick-zum-Anrufen", "Google-Profil + Basis-SEO", "Eine Sprache"] },
          business: { name: "Business", features: ["Bis ~8 Seiten, individuelles Design", "Zweisprachig ES/EN", "Buchung oder Bestellung integriert", "Lokales SEO, Bewertungen & Blog"] },
          premium: { name: "Premium", features: ["Online-Shop oder Maßanfertigung", "Mehrsprachig + Zahlungen", "Erweiterte Integrationen", "Bevorzugte Lieferung"] },
        },
      },
      chat: {
        name: "Chat-Agent: WhatsApp & Web",
        foot: "Viel los? Zusätzliche Konversationen werden in klaren, festen Paketen abgerechnet.",
        tiers: {
          essential: { name: "Basis", features: ["~150 Konversationen/Mon.", "Ein Kanal: WhatsApp oder Web", "FAQ + Übergabe an dich"] },
          pro: { name: "Pro", features: ["~500 Konversationen/Mon.", "WhatsApp + Web, Buchung integriert", "Anstoß für Bewertungen"] },
          premium: { name: "Premium", features: ["~1.500 Konversationen/Mon.", "Mehrere Standorte", "Individuelle Integrationen"] },
        },
      },
      voice: {
        name: "Voice-Agent: Telefon",
        foot: (b, p, pr) => `Zusätzliche Minuten über dem Kontingent: ${b} / ${p} / ${pr} je Stufe. Eine Empfangskraft kostet über 1.100 €/Mon. Das übernimmt einen Großteil zum Bruchteil und schläft nie.`,
        tiers: {
          basic: { name: "Empfang Basic", features: ["~500 Min./Mon. inklusive", "Antwortet, bucht & stellt durch", "Beantwortet die üblichen Fragen"] },
          pro: { name: "Empfang Pro", features: ["~1.500 Min./Mon. inklusive", "Mehrsprachig, vollere Buchung", "Höheres Anrufvolumen"] },
          premium: { name: "Premium · Outbound", features: ["~3.000 Min./Mon. inklusive", "Outbound: Tische füllen, No-Shows zurückholen", "Höchstes Volumen"] },
        },
      },
      tools: {
        name: "Maßgeschneiderte Tools & Apps",
        foot: "Maßarbeit wird auf dich zugeschnitten: Das sind Startpunkte, das finale Angebot kommt nach einem kostenlosen Gespräch.",
        tiers: {
          quote: { name: "Angebotsrechner", features: ["Kunden ermitteln ihren Preis", "Macht Anfragen zu echten Leads", "In deinem Branding"] },
          app: { name: "Buchungs-/Bestell-App", features: ["Rund um deine Arbeitsweise", "Nimmt Buchungen oder Bestellungen direkt", "Logins, Rollen & sichere Daten"] },
          dash: { name: "Dashboard / internes Tool", features: ["Nur die Zahlen, die du checkst", "Spart tägliche Handarbeit", "Schnell gebaut mit KI"] },
        },
      },
      auto: {
        name: "Automatisierungen & Integrationen",
        foot: "Die meisten Automatisierungen werden einmal berechnet und dann unauffällig im Care-Plan gepflegt.",
        tiers: {
          single: { name: "Einzel-Automatisierung", features: ["Ein Workflow, durchgängig", "z. B. Buchungen → Kalender", "Eingerichtet und getestet"] },
          pack: { name: "Automatisierungs-Paket", features: ["Drei Workflows", "Zahlungen, Erinnerungen, Nachfassen", "Überwachte Verbindungen"] },
          bespoke: { name: "Maßgeschneidert / Multi-System", features: ["Viele Tools verbunden", "Individuelle Logik & Webhooks", "Rund um deinen Stack gebaut"] },
        },
      },
      care: {
        name: "Care-Plan",
        note: "Jedes Projekt enthält 30 Tage kostenlosen Support; ein einfacher Monatsplan hält es danach online, sicher und aktuell.",
        tiers: {
          basic: { name: "Care Basic", features: ["Hosting, SSL & Backups", "Updates & Sicherheit", "Uptime-Monitoring + Monatsbericht"] },
          plus: { name: "Care Plus", features: ["Alles aus Basic", "Monatliche Inhaltsänderungen", "Vorrangiger WhatsApp-Support"] },
          pro: { name: "Care Pro / Shop", features: ["Tägliche Backups & Shop-Support", "Größeres Änderungs-Kontingent", "Leichter monatlicher SEO-Check"] },
        },
      },
    },
  },

  it: {
    title: "Prezzi",
    disclaimer:
      "Tutti i prezzi includono l'IVA e sono indicativi: il preventivo esatto si conferma in una consulenza gratuita.",
    cta: "Prenota una consulenza gratuita",
    lead: {
      websites:
        "Prezzi chiari e fissi. IVA inclusa, senza sorprese. Ogni sito include un piano di assistenza per tenerlo veloce, sicuro e aggiornato.",
      "ai-agents":
        "Prezzo mensile semplice. IVA inclusa. Il canone copre l'assistente, l'hosting e il supporto; un mese intenso si fattura a fasce chiare.",
      "custom-tools":
        "Prezzi di partenza onesti. IVA inclusa. Il lavoro su misura è calibrato esattamente su ciò che ti serve, con un piano di assistenza che lo tiene attivo.",
      automations:
        "Prezzi di partenza onesti. IVA inclusa. Paghi una volta l'attivazione, poi resta monitorato con un semplice piano di assistenza.",
    },
    lbl: { from: "da", mo: "/mese", setup: "attivazione", vat: "IVA incl.", oneoff: "una tantum", popular: "Il più scelto", get: "Inizia" },
    orMonthly: (m, n) => `o ${m}/mese per ${n} mesi`,
    perMin: "/min",
    groups: {
      websites: {
        name: "Siti web",
        tiers: {
          starter: { name: "Economy", features: ["1–5 pagine", "Mobile, WhatsApp e clic-per-chiamare", "Profilo Google + SEO di base", "Una lingua"] },
          business: { name: "Business", features: ["Fino a ~8 pagine, design su misura", "Bilingue ES/EN", "Prenotazioni o ordini integrati", "SEO locale, recensioni e blog"] },
          premium: { name: "Premium", features: ["Negozio online o su misura", "Multilingue + pagamenti", "Integrazioni avanzate", "Consegna prioritaria"] },
        },
      },
      chat: {
        name: "Agente di chat: WhatsApp e web",
        foot: "Mese intenso? Le conversazioni extra si fatturano a fasce chiare e fisse.",
        tiers: {
          essential: { name: "Essenziale", features: ["~150 conversazioni/mese", "Un canale: WhatsApp o web", "FAQ + passaggio a te"] },
          pro: { name: "Pro", features: ["~500 conversazioni/mese", "WhatsApp + web, prenotazioni integrate", "Spinta per raccogliere recensioni"] },
          premium: { name: "Premium", features: ["~1.500 conversazioni/mese", "Più sedi", "Integrazioni su misura"] },
        },
      },
      voice: {
        name: "Agente vocale: telefono",
        foot: (b, p, pr) => `Minuti extra oltre la soglia: ${b} / ${p} / ${pr} per fascia. Una receptionist costa oltre 1.100 €/mese. Questo fa gran parte del lavoro a una frazione, e non dorme mai.`,
        tiers: {
          basic: { name: "Reception Base", features: ["~500 min/mese inclusi", "Risponde, prenota e ti trasferisce", "Gestisce le domande di sempre"] },
          pro: { name: "Reception Pro", features: ["~1.500 min/mese inclusi", "Multilingue, prenotazioni complete", "Più volume di chiamate"] },
          premium: { name: "Premium · Outbound", features: ["~3.000 min/mese inclusi", "Outbound: riempi tavoli, recupera assenti", "Volume massimo"] },
        },
      },
      tools: {
        name: "Strumenti e app su misura",
        foot: "Il su misura è calibrato su di te: questi sono punti di partenza, il preventivo finale dopo una chiacchierata gratuita.",
        tiers: {
          quote: { name: "Calcolatore preventivi", features: ["Il cliente calcola il prezzo", "Trasforma le richieste in contatti seri", "Con il tuo marchio"] },
          app: { name: "App prenotazioni/ordini", features: ["Pensata per come lavori", "Prende prenotazioni o ordini diretti", "Accessi, ruoli e dati sicuri"] },
          dash: { name: "Dashboard / strumento interno", features: ["Solo i numeri che guardi", "Riduce le attività manuali", "Costruito in fretta con l'IA"] },
        },
      },
      auto: {
        name: "Automazioni e integrazioni",
        foot: "La maggior parte delle automazioni si paga una volta, poi si mantiene in silenzio con un piano di assistenza.",
        tiers: {
          single: { name: "Automazione singola", features: ["Un flusso, da capo a fine", "es. prenotazioni → agenda", "Configurato e testato"] },
          pack: { name: "Pacchetto automazioni", features: ["Tre flussi", "Pagamenti, promemoria, follow-up", "Connessioni monitorate"] },
          bespoke: { name: "Su misura / multi-sistema", features: ["Più strumenti collegati", "Logica su misura e webhook", "Costruito sul tuo stack"] },
        },
      },
      care: {
        name: "Piano di assistenza",
        note: "Ogni progetto include 30 giorni di supporto gratuito; poi un semplice piano mensile lo tiene online, sicuro e aggiornato.",
        tiers: {
          basic: { name: "Assistenza Base", features: ["Hosting, SSL e backup", "Aggiornamenti e sicurezza", "Monitoraggio + report mensile"] },
          plus: { name: "Assistenza Plus", features: ["Tutto della Base", "Modifiche ai contenuti mensili", "Supporto prioritario WhatsApp"] },
          pro: { name: "Assistenza Pro / Shop", features: ["Backup giornalieri e supporto shop", "Più modifiche incluse", "Check SEO mensile leggero"] },
        },
      },
    },
  },
};

// "Check prices for this service" link label, for the service cards.
export const checkPricesLabel: Record<Locale, string> = {
  en: "Check prices for this service",
  es: "Ver precios de este servicio",
  fr: "Voir les prix de ce service",
  de: "Preise für diesen Service ansehen",
  it: "Vedi i prezzi di questo servizio",
};

// ---- builders ----
function monthlyMeta(p: Pack, locale: Locale, setup: number): string {
  return `+ ${euro(locale, setup)} ${p.lbl.setup} · ${p.lbl.vat}`;
}
function oneoffMeta(p: Pack): string {
  return `${p.lbl.oneoff} · ${p.lbl.vat}`;
}

function careGroup(p: Pack, locale: Locale): PriceGroup {
  const g = p.groups.care;
  return {
    title: g.name,
    note: g.note,
    tiers: [
      { name: g.tiers.basic.name, amount: euro(locale, N.care.basic), unit: p.lbl.mo, meta: p.lbl.vat, features: g.tiers.basic.features, cta: p.lbl.get },
      { name: g.tiers.plus.name, featured: true, badge: p.lbl.popular, amount: euro(locale, N.care.plus), unit: p.lbl.mo, meta: p.lbl.vat, features: g.tiers.plus.features, cta: p.lbl.get, ctaPrimary: true },
      { name: g.tiers.pro.name, amount: euro(locale, N.care.pro), unit: p.lbl.mo, meta: p.lbl.vat, features: g.tiers.pro.features, cta: p.lbl.get },
    ],
  };
}

// Care plan tiers for the post-checkout upsell (/contratar/gracias).
export function getCareGroup(locale: Locale): PriceGroup {
  return careGroup(PACKS[locale], locale);
}

export function getPricing(locale: Locale, slug: ServiceSlug): ServicePricing {
  const p = PACKS[locale];

  const webAlt = (monthly: number) =>
    p.orMonthly(euro(locale, monthly), N.webPlan.months);
  const websites: PriceGroup = {
    title: p.groups.websites.name,
    tiers: [
      { name: p.groups.websites.tiers.starter.name, amount: euro(locale, N.web.starter), meta: oneoffMeta(p), altPay: webAlt(N.webPlan.starter), features: p.groups.websites.tiers.starter.features, cta: p.lbl.get },
      { name: p.groups.websites.tiers.business.name, featured: true, badge: p.lbl.popular, amount: euro(locale, N.web.business), meta: oneoffMeta(p), altPay: webAlt(N.webPlan.business), features: p.groups.websites.tiers.business.features, cta: p.lbl.get, ctaPrimary: true },
      { name: p.groups.websites.tiers.premium.name, fromPrefix: p.lbl.from, amount: euro(locale, N.web.premium), meta: oneoffMeta(p), altPay: webAlt(N.webPlan.premium), features: p.groups.websites.tiers.premium.features, cta: p.lbl.get },
    ],
  };

  const chat: PriceGroup = {
    title: p.groups.chat.name,
    foot: p.groups.chat.foot,
    tiers: [
      { name: p.groups.chat.tiers.essential.name, amount: euro(locale, N.chat.essential.m), unit: p.lbl.mo, meta: monthlyMeta(p, locale, N.chat.essential.s), features: p.groups.chat.tiers.essential.features, cta: p.lbl.get },
      { name: p.groups.chat.tiers.pro.name, featured: true, badge: p.lbl.popular, amount: euro(locale, N.chat.pro.m), unit: p.lbl.mo, meta: monthlyMeta(p, locale, N.chat.pro.s), features: p.groups.chat.tiers.pro.features, cta: p.lbl.get, ctaPrimary: true },
      { name: p.groups.chat.tiers.premium.name, amount: euro(locale, N.chat.premium.m), unit: p.lbl.mo, meta: monthlyMeta(p, locale, N.chat.premium.s), features: p.groups.chat.tiers.premium.features, cta: p.lbl.get },
    ],
  };

  const voiceOver = (n: number) => `${euro(locale, n, 2)}${p.perMin}`;
  const voice: PriceGroup = {
    title: p.groups.voice.name,
    foot: p.groups.voice.foot(voiceOver(N.voice.basic.over), voiceOver(N.voice.pro.over), voiceOver(N.voice.premium.over)),
    tiers: [
      { name: p.groups.voice.tiers.basic.name, amount: euro(locale, N.voice.basic.m), unit: p.lbl.mo, meta: monthlyMeta(p, locale, N.voice.basic.s), features: p.groups.voice.tiers.basic.features, cta: p.lbl.get },
      { name: p.groups.voice.tiers.pro.name, featured: true, badge: p.lbl.popular, amount: euro(locale, N.voice.pro.m), unit: p.lbl.mo, meta: monthlyMeta(p, locale, N.voice.pro.s), features: p.groups.voice.tiers.pro.features, cta: p.lbl.get, ctaPrimary: true },
      { name: p.groups.voice.tiers.premium.name, fromPrefix: p.lbl.from, amount: euro(locale, N.voice.premium.m), unit: p.lbl.mo, meta: monthlyMeta(p, locale, N.voice.premium.s), features: p.groups.voice.tiers.premium.features, cta: p.lbl.get },
    ],
  };

  const tools: PriceGroup = {
    title: p.groups.tools.name,
    foot: p.groups.tools.foot,
    tiers: [
      { name: p.groups.tools.tiers.quote.name, fromPrefix: p.lbl.from, amount: euro(locale, N.tools.quote), meta: oneoffMeta(p), features: p.groups.tools.tiers.quote.features, cta: p.lbl.get },
      { name: p.groups.tools.tiers.app.name, featured: true, badge: p.lbl.popular, fromPrefix: p.lbl.from, amount: euro(locale, N.tools.app), meta: oneoffMeta(p), features: p.groups.tools.tiers.app.features, cta: p.lbl.get, ctaPrimary: true },
      { name: p.groups.tools.tiers.dash.name, fromPrefix: p.lbl.from, amount: euro(locale, N.tools.dash), meta: oneoffMeta(p), features: p.groups.tools.tiers.dash.features, cta: p.lbl.get },
    ],
  };

  const auto: PriceGroup = {
    title: p.groups.auto.name,
    foot: p.groups.auto.foot,
    tiers: [
      { name: p.groups.auto.tiers.single.name, fromPrefix: p.lbl.from, amount: euro(locale, N.auto.single), meta: oneoffMeta(p), features: p.groups.auto.tiers.single.features, cta: p.lbl.get },
      { name: p.groups.auto.tiers.pack.name, featured: true, badge: p.lbl.popular, fromPrefix: p.lbl.from, amount: euro(locale, N.auto.pack), meta: oneoffMeta(p), features: p.groups.auto.tiers.pack.features, cta: p.lbl.get, ctaPrimary: true },
      { name: p.groups.auto.tiers.bespoke.name, fromPrefix: p.lbl.from, amount: euro(locale, N.auto.bespoke), meta: oneoffMeta(p), features: p.groups.auto.tiers.bespoke.features, cta: p.lbl.get },
    ],
  };

  // Care plan groups removed from public service pages (owner directive
  // 2026-07-10) — care is now upsold post-checkout on /contratar/gracias via
  // getCareGroup(). One-off web buyers already get Care Basic bundled in the
  // checkout monthly (see src/lib/checkoutPlans.ts).
  const groupsBySlug: Record<ServiceSlug, PriceGroup[]> = {
    websites: [websites],
    "ai-agents": [chat, voice],
    "custom-tools": [tools],
    automations: [auto],
  };

  return {
    title: p.title,
    lead: p.lead[slug],
    disclaimer: p.disclaimer,
    cta: p.cta,
    groups: groupsBySlug[slug],
  };
}
