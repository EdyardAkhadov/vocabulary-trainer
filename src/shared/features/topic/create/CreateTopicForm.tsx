import { useState, type FormEvent } from 'react';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createTopic, type Topic } from '@/entities/topic/api';

type CreateTopicFormProps = {
  languagePairId: string;
  onCreated: (topic: Topic) => void;
  onError: (message: string) => void;
};

export function CreateTopicForm({ languagePairId, onCreated, onError }: CreateTopicFormProps) {
  const { t } = useAppLanguage();
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onError('');

    if (!name.trim()) {
      onError(t.validation.topicNameRequired);
      return;
    }

    try {
      setIsCreating(true);
      const topic = await createTopic(languagePairId, name.trim());
      onCreated(topic);
      setName('');
    } catch (err) {
      onError(err instanceof Error ? err.message : t.errors.createTopic);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <section className="rounded-xl border bg-card p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{t.topics.createTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.topics.createDescription}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="topic-name">{t.topics.topicName}</Label>
          <Input
            id="topic-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t.topics.placeholder}
            disabled={isCreating}
          />
        </div>

        <Button type="submit" disabled={isCreating} className="min-h-11 w-full bg-brand text-brand-foreground shadow-sm hover:bg-brand/90 sm:w-auto">
          {isCreating ? t.topics.creating : t.topics.createButton}
        </Button>
      </form>
    </section>
  );
}
