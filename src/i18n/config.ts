// Locale configuration for the multilingual site (ES/EN/FR/DE/IT).
export const locales = ["en", "es", "fr", "de", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Native language names, shown in the language menu.
export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
};

// Short codes for the compact toggle.
export const localeShort: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  fr: "FR",
  de: "DE",
  it: "IT",
};

// BCP-47 tags + OpenGraph locales, for hreflang/metadata.
export const localeHrefLang: Record<Locale, string> = {
  en: "en-GB",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
};

export const localeOg: Record<Locale, string> = {
  en: "en_GB",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  it: "it_IT",
};

// The next locale in the list, for a simple cycle fallback.
export function otherLocale(locale: Locale): Locale {
  const i = locales.indexOf(locale);
  return locales[(i + 1) % locales.length];
}
