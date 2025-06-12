import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
import { generateTicketId, getConditionName } from '@/lib/utils'
import { TicketFormData } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🎫 Fetching tickets for user:', session.user.email)

    // Get user ID from email
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single()

    if (userError || !userData) {
      console.error('❌ User not found:', userError)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const offset = (page - 1) * limit

    let query = supabase
      .from('tickets')
      .select(`
        *,
        users (
          id,
          name,
          email,
          avatar_url
        )
      `, { count: 'exact' })
      .eq('user_id', userData.id)
      .order('created_at', { ascending: false })

    // Apply filters
    if (status) {
      query = query.eq('status', status)
    }

    if (type) {
      query = query.eq('type', type)
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data: tickets, error, count } = await query

    if (error) {
      console.error('❌ Error fetching tickets:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tickets' },
        { status: 500 }
      )
    }

    console.log('✅ Fetched tickets:', tickets?.length)

    return NextResponse.json({
      data: tickets || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    })

  } catch (error) {
    console.error('❌ Error in tickets GET API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🎫 Creating ticket for user:', session.user.email)

    // Get user ID from email
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single()

    if (userError || !userData) {
      console.error('❌ User not found:', userError)
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body: TicketFormData = await request.json()
    
    // Validate required fields
    if (!body.type || !body.skin_name || !body.condition) {
      return NextResponse.json(
        { error: 'Missing required fields: type, skin_name, condition' },
        { status: 400 }
      )
    }

    // Validate type
    if (!['buy', 'sell'].includes(body.type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "buy" or "sell"' },
        { status: 400 }
      )
    }

    // Validate condition
    if (!['fn', 'mw', 'ft', 'ww', 'bs'].includes(body.condition)) {
      return NextResponse.json(
        { error: 'Invalid condition. Must be one of: fn, mw, ft, ww, bs' },
        { status: 400 }
      )
    }

    // Create ticket
    const ticketData = {
      id: generateTicketId(),
      user_id: userData.id,
      type: body.type,
      skin_name: body.skin_name,
      condition: body.condition,
      condition_name: getConditionName(body.condition),
      status: 'pending',
      notes: body.notes || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    console.log('📝 Creating ticket:', ticketData)

    const { data: ticket, error } = await supabase
      .from('tickets')
      .insert([ticketData])
      .select(`
        *,
        users (
          id,
          name,
          email,
          avatar_url
        )
      `)
      .single()

    if (error) {
      console.error('❌ Error creating ticket:', error)
      return NextResponse.json(
        { error: 'Failed to create ticket: ' + error.message },
        { status: 500 }
      )
    }

    console.log('✅ Ticket created successfully:', ticket.id)

    return NextResponse.json(ticket)

  } catch (error) {
    console.error('❌ Error in tickets POST API:', error)
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user ID from email
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single()

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const { searchParams } = new URL(request.url)
    const ticketId = searchParams.get('id')
    
    if (!ticketId) {
      return NextResponse.json(
        { error: 'Ticket ID required' },
        { status: 400 }
      )
    }

    const updates = await request.json()
    
    // Only allow users to update their own tickets
    const { data: existingTicket } = await supabase
      .from('tickets')
      .select('user_id')
      .eq('id', ticketId)
      .single()

    if (!existingTicket || existingTicket.user_id !== userData.id) {
      return NextResponse.json(
        { error: 'Ticket not found or access denied' },
        { status: 404 }
      )
    }

    // Update ticket
    const { data: ticket, error } = await supabase
      .from('tickets')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', ticketId)
      .select(`
        *,
        users (
          id,
          name,
          email,
          avatar_url
        )
      `)
      .single()

    if (error) {
      console.error('❌ Error updating ticket:', error)
      return NextResponse.json(
        { error: 'Failed to update ticket' },
        { status: 500 }
      )
    }

    return NextResponse.json(ticket)

  } catch (error) {
    console.error('❌ Error in tickets PUT API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}