import { supabase } from '@/lib/supabase';

export type StudyProgress = {
  id: string;
  user_id: string;
  word_entry_id: string;
  times_seen: number;
  times_correct: number;
  times_wrong: number;
  last_answered_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function recordStudyResult(wordEntryId: string, isCorrect: boolean): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User is not authenticated');
  }

  const { data: existingProgress, error: readError } = await supabase
    .from('study_progress')
    .select('id, times_seen, times_correct, times_wrong')
    .eq('user_id', user.id)
    .eq('word_entry_id', wordEntryId)
    .maybeSingle();

  if (readError) {
    throw readError;
  }

  const now = new Date().toISOString();

  if (!existingProgress) {
    const { error } = await supabase.from('study_progress').insert({
      user_id: user.id,
      word_entry_id: wordEntryId,
      times_seen: 1,
      times_correct: isCorrect ? 1 : 0,
      times_wrong: isCorrect ? 0 : 1,
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
