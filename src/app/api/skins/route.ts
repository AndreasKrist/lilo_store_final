import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
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

    // Build query with proper count
    let query = supabase
      .from('skins')
      .select(`
        *,
        skin_condition_prices (*)
      `, { count: 'exact' })

    // Apply filters
    if (search) {
      query = query.ilike('name', `%${search}%`)
    }

    if (weapon_types.length > 0) {
      query = query.in('weapon_type', weapon_types)
    }

    if (rarities.length > 0) {
      query = query.in('rarity', rarities)
    }

    // Apply sorting
    switch (sort_by) {
      case 'price_asc':
      case 'price_desc':
        // We'll sort by price after fetching since it's in a related table
        break
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

    // Execute query
    const { data: skins, error, count } = await query

    if (error) {
      console.error('❌ Error fetching skins:', error)
      return NextResponse.json(
        { error: 'Failed to fetch skins' },
        { status: 500 }
      )
    }

    console.log('✅ Fetched skins:', skins?.length, 'Total count:', count)

    // Filter by price if specified
    let filteredSkins = skins || []
    if (price_min !== undefined || price_max !== undefined) {
      filteredSkins = filteredSkins.filter(skin => {
        const prices = skin.skin_condition_prices || []
        if (prices.length === 0) return false
        
        const minPrice = Math.min(...prices.map((p: any) => p.current_price))
        const maxPrice = Math.max(...prices.map((p: any) => p.current_price))
        
        if (price_min !== undefined && maxPrice < price_min) return false
        if (price_max !== undefined && minPrice > price_max) return false
        return true
      })
    }

    // Filter by conditions if specified
    if (conditions.length > 0) {
      filteredSkins = filteredSkins.filter(skin => {
        const skinConditions = (skin.skin_condition_prices || []).map((p: any) => p.condition)
        return conditions.some(condition => skinConditions.includes(condition))
      })
    }

    // Sort by price if needed
    if (sort_by === 'price_asc' || sort_by === 'price_desc') {
      filteredSkins.sort((a, b) => {
        const aPrices = a.skin_condition_prices?.map((p: any) => p.current_price) || [0]
        const bPrices = b.skin_condition_prices?.map((p: any) => p.current_price) || [0]
        const aPrice = Math.min(...aPrices)
        const bPrice = Math.min(...bPrices)
        return sort_by === 'price_asc' ? aPrice - bPrice : bPrice - aPrice
      })
    }

    // Apply pagination to filtered results
    const totalFiltered = filteredSkins.length
    const paginatedSkins = filteredSkins.slice(offset, offset + limit)

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