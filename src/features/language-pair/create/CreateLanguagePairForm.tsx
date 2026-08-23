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

import { createLanguagePair, type LanguagePair } from '@/entities/language-pair/api';
import type { Language } from '@/entities/language/api';

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
  const [sourceLanguageId, setSourceLanguageId] = useState('');
  const [targetLanguageId, setTargetLanguageId] = useState('');
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

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
      onError(err instanceof Error ? err.message : 'Failed to create language pair');
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Create language pair</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Choose the two languages you want to practice.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="source-language">Language 1</Label>

          <Select
            items={languageItems}
            value={sourceLanguageId || null}
            onValueChange={(value) => setSourceLanguageId(value ?? '')}
            disabled={isCreating}
          >
            <SelectTrigger id="source-language" className="w-full">
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
          <Label htmlFor="target-language">Language 2</Label>

          <Select
            items={languageItems}
            value={targetLanguageId || null}
            onValueChange={(value) => setTargetLanguageId(value ?? '')}
            disabled={isCreating}
          >
            <SelectTrigger id="target-language" className="w-full">
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
          <Label htmlFor="pair-name">Name</Label>

          <Input
            id="pair-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="English vocabulary"
            disabled={isCreating}
          />
        </div>

        <Button type="submit" disabled={isCreating} className="w-full">
          {isCreating ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </section>
  );
}
