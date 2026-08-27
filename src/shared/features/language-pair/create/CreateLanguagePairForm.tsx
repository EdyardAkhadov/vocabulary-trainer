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
import {
  createLanguagePair,
  type LanguagePair,
  type LanguageSelection,
} from '@/entities/language-pair/api';
import type { Language } from '@/entities/language/api';
import { getLanguageName } from '@/shared/i18n/language-names';

const CUSTOM_LANGUAGE_VALUE = '__custom_language__';

type CreateLanguagePairFormProps = {
  languages: Language[];
  onCreated: (languagePair: LanguagePair) => void;
  onError: (message: string) => void;
  onCancel?: () => void;
};

export function CreateLanguagePairForm({
  languages,
  onCreated,
  onError,
  onCancel,
}: CreateLanguagePairFormProps) {
  const { language: appLanguage, t } = useAppLanguage();
  const [sourceChoice, setSourceChoice] = useState('');
  const [targetChoice, setTargetChoice] = useState('');
  const [sourceCustomName, setSourceCustomName] = useState('');
  const [targetCustomName, setTargetCustomName] = useState('');
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const languageItems = [
    ...languages.map((language) => ({
      value: language.id,
      label: getLanguageName(language.code, appLanguage, language.name),
    })),
    { value: CUSTOM_LANGUAGE_VALUE, label: t.languagePairs.otherLanguage },
  ];

  function toSelection(choice: string, customName: string): LanguageSelection | null {
    if (!choice) {
      return null;
    }

    if (choice === CUSTOM_LANGUAGE_VALUE) {
      const trimmedCustomName = customName.trim();

      if (!trimmedCustomName) {
        return null;
      }

      return { languageId: null, customName: trimmedCustomName };
    }

    return { languageId: choice, customName: null };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onError('');

    const source = toSelection(sourceChoice, sourceCustomName);
    const target = toSelection(targetChoice, targetCustomName);

    if (!source || !target || !name.trim()) {
      onError(t.validation.fillAllFields);
      return;
    }

    const samePredefined =
      source.languageId && target.languageId && source.languageId === target.languageId;
    const sameCustom =
      source.customName &&
      target.customName &&
      source.customName.localeCompare(target.customName, undefined, { sensitivity: 'accent' }) === 0;

    if (samePredefined || sameCustom) {
      onError(t.validation.differentLanguages);
      return;
    }

    try {
      setIsCreating(true);

      const languagePair = await createLanguagePair(source, target, name.trim());

      onCreated(languagePair);
      setName('');
      setSourceChoice('');
      setTargetChoice('');
      setSourceCustomName('');
      setTargetCustomName('');
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
            value={sourceChoice || null}
            onValueChange={(value) => {
              setSourceChoice(value ?? '');
              if (value !== CUSTOM_LANGUAGE_VALUE) {
                setSourceCustomName('');
              }
            }}
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
              <SelectItem value={CUSTOM_LANGUAGE_VALUE}>
                {t.languagePairs.otherLanguage}
              </SelectItem>
            </SelectContent>
          </Select>

          {sourceChoice === CUSTOM_LANGUAGE_VALUE && (
            <div className="space-y-2 pt-1">
              <Label htmlFor="source-custom-language">{t.languagePairs.customLanguage}</Label>
              <Input
                id="source-custom-language"
                value={sourceCustomName}
                onChange={(event) => setSourceCustomName(event.target.value)}
                placeholder={t.languagePairs.customLanguagePlaceholder}
                disabled={isCreating}
                autoComplete="off"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-language">{t.languagePairs.language2}</Label>
          <Select
            items={languageItems}
            value={targetChoice || null}
            onValueChange={(value) => {
              setTargetChoice(value ?? '');
              if (value !== CUSTOM_LANGUAGE_VALUE) {
                setTargetCustomName('');
              }
            }}
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
              <SelectItem value={CUSTOM_LANGUAGE_VALUE}>
                {t.languagePairs.otherLanguage}
              </SelectItem>
            </SelectContent>
          </Select>

          {targetChoice === CUSTOM_LANGUAGE_VALUE && (
            <div className="space-y-2 pt-1">
              <Label htmlFor="target-custom-language">{t.languagePairs.customLanguage}</Label>
              <Input
                id="target-custom-language"
                value={targetCustomName}
                onChange={(event) => setTargetCustomName(event.target.value)}
                placeholder={t.languagePairs.customLanguagePlaceholder}
                disabled={isCreating}
                autoComplete="off"
              />
            </div>
          )}
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

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="submit"
            disabled={isCreating}
            className="min-h-11 w-full bg-brand text-brand-foreground shadow-sm hover:bg-brand/90 sm:flex-1"
          >
            {isCreating ? t.languagePairs.creating : t.languagePairs.createButton}
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="outline"
              className="min-h-11 w-full sm:w-auto"
              onClick={onCancel}
              disabled={isCreating}
            >
              {t.languagePairs.cancelAddPair}
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
