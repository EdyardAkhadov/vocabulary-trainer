import { Link } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import type { Topic } from '@/entities/topic/api';

type TopicListProps = {
  topics: Topic[];
  onEdit: (topic: Topic) => void;
  onDelete: (topic: Topic) => void;
};

export function TopicList({ topics, onEdit, onDelete }: TopicListProps) {
  const { t } = useAppLanguage();

  return (
    <section className="mt-8 sm:mt-10">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{t.topics.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t.topics.description}</p>
      </div>

      {topics.length === 0 ? (
        <div className="rounded-xl border border-dashed p-6 text-center sm:p-8">
          <p className="font-medium">{t.topics.noTopics}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t.topics.noTopicsDescription}</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {topics.map((topic) => (
            <article key={topic.id} className="rounded-xl border bg-card p-4 sm:p-5">
              <Link to={`/app/pair/${topic.language_pair_id}/topic/${topic.id}`} className="block min-w-0">
                <p className="wrap-break-word font-medium hover:underline">{topic.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.topics.openTopic}</p>
              </Link>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
                <Button type="button" variant="outline" className="min-h-11" onClick={() => onEdit(topic)}>
                  {t.common.edit}
                </Button>
                <Button type="button" variant="destructive" className="min-h-11" onClick={() => onDelete(topic)}>
                  {t.common.delete}
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
