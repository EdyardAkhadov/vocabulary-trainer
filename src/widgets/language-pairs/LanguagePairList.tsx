import { Link } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import type { LanguagePair } from '@/entities/language-pair/api';
import type { Language } from '@/entities/language/api';
import { getLanguageName } from '@/shared/i18n/language-names';

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

  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{t.languagePairs.listTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.languagePairs.listDescription}</p>
      </div>

      {languagePairs.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="font-medium">{t.languagePairs.noPairs}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.languagePairs.noPairsDescription}
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

            const sourceName = sourceLanguage
              ? getLanguageName(sourceLanguage.code, appLanguage, sourceLanguage.name)
              : t.common.unknown;
            const targetName = targetLanguage
              ? getLanguageName(targetLanguage.code, appLanguage, targetLanguage.name)
              : t.common.unknown;

            return (
              <article key={pair.id} className="rounded-xl border bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <Link to={`/pair/${pair.id}`} className="min-w-0 flex-1">
                    <p className="font-medium hover:underline">{pair.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {sourceName} {' → '} {targetName}
                    </p>
                  </Link>

                  <div className="flex shrink-0 gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => onEdit(pair)}>
                      {t.common.edit}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
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
      )}
    </section>
  );
}
