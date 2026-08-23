import { supabase } from '@/lib/supabase'

export type Language = {
  id: string
  code: string
  name: string
  native_name: string
}

export async function getLanguages(): Promise<Language[]> {
  const { data, error } = await supabase
    .from('languages')
    .select('id, code, name, native_name')
    .order('name')

  if (error) {
    throw error
  }

  return data
}