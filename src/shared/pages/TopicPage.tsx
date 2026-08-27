import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { getLanguagePair, type LanguagePair } from '@/entities/language-pair/api';
import { getLanguages, type Language } from '@/entities/language/api';
import { getLearnedWordIds, setWordLearned } from '@/entities/study-progress/api';
import { getTopic, type Topic } from '@/entities/topic/api';
import { deleteWordEntry, getWordEntries, type WordEntry } from '@/entities/word-entry/api';
import { CreateWordEntryForm } from '@/features/word-entry/create/CreateWordEntryForm';
import { EditWordEntryForm } from '@/features/word-entry/edit/EditWordEntryForm';
import { getLanguageName } from '@/shared/i18n/language-names';
import { WordEntryList } from '@/widgets/word-entries/WordEntryList';

export function TopicPage() {
  const { pairId, topicId } = useParams();
  const { language: appLanguage, t } = useAppLanguage();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [languagePair, setLanguagePair] = useState<LanguagePair | null>(null);
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [wordEntries, setWordEntries] = useState<WordEntry[] | null>(null);
  const [learnedWordIds, setLearnedWordIds] = useState<Set<string>>(new Set());
  const [updatingLearnedWordId, setUpdatingLearnedWordId] = useState<string | null>(null);
  const [editingWordEntry, setEditingWordEntry] = useState<WordEntry | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pairId || !topicId) {
      return;
    }

    const currentPairId = pairId;
    const currentTopicId = topicId;

    async function loadData() {
      try {
        const [topicData, pairData, languagesData, wordsData] = await Promise.all([
          getTopic(currentTopicId),
          getLanguagePair(currentPairId),
          getLanguages(),
          getWordEntries(currentTopicId),
        ]);

        const learnedIds = await getLearnedWordIds(wordsData.map((word) => word.id));

        setTopic(topicData);
        setLanguagePair(pairData);
        setLanguages(languagesData);
        setWordEntries(wordsData);
        setLearnedWordIds(learnedIds);
      } catch (err) {
        setError(err instanceof Error ? err.message : t.errors.loadTopic);
      }
    }

    void loadData();
  }, [pairId, topicId, t.errors.loadTopic]);

  if (!pairId || !topicId) {
    return (
      <main className="bg-background py-6 sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link to="/app" className="text-sm text-muted-foreground hover:text-foreground">
            ← {t.common.back}
          </Link>
          <p className="mt-6 text-destructive">{t.topics.notFound}</p>
        </div>
      </main>
    );
  }

  if (error && !topic) {
    return (
      <main className="bg-background py-6 sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link to={`/app/pair/${pairId}`} className="text-sm text-muted-foreground hover:text-foreground">
            ← {t.common.back}
          </Link>
          <p className="mt-6 text-destructive">{error}</p>
        </div>
      </main>
    );
  }

  if (!topic || !languagePair || !languages || !wordEntries) {
    return (
      <main className="bg-background py-6 sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">{t.common.loading}</div>
      </main>
    );
  }

  const sourceLanguage = languages.find(
    (language) => language.id === languagePair.source_language_id,
  );
  const targetLanguage = languages.find(
    (language) => language.id === languagePair.target_language_id,
  );

  const sourceLanguageName = languagePair.source_language_custom?.trim()
    || (sourceLanguage
      ? getLanguageName(sourceLanguage.code, appLanguage, sourceLanguage.name)
      : t.common.unknown);
  const targetLanguageName = languagePair.target_language_custom?.trim()
    || (targetLanguage
      ? getLanguageName(targetLanguage.code, appLanguage, targetLanguage.name)
      : t.common.unknown);

  const totalWords = wordEntries.length;
  const learnedCount = wordEntries.filter((word) => learnedWordIds.has(word.id)).length;
  const remainingCount = Math.max(0, totalWords - learnedCount);
  const learnedPercentage = totalWords > 0 ? Math.round((learnedCount / totalWords) * 100) : 0;

  function handleWordCreated(wordEntry: WordEntry) {
    setWordEntries((current) => (current ? [...current, wordEntry] : [wordEntry]));
  }

  function handleWordUpdated(updatedWordEntry: WordEntry) {
    setWordEntries((current) =>
      current
        ? current.map((wordEntry) =>
            wordEntry.id === updatedWordEntry.id ? updatedWordEntry : wordEntry,
          )
        : [updatedWordEntry],
    );
    setEditingWordEntry(null);
  }

  async function handleWordLearnedChange(wordEntry: WordEntry, isLearned: boolean) {
    setError(null);
    setUpdatingLearnedWordId(wordEntry.id);

    try {
      await setWordLearned(wordEntry.id, isLearned);

      setLearnedWordIds((current) => {
        const next = new Set(current);

        if (isLearned) {
          next.add(wordEntry.id);
        } else {
          next.delete(wordEntry.id);
        }

        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.saveProgress);
    } finally {
      setUpdatingLearnedWordId(null);
    }
  }

  async function handleWordDelete(wordEntry: WordEntry) {
    const confirmed = window.confirm(
      `${t.confirmations.deleteWordTitle}\n\n${wordEntry.source_text} → ${wordEntry.target_text}\n\n${t.confirmations.deleteWord}`,
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    try {
      await deleteWordEntry(wordEntry.id);
      setWordEntries((current) =>
        current ? current.filter((currentWordEntry) => currentWordEntry.id !== wordEntry.id) : [],
      );
      setLearnedWordIds((current) => {
        const next = new Set(current);
        next.delete(wordEntry.id);
        return next;
      });

      if (editingWordEntry?.id === wordEntry.id) {
        setEditingWordEntry(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.deleteWord);
    }
  }

  return (
    <main className="bg-background py-6 sm:py-8">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <Link to={`/app/pair/${pairId}`} className="text-sm text-muted-foreground hover:text-foreground">
          ← {t.common.back}: {languagePair.name}
        </Link>

        <div className="mt-6">
          <h1 className="wrap-break-word text-2xl font-bold tracking-tight sm:text-3xl">{topic.name}</h1>
          <p className="mt-2 text-muted-foreground">
            {sourceLanguageName} {' → '} {targetLanguageName}
          </p>
        </div>

        <section className="mt-6 rounded-2xl border bg-card p-4 sm:p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{t.words.learnedProgress}</p>
              <p className="mt-1 text-2xl font-bold">
                {learnedCount} / {totalWords}
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              {t.cards.remaining}: <span className="font-semibold text-foreground">{remainingCount}</span>
            </p>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: `${learnedPercentage}%` }}
            />
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
          <Link
            to={`/app/pair/${pairId}/topic/${topicId}/cards`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brand bg-brand/5 px-4 text-sm font-semibold text-brand transition-colors hover:bg-brand/10"
          >
            {t.study.studyCards}
          </Link>
          <Link
            to={`/app/pair/${pairId}/topic/${topicId}/test`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
          >
            {t.study.takeTest}
          </Link>
          <Link
            to={`/app/quick-add?pair=${pairId}&topic=${topicId}`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border px-4 text-sm font-semibold transition-colors hover:bg-muted"
          >
            + {t.vocabulary.quickAdd}
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="mt-6 sm:mt-8">
          <CreateWordEntryForm
            pairId={pairId}
            topicId={topicId}
            sourceLanguageName={sourceLanguageName}
            targetLanguageName={targetLanguageName}
            onCreated={handleWordCreated}
            onError={setError}
          />
        </div>

        {editingWordEntry && (
          <EditWordEntryForm
            wordEntry={editingWordEntry}
            sourceLanguageName={sourceLanguageName}
            targetLanguageName={targetLanguageName}
            onUpdated={handleWordUpdated}
            onCancel={() => setEditingWordEntry(null)}
            onError={setError}
          />
        )}

        <WordEntryList
          wordEntries={wordEntries}
          learnedWordIds={learnedWordIds}
          updatingLearnedWordId={updatingLearnedWordId}
          sourceLanguageName={sourceLanguageName}
          targetLanguageName={targetLanguageName}
          onEdit={setEditingWordEntry}
          onDelete={handleWordDelete}
          onLearnedChange={handleWordLearnedChange}
        />
      </div>
    </main>
  );
}
