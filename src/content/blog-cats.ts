import type { Locale } from "@/i18n/config";
import type { BlogCategory } from "@/content/blog";

// Display labels for blog category chips. The post data keeps the English
// category as a stable enum key (used for typing + JSON-LD articleSection);
// these localise only the visible chip text.
export const CAT_LABELS: Record<Locale, Record<BlogCategory, string>> = {
  en: { "AI Agents": "AI Agents", "Getting Found": "Getting Found", Automation: "Automation", "AI Strategy": "AI Strategy", Funding: "Funding & Grants" },
  es: { "AI Agents": "Agentes de IA", "Getting Found": "Hacerte visible", Automation: "Automatización", "AI Strategy": "Estrategia de IA", Funding: "Ayudas y Subvenciones" },
  fr: { "AI Agents": "Agents IA", "Getting Found": "Être trouvé", Automation: "Automatisation", "AI Strategy": "Stratégie IA", Funding: "Aides & Subventions" },
  de: { "AI Agents": "KI-Agenten", "Getting Found": "Gefunden werden", Automation: "Automatisierung", "AI Strategy": "KI-Strategie", Funding: "Förderung" },
  it: { "AI Agents": "Agenti IA", "Getting Found": "Farsi trovare", Automation: "Automazione", "AI Strategy": "Strategia IA", Funding: "Bandi e Sovvenzioni" },
};
