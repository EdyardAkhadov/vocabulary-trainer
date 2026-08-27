import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  getDictionaryDataset,
  getTargetDictionaryKey,
  groupDictionaryOccurrences,
  type DictionaryDataset,
} from '@/entities/dictionary/api';
import { getLanguages, type Language } from '@/entities/language/api';
import { getPairLanguageName } from '@/entities/language-pair/display';
import { getLearnedWordIds } from '@/entities/study-progress/api';
import { DictionaryWordList } from '@/widgets/dictionary/DictionaryWordList';

type StatusFilter = 'all' | 'learning' | 'learned';

export function DictionaryPage() {
  const { language: appLanguage, t } = useAppLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const targetKey = searchParams.get('target');

  const [dataset, setDataset] = useState<DictionaryDataset | null>(null);
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [learnedWordIds, setLearnedWordIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [dictionaryData, languagesData] = await Promise.all([
          getDictionaryDataset(targetKey ? { targetKey } : undefined),
          getLanguages(),
        ]);
        const learnedIds = await getLearnedWordIds(
          dictionaryData.occurrences.map((occurrence) => occurrence.wordEntry.id),
        );

        setDataset(dictionaryData);
        setLanguages(languagesData);
        setLearnedWordIds(learnedIds);
      } catch (err) {
        setError(err instanceof Error ? err.message : t.errors.loadData);
      }
    }

    void loadData();
  }, [targetKey, t.errors.loadData]);

  const groupedWords = useMemo(() => {
    if (!dataset || !targetKey) {
      return [];
    }

    const normalizedSearch = search.trim().toLocaleLowerCase();

    return groupDictionaryOccurrences(dataset.occurrences).filter((group) => {
      const matchesSearch = !normalizedSearch || group.occurrences.some((occurrence) => {
        const word = occurrence.wordEntry;
        const haystack = [
          word.target_text,
          word.source_text,
          word.meaning,
          word.context_text,
          word.encounter_source,
          occurrence.pair.name,
          occurrence.topic.name,
        ]
          .filter(Boolean)
          .join(' ')
          .toLocaleLowerCase();

        return haystack.includes(normalizedSearch);
      });

      if (!matchesSearch) {
        return false;
      }

      const allLearned = group.occurrences.every((occurrence) =>
        learnedWordIds.has(occurrence.wordEntry.id),
      );

      if (status === 'learned') {
        return allLearned;
      }

      if (status === 'learning') {
        return !allLearned;
      }

      return true;
    });
  }, [dataset, learnedWordIds, search, status, targetKey]);

  if (error && !dataset) {
    return <main className="mx-auto w-full max-w-4xl px-4 py-6 text-destructive sm:px-6 sm:py-8">{error}</main>;
  }

  if (!dataset || !languages) {
    return <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">{t.common.loading}</main>;
  }

  if (!targetKey) {
    const groupedPairs = new Map<string, typeof dataset.pairs>();

    for (const pair of dataset.pairs) {
      const key = getTargetDictionaryKey(pair);
      groupedPairs.set(key, [...(groupedPairs.get(key) ?? []), pair]);
    }

    const dictionaries = [...groupedPairs.entries()].map(([key, pairs]) => {
      const pairIds = new Set(pairs.map((pair) => pair.id));
      const occurrences = dataset.occurrences.filter((occurrence) => pairIds.has(occurrence.pair.id));
      const uniqueWords = groupDictionaryOccurrences(occurrences).length;
      const firstPair = pairs[0];
      const targetName = getPairLanguageName(
        firstPair,
        'target',
        languages,
        appLanguage,
        t.languagePairs.language2,
      );

      return { key, pairs, uniqueWords, targetName };
    }).sort((left, right) => left.targetName.localeCompare(right.targetName));

    return (
      <main className="bg-background py-6 sm:py-8">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.vocabulary.dictionaries}</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t.vocabulary.dictionariesDescription}</p>
            </div>
            <Link to="/app/quick-add" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground hover:bg-brand/90">
              + {t.vocabulary.quickAdd}
            </Link>
          </div>

          {dictionaries.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed p-6 text-center sm:p-8">
              <p className="font-medium">{t.vocabulary.noDictionaries}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.vocabulary.noDictionariesDescription}</p>
            </div>
          ) : (
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {dictionaries.map((dictionary) => (
                <button
                  key={dictionary.key}
                  type="button"
                  onClick={() => setSearchParams({ target: dictionary.key })}
                  className="rounded-xl border bg-card p-5 text-left transition-colors hover:bg-muted/40"
                >
                  <p className="text-lg font-semibold">{dictionary.targetName}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {dictionary.uniqueWords} {t.vocabulary.uniqueWords} · {dictionary.pairs.length} {t.vocabulary.languagePairs}
                  </p>
                  <p className="mt-4 text-sm font-medium text-brand">{t.vocabulary.openDictionary} →</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  const firstPair = dataset.pairs[0];
  const targetName = firstPair
    ? getPairLanguageName(firstPair, 'target', languages, appLanguage, t.languagePairs.language2)
    : t.vocabulary.dictionary;
  const totalUnique = groupDictionaryOccurrences(dataset.occurrences).length;

  return (
    <main className="bg-background py-6 sm:py-8">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <button
          type="button"
          onClick={() => {
            setSearch('');
            setStatus('all');
            setSearchParams({});
          }}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {t.vocabulary.backToDictionaries}
        </button>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{targetName}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {totalUnique} {t.vocabulary.uniqueWords} · {dataset.occurrences.length} {t.vocabulary.entries} · {dataset.pairs.length} {t.vocabulary.languagePairs}
            </p>
          </div>
          <Link
            to={dataset.pairs.length === 1 ? `/app/quick-add?pair=${dataset.pairs[0].id}` : `/app/quick-add?target=${encodeURIComponent(targetKey)}`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground hover:bg-brand/90"
          >
            + {t.vocabulary.quickAdd}
          </Link>
        </div>

        <section className="mt-6 rounded-xl border bg-card p-4">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t.vocabulary.searchPlaceholder}
            aria-label={t.vocabulary.search}
          />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Button type="button" variant={status === 'all' ? 'default' : 'outline'} onClick={() => setStatus('all')}>{t.vocabulary.all}</Button>
            <Button type="button" variant={status === 'learning' ? 'default' : 'outline'} onClick={() => setStatus('learning')}>{t.vocabulary.learningOnly}</Button>
            <Button type="button" variant={status === 'learned' ? 'default' : 'outline'} onClick={() => setStatus('learned')}>{t.vocabulary.learnedOnly}</Button>
          </div>
        </section>

        <div className="mt-6">
          <DictionaryWordList groups={groupedWords} languages={languages} learnedWordIds={learnedWordIds} />
        </div>
      </div>
    </main>
  );
}
