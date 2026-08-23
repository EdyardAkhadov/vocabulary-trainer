import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { getLanguagePair, type LanguagePair } from '@/entities/language-pair/api';
import { getLanguages, type Language } from '@/entities/language/api';
import { deleteTopic, getTopics, type Topic } from '@/entities/topic/api';
import { CreateTopicForm } from '@/features/topic/create/CreateTopicForm';
import { EditTopicForm } from '@/features/topic/edit/EditTopicForm';
import { TopicList } from '@/widgets/topics/TopicList';

export function LanguagePairPage() {
  const { pairId } = useParams();

  const [languagePair, setLanguagePair] = useState<LanguagePair | null>(null);

  const [languages, setLanguages] = useState<Language[] | null>(null);

  const [topics, setTopics] = useState<Topic[] | null>(null);

  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pairId) {
      return;
    }

    const currentPairId = pairId;

    async function loadData() {
      try {
        const [pair, languagesData, topicsData] = await Promise.all([
          getLanguagePair(currentPairId),
          getLanguages(),
          getTopics(currentPairId),
        ]);

        setLanguagePair(pair);
        setLanguages(languagesData);
        setTopics(topicsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load language pair');
      }
    }

    loadData();
  }, [pairId]);

  if (!pairId) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to language pairs
          </Link>

          <p className="mt-6 text-destructive">Language pair not found.</p>
        </div>
      </main>
    );
  }

  if (error && !languagePair) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to language pairs
          </Link>

          <p className="mt-6 text-destructive">{error}</p>
        </div>
      </main>
    );
  }

  if (!languagePair || !languages || !topics) {
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

  function handleTopicCreated(topic: Topic) {
    setTopics((current) => {
      if (!current) {
        return [topic];
      }

      return [...current, topic];
    });
  }

  function handleTopicUpdated(updatedTopic: Topic) {
    setTopics((current) => {
      if (!current) {
        return [updatedTopic];
      }

      return current.map((topic) => (topic.id === updatedTopic.id ? updatedTopic : topic));
    });

    setEditingTopic(null);
  }

  async function handleTopicDelete(topic: Topic) {
    const confirmed = window.confirm(
      `Delete "${topic.name}"?\n\nThis will also delete all words and study progress inside this topic.`,
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    try {
      await deleteTopic(topic.id);

      setTopics((current) => {
        if (!current) {
          return [];
        }

        return current.filter((currentTopic) => currentTopic.id !== topic.id);
      });

      if (editingTopic?.id === topic.id) {
        setEditingTopic(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete topic');
    }
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to language pairs
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight">{languagePair.name}</h1>

          <p className="mt-2 text-muted-foreground">
            {sourceLanguage?.name ?? 'Unknown'}
            {' → '}
            {targetLanguage?.name ?? 'Unknown'}
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="mt-8">
          <CreateTopicForm
            languagePairId={pairId}
            onCreated={handleTopicCreated}
            onError={setError}
          />
        </div>

        {editingTopic && (
          <EditTopicForm
            topic={editingTopic}
            onUpdated={handleTopicUpdated}
            onCancel={() => setEditingTopic(null)}
            onError={setError}
          />
        )}

        <TopicList topics={topics} onEdit={setEditingTopic} onDelete={handleTopicDelete} />
      </div>
    </main>
  );
}
