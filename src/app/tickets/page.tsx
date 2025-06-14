'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, Filter, RefreshCw, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import LoadingSpinner, { SkeletonList } from '@/components/ui/LoadingSpinner'
import { useAuth } from '@/hooks/useAuth'
import { useTickets, useTicketStats } from '@/hooks/useTickets'
import { formatPrice, formatDate, getRelativeTime } from '@/lib/utils'
import { TicketStatus, TicketType } from '@/types'

const statusConfig = {
  pending: { 
    icon: Clock, 
    color: 'text-yellow-400', 
    bg: 'bg-yellow-500/20', 
    border: 'border-yellow-500/30',
    label: 'Pending Review'
  },
  quote_sent: { 
    icon: AlertCircle, 
    color: 'text-purple-400', 
    bg: 'bg-purple-500/20', 
    border: 'border-purple-500/30',
    label: 'Quote Sent'
  },
  processing: { 
    icon: RefreshCw, 
    color: 'text-blue-400', 
    bg: 'bg-blue-500/20', 
    border: 'border-blue-500/30',
    label: 'Processing'
  },
  completed: { 
    icon: CheckCircle, 
    color: 'text-green-400', 
    bg: 'bg-green-500/20', 
    border: 'border-green-500/30',
    label: 'Completed'
  },
  cancelled: { 
    icon: XCircle, 
    color: 'text-red-400', 
    bg: 'bg-red-500/20', 
    border: 'border-red-500/30',
    label: 'Cancelled'
  }
}

export default function TicketsPage() {
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus | 'all'>('all')
  const [selectedType, setSelectedType] = useState<TicketType | 'all'>('all')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const {
    tickets,
    isLoading,
    handleFilterChange,
    refresh,
    loadMore,
    pagination
  } = useTickets()
  
  const stats = useTicketStats()

  const handleStatusFilter = (status: TicketStatus | 'all') => {
    setSelectedStatus(status)
    handleFilterChange({ 
      status: status === 'all' ? undefined : status,
      type: selectedType === 'all' ? undefined : selectedType
    })
  }

  const handleTypeFilter = (type: TicketType | 'all') => {
    setSelectedType(type)
    handleFilterChange({ 
      status: selectedStatus === 'all' ? undefined : selectedStatus,
      type: type === 'all' ? undefined : type
    })
  }

  // USER ACTION HANDLER
  const handleUserAction = async (ticketId: string, action: 'accept' | 'decline' | 'cancel') => {
    if (!isAuthenticated) return

    const confirmMessages = {
      accept: 'Accept this quote? You will proceed with the trade.',
      decline: 'Decline this quote? This will cancel your request.',
      cancel: 'Cancel this request? This action cannot be undone.'
    }

    if (!confirm(confirmMessages[action])) return

    setActionLoading(ticketId)

    try {
      const updates = {
        accept: { status: 'processing' },
        decline: { status: 'cancelled' },
        cancel: { status: 'cancelled' }
      }

      const response = await fetch(`/api/tickets?id=${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates[action])
      })

      if (response.ok) {
        refresh() // Refresh the tickets list
        alert(`Request ${action}ed successfully!`)
      } else {
        throw new Error('Failed to update ticket')
      }
    } catch (error) {
      console.error('Error updating ticket:', error)
      alert(`Failed to ${action} request. Please try again.`)
    } finally {
      setActionLoading(null)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading..." />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-12">
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="text-3xl font-bold text-white mb-4">Sign In Required</h1>
            <p className="text-gray-300 mb-8">
              You need to be signed in to view your tickets and trading history.
            </p>
            <GlassButton variant="primary" size="lg">
              Sign In with Google
            </GlassButton>
          </GlassCard>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Tickets</h1>
            <p className="text-gray-300">
              Track your buy and sell requests
            </p>
          </div>
          
          <div className="flex gap-3">
            <GlassButton onClick={refresh} disabled={isLoading}>
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </GlassButton>
            
            <Link href="/sell">
              <GlassButton variant="secondary">
                <Plus className="w-4 h-4" />
                New Ticket
              </GlassButton>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-gray-400">Total</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
            <div className="text-xs text-gray-400">Pending</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.processing}</div>
            <div className="text-xs text-gray-400">Processing</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
            <div className="text-xs text-gray-400">Completed</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.buyTickets}</div>
            <div className="text-xs text-gray-400">Buy Requests</div>
          </GlassCard>
          
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.sellTickets}</div>
            <div className="text-xs text-gray-400">Sell Requests</div>
          </GlassCard>
        </div>

        {/* Filters */}
        <GlassCard className="p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-3">Filter by Status</h3>
              <div className="flex flex-wrap gap-2">
                <GlassButton
                  size="sm"
                  variant={selectedStatus === 'all' ? 'primary' : 'glass'}
                  onClick={() => handleStatusFilter('all')}
                >
                  All Status
                </GlassButton>
                {Object.entries(statusConfig).map(([status, config]) => (
                  <GlassButton
                    key={status}
                    size="sm"
                    variant={selectedStatus === status ? 'primary' : 'glass'}
                    onClick={() => handleStatusFilter(status as TicketStatus)}
                    className={selectedStatus === status ? '' : config.color}
                  >
                    <config.icon className="w-3 h-3 mr-1" />
                    {config.label}
                  </GlassButton>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-3">Filter by Type</h3>
              <div className="flex flex-wrap gap-2">
                <GlassButton
                  size="sm"
                  variant={selectedType === 'all' ? 'primary' : 'glass'}
                  onClick={() => handleTypeFilter('all')}
                >
                  All Types
                </GlassButton>
                <GlassButton
                  size="sm"
                  variant={selectedType === 'buy' ? 'primary' : 'glass'}
                  onClick={() => handleTypeFilter('buy')}
                  className={selectedType === 'buy' ? '' : 'text-blue-400'}
                >
                  🛒 Buy Requests
                </GlassButton>
                <GlassButton
                  size="sm"
                  variant={selectedType === 'sell' ? 'primary' : 'glass'}
                  onClick={() => handleTypeFilter('sell')}
                  className={selectedType === 'sell' ? '' : 'text-green-400'}
                >
                  💰 Sell Requests
                </GlassButton>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Tickets List */}
        {isLoading ? (
          <SkeletonList count={5} />
        ) : tickets.length > 0 ? (
          <div className="space-y-4">
            {tickets.map((ticket, index) => {
              const statusInfo = statusConfig[ticket.status as keyof typeof statusConfig]
              const StatusIcon = statusInfo.icon
              
              return (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <GlassCard className="p-6 hover:bg-white/8 transition-colors">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Main Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-1">
                              {ticket.skin_name}
                            </h3>
                            <p className="text-gray-300 text-sm">
                              {ticket.condition_name} • Ticket #{ticket.id.split('-').pop()}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {/* Type Badge */}
                            <span className={`
                              px-3 py-1 rounded-full text-xs font-medium
                              ${ticket.type === 'buy' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}
                            `}>
                              {ticket.type === 'buy' ? '🛒 Buy' : '💰 Sell'}
                            </span>
                            
                            {/* Status Badge */}
                            <span className={`
                              px-3 py-1 rounded-full text-xs font-medium border
                              ${statusInfo.bg} ${statusInfo.color} ${statusInfo.border}
                            `}>
                              <StatusIcon className="w-3 h-3 inline mr-1" />
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>
                        
                        {/* Price Info */}
                        {(ticket.price || ticket.quoted_price) && (
                          <div className="mb-3">
                            {ticket.quoted_price && (
                              <div className="text-lg font-bold text-green-400">
                                Quote: {formatPrice(ticket.quoted_price)}
                              </div>
                            )}
                            {ticket.price && ticket.price !== ticket.quoted_price && (
                              <div className="text-sm text-gray-400">
                                Final: {formatPrice(ticket.price)}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Notes */}
                        {ticket.notes && (
                          <p className="text-gray-300 text-sm mb-3 bg-white/5 p-3 rounded-lg">
                            {ticket.notes}
                          </p>
                        )}
                        
                        {/* Admin Notes */}
                        {ticket.admin_notes && (
                          <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg mb-3">
                            <p className="text-blue-300 text-sm">
                              <strong>Admin Note:</strong> {ticket.admin_notes}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {/* Timestamps & Actions */}
                      <div className="lg:w-64 space-y-4">
                        {/* Timestamps */}
                        <div className="space-y-2 text-right lg:text-left">
                          <div>
                            <p className="text-xs text-gray-400">Created</p>
                            <p className="text-sm text-gray-300">{getRelativeTime(ticket.created_at)}</p>
                          </div>
                          
                          {ticket.updated_at !== ticket.created_at && (
                            <div>
                              <p className="text-xs text-gray-400">Updated</p>
                              <p className="text-sm text-gray-300">{getRelativeTime(ticket.updated_at)}</p>
                            </div>
                          )}
                        </div>
                        
                        {/* USER ACTION BUTTONS */}
                        <div className="space-y-2">
                          {/* Quote Sent - User can Accept/Decline */}
                          {ticket.status === 'quote_sent' && ticket.quoted_price && (
                            <div className="space-y-2">
                              <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <p className="text-green-400 font-semibold text-sm">
                                  {ticket.type === 'buy' ? 'Pay' : 'You get'}: {formatPrice(ticket.quoted_price)}
                                </p>
                              </div>
                              <GlassButton 
                                size="sm" 
                                variant="primary" 
                                className="w-full"
                                onClick={() => handleUserAction(ticket.id, 'accept')}
                                loading={actionLoading === ticket.id}
                                disabled={actionLoading !== null}
                              >
                                ✅ Accept Quote
                              </GlassButton>
                              <GlassButton 
                                size="sm" 
                                className="w-full"
                                onClick={() => handleUserAction(ticket.id, 'decline')}
                                loading={actionLoading === ticket.id}
                                disabled={actionLoading !== null}
                              >
                                ❌ Decline Quote
                              </GlassButton>
                            </div>
                          )}
                          
                          {/* Pending - User can Cancel */}
                          {ticket.status === 'pending' && (
                            <GlassButton 
                              size="sm" 
                              variant="danger" 
                              className="w-full"
                              onClick={() => handleUserAction(ticket.id, 'cancel')}
                              loading={actionLoading === ticket.id}
                              disabled={actionLoading !== null}
                            >
                              🗑️ Cancel Request
                            </GlassButton>
                          )}
                          
                          {/* Processing - Show status */}
                          {ticket.status === 'processing' && (
                            <div className="text-center p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                              <p className="text-blue-400 text-sm">
                                🔄 Trade in progress...
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                Admin is processing your trade
                              </p>
                            </div>
                          )}
                          
                          {/* Completed - Show success */}
                          {ticket.status === 'completed' && (
                            <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                              <p className="text-green-400 text-sm">
                                🎉 Trade completed!
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                Thank you for trading with us
                              </p>
                            </div>
                          )}
                          
                          {/* Cancelled - Show cancelled */}
                          {ticket.status === 'cancelled' && (
                            <div className="text-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                              <p className="text-red-400 text-sm">
                                ⭕ Request cancelled
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                You can create a new request anytime
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
            
            {/* Load More */}
            {pagination.page < pagination.totalPages && (
              <div className="text-center pt-8">
                <GlassButton onClick={loadMore} disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Load More'}
                </GlassButton>
              </div>
            )}
          </div>
        ) : (
          <GlassCard className="p-12 text-center">
            <div className="text-6xl mb-6">📋</div>
            <h3 className="text-2xl font-bold text-white mb-4">No tickets found</h3>
            <p className="text-gray-300 mb-8">
              {selectedStatus !== 'all' || selectedType !== 'all' 
                ? 'No tickets match your current filters. Try adjusting the filters or create a new request.'
                : 'You haven\'t created any buy or sell requests yet. Start by browsing skins or selling your items.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sell">
                <GlassButton variant="secondary">
                  <Plus className="w-4 h-4" />
                  Create Sell Request
                </GlassButton>
              </Link>
              
              <Link href="/browse">
                <GlassButton>
                  Browse Skins
                </GlassButton>
              </Link>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  )
}