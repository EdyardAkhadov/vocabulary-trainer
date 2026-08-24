import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { getLanguagePair, type LanguagePair } from '@/entities/language-pair/api';
import { getLanguages, type Language } from '@/entities/language/api';
import { getTopic, type Topic } from '@/entities/topic/api';
import { getWordEntries, type WordEntry } from '@/entities/word-entry/api';
import { getLanguageName } from '@/shared/i18n/language-names';

type CardDirection = 'source-to-target' | 'target-to-source';

export function CardsPage() {
  const { pairId, topicId } = useParams();
  const { language, t } = useAppLanguage();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [languagePair, setLanguagePair] = useState<LanguagePair | null>(null);
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [wordEntries, setWordEntries] = useState<WordEntry[] | null>(null);
  const [direction, setDirection] = useState<CardDirection>('source-to-target');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
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
        setError(err instanceof Error ? err.message : t.errors.loadCards);
      }
    }

    void loadData();
  }, [pairId, topicId, t.errors.loadCards]);

  const sourceLanguage = useMemo(() => {
    if (!languagePair || !languages) {
      return null;
    }

    return languages.find((item) => item.id === languagePair.source_language_id) ?? null;
  }, [languagePair, languages]);

  const targetLanguage = useMemo(() => {
    if (!languagePair || !languages) {
      return null;
    }

    return languages.find((item) => item.id === languagePair.target_language_id) ?? null;
  }, [languagePair, languages]);

  if (!pairId || !topicId) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-destructive">{t.errors.loadCards}</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-3xl">
          <Link
            to={`/pair/${pairId}/topic/${topicId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t.test.backToTopic}
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
          <p>{t.common.loading}</p>
        </div>
      </main>
    );
  }

  if (wordEntries.length === 0) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-3xl">
          <Link
            to={`/pair/${pairId}/topic/${topicId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t.common.back}: {topic.name}
          </Link>

          <div className="mt-8 rounded-xl border border-dashed p-8 text-center">
            <h1 className="text-xl font-semibold">{t.cards.noCards}</h1>

            <p className="mt-2 text-sm text-muted-foreground">{t.cards.noCardsDescription}</p>
          </div>
        </div>
      </main>
    );
  }

  const cards = wordEntries;
  const currentWord = cards[currentIndex];

  const sourceLanguageName = sourceLanguage
    ? getLanguageName(
        sourceLanguage.code,
        language,
        sourceLanguage.native_name || sourceLanguage.name,
      )
    : t.languagePairs.language1;

  const targetLanguageName = targetLanguage
    ? getLanguageName(
        targetLanguage.code,
        language,
        targetLanguage.native_name || targetLanguage.name,
      )
    : t.languagePairs.language2;

  const frontText =
    direction === 'source-to-target' ? currentWord.source_text : currentWord.target_text;

  const backText =
    direction === 'source-to-target' ? currentWord.target_text : currentWord.source_text;

  const frontLanguage = direction === 'source-to-target' ? sourceLanguageName : targetLanguageName;

  const backLanguage = direction === 'source-to-target' ? targetLanguageName : sourceLanguageName;

  function goPrevious() {
    setCurrentIndex((current) => (current === 0 ? cards.length - 1 : current - 1));
    setIsFlipped(false);
  }

  function goNext() {
    setCurrentIndex((current) => (current === cards.length - 1 ? 0 : current + 1));
    setIsFlipped(false);
  }

  function changeDirection(nextDirection: CardDirection) {
    setDirection(nextDirection);
    setIsFlipped(false);
  }

  function flipCard() {
    setIsFlipped((current) => !current);
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to={`/pair/${pairId}/topic/${topicId}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {t.common.back}: {topic.name}
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl font-bold tracking-tight">{t.cards.title}</h1>
          <p className="mt-2 text-muted-foreground">{topic.name}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            type="button"
            variant={direction === 'source-to-target' ? 'default' : 'outline'}
            onClick={() => changeDirection('source-to-target')}
          >
            {sourceLanguageName} → {targetLanguageName}
          </Button>

          <Button
            type="button"
            variant={direction === 'target-to-source' ? 'default' : 'outline'}
            onClick={() => changeDirection('target-to-source')}
          >
            {targetLanguageName} → {sourceLanguageName}
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {t.cards.card} {currentIndex + 1} {t.common.of} {cards.length}
        </p>

        <button
          type="button"
          onClick={flipCard}
          className="mt-4 flex min-h-80 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border bg-card p-8 text-center shadow-sm transition hover:shadow-md"
        >
          {!isFlipped ? (
            <>
              <p className="text-sm text-muted-foreground">{frontLanguage}</p>
              <p className="mt-4 wrap-break-word text-4xl font-semibold">{frontText}</p>
              <p className="mt-8 text-sm text-muted-foreground">{t.cards.reveal}</p>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">{backLanguage}</p>
              <p className="mt-4 wrap-break-word text-4xl font-semibold">{backText}</p>

              {currentWord.meaning && (
                <div className="mt-8 w-full border-t pt-6">
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {t.words.meaning}
                  </p>
                  <p className="mt-2 wrap-break-word text-base">{currentWord.meaning}</p>
                </div>
              )}

              <p className="mt-8 text-sm text-muted-foreground">{t.cards.flipBack}</p>
            </>
          )}
        </button>

        <div className="mt-6 flex items-center justify-between gap-4">
          <Button type="button" variant="outline" onClick={goPrevious}>
            ← {t.cards.previous}
          </Button>

          <Button type="button" onClick={flipCard}>
            {t.cards.flip}
          </Button>

          <Button type="button" variant="outline" onClick={goNext}>
            {t.cards.next} →
          </Button>
        </div>
      </div>
    </main>
  );
}
