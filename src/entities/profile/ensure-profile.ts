import type { User } from '@supabase/supabase-js';

import { createProfile, getProfile, type Profile } from '@/entities/profile/api';
import type { AppLanguage } from '@/shared/i18n/translations';

function isAppLanguage(value: unknown): value is AppLanguage {
  return value === 'en' || value === 'ru' || value === 'uk' || value === 'de' || value === 'es';
}

export async function ensureProfile(user: User, fallbackLanguage: AppLanguage): Promise<Profile> {
  const existingProfile = await getProfile(user.id);

  if (existingProfile) {
    return existingProfile;
  }

  const metadataNickname = user.user_metadata?.nickname;
  const metadataLanguage = user.user_metadata?.app_language;

  const nickname =
    typeof metadataNickname === 'string' && metadataNickname.trim().length >= 2
      ? metadataNickname.trim()
      : user.email?.split('@')[0] || 'User';

  const appLanguage = isAppLanguage(metadataLanguage) ? metadataLanguage : fallbackLanguage;

  return createProfile(user.id, nickname, appLanguage);
}
