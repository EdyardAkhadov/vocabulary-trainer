import type { AppLanguage } from './translations';

const displayLocale: Record<AppLanguage, string> = {
  en: 'en',
  ru: 'ru',
  uk: 'uk',
  de: 'de',
  es: 'es',
  fr: 'fr',
  it: 'it',
  pt: 'pt',
  pl: 'pl',
  tr: 'tr',
  zh: 'zh-Hans',
  ja: 'ja',
  ko: 'ko',
  ar: 'ar',
  hi: 'hi',
};

export function getLanguageName(
  languageCode: string,
  appLanguage: AppLanguage,
  fallback?: string,
): string {
  try {
    const displayNames = new Intl.DisplayNames([displayLocale[appLanguage]], {
      type: 'language',
    });

    return displayNames.of(languageCode) ?? fallback ?? languageCode;
  } catch {
    return fallback ?? languageCode;
  }
}
