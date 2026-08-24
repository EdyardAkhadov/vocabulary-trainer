import { useState, type FormEvent } from 'react';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateTopic, type Topic } from '@/entities/topic/api';

type EditTopicFormProps = {
  topic: Topic;
  onUpdated: (topic: Topic) => void;
  onCancel: () => void;
  onError: (message: string) => void;
};

export function EditTopicForm({ topic, onUpdated, onCancel, onError }: EditTopicFormProps) {
  const { t } = useAppLanguage();
  const [name, setName] = useState(topic.name);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onError('');

    if (!name.trim()) {
      onError(t.validation.topicNameRequired);
      return;
    }

    try {
      setIsUpdating(true);
      const updatedTopic = await updateTopic(topic.id, name.trim());
      onUpdated(updatedTopic);
    } catch (err) {
      onError(err instanceof Error ? err.message : t.errors.updateTopic);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <section className="mt-4 rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">{t.topics.editTitle}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="edit-topic-name">{t.topics.topicName}</Label>
          <Input
            id="edit-topic-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
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
