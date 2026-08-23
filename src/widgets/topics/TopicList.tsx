import { Link } from 'react-router';

import { Button } from '@/components/ui/button';

import type { Topic } from '@/entities/topic/api';

type TopicListProps = {
  topics: Topic[];
  onEdit: (topic: Topic) => void;
  onDelete: (topic: Topic) => void;
};

export function TopicList({ topics, onEdit, onDelete }: TopicListProps) {
  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Topics</h2>

        <p className="mt-1 text-sm text-muted-foreground">Your vocabulary groups.</p>
      </div>

      {topics.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="font-medium">No topics yet.</p>

          <p className="mt-1 text-sm text-muted-foreground">Create your first topic above.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {topics.map((topic) => (
            <article key={topic.id} className="rounded-xl border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <Link
                  to={`/pair/${topic.language_pair_id}/topic/${topic.id}`}
                  className="min-w-0 flex-1"
                >
                  <p className="font-medium hover:underline">{topic.name}</p>

                  <p className="mt-1 text-sm text-muted-foreground">Open topic</p>
                </Link>

                <div className="flex shrink-0 gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => onEdit(topic)}>
                    Edit
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(topic)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
