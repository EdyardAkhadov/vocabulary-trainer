import { supabase } from '@/lib/supabase';

export type StudyProgress = {
  id: string;
  user_id: string;
  word_entry_id: string;
  times_seen: number;
  times_correct: number;
  times_wrong: number;
  is_learned: boolean;
  learned_at: string | null;
  last_answered_at: string | null;
  created_at: string;
  updated_at: string;
};

async function getCurrentUserId(): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User is not authenticated');
  }

  return user.id;
}

export async function getLearnedWordIds(wordEntryIds: string[]): Promise<Set<string>> {
  if (wordEntryIds.length === 0) {
    return new Set();
  }

  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from('study_progress')
    .select('word_entry_id')
    .eq('user_id', userId)
    .eq('is_learned', true)
    .in('word_entry_id', wordEntryIds);

  if (error) {
    throw error;
  }

  return new Set((data ?? []).map((item) => item.word_entry_id));
}

export async function setWordLearned(wordEntryId: string, isLearned: boolean): Promise<void> {
  const userId = await getCurrentUserId();

  const { data: existingProgress, error: readError } = await supabase
    .from('study_progress')
    .select('id')
    .eq('user_id', userId)
    .eq('word_entry_id', wordEntryId)
    .maybeSingle();

  if (readError) {
    throw readError;
  }

  const now = new Date().toISOString();
  const learnedAt = isLearned ? now : null;

  if (!existingProgress) {
    const { error } = await supabase.from('study_progress').insert({
      user_id: userId,
      word_entry_id: wordEntryId,
      times_seen: 0,
      times_correct: 0,
      times_wrong: 0,
      is_learned: isLearned,
      learned_at: learnedAt,
      last_answered_at: null,
      updated_at: now,
    });

    if (error) {
      throw error;
    }

    return;
  }

  const { error } = await supabase
    .from('study_progress')
    .update({
      is_learned: isLearned,
      learned_at: learnedAt,
      updated_at: now,
    })
    .eq('id', existingProgress.id);

  if (error) {
    throw error;
  }
}

export async function recordStudyResult(wordEntryId: string, isCorrect: boolean): Promise<void> {
  const userId = await getCurrentUserId();

  const { data: existingProgress, error: readError } = await supabase
    .from('study_progress')
    .select('id, times_seen, times_correct, times_wrong')
    .eq('user_id', userId)
    .eq('word_entry_id', wordEntryId)
    .maybeSingle();

  if (readError) {
    throw readError;
  }

  const now = new Date().toISOString();

  if (!existingProgress) {
    const { error } = await supabase.from('study_progress').insert({
      user_id: userId,
      word_entry_id: wordEntryId,
      times_seen: 1,
      times_correct: isCorrect ? 1 : 0,
      times_wrong: isCorrect ? 0 : 1,
      is_learned: false,
      learned_at: null,
      last_answered_at: now,
      updated_at: now,
    });

    if (error) {
      throw error;
    }

    return;
  }

  const { error } = await supabase
    .from('study_progress')
    .update({
      times_seen: existingProgress.times_seen + 1,
      times_correct: existingProgress.times_correct + (isCorrect ? 1 : 0),
      times_wrong: existingProgress.times_wrong + (isCorrect ? 0 : 1),
      last_answered_at: now,
      updated_at: now,
    })
    .eq('id', existingProgress.id);

  if (error) {
    throw error;
  }
}
