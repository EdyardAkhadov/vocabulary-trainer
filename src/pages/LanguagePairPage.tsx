import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { getLanguagePair, type LanguagePair } from '@/entities/language-pair/api';
import { getLanguages, type Language } from '@/entities/language/api';
import { deleteTopic, getTopics, type Topic } from '@/entities/topic/api';
import { CreateTopicForm } from '@/features/topic/create/CreateTopicForm';
import { EditTopicForm } from '@/features/topic/edit/EditTopicForm';
import { getLanguageName } from '@/shared/i18n/language-names';
import { TopicList } from '@/widgets/topics/TopicList';

export function LanguagePairPage() {
  const { pairId } = useParams();
  const { language: appLanguage, t } = useAppLanguage();

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
        setError(err instanceof Error ? err.message : t.errors.loadPair);
      }
    }

    void loadData();
  }, [pairId, t.errors.loadPair]);

  if (!pairId) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-6 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← {t.common.back}
          </Link>
          <p className="mt-6 text-destructive">{t.languagePairs.notFound}</p>
        </div>
      </main>
    );
  }

  if (error && !languagePair) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-6 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← {t.common.back}
          </Link>
          <p className="mt-6 text-destructive">{error}</p>
        </div>
      </main>
    );
  }

  if (!languagePair || !languages || !topics) {
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

  function handleTopicCreated(topic: Topic) {
    setTopics((current) => (current ? [...current, topic] : [topic]));
  }

  function handleTopicUpdated(updatedTopic: Topic) {
    setTopics((current) =>
      current
        ? current.map((topic) => (topic.id === updatedTopic.id ? updatedTopic : topic))
        : [updatedTopic],
    );
    setEditingTopic(null);
  }

  async function handleTopicDelete(topic: Topic) {
    const confirmed = window.confirm(
      `${t.confirmations.deleteTopicTitle}\n\n${topic.name}\n\n${t.confirmations.deleteTopic}`,
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    try {
      await deleteTopic(topic.id);
      setTopics((current) =>
        current ? current.filter((currentTopic) => currentTopic.id !== topic.id) : [],
      );

      if (editingTopic?.id === topic.id) {
        setEditingTopic(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.deleteTopic);
    }
  }

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background py-6 sm:min-h-[calc(100vh-4rem)] sm:py-8">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          ← {t.common.back}
        </Link>

        <div className="mt-6">
          <h1 className="wrap-break-word text-2xl font-bold tracking-tight sm:text-3xl">{languagePair.name}</h1>
          <p className="mt-2 text-muted-foreground">
            {sourceLanguageName} {' → '} {targetLanguageName}
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="mt-6 sm:mt-8">
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
