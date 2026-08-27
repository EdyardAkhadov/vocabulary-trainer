import { APP_LANGUAGE_CODES } from './app-language-options';
import type { AppLanguage } from './translations';

const SITE_STORAGE_KEY = 'vocab-site-language';

export function isAppLanguage(value: unknown): value is AppLanguage {
  return typeof value === 'string' && APP_LANGUAGE_CODES.includes(value as AppLanguage);
}

export function detectBrowserLanguage(): AppLanguage {
  const browserLanguage = navigator.language?.split('-')[0] ?? '';
  return isAppLanguage(browserLanguage) ? browserLanguage : 'en';
}

export function detectSiteLanguage(): AppLanguage {
  const siteSaved = localStorage.getItem(SITE_STORAGE_KEY);

  if (isAppLanguage(siteSaved)) {
    return siteSaved;
  }

  return detectBrowserLanguage();
}

export function saveSiteLanguage(language: AppLanguage) {
  localStorage.setItem(SITE_STORAGE_KEY, language);
}
