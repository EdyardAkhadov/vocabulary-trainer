import { getLanguagePairs, type LanguagePair } from '@/entities/language-pair/api';
import { getTopics, type Topic } from '@/entities/topic/api';
import { getWordEntriesForTopics, type WordEntry } from '@/entities/word-entry/api';

export type DictionaryOccurrence = {
  wordEntry: WordEntry;
  pair: LanguagePair;
  topic: Topic;
};

export type DictionaryDataset = {
  pairs: LanguagePair[];
  topics: Topic[];
  occurrences: DictionaryOccurrence[];
};

export type DictionaryGroup = {
  key: string;
  targetText: string;
  occurrences: DictionaryOccurrence[];
};

function normalizeLanguageName(value: string) {
  return value.trim().toLocaleLowerCase();
}

export function getTargetDictionaryKey(pair: LanguagePair) {
  if (pair.target_language_id) {
    return `id:${pair.target_language_id}`;
  }

  const customName = pair.target_language_custom?.trim();

  if (!customName) {
    return `pair:${pair.id}`;
  }

  return `custom:${normalizeLanguageName(customName)}`;
}

export function normalizeDictionaryWord(value: string) {
  return value.trim().toLocaleLowerCase();
}

export async function getDictionaryDataset(options?: {
  pairId?: string;
  targetKey?: string;
}): Promise<DictionaryDataset> {
  const allPairs = await getLanguagePairs();

  const pairs = allPairs.filter((pair) => {
    if (options?.pairId) {
      return pair.id === options.pairId;
    }

    if (options?.targetKey) {
      return getTargetDictionaryKey(pair) === options.targetKey;
    }

    return true;
  });

  if (pairs.length === 0) {
    return { pairs: [], topics: [], occurrences: [] };
  }

  const topicGroups = await Promise.all(pairs.map((pair) => getTopics(pair.id)));
  const topics = topicGroups.flat();
  const topicIds = topics.map((topic) => topic.id);
  const wordEntries = await getWordEntriesForTopics(topicIds);

  const pairById = new Map(pairs.map((pair) => [pair.id, pair]));
  const topicById = new Map(topics.map((topic) => [topic.id, topic]));

  const occurrences = wordEntries.flatMap((wordEntry) => {
    const topic = topicById.get(wordEntry.topic_id);

    if (!topic) {
      return [];
    }

    const pair = pairById.get(topic.language_pair_id);

    if (!pair) {
      return [];
    }

    return [{ wordEntry, pair, topic }];
  });

  return { pairs, topics, occurrences };
}

export function groupDictionaryOccurrences(occurrences: DictionaryOccurrence[]): DictionaryGroup[] {
  const groups = new Map<string, DictionaryGroup>();

  for (const occurrence of occurrences) {
    const key = normalizeDictionaryWord(occurrence.wordEntry.target_text);
    const existing = groups.get(key);

    if (existing) {
      existing.occurrences.push(occurrence);
      continue;
    }

    groups.set(key, {
      key,
      targetText: occurrence.wordEntry.target_text,
      occurrences: [occurrence],
    });
  }

  return [...groups.values()].sort((left, right) =>
    left.targetText.localeCompare(right.targetText, undefined, { sensitivity: 'base' }),
  );
}

export async function findTargetWordDuplicates(
  pairId: string,
  targetText: string,
): Promise<DictionaryOccurrence[]> {
  const allPairs = await getLanguagePairs();
  const pair = allPairs.find((item) => item.id === pairId);

  if (!pair) {
    return [];
  }

  const targetKey = getTargetDictionaryKey(pair);
  const dataset = await getDictionaryDataset({ targetKey });
  const normalizedTarget = normalizeDictionaryWord(targetText);

  if (!normalizedTarget) {
    return [];
  }

  return dataset.occurrences.filter(
    (occurrence) => normalizeDictionaryWord(occurrence.wordEntry.target_text) === normalizedTarget,
  );
}
