import { useState, type FormEvent } from 'react';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createWordEntry, type WordEntry } from '@/entities/word-entry/api';

type CreateWordEntryFormProps = {
  topicId: string;
  sourceLanguageName: string;
  targetLanguageName: string;
  onCreated: (wordEntry: WordEntry) => void;
  onError: (message: string) => void;
};

export function CreateWordEntryForm({
  topicId,
  sourceLanguageName,
  targetLanguageName,
  onCreated,
  onError,
}: CreateWordEntryFormProps) {
  const { t } = useAppLanguage();
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [meaning, setMeaning] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onError('');

    if (!sourceText.trim() || !targetText.trim()) {
      onError(t.validation.bothWordsRequired);
      return;
    }

    try {
      setIsCreating(true);
      const wordEntry = await createWordEntry(topicId, sourceText, targetText, meaning);
      onCreated(wordEntry);
      setSourceText('');
      setTargetText('');
      setMeaning('');
    } catch (err) {
      onError(err instanceof Error ? err.message : t.errors.createWord);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <section className="rounded-xl border bg-card p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{t.words.addTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.words.addDescription}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="source-word">{sourceLanguageName}</Label>
          <Input
            id="source-word"
            value={sourceText}
            onChange={(event) => setSourceText(event.target.value)}
            placeholder={t.placeholders.sourceWord}
            disabled={isCreating}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-word">{targetLanguageName}</Label>
          <Input
            id="target-word"
            value={targetText}
            onChange={(event) => setTargetText(event.target.value)}
            placeholder={t.placeholders.targetWord}
            disabled={isCreating}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="word-meaning">
            {t.words.meaning}
            <span className="ml-1 text-muted-foreground">({t.common.optional})</span>
          </Label>
          <Input
            id="word-meaning"
            value={meaning}
            onChange={(event) => setMeaning(event.target.value)}
            placeholder={t.placeholders.meaning}
            disabled={isCreating}
          />
        </div>

        <Button type="submit" disabled={isCreating} className="min-h-11 w-full bg-brand text-brand-foreground shadow-sm hover:bg-brand/90 sm:w-auto">
          {isCreating ? t.words.adding : t.words.addButton}
        </Button>
      </form>
    </section>
  );
}
