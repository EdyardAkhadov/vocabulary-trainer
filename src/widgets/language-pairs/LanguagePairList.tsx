import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

import type { Language } from '@/entities/language/api';
import type { LanguagePair } from '@/entities/language-pair/api';

type LanguagePairListProps = {
  languagePairs: LanguagePair[];
  languages: Language[];
  onEdit: (languagePair: LanguagePair) => void;
  onDelete: (languagePair: LanguagePair) => void;
};

export function LanguagePairList({
  languagePairs,
  languages,
  onEdit,
  onDelete,
}: LanguagePairListProps) {
  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">My language pairs</h2>

        <p className="mt-1 text-sm text-muted-foreground">Your vocabulary collections.</p>
      </div>

      {languagePairs.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="font-medium">No language pairs yet.</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Create your first language pair above.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {languagePairs.map((pair) => {
            const sourceLanguage = languages.find(
              (language) => language.id === pair.source_language_id,
            );

            const targetLanguage = languages.find(
              (language) => language.id === pair.target_language_id,
            );

            return (
              <article key={pair.id} className="rounded-xl border bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <Link to={`/pair/${pair.id}`} className="min-w-0 flex-1">
                    <p className="font-medium hover:underline">{pair.name}</p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {sourceLanguage?.name ?? 'Unknown'}
                      {' → '}
                      {targetLanguage?.name ?? 'Unknown'}
                    </p>
                  </Link>

                  <div className="flex shrink-0 gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => onEdit(pair)}>
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(pair)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
