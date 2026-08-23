import { useState, type FormEvent } from 'react';

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
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onError('');

    if (!name.trim()) {
      onError('Please enter a topic name');
      return;
    }

    try {
      setIsCreating(true);

      const topic = await createTopic(languagePairId, name);

      onCreated(topic);
      setName('');
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to create topic');
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Create topic</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Organize your words into topics, lessons or any other groups.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="topic-name">Topic name</Label>

          <Input
            id="topic-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Lesson 1"
            disabled={isCreating}
          />
        </div>

        <Button type="submit" disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create topic'}
        </Button>
      </form>
    </section>
  );
}
