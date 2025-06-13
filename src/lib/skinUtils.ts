// src/lib/skinUtils.ts
import { supabase } from '@/lib/supabase'

// Get specific skin by ID
export async function getSkinById(skinId: string) {
  try {
    const { data: skin, error } = await supabase
      .from('skins')
      .select(`
        *,
        skin_condition_prices (*)
      `)
      .eq('id', skinId)
      .eq('type', 'skin')
      .single()

    if (error) {
      console.error('❌ Supabase error fetching skin by ID:', error)
      return null
    }

    return skin
  } catch (error) {
    console.error('❌ Error fetching skin by ID:', error)
    return null
  }
}

// Search function for other item types
export async function searchItems(type: string, searchQuery: string = '', limit: number = 20) {
  try {
    const validTypes = ['case', 'sticker', 'agent', 'music_kit', 'graffiti', 'patch', 'key', 'collectible']
    
    if (!validTypes.includes(type)) {
      return { data: [], error: 'Invalid item type' }
    }

    let tableName = type === 'case' ? 'cases' : 
                   type === 'music_kit' ? 'music_kits' : 
                   type + 's' // Most tables are just plural

    let query = supabase
      .from(tableName)
      .select('*')
      .limit(limit)

    if (searchQuery) {
      query = query.ilike('name', `%${searchQuery}%`)
    }

    query = query.order('name', { ascending: true })

    const { data, error } = await query

    if (error) {
      console.error(`❌ Supabase error searching ${type}s:`, error)
      return { data: [], error: error.message }
    }

    return { data: data || [], error: null }
  } catch (error) {
    console.error(`❌ Error searching ${type}s:`, error)
    return { data: [], error: error instanceof Error ? error.message : 'Unknown error occurred' }
  }
}

// Get popular skins
export async function getPopularSkins(limit: number = 6) {
  try {
    const { data: skins, error } = await supabase
      .from('skins')
      .select(`
        *,
        skin_condition_prices (*)
      `)
      .eq('type', 'skin')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('❌ Supabase error fetching popular skins:', error)
      return []
    }

    return skins || []
  } catch (error) {
    console.error('❌ Error fetching popular skins:', error)
    return []
  }
}

// Get featured skins (high rarity)
export async function getFeaturedSkins(limit: number = 3) {
  try {
    const { data: skins, error } = await supabase
      .from('skins')
      .select(`
        *,
        skin_condition_prices (*)
      `)
      .eq('type', 'skin')
      .in('rarity', ['covert', 'classified'])
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('❌ Supabase error fetching featured skins:', error)
      return []
    }

    return skins || []
  } catch (error) {
    console.error('❌ Error fetching featured skins:', error)
    return []
  }
}