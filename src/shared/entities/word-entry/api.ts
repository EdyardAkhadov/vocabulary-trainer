import { supabase } from '@/lib/supabase';

export type WordEntry = {
  id: string;
  topic_id: string;
  source_text: string;
  target_text: string;
  meaning: string | null;
  context_text: string | null;
  encounter_source: string | null;
  created_at: string;
  updated_at: string;
};

export type WordEntryInput = {
  sourceText: string;
  targetText: string;
  meaning?: string | null;
  contextText?: string | null;
  encounterSource?: string | null;
};

const wordEntrySelect =
  'id, topic_id, source_text, target_text, meaning, context_text, encounter_source, created_at, updated_at';

function normalizeOptional(value?: string | null) {
  return value?.trim() || null;
}

function normalizeInput(input: WordEntryInput) {
  const sourceText = input.sourceText.trim();
  const targetText = input.targetText.trim();

  if (!sourceText || !targetText) {
    throw new Error('Both words are required');
  }

  return {
    source_text: sourceText,
    target_text: targetText,
    meaning: normalizeOptional(input.meaning),
    context_text: normalizeOptional(input.contextText),
    encounter_source: normalizeOptional(input.encounterSource),
  };
}

export async function getWordEntries(topicId: string): Promise<WordEntry[]> {
  const { data, error } = await supabase
    .from('word_entries')
    .select(wordEntrySelect)
    .eq('topic_id', topicId)
    .order('created_at', { ascending: true });

  if (error) {
    throw error;
  }

  return data;
}

export async function getWordEntriesForTopics(topicIds: string[]): Promise<WordEntry[]> {
  if (topicIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from('word_entries')
    .select(wordEntrySelect)
    .in('topic_id', topicIds)
    .order('created_at', { ascending: false });

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
  contextText: string | null = null,
  encounterSource: string | null = null,
): Promise<WordEntry> {
  return createWordEntryWithInput(topicId, {
    sourceText,
    targetText,
    meaning,
    contextText,
    encounterSource,
  });
}

export async function createWordEntryWithInput(
  topicId: string,
  input: WordEntryInput,
): Promise<WordEntry> {
  const normalized = normalizeInput(input);

  const { data, error } = await supabase
    .from('word_entries')
    .insert({
      topic_id: topicId,
      ...normalized,
    })
    .select(wordEntrySelect)
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
  contextText: string | null = null,
  encounterSource: string | null = null,
): Promise<WordEntry> {
  const normalized = normalizeInput({
    sourceText,
    targetText,
    meaning,
    contextText,
    encounterSource,
  });

  const { data, error } = await supabase
    .from('word_entries')
    .update(normalized)
    .eq('id', wordEntryId)
    .select(wordEntrySelect)
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
