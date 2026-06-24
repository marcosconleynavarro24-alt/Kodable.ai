// Locale configuration for the bilingual (ES/EN) site.
export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

// The other locale, for the language toggle.
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}
