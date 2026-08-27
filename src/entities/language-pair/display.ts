import type { AppLanguage } from '@/shared/i18n/translations';
import { getLanguageName } from '@/shared/i18n/language-names';
import type { Language } from '@/entities/language/api';
import type { LanguagePair } from './api';

type PairSide = 'source' | 'target';

export function getPairLanguageName(
  pair: LanguagePair,
  side: PairSide,
  languages: Language[],
  appLanguage: AppLanguage,
  fallback: string,
) {
  const customName =
    side === 'source' ? pair.source_language_custom : pair.target_language_custom;

  if (customName?.trim()) {
    return customName.trim();
  }

  const languageId =
    side === 'source' ? pair.source_language_id : pair.target_language_id;

  if (!languageId) {
    return fallback;
  }

  const language = languages.find((item) => item.id === languageId);

  if (!language) {
    return fallback;
  }

  return getLanguageName(
    language.code,
    appLanguage,
    language.native_name || language.name,
  );
}
