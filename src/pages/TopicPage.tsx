import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { getLanguagePair, type LanguagePair } from '@/entities/language-pair/api';
import { getLanguages, type Language } from '@/entities/language/api';
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

        setTopic(topicData);
        setLanguagePair(pairData);
        setLanguages(languagesData);
        setWordEntries(wordsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : t.errors.loadTopic);
      }
    }

    void loadData();
  }, [pairId, topicId, t.errors.loadTopic]);

  if (!pairId || !topicId) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-6 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← {t.common.back}
          </Link>
          <p className="mt-6 text-destructive">{t.topics.notFound}</p>
        </div>
      </main>
    );
  }

  if (error && !topic) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-6 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link to={`/pair/${pairId}`} className="text-sm text-muted-foreground hover:text-foreground">
            ← {t.common.back}
          </Link>
          <p className="mt-6 text-destructive">{error}</p>
        </div>
      </main>
    );
  }

  if (!topic || !languagePair || !languages || !wordEntries) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-6 sm:min-h-[calc(100vh-4rem)] sm:py-8">
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

  const sourceLanguageName = sourceLanguage
    ? getLanguageName(sourceLanguage.code, appLanguage, sourceLanguage.name)
    : t.common.unknown;
  const targetLanguageName = targetLanguage
    ? getLanguageName(targetLanguage.code, appLanguage, targetLanguage.name)
    : t.common.unknown;

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

      if (editingWordEntry?.id === wordEntry.id) {
        setEditingWordEntry(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.deleteWord);
    }
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background py-6 sm:min-h-[calc(100vh-4rem)] sm:py-8">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <Link to={`/pair/${pairId}`} className="text-sm text-muted-foreground hover:text-foreground">
          ← {t.common.back}: {languagePair.name}
        </Link>

        <div className="mt-6">
          <h1 className="wrap-break-word text-2xl font-bold tracking-tight sm:text-3xl">{topic.name}</h1>
          <p className="mt-2 text-muted-foreground">
            {sourceLanguageName} {' → '} {targetLanguageName}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
          <Link
            to={`/pair/${pairId}/topic/${topicId}/cards`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            {t.study.studyCards}
          </Link>
          <Link
            to={`/pair/${pairId}/topic/${topicId}/test`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            {t.study.takeTest}
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="mt-6 sm:mt-8">
          <CreateWordEntryForm
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
          sourceLanguageName={sourceLanguageName}
          targetLanguageName={targetLanguageName}
          onEdit={setEditingWordEntry}
          onDelete={handleWordDelete}
        />
      </div>
    </main>
  );
}
