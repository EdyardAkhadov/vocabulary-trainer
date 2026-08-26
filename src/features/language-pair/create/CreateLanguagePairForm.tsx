import { useState, type FormEvent } from 'react';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createLanguagePair, type LanguagePair } from '@/entities/language-pair/api';
import type { Language } from '@/entities/language/api';
import { getLanguageName } from '@/shared/i18n/language-names';

type CreateLanguagePairFormProps = {
  languages: Language[];
  onCreated: (languagePair: LanguagePair) => void;
  onError: (message: string) => void;
};

export function CreateLanguagePairForm({
  languages,
  onCreated,
  onError,
}: CreateLanguagePairFormProps) {
  const { language: appLanguage, t } = useAppLanguage();
  const [sourceLanguageId, setSourceLanguageId] = useState('');
  const [targetLanguageId, setTargetLanguageId] = useState('');
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const languageItems = languages.map((language) => ({
    value: language.id,
    label: getLanguageName(language.code, appLanguage, language.name),
  }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onError('');

    if (!sourceLanguageId || !targetLanguageId || !name.trim()) {
      onError(t.validation.fillAllFields);
      return;
    }

    if (sourceLanguageId === targetLanguageId) {
      onError(t.validation.differentLanguages);
      return;
    }

    try {
      setIsCreating(true);

      const languagePair = await createLanguagePair(
        sourceLanguageId,
        targetLanguageId,
        name.trim(),
      );

      onCreated(languagePair);
      setName('');
      setSourceLanguageId('');
      setTargetLanguageId('');
    } catch (err) {
      onError(err instanceof Error ? err.message : t.errors.createPair);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <section className="rounded-xl border bg-card p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{t.languagePairs.createTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.languagePairs.createDescription}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="source-language">{t.languagePairs.language1}</Label>
          <Select
            items={languageItems}
            value={sourceLanguageId || null}
            onValueChange={(value) => setSourceLanguageId(value ?? '')}
            disabled={isCreating}
          >
            <SelectTrigger id="source-language" className="min-h-11 w-full">
              <SelectValue placeholder={t.languagePairs.selectLanguage} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  {getLanguageName(language.code, appLanguage, language.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-language">{t.languagePairs.language2}</Label>
          <Select
            items={languageItems}
            value={targetLanguageId || null}
            onValueChange={(value) => setTargetLanguageId(value ?? '')}
            disabled={isCreating}
          >
            <SelectTrigger id="target-language" className="min-h-11 w-full">
              <SelectValue placeholder={t.languagePairs.selectLanguage} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  {getLanguageName(language.code, appLanguage, language.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pair-name">{t.languagePairs.name}</Label>
          <Input
            id="pair-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t.languagePairs.namePlaceholder}
            disabled={isCreating}
          />
        </div>

        <Button type="submit" disabled={isCreating} className="min-h-11 w-full bg-brand text-brand-foreground shadow-sm hover:bg-brand/90">
          {isCreating ? t.languagePairs.creating : t.languagePairs.createButton}
        </Button>
      </form>
    </section>
  );
}
