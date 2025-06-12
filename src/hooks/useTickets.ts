import { useEffect, useCallback } from 'react'
import { useTicketStore } from '@/store/ticketStore'
import { TicketFormData, TicketStatus, TicketType } from '@/types'
import { useAuth } from './useAuth'

export function useTickets() {
  const { isAuthenticated } = useAuth()
  const {
    tickets,
    isLoading,
    pagination,
    filters,
    fetchTickets,
    createTicket,
    updateTicketStatus,
    setFilters,
    loadMore,
    refresh,
    getTicketById,
    getTicketsByStatus,
    getRecentTickets,
  } = useTicketStore()

  const handleCreateTicket = useCallback(async (ticketData: TicketFormData) => {
    if (!isAuthenticated) {
      throw new Error('Must be authenticated to create ticket')
    }
    return await createTicket(ticketData)
  }, [isAuthenticated, createTicket])

  const handleUpdateTicket = useCallback(async (ticketId: string, updates: any) => {
    return await updateTicketStatus(ticketId, updates)
  }, [updateTicketStatus])

  const handleFilterChange = useCallback((newFilters: { status?: TicketStatus; type?: TicketType }) => {
    setFilters(newFilters)
    refresh()
  }, [setFilters, refresh])

  // Fetch tickets when authenticated
  useEffect(() => {
    if (isAuthenticated && tickets.length === 0) {
      fetchTickets()
    }
  }, [isAuthenticated, tickets.length, fetchTickets])

  return {
    tickets,
    isLoading,
    pagination,
    filters,
    handleCreateTicket,
    handleUpdateTicket,
    handleFilterChange,
    loadMore,
    refresh,
    getTicketById,
    getTicketsByStatus,
    getRecentTickets,
  }
}

export function useTicketDetail(ticketId: string) {
  const { getTicketById, fetchTickets } = useTicketStore()
  const ticket = getTicketById(ticketId)

  useEffect(() => {
    if (!ticket) {
      fetchTickets()
    }
  }, [ticket, fetchTickets])

  return {
    ticket,
    isLoading: !ticket,
  }
}

export function useTicketStats() {
  const { tickets } = useTicketStore()

  const stats = {
    total: tickets.length,
    pending: tickets.filter(t => t.status === 'pending').length,
    processing: tickets.filter(t => t.status === 'processing').length,
    completed: tickets.filter(t => t.status === 'completed').length,
    cancelled: tickets.filter(t => t.status === 'cancelled').length,
    sellTickets: tickets.filter(t => t.type === 'sell').length,
    buyTickets: tickets.filter(t => t.type === 'buy').length,
  }

  return stats
}