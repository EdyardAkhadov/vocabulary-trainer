import { useState, type FormEvent } from 'react';

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
  const [name, setName] = useState(topic.name);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onError('');

    if (!name.trim()) {
      onError('Please enter a topic name');
      return;
    }

    try {
      setIsUpdating(true);

      const updatedTopic = await updateTopic(topic.id, name);

      onUpdated(updatedTopic);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to update topic');
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <section className="mt-4 rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Edit topic</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="edit-topic-name">Topic name</Label>

          <Input
            id="edit-topic-name"
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
