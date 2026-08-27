import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import type { WordEntry } from '@/entities/word-entry/api';

type WordEntryListProps = {
  wordEntries: WordEntry[];
  learnedWordIds: Set<string>;
  updatingLearnedWordId: string | null;
  sourceLanguageName: string;
  targetLanguageName: string;
  onEdit: (wordEntry: WordEntry) => void;
  onDelete: (wordEntry: WordEntry) => void;
  onLearnedChange: (wordEntry: WordEntry, isLearned: boolean) => void;
};

export function WordEntryList({
  wordEntries,
  learnedWordIds,
  updatingLearnedWordId,
  sourceLanguageName,
  targetLanguageName,
  onEdit,
  onDelete,
  onLearnedChange,
}: WordEntryListProps) {
  const { t } = useAppLanguage();

  return (
    <section className="mt-8 sm:mt-10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{t.words.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.words.title}: {wordEntries.length}
        </p>
      </div>

      {wordEntries.length === 0 ? (
        <div className="rounded-xl border border-dashed p-6 text-center sm:p-8">
          <p className="font-medium">{t.words.noWords}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t.words.noWordsDescription}</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {wordEntries.map((wordEntry) => {
            const isLearned = learnedWordIds.has(wordEntry.id);
            const isUpdatingLearned = updatingLearnedWordId === wordEntry.id;

            return (
              <article
                key={wordEntry.id}
                className={
                  isLearned
                    ? 'rounded-xl border border-green-600/35 bg-green-500/5 p-4 sm:p-5'
                    : 'rounded-xl border bg-card p-4 sm:p-5'
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={
                      isLearned
                        ? 'inline-flex min-h-7 items-center rounded-full border border-green-600/30 bg-green-500/10 px-2.5 text-xs font-medium text-green-700 dark:text-green-400'
                        : 'inline-flex min-h-7 items-center rounded-full border bg-muted/40 px-2.5 text-xs font-medium text-muted-foreground'
                    }
                  >
                    {isLearned ? `✓ ${t.words.learned}` : t.words.learning}
                  </span>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{sourceLanguageName}</p>
                    <p className="mt-1 wrap-break-word text-lg font-semibold">{wordEntry.source_text}</p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{targetLanguageName}</p>
                    <p className="mt-1 wrap-break-word text-lg font-semibold">{wordEntry.target_text}</p>
                  </div>
                </div>

                {(wordEntry.meaning || wordEntry.context_text || wordEntry.encounter_source) && (
                  <div className="mt-4 space-y-3 border-t pt-4">
                    {wordEntry.meaning && (
                      <div>
                        <p className="text-xs text-muted-foreground">{t.words.meaning}</p>
                        <p className="mt-1 wrap-break-word text-sm">{wordEntry.meaning}</p>
                      </div>
                    )}
                    {wordEntry.context_text && (
                      <div>
                        <p className="text-xs text-muted-foreground">{t.vocabulary.context}</p>
                        <p className="mt-1 wrap-break-word text-sm">{wordEntry.context_text}</p>
                      </div>
                    )}
                    {wordEntry.encounter_source && (
                      <div>
                        <p className="text-xs text-muted-foreground">{t.vocabulary.encounterSource}</p>
                        <p className="mt-1 wrap-break-word text-sm">{wordEntry.encounter_source}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <Button
                    type="button"
                    variant={isLearned ? 'secondary' : 'outline'}
                    className="col-span-2 min-h-11 sm:col-span-1"
                    disabled={isUpdatingLearned}
                    onClick={() => onLearnedChange(wordEntry, !isLearned)}
                  >
                    {isUpdatingLearned
                      ? t.common.saving
                      : isLearned
                        ? t.words.markLearning
                        : t.words.markLearned}
                  </Button>

                  <Button type="button" variant="outline" className="min-h-11" onClick={() => onEdit(wordEntry)}>
                    {t.common.edit}
                  </Button>

                  <Button type="button" variant="destructive" className="min-h-11" onClick={() => onDelete(wordEntry)}>
                    {t.common.delete}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
