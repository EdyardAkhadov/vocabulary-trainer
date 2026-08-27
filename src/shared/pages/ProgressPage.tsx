import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { getLearningStats, type LearningStats } from '@/entities/study-progress/stats';

export function ProgressPage() {
  const { t } = useAppLanguage();

  const [stats, setStats] = useState<LearningStats | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const result = await getLearningStats();

        setStats(result);
      } catch (err) {
        console.error('Failed to load learning stats:', err);

        setError(t.progress.loadError);
      }
    }

    void loadStats();
  }, [t]);

  return (
    <main className="bg-background py-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.progress.title}</h1>

            <p className="mt-2 text-muted-foreground">{t.progress.description}</p>
          </div>

          <Link to="/app" className="text-sm font-medium underline underline-offset-4">
            {t.common.back}
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {!stats && !error && (
          <p className="mt-8 text-sm text-muted-foreground">{t.common.loading}</p>
        )}

        {stats && (
          <>
            <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label={t.progress.wordsStudied} value={stats.studiedWords} />

              <StatCard label={t.progress.answers} value={stats.answers} />

              <StatCard label={t.progress.correct} value={stats.correct} />

              <StatCard label={t.progress.wrong} value={stats.wrong} />

              <StatCard label={t.progress.accuracy} value={`${stats.accuracy}%`} />

              <StatCard label={t.progress.languagePairs} value={stats.languagePairs} />

              <StatCard label={t.progress.topics} value={stats.topics} />

              <StatCard label={t.progress.words} value={stats.words} />
            </section>

            <section className="mt-8 rounded-2xl border bg-card p-4 shadow-sm sm:p-6">
              <h2 className="text-xl font-semibold">{t.progress.accuracy}</h2>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: `${Math.min(100, Math.max(0, stats.accuracy))}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                {stats.correct} {t.progress.correctOutOf} {stats.answers}
              </p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

type StatCardProps = {
  label: string;
  value: string | number;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
      <p className="text-sm text-muted-foreground">{label}</p>

      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}
