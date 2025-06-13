// src/app/api/skins/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Use nextUrl.searchParams instead of new URL(request.url) to avoid dynamic server usage
    const searchParams = request.nextUrl.searchParams
    
    // Parse query parameters
    const search = searchParams.get('search') || ''
    const weapon_types = searchParams.get('weapon_types')?.split(',').filter(Boolean) || []
    const rarities = searchParams.get('rarities')?.split(',').filter(Boolean) || []
    const conditions = searchParams.get('conditions')?.split(',').filter(Boolean) || []
    const price_min = searchParams.get('price_min') ? parseFloat(searchParams.get('price_min')!) : undefined
    const price_max = searchParams.get('price_max') ? parseFloat(searchParams.get('price_max')!) : undefined
    const sort_by = searchParams.get('sort_by') || 'name_asc'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = (page - 1) * limit

    console.log('🔍 API Query params:', {
      search, weapon_types, rarities, conditions, price_min, price_max, sort_by, page, limit
    })

    // Start building the query
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
          last_updated
        )
      `, { count: 'exact' })
      .eq('type', 'skin') // Only get skins, not other items

    // Apply search filter
    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    // Apply weapon type filter
    if (weapon_types.length > 0) {
      query = query.in('weapon_type', weapon_types)
    }

    // Apply rarity filter
    if (rarities.length > 0) {
      query = query.in('rarity', rarities)
    }

    // Apply basic sorting (price sorting will be done after fetching due to JOIN complexity)
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
      default:
        query = query.order('name', { ascending: true })
    }

    // Execute the main query
    const { data: skins, error, count } = await query

    if (error) {
      console.error('❌ Error fetching skins:', error)
      return NextResponse.json(
        { error: 'Failed to fetch skins' },
        { status: 500 }
      )
    }

    console.log('✅ Fetched skins:', skins?.length, 'Total count:', count)

    // Post-process the data
    let processedSkins = (skins || []).map(skin => ({
      ...skin,
      skin_condition_prices: skin.skin_condition_prices || []
    }))

    // Apply condition filter
    if (conditions.length > 0) {
      processedSkins = processedSkins.filter(skin => {
        const skinConditions = skin.skin_condition_prices.map((p: any) => p.condition)
        return conditions.some(condition => skinConditions.includes(condition))
      })
    }

    // Apply price filter
    if (price_min !== undefined || price_max !== undefined) {
      processedSkins = processedSkins.filter(skin => {
        const prices = skin.skin_condition_prices.map((p: any) => p.current_price).filter(p => p > 0)
        if (prices.length === 0) return false
        
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)
        
        if (price_min !== undefined && maxPrice < price_min) return false
        if (price_max !== undefined && minPrice > price_max) return false
        return true
      })
    }

    // Apply price sorting
    if (sort_by === 'price_asc' || sort_by === 'price_desc') {
      processedSkins.sort((a, b) => {
        const aPrices = a.skin_condition_prices?.map((p: any) => p.current_price).filter((p: number) => p > 0) || [0]
        const bPrices = b.skin_condition_prices?.map((p: any) => p.current_price).filter((p: number) => p > 0) || [0]
        const aPrice = aPrices.length > 0 ? Math.min(...aPrices) : 0
        const bPrice = bPrices.length > 0 ? Math.min(...bPrices) : 0
        return sort_by === 'price_asc' ? aPrice - bPrice : bPrice - aPrice
      })
    }

    // Apply pagination to processed results
    const totalFiltered = processedSkins.length
    const paginatedSkins = processedSkins.slice(offset, offset + limit)

    console.log('📄 Returning:', paginatedSkins.length, 'skins, page', page, 'of', Math.ceil(totalFiltered / limit))

    return NextResponse.json({
      data: paginatedSkins,
      total: totalFiltered,
      page,
      limit,
      totalPages: Math.ceil(totalFiltered / limit)
    })

  } catch (error) {
    console.error('❌ Error in skins API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}