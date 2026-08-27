import { Link } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import type { DictionaryGroup } from '@/entities/dictionary/api';
import type { Language } from '@/entities/language/api';
import { getPairLanguageName } from '@/entities/language-pair/display';

type DictionaryWordListProps = {
  groups: DictionaryGroup[];
  languages: Language[];
  learnedWordIds: Set<string>;
};

export function DictionaryWordList({ groups, languages, learnedWordIds }: DictionaryWordListProps) {
  const { language: appLanguage, t } = useAppLanguage();

  if (groups.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-6 text-center sm:p-8">
        <p className="font-medium">{t.vocabulary.noResults}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t.vocabulary.noResultsDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {groups.map((group) => {
        const learnedCount = group.occurrences.filter((occurrence) =>
          learnedWordIds.has(occurrence.wordEntry.id),
        ).length;
        const allLearned = learnedCount === group.occurrences.length;

        return (
          <article key={group.key} className="rounded-xl border bg-card p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="wrap-break-word text-xl font-semibold">{group.targetText}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {group.occurrences.length} {t.vocabulary.entries}
                </p>
              </div>

              <span className={allLearned
                ? 'inline-flex min-h-7 items-center rounded-full border border-green-600/30 bg-green-500/10 px-2.5 text-xs font-medium text-green-700 dark:text-green-400'
                : 'inline-flex min-h-7 items-center rounded-full border bg-muted/40 px-2.5 text-xs font-medium text-muted-foreground'}
              >
                {allLearned ? `✓ ${t.words.learned}` : t.words.learning}
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {group.occurrences.map((occurrence) => {
                const sourceName = getPairLanguageName(
                  occurrence.pair,
                  'source',
                  languages,
                  appLanguage,
                  t.languagePairs.language1,
                );

                return (
                  <div key={occurrence.wordEntry.id} className="rounded-lg border bg-background/60 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="min-w-0 wrap-break-word font-medium">
                        <span className="text-xs font-normal text-muted-foreground">{sourceName}: </span>
                        {occurrence.wordEntry.source_text}
                      </p>
                      {learnedWordIds.has(occurrence.wordEntry.id) && (
                        <span className="text-xs font-medium text-green-700 dark:text-green-400">✓ {t.words.learned}</span>
                      )}
                    </div>

                    {occurrence.wordEntry.meaning && (
                      <p className="mt-2 wrap-break-word text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{t.words.meaning}: </span>
                        {occurrence.wordEntry.meaning}
                      </p>
                    )}

                    {occurrence.wordEntry.context_text && (
                      <p className="mt-2 wrap-break-word text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{t.vocabulary.context}: </span>
                        {occurrence.wordEntry.context_text}
                      </p>
                    )}

                    {occurrence.wordEntry.encounter_source && (
                      <p className="mt-2 wrap-break-word text-xs text-muted-foreground">
                        {t.vocabulary.encounterSource}: {occurrence.wordEntry.encounter_source}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <Link to={`/app/pair/${occurrence.pair.id}`} className="rounded-full border px-2.5 py-1 hover:text-foreground">
                        {occurrence.pair.name}
                      </Link>
                      <Link to={`/app/pair/${occurrence.pair.id}/topic/${occurrence.topic.id}`} className="rounded-full border px-2.5 py-1 hover:text-foreground">
                        {occurrence.topic.name}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        );
      })}
    </div>
  );
}
