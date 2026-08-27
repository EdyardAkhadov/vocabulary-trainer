import { useEffect, useState } from 'react';

import { useAuth } from '@/app/providers/AuthProvider';
import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
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
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
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
    return <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">{t.common.loading}</div>;
  }

  if (!user) {
    return <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">{t.common.notAuthenticated}</div>;
  }

  if (languages === null || languagePairs === null) {
    return <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">{t.common.loading}</div>;
  }

  const hasPairs = languagePairs.length > 0;
  const showCreateForm = !hasPairs || isCreateFormOpen;

  function handleLanguagePairCreated(languagePair: LanguagePair) {
    setLanguagePairs((current) => (current ? [languagePair, ...current] : [languagePair]));
    setIsCreateFormOpen(false);
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
    <main className="bg-background py-6 sm:py-8">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.languagePairs.pageTitle}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t.languagePairs.pageDescription}</p>
          </div>

          {hasPairs && !isCreateFormOpen && (
            <Button
              type="button"
              className="min-h-11 w-full bg-brand text-brand-foreground hover:bg-brand/90 sm:w-auto"
              onClick={() => {
                setEditingPair(null);
                setIsCreateFormOpen(true);
              }}
            >
              + {t.languagePairs.addPairButton}
            </Button>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {showCreateForm && (
          <div className={hasPairs ? 'mb-6' : ''}>
            <CreateLanguagePairForm
              languages={languages}
              onCreated={handleLanguagePairCreated}
              onError={setError}
              onCancel={hasPairs ? () => setIsCreateFormOpen(false) : undefined}
            />
          </div>
        )}

        {hasPairs && (
          <LanguagePairList
            languagePairs={languagePairs}
            languages={languages}
            onEdit={(pair) => {
              setIsCreateFormOpen(false);
              setEditingPair(pair);
            }}
            onDelete={handleLanguagePairDelete}
          />
        )}

        {editingPair && (
          <EditLanguagePairForm
            languagePair={editingPair}
            languages={languages}
            onUpdated={handleLanguagePairUpdated}
            onCancel={() => setEditingPair(null)}
            onError={setError}
          />
        )}
      </div>
    </main>
  );
}
