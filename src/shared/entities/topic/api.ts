import { supabase } from '@/lib/supabase'

export type Topic = {
  id: string
  language_pair_id: string
  name: string
  created_at: string
}

export async function getTopic(
  topicId: string,
): Promise<Topic> {
  const { data, error } = await supabase
    .from('topics')
    .select('id, language_pair_id, name, created_at')
    .eq('id', topicId)
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getTopics(
  languagePairId: string,
): Promise<Topic[]> {
  const { data, error } = await supabase
    .from('topics')
    .select('id, language_pair_id, name, created_at')
    .eq('language_pair_id', languagePairId)
    .order('created_at', { ascending: true })

  if (error) {
    throw error
  }

  return data
}

export async function createTopic(
  languagePairId: string,
  name: string,
): Promise<Topic> {
  const trimmedName = name.trim()

  if (!trimmedName) {
    throw new Error('Topic name cannot be empty')
  }

  const { data, error } = await supabase
    .from('topics')
    .insert({
      language_pair_id: languagePairId,
      name: trimmedName,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function updateTopic(
  topicId: string,
  name: string,
): Promise<Topic> {
  const trimmedName = name.trim()

  if (!trimmedName) {
    throw new Error('Topic name cannot be empty')
  }

  const { data, error } = await supabase
    .from('topics')
    .update({
      name: trimmedName,
    })
    .eq('id', topicId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function deleteTopic(
  topicId: string,
): Promise<void> {
  const { error } = await supabase
    .from('topics')
    .delete()
    .eq('id', topicId)

  if (error) {
    throw error
  }
}