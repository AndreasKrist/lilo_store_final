// Replace your src/app/admin/page.tsx with this complete admin dashboard:

'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { formatDate } from '@/lib/utils'
import { Crown, Eye, DollarSign, CheckCircle, XCircle, Clock, Users, TrendingUp } from 'lucide-react'

interface Ticket {
  id: string
  type: 'buy' | 'sell'
  skin_name: string
  condition_name: string
  status: string
  quoted_price?: number
  notes?: string
  admin_notes?: string
  created_at: string
  updated_at: string
  users?: {
    name: string
    email: string
  }
}

export default function AdminPage() {
  const { user, isLoading } = useAuth()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [quotedPrice, setQuotedPrice] = useState('')
  const [adminNotes, setAdminNotes] = useState('')
  const [updating, setUpdating] = useState(false)

  // Check admin access
  const isAdmin = ['andreasmk8@gmail.com', 'fraxav474@gmail.com'].includes(user?.email)

  const fetchTickets = async () => {
    try {
      const response = await fetch('/api/admin/tickets')
      if (response.ok) {
        const data = await response.json()
        setTickets(data.tickets || [])
      } else {
        console.error('Failed to fetch tickets:', response.status)
      }
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user && isAdmin) {
      fetchTickets()
    } else if (!isLoading) {
      setLoading(false)
    }
  }, [user, isAdmin, isLoading])

  const updateTicket = async (ticketId: string, updates: any) => {
    setUpdating(true)
    try {
      const response = await fetch('/api/admin/tickets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId, updates })
      })
      
      if (response.ok) {
        await fetchTickets() // Refresh tickets
        setSelectedTicket(null)
        setQuotedPrice('')
        setAdminNotes('')
        alert('Ticket updated successfully!')
      } else {
        alert('Failed to update ticket')
      }
    } catch (error) {
      console.error('Error updating ticket:', error)
      alert('Error updating ticket')
    } finally {
      setUpdating(false)
    }
  }

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setQuotedPrice(ticket.quoted_price?.toString() || '')
    setAdminNotes(ticket.admin_notes || '')
  }

  const handleSendQuote = () => {
    if (!selectedTicket || !quotedPrice) return
    
    updateTicket(selectedTicket.id, {
      quoted_price: parseFloat(quotedPrice),
      status: 'quote_sent',
      admin_notes: adminNotes
    })
  }

  const handleMarkCompleted = (ticket: Ticket) => {
    updateTicket(ticket.id, { status: 'completed' })
  }

  const handleMarkCancelled = (ticket: Ticket) => {
    updateTicket(ticket.id, { status: 'cancelled' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading admin panel..." />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="p-8 text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-300">You don't have admin privileges.</p>
        </GlassCard>
      </div>
    )
  }

  // Calculate stats
  const stats = {
    total: tickets.length,
    pending: tickets.filter(t => t.status === 'pending').length,
    quote_sent: tickets.filter(t => t.status === 'quote_sent').length,
    processing: tickets.filter(t => t.status === 'processing').length,
    completed: tickets.filter(t => t.status === 'completed').length,
    cancelled: tickets.filter(t => t.status === 'cancelled').length,
    buy_requests: tickets.filter(t => t.type === 'buy').length,
    sell_requests: tickets.filter(t => t.type === 'sell').length,
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <p className="text-gray-300">Welcome {user.name}! Manage all user tickets and requests.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          <GlassCard className="p-4 text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-gray-400">Total</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
            <div className="text-xs text-gray-400">Pending</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <DollarSign className="w-6 h-6 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-purple-400">{stats.quote_sent}</div>
            <div className="text-xs text-gray-400">Quoted</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <Users className="w-6 h-6 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-blue-400">{stats.processing}</div>
            <div className="text-xs text-gray-400">Processing</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
            <div className="text-xs text-gray-400">Completed</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <XCircle className="w-6 h-6 mx-auto mb-2 text-red-400" />
            <div className="text-2xl font-bold text-red-400">{stats.cancelled}</div>
            <div className="text-xs text-gray-400">Cancelled</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-lg mb-2">🛒</div>
            <div className="text-2xl font-bold text-blue-500">{stats.buy_requests}</div>
            <div className="text-xs text-gray-400">Buy</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-lg mb-2">💰</div>
            <div className="text-2xl font-bold text-green-500">{stats.sell_requests}</div>
            <div className="text-xs text-gray-400">Sell</div>
          </GlassCard>
        </div>

        {/* Tickets Table */}
        <GlassCard className="overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">All Tickets</h2>
              <GlassButton size="sm" onClick={fetchTickets} disabled={loading}>
                {loading ? 'Loading...' : 'Refresh'}
              </GlassButton>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white">ID</th>
                  <th className="text-left p-4 text-white">Type</th>
                  <th className="text-left p-4 text-white">User</th>
                  <th className="text-left p-4 text-white">Skin</th>
                  <th className="text-left p-4 text-white">Condition</th>
                  <th className="text-left p-4 text-white">Status</th>
                  <th className="text-left p-4 text-white">Quote</th>
                  <th className="text-left p-4 text-white">Date</th>
                  <th className="text-left p-4 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center">
                      <LoadingSpinner size="md" text="Loading tickets..." />
                    </td>
                  </tr>
                ) : tickets.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-gray-400">
                      No tickets found. Users need to create buy/sell requests first.
                    </td>
                  </tr>
                ) : (
                  tickets.map(ticket => (
                    <tr key={ticket.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4 text-sm text-gray-300">
                        #{ticket.id.split('-').pop()?.slice(-6)}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          ticket.type === 'buy' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                        }`}>
                          {ticket.type}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-white">
                        {ticket.users?.name || 'Unknown'}
                      </td>
                      <td className="p-4 text-sm text-white max-w-48 truncate">
                        {ticket.skin_name}
                      </td>
                      <td className="p-4 text-sm text-gray-300">
                        {ticket.condition_name}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs capitalize font-medium ${
                          ticket.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          ticket.status === 'quote_sent' ? 'bg-purple-500/20 text-purple-400' :
                          ticket.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                          ticket.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-green-400">
                        {ticket.quoted_price ? `$${ticket.quoted_price}` : '-'}
                      </td>
                      <td className="p-4 text-sm text-gray-300">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewTicket(ticket)}
                            className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                            title="View & Edit"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {ticket.status === 'pending' && (
                            <button
                              onClick={() => handleViewTicket(ticket)}
                              className="p-1 text-green-400 hover:text-green-300 transition-colors"
                              title="Send Quote"
                            >
                              <DollarSign className="w-4 h-4" />
                            </button>
                          )}
                          {(ticket.status === 'quote_sent' || ticket.status === 'processing') && (
                            <button
                              onClick={() => handleMarkCompleted(ticket)}
                              className="p-1 text-green-400 hover:text-green-300 transition-colors"
                              title="Mark Complete"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <GlassCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">
                    Ticket #{selectedTicket.id.split('-').pop()?.slice(-6)}
                  </h2>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    ×
                  </button>
                </div>

                {/* Ticket Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm text-gray-400">Type</label>
                    <div className="text-white capitalize flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        selectedTicket.type === 'buy' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {selectedTicket.type}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <div className="text-white capitalize">{selectedTicket.status.replace('_', ' ')}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">User</label>
                    <div className="text-white">{selectedTicket.users?.name}</div>
                    <div className="text-xs text-gray-400">{selectedTicket.users?.email}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Created</label>
                    <div className="text-white">{formatDate(selectedTicket.created_at)}</div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm text-gray-400">Skin</label>
                    <div className="text-white font-medium">{selectedTicket.skin_name}</div>
                    <div className="text-sm text-gray-300">{selectedTicket.condition_name}</div>
                  </div>
                  {selectedTicket.notes && (
                    <div className="col-span-2">
                      <label className="text-sm text-gray-400">User Notes</label>
                      <div className="text-white bg-white/5 p-3 rounded-lg text-sm">
                        {selectedTicket.notes}
                      </div>
                    </div>
                  )}
                </div>

                {/* Admin Actions */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Quote Price ($) {selectedTicket.type === 'sell' ? '(What we pay them)' : '(What they pay us)'}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={quotedPrice}
                      onChange={(e) => setQuotedPrice(e.target.value)}
                      placeholder="Enter price quote"
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Admin Notes</label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add internal notes about this ticket..."
                      rows={3}
                      className="form-textarea"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <GlassButton
                      onClick={handleSendQuote}
                      variant="primary"
                      loading={updating}
                      disabled={!quotedPrice}
                    >
                      Send Quote
                    </GlassButton>
                    
                    <GlassButton
                      onClick={() => updateTicket(selectedTicket.id, { status: 'processing', admin_notes: adminNotes })}
                      variant="secondary"
                      loading={updating}
                    >
                      Mark Processing
                    </GlassButton>
                    
                    <GlassButton
                      onClick={() => updateTicket(selectedTicket.id, { status: 'completed', admin_notes: adminNotes })}
                      variant="success"
                      loading={updating}
                    >
                      Mark Complete
                    </GlassButton>
                    
                    <GlassButton
                      onClick={() => updateTicket(selectedTicket.id, { status: 'cancelled', admin_notes: adminNotes })}
                      variant="danger"
                      loading={updating}
                    >
                      Cancel Ticket
                    </GlassButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  )
}