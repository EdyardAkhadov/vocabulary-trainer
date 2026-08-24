import { supabase } from '@/lib/supabase';
import type { AppLanguage } from '@/shared/i18n/translations';

export async function signUp(
  email: string,
  password: string,
  nickname: string,
  appLanguage: AppLanguage,
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname: nickname.trim(),
        app_language: appLanguage,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}
export async function updateEmail(email: string) {
  const { data, error } = await supabase.auth.updateUser({
    email: email.trim(),
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function updatePassword(currentPassword: string, newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
    current_password: currentPassword,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function requestPasswordReset(email: string) {
  const redirectTo = `${window.location.origin}/reset-password`;

  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo,
  });

  if (error) {
    throw error;
  }
}
