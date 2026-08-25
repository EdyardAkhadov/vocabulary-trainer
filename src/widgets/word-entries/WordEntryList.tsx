import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import type { WordEntry } from '@/entities/word-entry/api';

type WordEntryListProps = {
  wordEntries: WordEntry[];
  sourceLanguageName: string;
  targetLanguageName: string;
  onEdit: (wordEntry: WordEntry) => void;
  onDelete: (wordEntry: WordEntry) => void;
};

export function WordEntryList({
  wordEntries,
  sourceLanguageName,
  targetLanguageName,
  onEdit,
  onDelete,
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
          {wordEntries.map((wordEntry) => (
            <article key={wordEntry.id} className="rounded-xl border bg-card p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{sourceLanguageName}</p>
                  <p className="mt-1 wrap-break-word text-lg font-semibold">{wordEntry.source_text}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{targetLanguageName}</p>
                  <p className="mt-1 wrap-break-word text-lg font-semibold">{wordEntry.target_text}</p>
                </div>
              </div>

              {wordEntry.meaning && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-xs text-muted-foreground">{t.words.meaning}</p>
                  <p className="mt-1 wrap-break-word text-sm">{wordEntry.meaning}</p>
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                <Button type="button" variant="outline" className="min-h-11" onClick={() => onEdit(wordEntry)}>
                  {t.common.edit}
                </Button>
                <Button type="button" variant="destructive" className="min-h-11" onClick={() => onDelete(wordEntry)}>
                  {t.common.delete}
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
