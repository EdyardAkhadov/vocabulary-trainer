import { useEffect, useState } from 'react';

import { useAuth } from '@/app/providers/AuthProvider';
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
        setError(err instanceof Error ? err.message : 'Failed to load data');
      }
    }

    loadData();
  }, [user]);

  if (isAuthLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    return <div className="p-8">Not authenticated</div>;
  }

  if (languages === null || languagePairs === null) {
    return <div className="p-8">Loading data...</div>;
  }

  function handleLanguagePairCreated(languagePair: LanguagePair) {
    setLanguagePairs((current) => {
      if (!current) {
        return [languagePair];
      }

      return [languagePair, ...current];
    });
  }

  function handleLanguagePairUpdated(updatedPair: LanguagePair) {
    setLanguagePairs((current) => {
      if (!current) {
        return [updatedPair];
      }

      return current.map((pair) => (pair.id === updatedPair.id ? updatedPair : pair));
    });

    setEditingPair(null);
  }

  async function handleLanguagePairDelete(languagePair: LanguagePair) {
    const confirmed = window.confirm(
      `Delete "${languagePair.name}"?\n\nThis will also delete all topics, words and study progress inside this language pair.`,
    );

    if (!confirmed) {
      return;
    }

    setError(null);

    try {
      await deleteLanguagePair(languagePair.id);

      setLanguagePairs((current) => {
        if (!current) {
          return [];
        }

        return current.filter((pair) => pair.id !== languagePair.id);
      });

      if (editingPair?.id === languagePair.id) {
        setEditingPair(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete language pair');
    }
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Vocabulary Trainer</h1>

          <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
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
