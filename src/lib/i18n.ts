import type { Locale } from "./types";

export const defaultLocale: Locale = "de";
export const locales: Locale[] = ["de", "en"];

/**
 * Ermittelt die aktuelle Locale aus dem URL-Pfad
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (locales.includes(lang as Locale)) {
    return lang as Locale;
  }
  return defaultLocale;
}

/**
 * Generiert den Pfad zur äquivalenten Seite in der Ziel-Locale
 */
export function getLocalizedPath(path: string, targetLocale: Locale): string {
  // Entferne bestehenden Locale-Prefix
  const cleanPath = path.replace(/^\/(en)\//, "/").replace(/^\/(en)$/, "/");

  if (targetLocale === defaultLocale) {
    return cleanPath;
  }
  return `/${targetLocale}${cleanPath === "/" ? "/" : cleanPath}`;
}
