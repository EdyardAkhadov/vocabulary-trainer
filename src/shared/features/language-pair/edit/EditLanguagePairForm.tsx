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
  updateLanguagePair,
  type LanguagePair,
  type LanguageSelection,
} from '@/entities/language-pair/api';
import type { Language } from '@/entities/language/api';
import { getLanguageName } from '@/shared/i18n/language-names';

const CUSTOM_LANGUAGE_VALUE = '__custom_language__';

type EditLanguagePairFormProps = {
  languagePair: LanguagePair;
  languages: Language[];
  onUpdated: (languagePair: LanguagePair) => void;
  onCancel: () => void;
  onError: (message: string) => void;
};

export function EditLanguagePairForm({
  languagePair,
  languages,
  onUpdated,
  onCancel,
  onError,
}: EditLanguagePairFormProps) {
  const { language: appLanguage, t } = useAppLanguage();
  const [sourceChoice, setSourceChoice] = useState(
    languagePair.source_language_custom ? CUSTOM_LANGUAGE_VALUE : languagePair.source_language_id ?? '',
  );
  const [targetChoice, setTargetChoice] = useState(
    languagePair.target_language_custom ? CUSTOM_LANGUAGE_VALUE : languagePair.target_language_id ?? '',
  );
  const [sourceCustomName, setSourceCustomName] = useState(languagePair.source_language_custom ?? '');
  const [targetCustomName, setTargetCustomName] = useState(languagePair.target_language_custom ?? '');
  const [name, setName] = useState(languagePair.name);
  const [isUpdating, setIsUpdating] = useState(false);

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
      const trimmed = customName.trim();
      return trimmed ? { languageId: null, customName: trimmed } : null;
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
      setIsUpdating(true);
      const updatedPair = await updateLanguagePair(
        languagePair.id,
        source,
        target,
        name.trim(),
      );
      onUpdated(updatedPair);
    } catch (err) {
      onError(err instanceof Error ? err.message : t.errors.updatePair);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <section className="mt-4 rounded-xl border bg-card p-4 sm:p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{t.languagePairs.editTitle}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="edit-source-language">{t.languagePairs.language1}</Label>
          <Select
            items={languageItems}
            value={sourceChoice || null}
            onValueChange={(value) => {
              setSourceChoice(value ?? '');
              if (value !== CUSTOM_LANGUAGE_VALUE) setSourceCustomName('');
            }}
            disabled={isUpdating}
          >
            <SelectTrigger id="edit-source-language" className="min-h-11 w-full">
              <SelectValue placeholder={t.languagePairs.selectLanguage} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  {getLanguageName(language.code, appLanguage, language.name)}
                </SelectItem>
              ))}
              <SelectItem value={CUSTOM_LANGUAGE_VALUE}>{t.languagePairs.otherLanguage}</SelectItem>
            </SelectContent>
          </Select>

          {sourceChoice === CUSTOM_LANGUAGE_VALUE && (
            <div className="space-y-2 pt-1">
              <Label htmlFor="edit-source-custom-language">{t.languagePairs.customLanguage}</Label>
              <Input
                id="edit-source-custom-language"
                value={sourceCustomName}
                onChange={(event) => setSourceCustomName(event.target.value)}
                placeholder={t.languagePairs.customLanguagePlaceholder}
                disabled={isUpdating}
                autoComplete="off"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-target-language">{t.languagePairs.language2}</Label>
          <Select
            items={languageItems}
            value={targetChoice || null}
            onValueChange={(value) => {
              setTargetChoice(value ?? '');
              if (value !== CUSTOM_LANGUAGE_VALUE) setTargetCustomName('');
            }}
            disabled={isUpdating}
          >
            <SelectTrigger id="edit-target-language" className="min-h-11 w-full">
              <SelectValue placeholder={t.languagePairs.selectLanguage} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  {getLanguageName(language.code, appLanguage, language.name)}
                </SelectItem>
              ))}
              <SelectItem value={CUSTOM_LANGUAGE_VALUE}>{t.languagePairs.otherLanguage}</SelectItem>
            </SelectContent>
          </Select>

          {targetChoice === CUSTOM_LANGUAGE_VALUE && (
            <div className="space-y-2 pt-1">
              <Label htmlFor="edit-target-custom-language">{t.languagePairs.customLanguage}</Label>
              <Input
                id="edit-target-custom-language"
                value={targetCustomName}
                onChange={(event) => setTargetCustomName(event.target.value)}
                placeholder={t.languagePairs.customLanguagePlaceholder}
                disabled={isUpdating}
                autoComplete="off"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-pair-name">{t.languagePairs.name}</Label>
          <Input
            id="edit-pair-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isUpdating}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isUpdating} className="min-h-11 w-full sm:w-auto">
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
