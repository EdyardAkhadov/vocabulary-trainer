import { Link } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import type { LanguagePair } from '@/entities/language-pair/api';
import { getPairLanguageName } from '@/entities/language-pair/display';
import type { Language } from '@/entities/language/api';

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
  const { language: appLanguage, t } = useAppLanguage();

  if (languagePairs.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{t.languagePairs.listTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.languagePairs.listDescription}</p>
      </div>

      <div className="grid gap-3">
        {languagePairs.map((pair) => {
          const sourceName = getPairLanguageName(
            pair,
            'source',
            languages,
            appLanguage,
            t.languagePairs.language1,
          );
          const targetName = getPairLanguageName(
            pair,
            'target',
            languages,
            appLanguage,
            t.languagePairs.language2,
          );

          return (
            <article key={pair.id} className="rounded-xl border bg-card p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <Link to={`/app/pair/${pair.id}`} className="min-w-0 flex-1">
                  <p className="wrap-break-word font-medium hover:underline">{pair.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {sourceName} {' → '} {targetName}
                  </p>
                </Link>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
                  <Button type="button" variant="outline" className="min-h-11" onClick={() => onEdit(pair)}>
                    {t.common.edit}
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    className="min-h-11"
                    onClick={() => onDelete(pair)}
                  >
                    {t.common.delete}
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
