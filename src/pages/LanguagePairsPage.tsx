import { useEffect, useState } from 'react';

import { useAuth } from '@/app/providers/AuthProvider';
import { useAppLanguage } from '@/app/providers/LanguageProvider';
import {
  deleteLanguagePair,
  getLanguagePairs,
  type LanguagePair,
} from '@/entities/language-pair/api';
import { getLanguages, type Language } from '@/entities/language/api';
import { CreateLanguagePairForm } from '@/features/language-pair/create/CreateLanguagePairForm';
import { EditLanguagePairForm } from '@/features/language-pair/edit/EditLanguagePairForm';
import { LanguagePairList } from '@/widgets/language-pairs/LanguagePairList';

export function LanguagePairsPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { t } = useAppLanguage();

  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [languagePairs, setLanguagePairs] = useState<LanguagePair[] | null>(null);
  const [editingPair, setEditingPair] = useState<LanguagePair | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    async function loadData() {
      try {
        const [languagesData, pairsData] = await Promise.all([getLanguages(), getLanguagePairs()]);
        setLanguages(languagesData);
        setLanguagePairs(pairsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : t.errors.loadData);
      }
    }

    void loadData();
  }, [user, t.errors.loadData]);

  if (isAuthLoading) {
    return <div className="p-8">{t.common.loading}</div>;
  }

  if (!user) {
    return <div className="p-8">{t.common.notAuthenticated}</div>;
  }

  if (languages === null || languagePairs === null) {
    return <div className="p-8">{t.common.loading}</div>;
  }

  function handleLanguagePairCreated(languagePair: LanguagePair) {
    setLanguagePairs((current) => (current ? [languagePair, ...current] : [languagePair]));
  }

  function handleLanguagePairUpdated(updatedPair: LanguagePair) {
    setLanguagePairs((current) =>
      current ? current.map((pair) => (pair.id === updatedPair.id ? updatedPair : pair)) : [updatedPair],
    );
    setEditingPair(null);
  }

  async function handleLanguagePairDelete(languagePair: LanguagePair) {
    const confirmed = window.confirm(
      `${t.confirmations.deletePairTitle}\n\n${languagePair.name}\n\n${t.confirmations.deletePair}`,
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    try {
      await deleteLanguagePair(languagePair.id);
      setLanguagePairs((current) =>
        current ? current.filter((pair) => pair.id !== languagePair.id) : [],
      );

      if (editingPair?.id === languagePair.id) {
        setEditingPair(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.deletePair);
    }
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{t.languagePairs.pageTitle}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.languagePairs.pageDescription}</p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <CreateLanguagePairForm
          languages={languages}
          onCreated={handleLanguagePairCreated}
          onError={setError}
        />

        {editingPair && (
          <EditLanguagePairForm
            languagePair={editingPair}
            languages={languages}
            onUpdated={handleLanguagePairUpdated}
            onCancel={() => setEditingPair(null)}
            onError={setError}
          />
        )}

        <LanguagePairList
          languagePairs={languagePairs}
          languages={languages}
          onEdit={setEditingPair}
          onDelete={handleLanguagePairDelete}
        />
      </div>
    </main>
  );
}
