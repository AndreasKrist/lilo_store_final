// src/app/api/skins/route.ts - Updated with correct CS2 system
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    // Parse query parameters with proper validation
    const search = searchParams.get('search') || ''
    const weapon_types = searchParams.get('weapon_types')?.split(',').filter(Boolean) || []
    const rarities = searchParams.get('rarities')?.split(',').filter(Boolean) || []
    const conditions = searchParams.get('conditions')?.split(',').filter(Boolean) || []
    const price_min = searchParams.get('price_min') ? parseFloat(searchParams.get('price_min')!) : undefined
    const price_max = searchParams.get('price_max') ? parseFloat(searchParams.get('price_max')!) : undefined
    const stattrak = searchParams.get('stattrak') === 'true' ? true : undefined
    const souvenir = searchParams.get('souvenir') === 'true' ? true : undefined
    const collections = searchParams.get('collections')?.split(',').filter(Boolean) || []
    const sort_by = searchParams.get('sort_by') || 'name_asc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '12'), 50) // Cap at 50
    const offset = (page - 1) * limit

    console.log('🔍 CS2 Skins API Query:', {
      search, weapon_types, rarities, conditions, price_min, price_max, 
      stattrak, souvenir, collections, sort_by, page, limit
    })

    // Validate weapon types against CS2 system
    const validWeaponTypes = ['pistol', 'rifle', 'smg', 'shotgun', 'sniper', 'heavy', 'knife', 'gloves']
    const filteredWeaponTypes = weapon_types.filter(type => validWeaponTypes.includes(type))

    // Validate rarities against CS2 8-tier system
    const validRarities = ['consumer', 'industrial', 'milspec', 'restricted', 'classified', 'covert', 'contraband', 'extraordinary']
    const filteredRarities = rarities.filter(rarity => validRarities.includes(rarity))

    // Validate conditions
    const validConditions = ['fn', 'mw', 'ft', 'ww', 'bs']
    const filteredConditions = conditions.filter(condition => validConditions.includes(condition))

    // Build the main query with proper joins
    let query = supabase
      .from('skins')
      .select(`
        id,
        name,
        description,
        weapon_type,
        weapon_name,
        category,
        rarity,
        rarity_name,
        rarity_color,
        pattern_name,
        min_float,
        max_float,
        stattrak,
        souvenir,
        market_hash_name,
        image_url,
        collections,
        crates,
        type,
        created_at,
        updated_at,
        skin_condition_prices (
          id,
          condition,
          condition_name,
          float_range,
          base_price,
          current_price,
          steam_price,
          high_price,
          low_price,
          volume,
          price_change_24h,
          last_updated
        )
      `, { count: 'exact' })
      .eq('type', 'skin') // Only get skins, not other items

    // Apply search filter with better text search
    if (search) {
      query = query.or(`name.ilike.%${search}%, weapon_name.ilike.%${search}%, market_hash_name.ilike.%${search}%`)
    }

    // Apply weapon type filter
    if (filteredWeaponTypes.length > 0) {
      query = query.in('weapon_type', filteredWeaponTypes)
    }

    // Apply rarity filter  
    if (filteredRarities.length > 0) {
      query = query.in('rarity', filteredRarities)
    }

    // Apply StatTrak filter
    if (stattrak !== undefined) {
      query = query.eq('stattrak', stattrak)
    }

    // Apply Souvenir filter
    if (souvenir !== undefined) {
      query = query.eq('souvenir', souvenir)
    }

    // Apply collections filter
    if (collections.length > 0) {
      // Use contains operator for JSONB array
      query = query.overlaps('collections', collections)
    }

    // Apply sorting (some will be done post-query for complex cases)
    switch (sort_by) {
      case 'name_asc':
        query = query.order('name', { ascending: true })
        break
      case 'name_desc':
        query = query.order('name', { ascending: false })
        break
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'rarity_desc':
        // Order by rarity hierarchy (rare first)
        query = query.order('rarity', { ascending: false })
        break
      case 'rarity_asc':
        // Order by rarity hierarchy (common first)
        query = query.order('rarity', { ascending: true })
        break
      default:
        query = query.order('name', { ascending: true })
    }

    // Execute the main query
    const { data: skins, error, count } = await query

    if (error) {
      console.error('❌ Error fetching skins:', error)
      return NextResponse.json(
        { error: 'Failed to fetch skins: ' + error.message },
        { status: 500 }
      )
    }

    console.log('✅ Fetched skins from DB:', skins?.length, 'Total count:', count)

    // Post-process the data for advanced filtering and sorting
    let processedSkins = (skins || []).map(skin => ({
      ...skin,
      skin_condition_prices: skin.skin_condition_prices || []
    }))

    // Apply condition filter (post-query since it's based on related data)
    if (filteredConditions.length > 0) {
      processedSkins = processedSkins.filter(skin => {
        const skinConditions = skin.skin_condition_prices.map((p: any) => p.condition)
        return filteredConditions.some(condition => skinConditions.includes(condition))
      })
    }

    // Apply price filter (post-query since it's based on condition prices)
    if (price_min !== undefined || price_max !== undefined) {
      processedSkins = processedSkins.filter(skin => {
        const prices = skin.skin_condition_prices
          .map((p: any) => p.current_price)
          .filter((p: number) => p > 0)
        
        if (prices.length === 0) return false
        
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)
        
        if (price_min !== undefined && maxPrice < price_min) return false
        if (price_max !== undefined && minPrice > price_max) return false
        return true
      })
    }

    // Apply complex sorting that requires condition price data
    if (sort_by === 'price_asc' || sort_by === 'price_desc') {
      processedSkins.sort((a, b) => {
        const aPrices = a.skin_condition_prices?.map((p: any) => p.current_price).filter((p: number) => p > 0) || [0]
        const bPrices = b.skin_condition_prices?.map((p: any) => p.current_price).filter((p: number) => p > 0) || [0]
        
        // Use minimum price for comparison
        const aPrice = aPrices.length > 0 ? Math.min(...aPrices) : 0
        const bPrice = bPrices.length > 0 ? Math.min(...bPrices) : 0
        
        return sort_by === 'price_asc' ? aPrice - bPrice : bPrice - aPrice
      })
    }

    // Apply rarity sorting with correct CS2 hierarchy
    if (sort_by === 'rarity_desc' || sort_by === 'rarity_asc') {
      const rarityOrder = {
        'consumer': 1,
        'industrial': 2, 
        'milspec': 3,
        'restricted': 4,
        'classified': 5,
        'covert': 6,
        'contraband': 7,
        'extraordinary': 8
      }

      processedSkins.sort((a, b) => {
        const aRarity = rarityOrder[a.rarity as keyof typeof rarityOrder] || 0
        const bRarity = rarityOrder[b.rarity as keyof typeof rarityOrder] || 0
        
        return sort_by === 'rarity_desc' ? bRarity - aRarity : aRarity - bRarity
      })
    }

    // Apply pagination to processed results
    const totalFiltered = processedSkins.length
    const paginatedSkins = processedSkins.slice(offset, offset + limit)

    // Add additional metadata for each skin
    const enrichedSkins = paginatedSkins.map(skin => {
      const prices = skin.skin_condition_prices?.map((p: any) => p.current_price).filter((p: number) => p > 0) || []
      const minPrice = prices.length > 0 ? Math.min(...prices) : 0
      const maxPrice = prices.length > 0 ? Math.max(...prices) : 0
      
      return {
        ...skin,
        price_range: {
          min: minPrice,
          max: maxPrice,
          count: skin.skin_condition_prices?.length || 0
        },
        // Add investment rating
        investment_rating: getInvestmentRating(skin.rarity, prices),
        // Add popularity score (simplified)
        popularity_score: calculatePopularityScore(skin),
        // Add market trend
        market_trend: calculateMarketTrend(skin.skin_condition_prices)
      }
    })

    console.log('📄 Returning processed skins:', enrichedSkins.length, 'page', page, 'of', Math.ceil(totalFiltered / limit))

    return NextResponse.json({
      data: enrichedSkins,
      total: totalFiltered,
      page,
      limit,
      totalPages: Math.ceil(totalFiltered / limit),
      filters_applied: {
        search: search || null,
        weapon_types: filteredWeaponTypes,
        rarities: filteredRarities,
        conditions: filteredConditions,
        price_range: price_min || price_max ? { min: price_min, max: price_max } : null,
        stattrak,
        souvenir,
        collections
      },
      sort_by
    })

  } catch (error) {
    console.error('❌ Error in CS2 skins API:', error)
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    )
  }
}

// Helper function to calculate investment rating
function getInvestmentRating(rarity: string, prices: number[]): 'excellent' | 'good' | 'fair' | 'poor' {
  const rarityScore = {
    'contraband': 10,
    'extraordinary': 9,
    'covert': 8,
    'classified': 6,
    'restricted': 4,
    'milspec': 2,
    'industrial': 1,
    'consumer': 0
  }[rarity] || 0

  const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0
  const priceScore = avgPrice > 1000 ? 4 : avgPrice > 100 ? 3 : avgPrice > 10 ? 2 : 1

  const totalScore = rarityScore + priceScore
  
  if (totalScore >= 12) return 'excellent'
  if (totalScore >= 8) return 'good'
  if (totalScore >= 4) return 'fair'
  return 'poor'
}

// Helper function to calculate popularity score
function calculatePopularityScore(skin: any): number {
  let score = 0
  
  // Weapon type popularity
  const weaponPopularity = {
    'knife': 10,
    'gloves': 9,
    'rifle': 8,
    'sniper': 7,
    'pistol': 5,
    'smg': 4,
    'shotgun': 3,
    'heavy': 2
  }
  score += weaponPopularity[skin.weapon_type as keyof typeof weaponPopularity] || 0
  
  // Rarity popularity
  const rarityPopularity = {
    'contraband': 10,
    'extraordinary': 9,
    'covert': 8,
    'classified': 6,
    'restricted': 4,
    'milspec': 2,
    'industrial': 1,
    'consumer': 0
  }
  score += rarityPopularity[skin.rarity as keyof typeof rarityPopularity] || 0
  
  // Special attributes
  if (skin.stattrak) score += 2
  if (skin.souvenir) score += 1
  
  // Collections (popular collections get bonus)
  const popularCollections = ['The Dust 2 Collection', 'The Mirage Collection', 'The Norse Collection']
  if (skin.collections?.some((col: string) => popularCollections.includes(col))) {
    score += 3
  }
  
  return Math.min(score, 10) // Cap at 10
}

// Helper function to calculate market trend
function calculateMarketTrend(conditionPrices: any[]): 'up' | 'down' | 'stable' {
  if (!conditionPrices || conditionPrices.length === 0) return 'stable'
  
  const changes = conditionPrices
    .map(cp => cp.price_change_24h || 0)
    .filter(change => change !== 0)
  
  if (changes.length === 0) return 'stable'
  
  const avgChange = changes.reduce((a, b) => a + b, 0) / changes.length
  
  if (avgChange > 2) return 'up'
  if (avgChange < -2) return 'down'
  return 'stable'
}