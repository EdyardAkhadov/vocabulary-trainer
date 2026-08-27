import { supabase } from '@/lib/supabase';

export type LanguagePair = {
  id: string;
  user_id: string;
  source_language_id: string | null;
  target_language_id: string | null;
  source_language_custom: string | null;
  target_language_custom: string | null;
  name: string;
  created_at: string;
};

export type LanguageSelection = {
  languageId: string | null;
  customName: string | null;
};

const pairSelect =
  'id, user_id, source_language_id, target_language_id, source_language_custom, target_language_custom, name, created_at';

function normalizeSelection(selection: LanguageSelection): LanguageSelection {
  const customName = selection.customName?.trim() || null;

  if (!selection.languageId && !customName) {
    throw new Error('Language is required');
  }

  if (selection.languageId && customName) {
    throw new Error('Choose a predefined language or enter a custom language, not both');
  }

  return {
    languageId: selection.languageId,
    customName,
  };
}

function selectionKey(selection: LanguageSelection) {
  return selection.languageId
    ? `id:${selection.languageId}`
    : `custom:${selection.customName?.trim().toLocaleLowerCase() ?? ''}`;
}

export async function getLanguagePairs(): Promise<LanguagePair[]> {
  const { data, error } = await supabase
    .from('language_pairs')
    .select(pairSelect)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getLanguagePair(pairId: string): Promise<LanguagePair> {
  const { data, error } = await supabase
    .from('language_pairs')
    .select(pairSelect)
    .eq('id', pairId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createLanguagePair(
  source: LanguageSelection,
  target: LanguageSelection,
  name: string,
): Promise<LanguagePair> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User is not authenticated');
  }

  const normalizedSource = normalizeSelection(source);
  const normalizedTarget = normalizeSelection(target);
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error('Language pair name cannot be empty');
  }

  if (selectionKey(normalizedSource) === selectionKey(normalizedTarget)) {
    throw new Error('Languages must be different');
  }

  const { data, error } = await supabase
    .from('language_pairs')
    .insert({
      user_id: user.id,
      source_language_id: normalizedSource.languageId,
      target_language_id: normalizedTarget.languageId,
      source_language_custom: normalizedSource.customName,
      target_language_custom: normalizedTarget.customName,
      name: trimmedName,
    })
    .select(pairSelect)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateLanguagePair(
  pairId: string,
  source: LanguageSelection,
  target: LanguageSelection,
  name: string,
): Promise<LanguagePair> {
  const normalizedSource = normalizeSelection(source);
  const normalizedTarget = normalizeSelection(target);
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error('Language pair name cannot be empty');
  }

  if (selectionKey(normalizedSource) === selectionKey(normalizedTarget)) {
    throw new Error('Languages must be different');
  }

  const { data, error } = await supabase
    .from('language_pairs')
    .update({
      source_language_id: normalizedSource.languageId,
      target_language_id: normalizedTarget.languageId,
      source_language_custom: normalizedSource.customName,
      target_language_custom: normalizedTarget.customName,
      name: trimmedName,
    })
    .eq('id', pairId)
    .select(pairSelect)
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
