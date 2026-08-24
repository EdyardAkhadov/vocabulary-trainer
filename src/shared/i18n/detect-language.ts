import type { AppLanguage } from './translations';

const STORAGE_KEY = 'vocab-app-language';

export function isAppLanguage(value: unknown): value is AppLanguage {
  return value === 'en' || value === 'ru' || value === 'uk' || value === 'de' || value === 'es';
}

export function detectAppLanguage(): AppLanguage {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (isAppLanguage(saved)) {
    return saved;
  }

  const browserLanguage = navigator.language?.split('-')[0] ?? '';

  if (isAppLanguage(browserLanguage)) {
    return browserLanguage;
  }

  return 'en';
}

export function saveAppLanguage(language: AppLanguage) {
  localStorage.setItem(STORAGE_KEY, language);
}
