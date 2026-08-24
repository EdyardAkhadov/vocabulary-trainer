import { supabase } from '@/lib/supabase';
import type { AppLanguage } from '@/shared/i18n/translations';

export type Profile = {
  user_id: string;
  nickname: string;
  app_language: AppLanguage;
  created_at: string;
  updated_at: string;
};

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('user_id, nickname, app_language, created_at, updated_at')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function createProfile(
  userId: string,
  nickname: string,
  appLanguage: AppLanguage,
): Promise<Profile> {
  const trimmedNickname = nickname.trim();

  if (trimmedNickname.length < 2) {
    throw new Error('Nickname is too short');
  }

  const { data, error } = await supabase
    .from('profiles')
    .insert({
      user_id: userId,
      nickname: trimmedNickname,
      app_language: appLanguage,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateProfile(
  userId: string,
  values: {
    nickname?: string;
    app_language?: AppLanguage;
  },
): Promise<Profile> {
  const updateData: {
    nickname?: string;
    app_language?: AppLanguage;
    updated_at: string;
  } = {
    updated_at: new Date().toISOString(),
  };

  if (values.nickname !== undefined) {
    updateData.nickname = values.nickname.trim();
  }

  if (values.app_language !== undefined) {
    updateData.app_language = values.app_language;
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
