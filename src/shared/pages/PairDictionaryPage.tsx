import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  getDictionaryDataset,
  groupDictionaryOccurrences,
  type DictionaryDataset,
} from '@/entities/dictionary/api';
import { getLanguages, type Language } from '@/entities/language/api';
import { getPairLanguageName } from '@/entities/language-pair/display';
import { getLearnedWordIds } from '@/entities/study-progress/api';
import { DictionaryWordList } from '@/widgets/dictionary/DictionaryWordList';

type StatusFilter = 'all' | 'learning' | 'learned';

export function PairDictionaryPage() {
  const { pairId } = useParams();
  const { language: appLanguage, t } = useAppLanguage();
  const [dataset, setDataset] = useState<DictionaryDataset | null>(null);
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [learnedWordIds, setLearnedWordIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pairId) {
      return;
    }

    const currentPairId = pairId;

    async function loadData() {
      try {
        const [dictionaryData, languagesData] = await Promise.all([
          getDictionaryDataset({ pairId: currentPairId }),
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
  }, [pairId, t.errors.loadData]);

  const groups = useMemo(() => {
    if (!dataset) {
      return [];
    }

    const normalizedSearch = search.trim().toLocaleLowerCase();

    return groupDictionaryOccurrences(dataset.occurrences).filter((group) => {
      const matchesSearch = !normalizedSearch || group.occurrences.some((occurrence) => {
        const word = occurrence.wordEntry;
        return [word.target_text, word.source_text, word.meaning, word.context_text, word.encounter_source, occurrence.topic.name]
          .filter(Boolean)
          .join(' ')
          .toLocaleLowerCase()
          .includes(normalizedSearch);
      });

      if (!matchesSearch) {
        return false;
      }

      const allLearned = group.occurrences.every((occurrence) => learnedWordIds.has(occurrence.wordEntry.id));
      return status === 'all' || (status === 'learned' ? allLearned : !allLearned);
    });
  }, [dataset, learnedWordIds, search, status]);

  if (!pairId) {
    return <main className="mx-auto w-full max-w-4xl px-4 py-6 text-destructive sm:px-6 sm:py-8">{t.languagePairs.notFound}</main>;
  }

  if (error && !dataset) {
    return <main className="mx-auto w-full max-w-4xl px-4 py-6 text-destructive sm:px-6 sm:py-8">{error}</main>;
  }

  if (!dataset || !languages) {
    return <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8">{t.common.loading}</main>;
  }

  const pair = dataset.pairs[0];

  if (!pair) {
    return <main className="mx-auto w-full max-w-4xl px-4 py-6 text-destructive sm:px-6 sm:py-8">{t.languagePairs.notFound}</main>;
  }

  const sourceName = getPairLanguageName(pair, 'source', languages, appLanguage, t.languagePairs.language1);
  const targetName = getPairLanguageName(pair, 'target', languages, appLanguage, t.languagePairs.language2);
  const totalUnique = groupDictionaryOccurrences(dataset.occurrences).length;

  return (
    <main className="bg-background py-6 sm:py-8">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <Link to={`/app/pair/${pairId}`} className="text-sm text-muted-foreground hover:text-foreground">← {t.common.back}: {pair.name}</Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.vocabulary.pairDictionary}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{sourceName} → {targetName}</p>
            <p className="mt-1 text-sm text-muted-foreground">{totalUnique} {t.vocabulary.uniqueWords} · {dataset.occurrences.length} {t.vocabulary.entries}</p>
          </div>
          <Link to={`/app/quick-add?pair=${pairId}`} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground hover:bg-brand/90">+ {t.vocabulary.quickAdd}</Link>
        </div>

        <section className="mt-6 rounded-xl border bg-card p-4">
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t.vocabulary.searchPlaceholder} aria-label={t.vocabulary.search} />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Button type="button" variant={status === 'all' ? 'default' : 'outline'} onClick={() => setStatus('all')}>{t.vocabulary.all}</Button>
            <Button type="button" variant={status === 'learning' ? 'default' : 'outline'} onClick={() => setStatus('learning')}>{t.vocabulary.learningOnly}</Button>
            <Button type="button" variant={status === 'learned' ? 'default' : 'outline'} onClick={() => setStatus('learned')}>{t.vocabulary.learnedOnly}</Button>
          </div>
        </section>

        <div className="mt-6">
          <DictionaryWordList groups={groups} languages={languages} learnedWordIds={learnedWordIds} />
        </div>
      </div>
    </main>
  );
}
