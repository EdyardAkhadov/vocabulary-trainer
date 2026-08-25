import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'

import { useAppLanguage } from '@/app/providers/LanguageProvider'
import { Button } from '@/components/ui/button'
import { getLanguagePair, type LanguagePair } from '@/entities/language-pair/api'
import { getLanguages, type Language } from '@/entities/language/api'
import { recordStudyResult } from '@/entities/study-progress/api'
import { getTopic, type Topic } from '@/entities/topic/api'
import { getWordEntries, type WordEntry } from '@/entities/word-entry/api'
import { getLanguageName } from '@/shared/i18n/language-names'

type TestMode =
  | 'source-to-target'
  | 'target-to-source'
  | 'meaning-to-source'
  | 'meaning-to-target'

type TestQuestion = {
  wordEntry: WordEntry
  question: string
  correctAnswer: string
  options: string[]
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const temporary = result[index]
    result[index] = result[randomIndex]
    result[randomIndex] = temporary
  }

  return result
}

function getQuestionText(wordEntry: WordEntry, mode: TestMode): string | null {
  switch (mode) {
    case 'source-to-target':
      return wordEntry.source_text
    case 'target-to-source':
      return wordEntry.target_text
    case 'meaning-to-source':
    case 'meaning-to-target':
      return wordEntry.meaning
    default:
      return null
  }
}

function getAnswerText(wordEntry: WordEntry, mode: TestMode): string {
  switch (mode) {
    case 'source-to-target':
    case 'meaning-to-target':
      return wordEntry.target_text
    case 'target-to-source':
    case 'meaning-to-source':
      return wordEntry.source_text
  }
}

function buildQuestions(wordEntries: WordEntry[], mode: TestMode): TestQuestion[] {
  const eligibleEntries = wordEntries.filter((wordEntry) => {
    if (mode === 'meaning-to-source' || mode === 'meaning-to-target') {
      return Boolean(wordEntry.meaning?.trim())
    }

    return true
  })

  const uniqueAnswers = Array.from(
    new Set(eligibleEntries.map((wordEntry) => getAnswerText(wordEntry, mode))),
  )

  if (uniqueAnswers.length < 4) {
    return []
  }

  const questions = eligibleEntries
    .map((wordEntry): TestQuestion | null => {
      const question = getQuestionText(wordEntry, mode)

      if (!question) {
        return null
      }

      const correctAnswer = getAnswerText(wordEntry, mode)
      const wrongAnswers = shuffle(
        uniqueAnswers.filter((answer) => answer !== correctAnswer),
      ).slice(0, 3)

      if (wrongAnswers.length < 3) {
        return null
      }

      return {
        wordEntry,
        question,
        correctAnswer,
        options: shuffle([correctAnswer, ...wrongAnswers]),
      }
    })
    .filter((question): question is TestQuestion => question !== null)

  return shuffle(questions)
}

export function TestsPage() {
  const { pairId, topicId } = useParams()
  const { language, t } = useAppLanguage()

  const [topic, setTopic] = useState<Topic | null>(null)
  const [languagePair, setLanguagePair] = useState<LanguagePair | null>(null)
  const [languages, setLanguages] = useState<Language[] | null>(null)
  const [wordEntries, setWordEntries] = useState<WordEntry[] | null>(null)
  const [mode, setMode] = useState<TestMode>('source-to-target')
  const [questions, setQuestions] = useState<TestQuestion[] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isSavingResult, setIsSavingResult] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!pairId || !topicId) {
      return
    }

    const currentPairId = pairId
    const currentTopicId = topicId

    async function loadData() {
      try {
        const [topicData, pairData, languagesData, wordsData] = await Promise.all([
          getTopic(currentTopicId),
          getLanguagePair(currentPairId),
          getLanguages(),
          getWordEntries(currentTopicId),
        ])

        setTopic(topicData)
        setLanguagePair(pairData)
        setLanguages(languagesData)
        setWordEntries(wordsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : t.errors.loadTest)
      }
    }

    void loadData()
  }, [pairId, topicId, t.errors.loadTest])

  const sourceLanguage = useMemo(() => {
    if (!languagePair || !languages) {
      return null
    }

    return languages.find((item) => item.id === languagePair.source_language_id) ?? null
  }, [languagePair, languages])

  const targetLanguage = useMemo(() => {
    if (!languagePair || !languages) {
      return null
    }

    return languages.find((item) => item.id === languagePair.target_language_id) ?? null
  }, [languagePair, languages])

  if (!pairId || !topicId) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <p className="text-destructive">{t.errors.loadTest}</p>
        </div>
      </main>
    )
  }

  if (error && !topic) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link
            to={`/pair/${pairId}/topic/${topicId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t.test.backToTopic}
          </Link>
          <p className="mt-6 text-destructive">{error}</p>
        </div>
      </main>
    )
  }

  if (!topic || !languagePair || !languages || !wordEntries) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">{t.common.loading}</div>
      </main>
    )
  }

  const words = wordEntries

  const sourceLanguageName = sourceLanguage
    ? getLanguageName(sourceLanguage.code, language, sourceLanguage.native_name || sourceLanguage.name)
    : t.languagePairs.language1

  const targetLanguageName = targetLanguage
    ? getLanguageName(targetLanguage.code, language, targetLanguage.native_name || targetLanguage.name)
    : t.languagePairs.language2

  function startTest() {
    setError(null)

    const generatedQuestions = buildQuestions(words, mode)

    if (generatedQuestions.length === 0) {
      setError(mode.startsWith('meaning') ? t.test.meaningNeedsFour : t.test.needsFour)
      return
    }

    setQuestions(generatedQuestions)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setCorrectAnswers(0)
  }

  async function selectAnswer(answer: string) {
    if (selectedAnswer !== null || !questions) {
      return
    }

    const currentQuestion = questions[currentIndex]
    const isCorrect = answer === currentQuestion.correctAnswer

    setSelectedAnswer(answer)

    if (isCorrect) {
      setCorrectAnswers((current) => current + 1)
    }

    try {
      setIsSavingResult(true)
      await recordStudyResult(currentQuestion.wordEntry.id, isCorrect)
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.saveProgress)
    } finally {
      setIsSavingResult(false)
    }
  }

  function nextQuestion() {
    setCurrentIndex((current) => current + 1)
    setSelectedAnswer(null)
  }

  function restartTest() {
    setQuestions(null)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setCorrectAnswers(0)
    setError(null)
  }

  if (words.length === 0) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link
            to={`/pair/${pairId}/topic/${topicId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t.common.back}: {topic.name}
          </Link>

          <div className="mt-8 rounded-xl border border-dashed p-6 text-center sm:p-8">
            <h1 className="text-xl font-semibold">{t.test.noWords}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t.test.noWordsDescription}</p>
          </div>
        </div>
      </main>
    )
  }

  if (questions === null) {
    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <Link
            to={`/pair/${pairId}/topic/${topicId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← {t.common.back}: {topic.name}
          </Link>

          <div className="mt-6">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.test.title}</h1>
            <p className="mt-2 text-muted-foreground">{topic.name}</p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          <section className="mt-8 rounded-xl border bg-card p-4 sm:p-6">
            <h2 className="text-xl font-semibold">{t.test.mode}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{t.test.modeDescription}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant={mode === 'source-to-target' ? 'default' : 'outline'}
                className="h-auto min-h-14 whitespace-normal px-4 py-3 sm:min-h-16"
                onClick={() => setMode('source-to-target')}
              >
                {sourceLanguageName} → {targetLanguageName}
              </Button>

              <Button
                type="button"
                variant={mode === 'target-to-source' ? 'default' : 'outline'}
                className="h-auto min-h-14 whitespace-normal px-4 py-3 sm:min-h-16"
                onClick={() => setMode('target-to-source')}
              >
                {targetLanguageName} → {sourceLanguageName}
              </Button>

              <Button
                type="button"
                variant={mode === 'meaning-to-source' ? 'default' : 'outline'}
                className="h-auto min-h-14 whitespace-normal px-4 py-3 sm:min-h-16"
                onClick={() => setMode('meaning-to-source')}
              >
                {t.words.meaning} → {sourceLanguageName}
              </Button>

              <Button
                type="button"
                variant={mode === 'meaning-to-target' ? 'default' : 'outline'}
                className="h-auto min-h-14 whitespace-normal px-4 py-3 sm:min-h-16"
                onClick={() => setMode('meaning-to-target')}
              >
                {t.words.meaning} → {targetLanguageName}
              </Button>
            </div>

            <Button type="button" className="mt-6 min-h-11 w-full" onClick={startTest}>
              {t.test.start}
            </Button>
          </section>
        </div>
      </main>
    )
  }

  if (currentIndex >= questions.length) {
    const percentage = Math.round((correctAnswers / questions.length) * 100)

    return (
      <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border bg-card p-5 text-center sm:p-8">
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
                to={`/pair/${pairId}/topic/${topicId}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                {t.test.backToTopic}
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const currentQuestion = questions[currentIndex]
  const isAnswered = selectedAnswer !== null
  const selectedWasCorrect = selectedAnswer === currentQuestion.correctAnswer

  return (
    <main className="min-h-[calc(100vh-3.5rem)] bg-background py-5 sm:min-h-[calc(100vh-4rem)] sm:py-8">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <Link
          to={`/pair/${pairId}/topic/${topicId}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {t.test.exit}
        </Link>

        <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{topic.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.test.question} {currentIndex + 1} {t.common.of} {questions.length}
            </p>
          </div>

          <p className="text-sm text-muted-foreground">
            {correctAnswers} {t.test.correctCount}
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <section className="mt-8 rounded-2xl border bg-card p-4 sm:p-8">
          <p className="text-center text-sm text-muted-foreground">{t.test.chooseAnswer}</p>

          <p className="mt-6 wrap-break-word text-center text-3xl font-semibold sm:text-4xl">
            {currentQuestion.question}
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {currentQuestion.options.map((option) => {
              const isCorrectOption = option === currentQuestion.correctAnswer
              const isSelected = option === selectedAnswer

              let optionClassName = 'min-h-14 h-auto whitespace-normal px-4 py-3 text-base sm:min-h-16'

              if (isAnswered) {
                if (isCorrectOption) {
                  optionClassName += ' border-green-600 bg-green-500/10 text-green-700 dark:text-green-400'
                } else if (isSelected) {
                  optionClassName += ' border-destructive bg-destructive/10 text-destructive'
                }
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
              )
            })}
          </div>

          {isAnswered && (
            <div className="mt-8 border-t pt-6">
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
                className="mt-6 min-h-11 w-full"
                disabled={isSavingResult}
                onClick={nextQuestion}
              >
                {currentIndex === questions.length - 1
                  ? t.test.seeResults
                  : t.test.nextQuestion}
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
