import { useState, type FormEvent } from 'react';

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

import { updateLanguagePair, type LanguagePair } from '@/entities/language-pair/api';
import type { Language } from '@/entities/language/api';

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
  const [sourceLanguageId, setSourceLanguageId] = useState(languagePair.source_language_id);

  const [targetLanguageId, setTargetLanguageId] = useState(languagePair.target_language_id);

  const [name, setName] = useState(languagePair.name);
  const [isUpdating, setIsUpdating] = useState(false);

  const languageItems = languages.map((language) => ({
    value: language.id,
    label: language.name,
  }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onError('');

    if (!sourceLanguageId || !targetLanguageId || !name.trim()) {
      onError('Please fill in all fields');
      return;
    }

    if (sourceLanguageId === targetLanguageId) {
      onError('Languages must be different');
      return;
    }

    try {
      setIsUpdating(true);

      const updatedPair = await updateLanguagePair(
        languagePair.id,
        sourceLanguageId,
        targetLanguageId,
        name,
      );

      onUpdated(updatedPair);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to update language pair');
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <section className="mt-4 rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Edit language pair</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="edit-source-language">Language 1</Label>

          <Select
            items={languageItems}
            value={sourceLanguageId || null}
            onValueChange={(value) => setSourceLanguageId(value ?? '')}
            disabled={isUpdating}
          >
            <SelectTrigger id="edit-source-language" className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>

            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-target-language">Language 2</Label>

          <Select
            items={languageItems}
            value={targetLanguageId || null}
            onValueChange={(value) => setTargetLanguageId(value ?? '')}
            disabled={isUpdating}
          >
            <SelectTrigger id="edit-target-language" className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>

            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-pair-name">Name</Label>

          <Input
            id="edit-pair-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isUpdating}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? 'Saving...' : 'Save changes'}
          </Button>

          <Button type="button" variant="outline" onClick={onCancel} disabled={isUpdating}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}
