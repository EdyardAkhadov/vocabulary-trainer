import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { getLanguagePair, type LanguagePair } from '@/entities/language-pair/api';
import { getLanguages, type Language } from '@/entities/language/api';
import { getLearnedWordIds, recordStudyResult } from '@/entities/study-progress/api';
import { getTopic, type Topic } from '@/entities/topic/api';
import { getWordEntries, type WordEntry } from '@/entities/word-entry/api';
import { getLanguageName } from '@/shared/i18n/language-names';

type TestMode =
  | 'source-to-target'
  | 'target-to-source'
  | 'meaning-to-source'
  | 'meaning-to-target';

type TestScope = 'unlearned' | 'all';
type FeedbackMode = 'immediate' | 'end';

type TestQuestion = {
  wordEntry: WordEntry;
  question: string;
  correctAnswer: string;
  options: string[];
};

type TestAnswerRecord = {
  wordEntryId: string;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temporary = result[index];
    result[index] = result[randomIndex];
    result[randomIndex] = temporary;
  }

  return result;
}

function getQuestionText(wordEntry: WordEntry, mode: TestMode): string | null {
  switch (mode) {
    case 'source-to-target':
      return wordEntry.source_text;
    case 'target-to-source':
      return wordEntry.target_text;
    case 'meaning-to-source':
    case 'meaning-to-target':
      return wordEntry.meaning;
    default:
      return null;
  }
}

function getAnswerText(wordEntry: WordEntry, mode: TestMode): string {
  switch (mode) {
    case 'source-to-target':
    case 'meaning-to-target':
      return wordEntry.target_text;
    case 'target-to-source':
    case 'meaning-to-source':
      return wordEntry.source_text;
  }
}

function buildQuestions(wordEntries: WordEntry[], mode: TestMode): TestQuestion[] {
  const eligibleEntries = wordEntries.filter((wordEntry) => {
    if (mode === 'meaning-to-source' || mode === 'meaning-to-target') {
      return Boolean(wordEntry.meaning?.trim());
    }

    return true;
  });

  const uniqueAnswers = Array.from(
    new Set(eligibleEntries.map((wordEntry) => getAnswerText(wordEntry, mode))),
  );

  if (uniqueAnswers.length < 4) {
    return [];
  }

  const questions = eligibleEntries
    .map((wordEntry): TestQuestion | null => {
      const question = getQuestionText(wordEntry, mode);

      if (!question) {
        return null;
      }

      const correctAnswer = getAnswerText(wordEntry, mode);
      const wrongAnswers = shuffle(
        uniqueAnswers.filter((answer) => answer !== correctAnswer),
      ).slice(0, 3);

      if (wrongAnswers.length < 3) {
        return null;
      }

      return {
        wordEntry,
        question,
        correctAnswer,
        options: shuffle([correctAnswer, ...wrongAnswers]),
      };
    })
    .filter((question): question is TestQuestion => question !== null);

  return shuffle(questions);
}

export function TestsPage() {
  const { pairId, topicId } = useParams();
  const { language, t } = useAppLanguage();

  const [topic, setTopic] = useState<Topic | null>(null);
  const [languagePair, setLanguagePair] = useState<LanguagePair | null>(null);
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [wordEntries, setWordEntries] = useState<WordEntry[] | null>(null);
  const [learnedWordIds, setLearnedWordIds] = useState<Set<string>>(new Set());
  const [scope, setScope] = useState<TestScope>('unlearned');
  const [mode, setMode] = useState<TestMode>('source-to-target');
  const [feedbackMode, setFeedbackMode] = useState<FeedbackMode>('immediate');
  const [questions, setQuestions] = useState<TestQuestion[] | null>(null);
  const [answers, setAnswers] = useState<TestAnswerRecord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isSavingResult, setIsSavingResult] = useState(false);
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
        setError(err instanceof Error ? err.message : t.errors.loadTest);
      }
    }

    void loadData();
  }, [pairId, topicId, t.errors.loadTest]);

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
      <main className="bg-background py-4 sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <p className="text-destructive">{t.errors.loadTest}</p>
        </div>
      </main>
    );
  }

  if (error && !topic) {
    return (
      <main className="bg-background py-4 sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link
            to={`/app/pair/${pairId}/topic/${topicId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            × {t.test.exit}
          </Link>
          <p className="mt-6 text-destructive">{error}</p>
        </div>
      </main>
    );
  }

  if (!topic || !languagePair || !languages || !wordEntries) {
    return (
      <main className="bg-background py-4 sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">{t.common.loading}</div>
      </main>
    );
  }

  const words = wordEntries;
  const unlearnedWords = words.filter((word) => !learnedWordIds.has(word.id));
  const learnedCount = words.length - unlearnedWords.length;
  const selectedWords = scope === 'all' ? words : unlearnedWords;

  const sourceLanguageName = languagePair.source_language_custom?.trim()
    || (sourceLanguage
      ? getLanguageName(sourceLanguage.code, language, sourceLanguage.native_name || sourceLanguage.name)
      : t.languagePairs.language1);

  const targetLanguageName = languagePair.target_language_custom?.trim()
    || (targetLanguage
      ? getLanguageName(targetLanguage.code, language, targetLanguage.native_name || targetLanguage.name)
      : t.languagePairs.language2);

  function startTest() {
    setError(null);

    if (scope === 'unlearned' && selectedWords.length === 0) {
      setError(t.test.noUnlearnedWords);
      return;
    }

    const generatedQuestions = buildQuestions(selectedWords, mode);

    if (generatedQuestions.length === 0) {
      setError(mode.startsWith('meaning') ? t.test.meaningNeedsFour : t.test.needsFour);
      return;
    }

    setQuestions(generatedQuestions);
    setAnswers([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
  }

  async function selectAnswer(answer: string) {
    if (selectedAnswer !== null || !questions) {
      return;
    }

    const currentQuestion = questions[currentIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setSelectedAnswer(answer);
    setAnswers((current) => [
      ...current,
      {
        wordEntryId: currentQuestion.wordEntry.id,
        question: currentQuestion.question,
        selectedAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ]);

    if (isCorrect) {
      setCorrectAnswers((current) => current + 1);
    }

    try {
      setIsSavingResult(true);
      await recordStudyResult(currentQuestion.wordEntry.id, isCorrect);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.saveProgress);
    } finally {
      setIsSavingResult(false);
    }
  }

  function nextQuestion() {
    setCurrentIndex((current) => current + 1);
    setSelectedAnswer(null);
  }

  function restartTest() {
    setQuestions(null);
    setAnswers([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswers(0);
    setError(null);
  }

  if (words.length === 0) {
    return (
      <main className="bg-background py-4 sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link
            to={`/app/pair/${pairId}/topic/${topicId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            × {t.test.exit}
          </Link>

          <div className="mt-6 rounded-xl border border-dashed p-6 text-center sm:p-8">
            <h1 className="text-xl font-semibold">{t.test.noWords}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t.test.noWordsDescription}</p>
          </div>
        </div>
      </main>
    );
  }

  if (questions === null) {
    return (
      <main className="bg-background py-4 sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              to={`/app/pair/${pairId}/topic/${topicId}`}
              className="inline-flex min-h-9 items-center rounded-lg border border-input bg-background px-3 text-xs font-medium transition-colors hover:bg-muted sm:text-sm"
            >
              × {t.test.exit}
            </Link>

            <p className="hidden truncate text-sm font-medium text-muted-foreground sm:block">
              {topic.name}
            </p>
          </div>

          <section className="mt-4 rounded-2xl border bg-card p-4 sm:mt-6 sm:p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{t.words.learnedProgress}</p>
                <p className="mt-1 text-2xl font-bold">
                  {learnedCount} / {words.length}
                </p>
              </div>

              <p className="text-sm text-muted-foreground">
                {t.cards.remaining}:{' '}
                <span className="font-semibold text-foreground">{unlearnedWords.length}</span>
              </p>
            </div>
          </section>

          {error && (
            <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          <section className="mt-4 rounded-xl border bg-card p-4 sm:p-6">
            <h2 className="text-lg font-semibold sm:text-xl">{t.test.wordScope}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.test.wordScopeDescription}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant={scope === 'unlearned' ? 'default' : 'outline'}
                className="h-auto min-h-12 whitespace-normal px-4 py-3"
                onClick={() => setScope('unlearned')}
              >
                {t.test.unlearnedOnly} ({unlearnedWords.length})
              </Button>

              <Button
                type="button"
                variant={scope === 'all' ? 'default' : 'outline'}
                className="h-auto min-h-12 whitespace-normal px-4 py-3"
                onClick={() => setScope('all')}
              >
                {t.test.allWords} ({words.length})
              </Button>
            </div>
          </section>

          <section className="mt-4 rounded-xl border bg-card p-4 sm:p-6">
            <h2 className="text-lg font-semibold sm:text-xl">{t.test.feedbackTiming}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.test.feedbackTimingDescription}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant={feedbackMode === 'immediate' ? 'default' : 'outline'}
                className="h-auto min-h-12 whitespace-normal px-4 py-3"
                onClick={() => setFeedbackMode('immediate')}
              >
                {t.test.feedbackImmediate}
              </Button>

              <Button
                type="button"
                variant={feedbackMode === 'end' ? 'default' : 'outline'}
                className="h-auto min-h-12 whitespace-normal px-4 py-3"
                onClick={() => setFeedbackMode('end')}
              >
                {t.test.feedbackAtEnd}
              </Button>
            </div>
          </section>

          <section className="mt-4 rounded-xl border bg-card p-4 sm:p-6">
            <h2 className="text-lg font-semibold sm:text-xl">{t.test.mode}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.test.modeDescription}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant={mode === 'source-to-target' ? 'default' : 'outline'}
                className="h-auto min-h-12 whitespace-normal px-4 py-3 sm:min-h-14"
                onClick={() => setMode('source-to-target')}
              >
                {sourceLanguageName} → {targetLanguageName}
              </Button>

              <Button
                type="button"
                variant={mode === 'target-to-source' ? 'default' : 'outline'}
                className="h-auto min-h-12 whitespace-normal px-4 py-3 sm:min-h-14"
                onClick={() => setMode('target-to-source')}
              >
                {targetLanguageName} → {sourceLanguageName}
              </Button>

              <Button
                type="button"
                variant={mode === 'meaning-to-source' ? 'default' : 'outline'}
                className="h-auto min-h-12 whitespace-normal px-4 py-3 sm:min-h-14"
                onClick={() => setMode('meaning-to-source')}
              >
                {t.words.meaning} → {sourceLanguageName}
              </Button>

              <Button
                type="button"
                variant={mode === 'meaning-to-target' ? 'default' : 'outline'}
                className="h-auto min-h-12 whitespace-normal px-4 py-3 sm:min-h-14"
                onClick={() => setMode('meaning-to-target')}
              >
                {t.words.meaning} → {targetLanguageName}
              </Button>
            </div>

            <Button type="button" variant="brand" className="mt-5 min-h-11 w-full" onClick={startTest}>
              {t.test.start}
            </Button>
          </section>
        </div>
      </main>
    );
  }

  if (currentIndex >= questions.length) {
    const percentage = Math.round((correctAnswers / questions.length) * 100);

    return (
      <main className="bg-background py-4 sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <div className="vocab-pop-in rounded-2xl border bg-card p-5 text-center sm:p-8">
            <p className="text-sm text-muted-foreground">{t.test.complete}</p>
            <h1 className="mt-3 text-4xl font-bold">{percentage}%</h1>
            <p className="mt-3 text-muted-foreground">
              {correctAnswers} {t.test.correctCount} / {questions.length}
            </p>

            <div className="mt-8 grid gap-3 sm:flex sm:justify-center">
              <Button type="button" onClick={restartTest}>
                {t.test.tryAgain}
              </Button>

              <Link
                to={`/app/pair/${pairId}/topic/${topicId}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                {t.test.backToTopic}
              </Link>
            </div>
          </div>

          {feedbackMode === 'end' && answers.length > 0 && (
            <section className="mt-4 rounded-2xl border bg-card p-4 sm:mt-6 sm:p-6">
              <h2 className="text-xl font-semibold">{t.test.reviewAnswers}</h2>

              <div className="mt-4 space-y-3">
                {answers.map((answer, index) => (
                  <div
                    key={`${answer.wordEntryId}-${index}`}
                    className="rounded-xl border bg-background p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="wrap-break-word font-semibold">{answer.question}</p>
                      <span
                        className={
                          answer.isCorrect
                            ? 'shrink-0 text-sm font-semibold text-green-700 dark:text-green-400'
                            : 'shrink-0 text-sm font-semibold text-destructive'
                        }
                      >
                        {answer.isCorrect ? t.test.correct : t.test.wrong}
                      </span>
                    </div>

                    <p className="mt-3 text-sm">
                      <span className="text-muted-foreground">{t.test.yourAnswer}: </span>
                      <strong>{answer.selectedAnswer}</strong>
                    </p>

                    {!answer.isCorrect && (
                      <p className="mt-1 text-sm">
                        <span className="text-muted-foreground">{t.test.correctAnswer}: </span>
                        <strong>{answer.correctAnswer}</strong>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isAnswered = selectedAnswer !== null;
  const selectedWasCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const progressPercentage = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <main className="bg-background py-4 sm:py-8">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            to={`/app/pair/${pairId}/topic/${topicId}`}
            className="inline-flex min-h-9 items-center rounded-lg border border-input bg-background px-3 text-xs font-medium transition-colors hover:bg-muted sm:text-sm"
          >
            × {t.test.exit}
          </Link>

          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            {t.test.question} {currentIndex + 1} / {questions.length}
          </p>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-foreground transition-[width] duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="hidden truncate sm:block">{topic.name}</span>
          {feedbackMode === 'immediate' && (
            <span className="ml-auto">
              {correctAnswers} {t.test.correctCount}
            </span>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <section key={currentQuestion.wordEntry.id} className="vocab-card-enter mt-4 rounded-2xl border bg-card p-4 sm:mt-6 sm:p-8">
          <p className="text-center text-sm text-muted-foreground">{t.test.chooseAnswer}</p>

          <p className="mt-5 wrap-break-word text-center text-3xl font-semibold sm:mt-6 sm:text-4xl">
            {currentQuestion.question}
          </p>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
            {currentQuestion.options.map((option) => {
              const isCorrectOption = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;

              let optionClassName = 'min-h-14 h-auto whitespace-normal px-4 py-3 text-base sm:min-h-16';

              if (isAnswered && feedbackMode === 'immediate') {
                if (isCorrectOption) {
                  optionClassName += ' border-green-600 bg-green-500/10 text-green-700 dark:text-green-400';
                } else if (isSelected) {
                  optionClassName += ' border-destructive bg-destructive/10 text-destructive';
                }
              } else if (isAnswered && feedbackMode === 'end' && isSelected) {
                optionClassName += ' border-foreground bg-muted text-foreground';
              }

              return (
                <Button
                  key={option}
                  type="button"
                  variant="outline"
                  className={optionClassName}
                  disabled={isAnswered || isSavingResult}
                  onClick={() => selectAnswer(option)}
                >
                  {option}
                </Button>
              );
            })}
          </div>

          {isAnswered && feedbackMode === 'immediate' && (
            <div className="mt-6 border-t pt-5 sm:mt-8 sm:pt-6">
              <p
                className={
                  selectedWasCorrect
                    ? 'font-semibold text-green-700 dark:text-green-400'
                    : 'font-semibold text-destructive'
                }
              >
                {selectedWasCorrect ? t.test.correct : t.test.wrong}
              </p>

              {!selectedWasCorrect && (
                <p className="mt-2 text-sm">
                  {t.test.correctAnswer}: <strong>{currentQuestion.correctAnswer}</strong>
                </p>
              )}

              {currentQuestion.wordEntry.meaning && !mode.startsWith('meaning') && (
                <p className="mt-3 text-sm text-muted-foreground">
                  {t.words.meaning}: {currentQuestion.wordEntry.meaning}
                </p>
              )}

              <Button
                type="button"
                className="mt-5 min-h-11 w-full sm:mt-6"
                disabled={isSavingResult}
                onClick={nextQuestion}
              >
                {currentIndex === questions.length - 1 ? t.test.seeResults : t.test.nextQuestion}
              </Button>
            </div>
          )}

          {isAnswered && feedbackMode === 'end' && (
            <Button
              type="button"
              className="mt-5 min-h-11 w-full"
              disabled={isSavingResult}
              onClick={nextQuestion}
            >
              {currentIndex === questions.length - 1 ? t.test.seeResults : t.test.nextQuestion}
            </Button>
          )}
        </section>
      </div>
    </main>
  );
}
