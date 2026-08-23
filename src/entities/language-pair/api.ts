import { supabase } from '@/lib/supabase';

export type LanguagePair = {
  id: string;
  user_id: string;
  source_language_id: string;
  target_language_id: string;
  name: string;
  created_at: string;
};

export async function getLanguagePairs(): Promise<LanguagePair[]> {
  const { data, error } = await supabase
    .from('language_pairs')
    .select('id, user_id, source_language_id, target_language_id, name, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getLanguagePair(pairId: string): Promise<LanguagePair> {
  const { data, error } = await supabase
    .from('language_pairs')
    .select('id, user_id, source_language_id, target_language_id, name, created_at')
    .eq('id', pairId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createLanguagePair(
  sourceLanguageId: string,
  targetLanguageId: string,
  name: string,
): Promise<LanguagePair> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User is not authenticated');
  }

  const { data, error } = await supabase
    .from('language_pairs')
    .insert({
      user_id: user.id,
      source_language_id: sourceLanguageId,
      target_language_id: targetLanguageId,
      name: name.trim(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateLanguagePair(
  pairId: string,
  sourceLanguageId: string,
  targetLanguageId: string,
  name: string,
): Promise<LanguagePair> {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error('Language pair name cannot be empty');
  }

  if (sourceLanguageId === targetLanguageId) {
    throw new Error('Languages must be different');
  }

  const { data, error } = await supabase
    .from('language_pairs')
    .update({
      source_language_id: sourceLanguageId,
      target_language_id: targetLanguageId,
      name: trimmedName,
    })
    .eq('id', pairId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteLanguagePair(pairId: string): Promise<void> {
  const { error } = await supabase.from('language_pairs').delete().eq('id', pairId);

  if (error) {
    throw error;
  }
}
