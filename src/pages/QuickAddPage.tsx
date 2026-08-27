import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';

import { useAppLanguage } from '@/app/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { findTargetWordDuplicates, getTargetDictionaryKey, type DictionaryOccurrence } from '@/entities/dictionary/api';
import { getLanguages, type Language } from '@/entities/language/api';
import { getLanguagePairs, type LanguagePair } from '@/entities/language-pair/api';
import { getPairLanguageName } from '@/entities/language-pair/display';
import { getTopics, type Topic } from '@/entities/topic/api';
import { createWordEntryWithInput } from '@/entities/word-entry/api';

const LAST_PAIR_KEY = 'vocab-quick-add-pair';
const LAST_TOPIC_KEY = 'vocab-quick-add-topic';

export function QuickAddPage() {
  const { language: appLanguage, t } = useAppLanguage();
  const [searchParams] = useSearchParams();

  const [pairs, setPairs] = useState<LanguagePair[] | null>(null);
  const [languages, setLanguages] = useState<Language[] | null>(null);
  const [topics, setTopics] = useState<Topic[] | null>(null);
  const [selectedPairId, setSelectedPairId] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [meaning, setMeaning] = useState('');
  const [contextText, setContextText] = useState('');
  const [encounterSource, setEncounterSource] = useState('');
  const [duplicates, setDuplicates] = useState<DictionaryOccurrence[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBaseData() {
      try {
        const [allPairsData, languagesData] = await Promise.all([getLanguagePairs(), getLanguages()]);
        const targetKey = searchParams.get('target');
        const pairsData = targetKey
          ? allPairsData.filter((pair) => getTargetDictionaryKey(pair) === targetKey)
          : allPairsData;
        const queryPair = searchParams.get('pair');
        const savedPair = window.localStorage.getItem(LAST_PAIR_KEY);
        const preferredPair = [queryPair, savedPair, pairsData[0]?.id].find(
          (candidate) => candidate && pairsData.some((pair) => pair.id === candidate),
        ) ?? '';

        setPairs(pairsData);
        setLanguages(languagesData);
        setSelectedPairId(preferredPair);
      } catch (err) {
        setError(err instanceof Error ? err.message : t.errors.loadData);
      }
    }

    void loadBaseData();
  }, [searchParams, t.errors.loadData]);

  useEffect(() => {
    if (!selectedPairId) {
      return;
    }

    const currentPairId = selectedPairId;

    async function loadTopics() {
      try {
        const topicsData = await getTopics(currentPairId);
        const queryTopic = searchParams.get('topic');
        const savedTopic = window.localStorage.getItem(LAST_TOPIC_KEY);
        const preferredTopic = [queryTopic, savedTopic, topicsData[0]?.id].find(
          (candidate) => candidate && topicsData.some((topic) => topic.id === candidate),
        ) ?? '';

        setTopics(topicsData);
        setSelectedTopicId(preferredTopic);
      } catch (err) {
        setError(err instanceof Error ? err.message : t.errors.loadData);
      }
    }

    void loadTopics();
  }, [searchParams, selectedPairId, t.errors.loadData]);

  const selectedPair = useMemo(
    () => pairs?.find((pair) => pair.id === selectedPairId) ?? null,
    [pairs, selectedPairId],
  );

  const pairItems = useMemo(() => {
    if (!pairs || !languages) {
      return [];
    }

    return pairs.map((pair) => {
      const sourceName = getPairLanguageName(pair, 'source', languages, appLanguage, t.languagePairs.language1);
      const targetName = getPairLanguageName(pair, 'target', languages, appLanguage, t.languagePairs.language2);
      return { value: pair.id, label: `${pair.name} · ${sourceName} → ${targetName}` };
    });
  }, [appLanguage, languages, pairs, t.languagePairs.language1, t.languagePairs.language2]);

  const topicItems = (topics ?? []).map((topic) => ({ value: topic.id, label: topic.name }));

  const sourceLanguageName = selectedPair && languages
    ? getPairLanguageName(selectedPair, 'source', languages, appLanguage, t.languagePairs.language1)
    : t.languagePairs.language1;
  const targetLanguageName = selectedPair && languages
    ? getPairLanguageName(selectedPair, 'target', languages, appLanguage, t.languagePairs.language2)
    : t.languagePairs.language2;

  async function saveWord(forceDuplicate = false) {
    if (!selectedPairId || !selectedTopicId || !sourceText.trim() || !targetText.trim()) {
      setError(t.validation.fillAllFields);
      return;
    }

    setError(null);
    setSuccess(false);

    try {
      setIsSaving(true);

      if (!forceDuplicate) {
        const existing = await findTargetWordDuplicates(selectedPairId, targetText);

        if (existing.length > 0) {
          setDuplicates(existing);
          return;
        }
      }

      await createWordEntryWithInput(selectedTopicId, {
        sourceText,
        targetText,
        meaning,
        contextText,
        encounterSource,
      });

      window.localStorage.setItem(LAST_PAIR_KEY, selectedPairId);
      window.localStorage.setItem(LAST_TOPIC_KEY, selectedTopicId);

      setSourceText('');
      setTargetText('');
      setMeaning('');
      setContextText('');
      setEncounterSource('');
      setDuplicates([]);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.createWord);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveWord();
  }

  if (!pairs || !languages) {
    return <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">{t.common.loading}</main>;
  }

  return (
    <main className="bg-background py-6 sm:py-8">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <Link to="/app/dictionary" className="text-sm text-muted-foreground hover:text-foreground">← {t.vocabulary.dictionaries}</Link>

        <div className="mt-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.vocabulary.quickAdd}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.vocabulary.quickAddDescription}</p>
        </div>

        {error && <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">{error}</div>}
        {success && <div className="mt-6 rounded-lg border border-green-600/30 bg-green-500/10 p-4 text-sm"><p className="font-medium">✓ {t.vocabulary.added}</p><p className="mt-1 text-muted-foreground">{t.vocabulary.addedDescription}</p></div>}

        {pairs.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed p-6 text-center">
            <p className="font-medium">{t.languagePairs.noPairs}</p>
            <Link to="/app" className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-brand px-4 text-sm font-semibold text-brand-foreground">{t.languagePairs.createButton}</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5 rounded-xl border bg-card p-4 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="quick-pair">{t.vocabulary.selectPair}</Label>
              <Select items={pairItems} value={selectedPairId || null} onValueChange={(value) => {
                const nextPairId = value ?? '';
                setSelectedPairId(nextPairId);
                setSelectedTopicId('');
                setTopics(null);
                setDuplicates([]);
                        }} disabled={isSaving}>
                <SelectTrigger id="quick-pair" className="min-h-11 w-full"><SelectValue placeholder={t.vocabulary.choosePair} /></SelectTrigger>
                <SelectContent>{pairItems.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quick-topic">{t.vocabulary.selectTopic}</Label>
              {topics && topics.length === 0 ? (
                <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                  <p>{t.vocabulary.noTopicsForPair}</p>
                  {selectedPairId && <Link to={`/app/pair/${selectedPairId}`} className="mt-2 inline-block font-medium text-brand hover:underline">{t.topics.createButton} →</Link>}
                </div>
              ) : (
                <Select items={topicItems} value={selectedTopicId || null} onValueChange={(value) => setSelectedTopicId(value ?? '')} disabled={isSaving || !topics}>
                  <SelectTrigger id="quick-topic" className="min-h-11 w-full"><SelectValue placeholder={topics ? t.vocabulary.chooseTopic : t.common.loading} /></SelectTrigger>
                  <SelectContent>{topicItems.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
                </Select>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="quick-source">{sourceLanguageName}</Label><Input id="quick-source" value={sourceText} onChange={(event) => setSourceText(event.target.value)} placeholder={t.placeholders.sourceWord} disabled={isSaving} autoFocus /></div>
              <div className="space-y-2"><Label htmlFor="quick-target">{targetLanguageName}</Label><Input id="quick-target" value={targetText} onChange={(event) => { setTargetText(event.target.value); setDuplicates([]); }} placeholder={t.placeholders.targetWord} disabled={isSaving} /></div>
            </div>

            <div className="space-y-2"><Label htmlFor="quick-meaning">{t.words.meaning} <span className="text-muted-foreground">({t.common.optional})</span></Label><Input id="quick-meaning" value={meaning} onChange={(event) => setMeaning(event.target.value)} placeholder={t.placeholders.meaning} disabled={isSaving} /></div>

            <div className="space-y-2"><Label htmlFor="quick-context">{t.vocabulary.context} <span className="text-muted-foreground">({t.common.optional})</span></Label><p className="text-xs text-muted-foreground">{t.vocabulary.contextDescription}</p><textarea id="quick-context" value={contextText} onChange={(event) => setContextText(event.target.value)} placeholder={t.vocabulary.contextPlaceholder} disabled={isSaving} rows={3} className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50" /></div>

            <div className="space-y-2"><Label htmlFor="quick-source-note">{t.vocabulary.encounterSource} <span className="text-muted-foreground">({t.common.optional})</span></Label><p className="text-xs text-muted-foreground">{t.vocabulary.encounterSourceDescription}</p><Input id="quick-source-note" value={encounterSource} onChange={(event) => setEncounterSource(event.target.value)} placeholder={t.vocabulary.encounterSourcePlaceholder} disabled={isSaving} /></div>

            {duplicates.length > 0 && (
              <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
                <p className="font-semibold">{t.vocabulary.duplicateTitle}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.vocabulary.duplicateDescription}</p>
                <div className="mt-3 grid gap-2">
                  {duplicates.slice(0, 4).map((duplicate) => (
                    <div key={duplicate.wordEntry.id} className="rounded-lg border bg-background/70 p-3 text-sm">
                      <p className="font-medium">{duplicate.wordEntry.source_text} → {duplicate.wordEntry.target_text}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{duplicate.pair.name} · {duplicate.topic.name}</p>
                      {duplicate.wordEntry.context_text && <p className="mt-2 text-xs text-muted-foreground">{duplicate.wordEntry.context_text}</p>}
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <Button type="button" className="min-h-11 bg-brand text-brand-foreground hover:bg-brand/90" disabled={isSaving} onClick={() => { void saveWord(true); }}>{t.vocabulary.addAnyway}</Button>
                  <Button type="button" variant="outline" className="min-h-11" onClick={() => { setTargetText(''); setDuplicates([]); }}>{t.vocabulary.changeWord}</Button>
                </div>
              </div>
            )}

            <Button type="submit" disabled={isSaving || !selectedTopicId} className="min-h-11 w-full bg-brand text-brand-foreground hover:bg-brand/90 sm:w-auto">{isSaving ? t.words.adding : `+ ${t.words.addButton}`}</Button>
          </form>
        )}
      </div>
    </main>
  );
}
