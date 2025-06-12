import { create } from 'zustand'
import { Ticket, TicketStore, TicketFormData } from '@/types'

export const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: [],
  isLoading: false,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  },
  filters: {
    status: undefined,
    type: undefined
  },

  setTickets: (tickets: Ticket[]) => 
    set({ tickets }),

  addTicket: (ticket: Ticket) => 
    set((state) => ({ 
      tickets: [ticket, ...state.tickets],
      pagination: { ...state.pagination, total: state.pagination.total + 1 }
    })),

  updateTicket: (ticketId: string, updates: Partial<Ticket>) =>
    set((state) => ({
      tickets: state.tickets.map(ticket =>
        ticket.id === ticketId 
          ? { ...ticket, ...updates, updated_at: new Date().toISOString() }
          : ticket
      )
    })),

  setLoading: (loading: boolean) => 
    set({ isLoading: loading }),

  setPagination: (pagination: Partial<TicketStore['pagination']>) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination }
    })),

  setFilters: (filters: Partial<TicketStore['filters']>) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, page: 1 }
    })),

  fetchTickets: async () => {
    const { pagination, filters } = get()
    set({ isLoading: true })

    try {
      const params = new URLSearchParams()
      params.append('page', pagination.page.toString())
      params.append('limit', pagination.limit.toString())
      
      if (filters.status) params.append('status', filters.status)
      if (filters.type) params.append('type', filters.type)

      const response = await fetch(`/api/tickets?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch tickets')
      }

      const data = await response.json()
      
      set({
        tickets: pagination.page === 1 ? data.data : [...get().tickets, ...data.data],
        pagination: {
          page: data.page,
          limit: data.limit,
          total: data.total,
          totalPages: data.totalPages
        },
        isLoading: false
      })

    } catch (error) {
      console.error('Error fetching tickets:', error)
      set({ isLoading: false })
    }
  },

  createTicket: async (ticketData: TicketFormData): Promise<Ticket | null> => {
    set({ isLoading: true })

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      })

      if (!response.ok) {
        throw new Error('Failed to create ticket')
      }

      const newTicket = await response.json()
      get().addTicket(newTicket)
      set({ isLoading: false })
      
      return newTicket

    } catch (error) {
      console.error('Error creating ticket:', error)
      set({ isLoading: false })
      return null
    }
  },

  updateTicketStatus: async (ticketId: string, updates: Partial<Ticket>): Promise<boolean> => {
    try {
      const response = await fetch(`/api/tickets?id=${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        throw new Error('Failed to update ticket')
      }

      const updatedTicket = await response.json()
      get().updateTicket(ticketId, updatedTicket)
      
      return true

    } catch (error) {
      console.error('Error updating ticket:', error)
      return false
    }
  },

  getTicketById: (id: string): Ticket | undefined => {
    return get().tickets.find(ticket => ticket.id === id)
  },

  getTicketsByStatus: (status: string): Ticket[] => {
    return get().tickets.filter(ticket => ticket.status === status)
  },

  getRecentTickets: (limit = 5): Ticket[] => {
    return get().tickets
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit)
  },

  loadMore: () => {
    const { pagination } = get()
    if (pagination.page < pagination.totalPages) {
      set((state) => ({
        pagination: { ...state.pagination, page: state.pagination.page + 1 }
      }))
      get().fetchTickets()
    }
  },

  refresh: () => {
    set((state) => ({
      pagination: { ...state.pagination, page: 1 }
    }))
    get().fetchTickets()
  },
}))

// Auto-fetch tickets when store is initialized (client-side only)
if (typeof window !== 'undefined') {
  // Wait a bit for auth to be ready
  setTimeout(() => {
    useTicketStore.getState().fetchTickets()
  }, 1000)
}