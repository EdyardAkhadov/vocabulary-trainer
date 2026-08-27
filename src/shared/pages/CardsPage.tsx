import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { getLanguagePair, type LanguagePair } from '@/entities/language-pair/api';
import { getLanguages, type Language } from '@/entities/language/api';
import { getLearnedWordIds } from '@/entities/study-progress/api';
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
  const [learnedWordIds, setLearnedWordIds] = useState<Set<string>>(new Set());
  const [sessionCards, setSessionCards] = useState<WordEntry[] | null>(null);
  const [sessionSeed, setSessionSeed] = useState<WordEntry[]>([]);
  const [direction, setDirection] = useState<CardDirection>('source-to-target');
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

        const learnedIds = await getLearnedWordIds(wordsData.map((word) => word.id));
        const unlearnedWords = wordsData.filter((word) => !learnedIds.has(word.id));

        setTopic(topicData);
        setLanguagePair(pairData);
        setLanguages(languagesData);
        setWordEntries(wordsData);
        setLearnedWordIds(learnedIds);
        setSessionCards(unlearnedWords);
        setSessionSeed(unlearnedWords);
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
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <p className="text-destructive">{t.errors.loadCards}</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link
            to={`/app/pair/${pairId}/topic/${topicId}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← {t.test.backToTopic}
          </Link>

          <p className="mt-6 text-destructive">{error}</p>
        </div>
      </main>
    );
  }

  if (!topic || !languagePair || !languages || !wordEntries || !sessionCards) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <p>{t.common.loading}</p>
        </div>
      </main>
    );
  }

  if (wordEntries.length === 0) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link
            to={`/app/pair/${pairId}/topic/${topicId}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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

  const sourceLanguageName = languagePair.source_language_custom?.trim()
    || (sourceLanguage
      ? getLanguageName(sourceLanguage.code, language, sourceLanguage.native_name || sourceLanguage.name)
      : t.languagePairs.language1);

  const targetLanguageName = languagePair.target_language_custom?.trim()
    || (targetLanguage
      ? getLanguageName(targetLanguage.code, language, targetLanguage.native_name || targetLanguage.name)
      : t.languagePairs.language2);

  const permanentLearnedCount = wordEntries.filter((word) => learnedWordIds.has(word.id)).length;
  const sessionTotal = sessionSeed.length;
  const sessionRememberedCount = Math.max(0, sessionTotal - sessionCards.length);
  const sessionPercentage = sessionTotal > 0 ? Math.round((sessionRememberedCount / sessionTotal) * 100) : 0;

  function resetCardState() {
    setIsFlipped(false);
  }

  function markStillLearning() {
    const cards = sessionCards;

    if (!cards || cards.length === 0) {
      return;
    }

    if (cards.length === 1) {
      resetCardState();
      return;
    }

    setSessionCards([...cards.slice(1), cards[0]]);
    resetCardState();
  }

  function markRemembered() {
    const cards = sessionCards;

    if (!cards || cards.length === 0) {
      return;
    }

    setSessionCards(cards.slice(1));
    resetCardState();
  }

  function restartSession() {
    setSessionCards([...sessionSeed]);
    resetCardState();
  }

  function studyAllWords() {
    const words = wordEntries;

    if (!words || words.length === 0) {
      return;
    }

    setSessionSeed([...words]);
    setSessionCards([...words]);
    resetCardState();
  }

  function changeDirection(nextDirection: CardDirection) {
    setDirection(nextDirection);
    resetCardState();
  }

  function flipCard() {
    setIsFlipped((current) => !current);
  }

  if (sessionCards.length === 0 && sessionTotal === 0) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link
            to={`/app/pair/${pairId}/topic/${topicId}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← {t.common.back}: {topic.name}
          </Link>

          <section className="vocab-pop-in mt-8 rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-10">
            <p className="text-sm font-medium text-muted-foreground">
              {t.words.learned}: {permanentLearnedCount} / {wordEntries.length}
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{t.cards.allLearned}</h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              {t.cards.allLearnedDescription}
            </p>

            <div className="mx-auto mt-6 grid max-w-sm gap-3 sm:grid-cols-2">
              <Button type="button" onClick={studyAllWords} className="min-h-11">
                {t.cards.studyAllWords}
              </Button>
              <Link
                to={`/app/pair/${pairId}/topic/${topicId}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border bg-background px-4 text-sm font-medium transition-all active:scale-[0.98] hover:bg-muted"
              >
                {t.test.backToTopic}
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (sessionCards.length === 0) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link
            to={`/app/pair/${pairId}/topic/${topicId}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← {t.common.back}: {topic.name}
          </Link>

          <section className="vocab-pop-in mt-8 rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-10">
            <p className="text-sm font-medium text-muted-foreground">
              {t.cards.remembered}: {sessionTotal} / {sessionTotal}
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{t.cards.sessionComplete}</h1>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              {t.cards.sessionCompleteDescription}
            </p>

            <div className="mx-auto mt-6 grid max-w-sm gap-3 sm:grid-cols-2">
              <Button type="button" onClick={restartSession} className="min-h-11">
                {t.cards.restartSession}
              </Button>
              <Link
                to={`/app/pair/${pairId}/topic/${topicId}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border bg-background px-4 text-sm font-medium transition-all active:scale-[0.98] hover:bg-muted"
              >
                {t.test.backToTopic}
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const currentWord = sessionCards[0];
  const frontText = direction === 'source-to-target' ? currentWord.source_text : currentWord.target_text;
  const backText = direction === 'source-to-target' ? currentWord.target_text : currentWord.source_text;
  const frontLanguage = direction === 'source-to-target' ? sourceLanguageName : targetLanguageName;
  const backLanguage = direction === 'source-to-target' ? targetLanguageName : sourceLanguageName;

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <p className="hidden min-w-0 truncate text-sm font-medium text-muted-foreground sm:block">
            {topic.name}
          </p>

          <Link
            to={`/app/pair/${pairId}/topic/${topicId}`}
            className="inline-flex min-h-9 shrink-0 items-center justify-center rounded-lg border bg-background px-3 text-xs font-medium transition-all active:scale-[0.98] hover:bg-muted sm:min-h-10 sm:px-4 sm:text-sm"
          >
            <span className="mr-1.5 text-base leading-none" aria-hidden="true">
              ×
            </span>
            {t.cards.finishSession}
          </Link>
        </div>

        <section className="mt-4 rounded-2xl border bg-card p-4 sm:mt-6 sm:p-5">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">{t.cards.remembered}</p>
              <p className="mt-1 text-xl font-bold">
                {sessionRememberedCount} / {sessionTotal}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t.cards.remaining}</p>
              <p className="mt-1 text-xl font-bold">{sessionCards.length}</p>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: `${sessionPercentage}%` }}
            />
          </div>
        </section>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <Button
            type="button"
            variant={direction === 'source-to-target' ? 'default' : 'outline'}
            className="min-h-11 whitespace-normal"
            onClick={() => changeDirection('source-to-target')}
          >
            {sourceLanguageName} → {targetLanguageName}
          </Button>
          <Button
            type="button"
            variant={direction === 'target-to-source' ? 'default' : 'outline'}
            className="min-h-11 whitespace-normal"
            onClick={() => changeDirection('target-to-source')}
          >
            {targetLanguageName} → {sourceLanguageName}
          </Button>
        </div>

        <button
          key={`${currentWord.id}-${direction}`}
          type="button"
          onClick={flipCard}
          className="vocab-card-enter mt-6 flex min-h-88 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border bg-card p-6 text-center shadow-sm transition-all active:scale-[0.99] sm:p-8"
        >
          {!isFlipped ? (
            <>
              <p className="text-sm text-muted-foreground">{frontLanguage}</p>
              <p className="mt-4 wrap-break-word text-3xl font-semibold sm:text-4xl">{frontText}</p>
              <p className="mt-8 text-sm text-muted-foreground">{t.cards.reveal}</p>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">{backLanguage}</p>
              <p className="mt-4 wrap-break-word text-3xl font-semibold sm:text-4xl">{backText}</p>

              {(currentWord.meaning || currentWord.context_text || currentWord.encounter_source) && (
                <div className="mt-8 w-full space-y-5 border-t pt-6">
                  {currentWord.meaning && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{t.words.meaning}</p>
                      <p className="mt-2 wrap-break-word text-base">{currentWord.meaning}</p>
                    </div>
                  )}
                  {currentWord.context_text && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{t.vocabulary.context}</p>
                      <p className="mt-2 wrap-break-word text-base">{currentWord.context_text}</p>
                    </div>
                  )}
                  {currentWord.encounter_source && (
                    <p className="wrap-break-word text-sm text-muted-foreground">
                      {t.vocabulary.encounterSource}: {currentWord.encounter_source}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </button>

        {isFlipped && (
          <div className="vocab-pop-in mt-4 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="min-h-12 whitespace-normal"
              onClick={markStillLearning}
            >
              {t.cards.stillLearning}
            </Button>
            <Button
              type="button"
              className="min-h-12 whitespace-normal"
              onClick={markRemembered}
            >
              {t.cards.rememberedButton}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
