import { supabase } from '@/lib/supabase';

export type LearningStats = {
  answers: number;
  correct: number;
  wrong: number;
  accuracy: number;
  studiedWords: number;
  languagePairs: number;
  topics: number;
  words: number;
};

export async function getLearningStats(): Promise<LearningStats> {
  const [progressResult, pairsResult, topicsResult, wordsResult] = await Promise.all([
    supabase.from('study_progress').select('word_entry_id, times_seen, times_correct, times_wrong'),

    supabase.from('language_pairs').select('id', {
      count: 'exact',
      head: true,
    }),

    supabase.from('topics').select('id', {
      count: 'exact',
      head: true,
    }),

    supabase.from('word_entries').select('id', {
      count: 'exact',
      head: true,
    }),
  ]);

  if (progressResult.error) {
    throw progressResult.error;
  }

  if (pairsResult.error) {
    throw pairsResult.error;
  }

  if (topicsResult.error) {
    throw topicsResult.error;
  }

  if (wordsResult.error) {
    throw wordsResult.error;
  }

  const progress = progressResult.data ?? [];

  const answers = progress.reduce((total, item) => total + item.times_seen, 0);

  const correct = progress.reduce((total, item) => total + item.times_correct, 0);

  const wrong = progress.reduce((total, item) => total + item.times_wrong, 0);

  const studiedWords = new Set(
    progress.filter((item) => item.times_seen > 0).map((item) => item.word_entry_id),
  ).size;

  const accuracy = answers > 0 ? Math.round((correct / answers) * 100) : 0;

  return {
    answers,
    correct,
    wrong,
    accuracy,
    studiedWords,
    languagePairs: pairsResult.count ?? 0,
    topics: topicsResult.count ?? 0,
    words: wordsResult.count ?? 0,
  };
}
