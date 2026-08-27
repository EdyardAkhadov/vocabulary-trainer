import { useState, type FormEvent } from 'react';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { findTargetWordDuplicates, type DictionaryOccurrence } from '@/entities/dictionary/api';
import { createWordEntry, type WordEntry } from '@/entities/word-entry/api';

type CreateWordEntryFormProps = {
  pairId: string;
  topicId: string;
  sourceLanguageName: string;
  targetLanguageName: string;
  onCreated: (wordEntry: WordEntry) => void;
  onError: (message: string) => void;
  onCancel?: () => void;
};

export function CreateWordEntryForm({
  pairId,
  topicId,
  sourceLanguageName,
  targetLanguageName,
  onCreated,
  onError,
  onCancel,
}: CreateWordEntryFormProps) {
  const { t } = useAppLanguage();
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [meaning, setMeaning] = useState('');
  const [contextText, setContextText] = useState('');
  const [encounterSource, setEncounterSource] = useState('');
  const [duplicates, setDuplicates] = useState<DictionaryOccurrence[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  async function createCurrentWord(skipDuplicateCheck = false) {
    onError('');

    if (!sourceText.trim() || !targetText.trim()) {
      onError(t.validation.bothWordsRequired);
      return;
    }

    try {
      setIsCreating(true);

      if (!skipDuplicateCheck) {
        const existing = await findTargetWordDuplicates(pairId, targetText);

        if (existing.length > 0) {
          setDuplicates(existing);
          return;
        }
      }

      const wordEntry = await createWordEntry(
        topicId,
        sourceText,
        targetText,
        meaning,
        contextText,
        encounterSource,
      );
      onCreated(wordEntry);
      setSourceText('');
      setTargetText('');
      setMeaning('');
      setContextText('');
      setEncounterSource('');
      setDuplicates([]);
    } catch (err) {
      onError(err instanceof Error ? err.message : t.errors.createWord);
    } finally {
      setIsCreating(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createCurrentWord();
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
          <Input id="source-word" value={sourceText} onChange={(event) => setSourceText(event.target.value)} placeholder={t.placeholders.sourceWord} disabled={isCreating} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-word">{targetLanguageName}</Label>
          <Input id="target-word" value={targetText} onChange={(event) => { setTargetText(event.target.value); setDuplicates([]); }} placeholder={t.placeholders.targetWord} disabled={isCreating} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="word-meaning">{t.words.meaning}<span className="ml-1 text-muted-foreground">({t.common.optional})</span></Label>
          <Input id="word-meaning" value={meaning} onChange={(event) => setMeaning(event.target.value)} placeholder={t.placeholders.meaning} disabled={isCreating} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="word-context">{t.vocabulary.context}<span className="ml-1 text-muted-foreground">({t.common.optional})</span></Label>
          <textarea id="word-context" value={contextText} onChange={(event) => setContextText(event.target.value)} placeholder={t.vocabulary.contextPlaceholder} disabled={isCreating} rows={3} className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="word-encounter-source">{t.vocabulary.encounterSource}<span className="ml-1 text-muted-foreground">({t.common.optional})</span></Label>
          <Input id="word-encounter-source" value={encounterSource} onChange={(event) => setEncounterSource(event.target.value)} placeholder={t.vocabulary.encounterSourcePlaceholder} disabled={isCreating} />
        </div>

        {duplicates.length > 0 && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
            <p className="font-semibold">{t.vocabulary.duplicateTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.vocabulary.duplicateDescription}</p>
            <div className="mt-3 grid gap-2">
              {duplicates.slice(0, 3).map((duplicate) => (
                <div key={duplicate.wordEntry.id} className="rounded-lg border bg-background/70 p-3 text-sm">
                  <p className="font-medium">{duplicate.wordEntry.source_text} → {duplicate.wordEntry.target_text}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{duplicate.pair.name} · {duplicate.topic.name}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Button type="button" className="min-h-11 bg-brand text-brand-foreground hover:bg-brand/90" disabled={isCreating} onClick={() => { void createCurrentWord(true); }}>{t.vocabulary.addAnyway}</Button>
              <Button type="button" variant="outline" className="min-h-11" disabled={isCreating} onClick={() => { setTargetText(''); setDuplicates([]); }}>{t.vocabulary.changeWord}</Button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="submit" disabled={isCreating} className="min-h-11 w-full bg-brand text-brand-foreground shadow-sm hover:bg-brand/90 sm:flex-1">
            {isCreating ? t.words.adding : t.words.addButton}
          </Button>

          {onCancel && (
            <Button type="button" variant="outline" className="min-h-11 w-full sm:w-auto" onClick={onCancel} disabled={isCreating}>
              {t.common.cancel}
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
