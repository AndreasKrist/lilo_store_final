// Create folders: src/app/api/admin/tickets/
// Create file: src/app/api/admin/tickets/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

// Check if user is admin (server-side)
function isAdmin(userEmail: string | null | undefined): boolean {
  if (!userEmail) return false
  const adminEmails = ['andreasmk8@gmail.com', 'fraxav474@gmail.com']
  return adminEmails.includes(userEmail)
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    console.log('🔧 Admin fetching all tickets')

    // Fetch all tickets with user info
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select(`
        *,
        users (
          id,
          name,
          email,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error fetching tickets:', error)
      return NextResponse.json(
        { error: 'Failed to fetch tickets' },
        { status: 500 }
      )
    }

    console.log('✅ Admin fetched', tickets?.length, 'tickets')

    return NextResponse.json({
      tickets: tickets || [],
      total: tickets?.length || 0
    })

  } catch (error) {
    console.error('❌ Error in admin tickets API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { ticketId, updates } = await request.json()
    
    if (!ticketId) {
      return NextResponse.json(
        { error: 'Ticket ID required' },
        { status: 400 }
      )
    }

    console.log('🔧 Admin updating ticket:', ticketId, updates)

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

    console.log('✅ Admin updated ticket successfully')

    return NextResponse.json({ ticket })

  } catch (error) {
    console.error('❌ Error in admin update API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}