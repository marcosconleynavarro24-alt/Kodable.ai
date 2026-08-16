import type { Locale } from "@/i18n/config";
import type { StatItem } from "@/components/StatBand";
import type { ClientStats } from "@/content/clientStats";

/* ============================================================================
   Copy + assembly for the client-results StatBand in the home hero (it once
   also fed the retired /casos page, now /portfolio). Numbers
   come from getClientStats() (Supabase overlay, baked snapshot fallback) and
   must stay verbatim-checkable against the analytics dashboard. The band is
   deliberately anonymous: no client names anywhere (owner directive 2026-08-12).
   ========================================================================== */

const numLocale: Record<Locale, string> = { en: "en-GB", es: "es-ES", fr: "de-DE", de: "de-DE", it: "it-IT" };
const dateLocale: Record<Locale, string> = { en: "en-GB", es: "es-ES", fr: "fr-FR", de: "de-DE", it: "it-IT" };

/* Displayed figures are rounded DOWN to one significant figure and shown with a
   "+" (10,481 -> "10,000+", 26,575 -> "20,000+"). Rounding down keeps the claim
   literally true whatever the daily refresh brings in: "over X" can never
   overstate the analytics. Never switch these to Math.round (no-fabrication
   rule, see clientStats.ts). */
function floorToLeadingDigit(n: number): number {
  if (n < 10) return Math.floor(n);
  const mag = 10 ** Math.floor(Math.log10(n));
  return Math.floor(n / mag) * mag;
}

/** Durations floor to a whole minute (149 s -> "2 min+"), or to 10 s under a minute. */
function floorDuration(sec: number): number {
  return sec >= 60 ? Math.floor(sec / 60) * 60 : Math.floor(sec / 10) * 10;
}

interface BandCopy {
  title: string;
  labels: { visitors: string; pageviews: string; session: string };
  source: (date: string) => string;
}

const COPY: Record<Locale, BandCopy> = {
  en: {
    title: "Our clients' numbers:",
    labels: {
      visitors: "unique visitors a month",
      pageviews: "pages viewed a month",
      session: "average visit time",
    },
    source: (date) => `Source: client-site analytics · last 30 days · updated ${date}`,
  },
  es: {
    title: "Los números de nuestros clientes:",
    labels: {
      visitors: "visitantes únicos al mes",
      pageviews: "páginas vistas al mes",
      session: "duración media de visita",
    },
    source: (date) => `Fuente: analítica de webs de clientes · últimos 30 días · actualizado el ${date}`,
  },
  fr: {
    title: "Les chiffres de nos clients :",
    labels: {
      visitors: "visiteurs uniques par mois",
      pageviews: "pages vues par mois",
      session: "durée moyenne de visite",
    },
    source: (date) => `Source : statistiques des sites clients · 30 derniers jours · mis à jour le ${date}`,
  },
  de: {
    title: "Die Zahlen unserer Kunden:",
    labels: {
      visitors: "Einzelbesucher pro Monat",
      pageviews: "Seitenaufrufe pro Monat",
      session: "durchschnittliche Besuchsdauer",
    },
    source: (date) => `Quelle: Analyse der Kunden-Websites · letzte 30 Tage · aktualisiert am ${date}`,
  },
  it: {
    title: "I numeri dei nostri clienti:",
    labels: {
      visitors: "visitatori unici al mese",
      pageviews: "pagine viste al mese",
      session: "durata media della visita",
    },
    source: (date) => `Fonte: statistiche dei siti dei clienti · ultimi 30 giorni · aggiornato il ${date}`,
  },
};

export function getStatBand(
  locale: Locale,
  stats: ClientStats,
): { title: string; items: StatItem[]; source: string; numLocale: string } {
  const c = COPY[locale];
  const updated = new Intl.DateTimeFormat(dateLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${stats.updatedAt}T00:00:00Z`));
  return {
    title: c.title,
    numLocale: numLocale[locale],
    source: c.source(updated),
    items: [
      { target: floorToLeadingDigit(stats.visitors), kind: "number", suffix: "+", label: c.labels.visitors },
      { target: floorToLeadingDigit(stats.pageviews), kind: "number", suffix: "+", label: c.labels.pageviews },
      { target: floorDuration(stats.avgSessionSec), kind: "duration", suffix: "+", label: c.labels.session },
    ],
  };
}
