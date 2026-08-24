import { useState, type FormEvent } from 'react';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateWordEntry, type WordEntry } from '@/entities/word-entry/api';

type EditWordEntryFormProps = {
  wordEntry: WordEntry;
  sourceLanguageName: string;
  targetLanguageName: string;
  onUpdated: (wordEntry: WordEntry) => void;
  onCancel: () => void;
  onError: (message: string) => void;
};

export function EditWordEntryForm({
  wordEntry,
  sourceLanguageName,
  targetLanguageName,
  onUpdated,
  onCancel,
  onError,
}: EditWordEntryFormProps) {
  const { t } = useAppLanguage();
  const [sourceText, setSourceText] = useState(wordEntry.source_text);
  const [targetText, setTargetText] = useState(wordEntry.target_text);
  const [meaning, setMeaning] = useState(wordEntry.meaning ?? '');
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onError('');

    if (!sourceText.trim() || !targetText.trim()) {
      onError(t.validation.bothWordsRequired);
      return;
    }

    try {
      setIsUpdating(true);
      const updatedWordEntry = await updateWordEntry(wordEntry.id, sourceText, targetText, meaning);
      onUpdated(updatedWordEntry);
    } catch (err) {
      onError(err instanceof Error ? err.message : t.errors.updateWord);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <section className="mt-4 rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{t.words.editTitle}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor={`edit-source-${wordEntry.id}`}>{sourceLanguageName}</Label>
          <Input
            id={`edit-source-${wordEntry.id}`}
            value={sourceText}
            onChange={(event) => setSourceText(event.target.value)}
            disabled={isUpdating}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`edit-target-${wordEntry.id}`}>{targetLanguageName}</Label>
          <Input
            id={`edit-target-${wordEntry.id}`}
            value={targetText}
            onChange={(event) => setTargetText(event.target.value)}
            disabled={isUpdating}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`edit-meaning-${wordEntry.id}`}>
            {t.words.meaning}
            <span className="ml-1 text-muted-foreground">({t.common.optional})</span>
          </Label>
          <Input
            id={`edit-meaning-${wordEntry.id}`}
            value={meaning}
            onChange={(event) => setMeaning(event.target.value)}
            placeholder={t.placeholders.meaning}
            disabled={isUpdating}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? t.common.saving : t.common.saveChanges}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isUpdating}>
            {t.common.cancel}
          </Button>
        </div>
      </form>
    </section>
  );
}
