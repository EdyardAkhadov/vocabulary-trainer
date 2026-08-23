import { supabase } from '@/lib/supabase';

export type WordEntry = {
  id: string;
  topic_id: string;
  source_text: string;
  target_text: string;
  meaning: string | null;
  created_at: string;
  updated_at: string;
};

export async function getWordEntries(topicId: string): Promise<WordEntry[]> {
  const { data, error } = await supabase
    .from('word_entries')
    .select('id, topic_id, source_text, target_text, meaning, created_at, updated_at')
    .eq('topic_id', topicId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function createWordEntry(
  topicId: string,
  sourceText: string,
  targetText: string,
  meaning: string | null,
): Promise<WordEntry> {
  const trimmedSource = sourceText.trim();
  const trimmedTarget = targetText.trim();
  const trimmedMeaning = meaning?.trim() || null;

  if (!trimmedSource || !trimmedTarget) {
    throw new Error('Both words are required');
  }

  const { data, error } = await supabase
    .from('word_entries')
    .insert({
      topic_id: topicId,
      source_text: trimmedSource,
      target_text: trimmedTarget,
      meaning: trimmedMeaning,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateWordEntry(
  wordEntryId: string,
  sourceText: string,
  targetText: string,
  meaning: string | null,
): Promise<WordEntry> {
  const trimmedSource = sourceText.trim();
  const trimmedTarget = targetText.trim();
  const trimmedMeaning = meaning?.trim() || null;

  if (!trimmedSource || !trimmedTarget) {
    throw new Error('Both words are required');
  }

  const { data, error } = await supabase
    .from('word_entries')
    .update({
      source_text: trimmedSource,
      target_text: trimmedTarget,
      meaning: trimmedMeaning,
    })
    .eq('id', wordEntryId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteWordEntry(wordEntryId: string): Promise<void> {
  const { error } = await supabase.from('word_entries').delete().eq('id', wordEntryId);

  if (error) {
    throw error;
  }
}
