import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { getLanguagePair, type LanguagePair } from '@/entities/language-pair/api';
import { getLanguages, type Language } from '@/entities/language/api';
import { getTopic, type Topic } from '@/entities/topic/api';
import { deleteWordEntry, getWordEntries, type WordEntry } from '@/entities/word-entry/api';
import { CreateWordEntryForm } from '@/features/word-entry/create/CreateWordEntryForm';
import { EditWordEntryForm } from '@/features/word-entry/edit/EditWordEntryForm';
import { WordEntryList } from '@/widgets/word-entries/WordEntryList';

export function TopicPage() {
  const { pairId, topicId } = useParams();

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
        setError(err instanceof Error ? err.message : 'Failed to load topic');
      }
    }

    loadData();
  }, [pairId, topicId]);

  if (!pairId || !topicId) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back
          </Link>

          <p className="mt-6 text-destructive">Topic not found.</p>
        </div>
      </main>
    );
  }

  if (error && !topic) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-3xl">
          <Link
            to={`/pair/${pairId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to {pairId}
          </Link>

          <p className="mt-6 text-destructive">{error}</p>
        </div>
      </main>
    );
  }

  if (!topic || !languagePair || !languages || !wordEntries) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-3xl">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  const sourceLanguage = languages.find(
    (language) => language.id === languagePair.source_language_id,
  );

  const targetLanguage = languages.find(
    (language) => language.id === languagePair.target_language_id,
  );

  const sourceLanguageName = sourceLanguage?.name ?? 'Unknown';

  const targetLanguageName = targetLanguage?.name ?? 'Unknown';

  function handleWordCreated(wordEntry: WordEntry) {
    setWordEntries((current) => {
      if (!current) {
        return [wordEntry];
      }

      return [...current, wordEntry];
    });
  }

  function handleWordUpdated(updatedWordEntry: WordEntry) {
    setWordEntries((current) => {
      if (!current) {
        return [updatedWordEntry];
      }

      return current.map((wordEntry) =>
        wordEntry.id === updatedWordEntry.id ? updatedWordEntry : wordEntry,
      );
    });

    setEditingWordEntry(null);
  }

  async function handleWordDelete(wordEntry: WordEntry) {
    const confirmed = window.confirm(
      `Delete "${wordEntry.source_text} → ${wordEntry.target_text}"?\n\nThis will also delete its study progress.`,
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    try {
      await deleteWordEntry(wordEntry.id);

      setWordEntries((current) => {
        if (!current) {
          return [];
        }

        return current.filter((currentWordEntry) => currentWordEntry.id !== wordEntry.id);
      });

      if (editingWordEntry?.id === wordEntry.id) {
        setEditingWordEntry(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete word');
    }
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to={`/pair/${pairId}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to {languagePair.name}
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight">{topic.name}</h1>

          <p className="mt-2 text-muted-foreground">
            {sourceLanguageName}
            {' → '}
            {targetLanguageName}
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="mt-8">
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
