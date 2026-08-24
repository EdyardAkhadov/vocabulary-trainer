import type { AppLanguage } from './translations';

type LanguageCode = 'en' | 'ru' | 'uk' | 'de' | 'es' | 'fr';

const languageNames: Record<AppLanguage, Record<LanguageCode, string>> = {
  en: {
    en: 'English',
    ru: 'Russian',
    uk: 'Ukrainian',
    de: 'German',
    es: 'Spanish',
    fr: 'French',
  },

  ru: {
    en: 'Английский',
    ru: 'Русский',
    uk: 'Украинский',
    de: 'Немецкий',
    es: 'Испанский',
    fr: 'Французский',
  },

  uk: {
    en: 'Англійська',
    ru: 'Російська',
    uk: 'Українська',
    de: 'Німецька',
    es: 'Іспанська',
    fr: 'Французька',
  },

  de: {
    en: 'Englisch',
    ru: 'Russisch',
    uk: 'Ukrainisch',
    de: 'Deutsch',
    es: 'Spanisch',
    fr: 'Französisch',
  },

  es: {
    en: 'Inglés',
    ru: 'Ruso',
    uk: 'Ucraniano',
    de: 'Alemán',
    es: 'Español',
    fr: 'Francés',
  },
};

function isLanguageCode(value: string): value is LanguageCode {
  return (
    value === 'en' ||
    value === 'ru' ||
    value === 'uk' ||
    value === 'de' ||
    value === 'es' ||
    value === 'fr'
  );
}

export function getLanguageName(
  languageCode: string,
  appLanguage: AppLanguage,
  fallback?: string,
): string {
  if (!isLanguageCode(languageCode)) {
    return fallback ?? languageCode;
  }

  return languageNames[appLanguage][languageCode];
}
