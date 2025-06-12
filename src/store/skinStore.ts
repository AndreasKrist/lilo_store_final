import { create } from 'zustand'
import { Skin, SkinFilters, SkinStore } from '@/types'

export const useSkinStore = create<SkinStore>((set, get) => ({
  skins: [],
  filteredSkins: [],
  filters: {
    search: '',
    weapon_types: [],
    rarities: [],
    conditions: [],
    price_min: undefined,
    price_max: undefined,
    sort_by: 'name_asc'
  },
  isLoading: false,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  },

  setSkins: (skins: Skin[]) => 
    set({ skins, filteredSkins: skins }),

  setFilters: (filters: Partial<SkinFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
      pagination: { ...state.pagination, page: 1 } // Reset to first page when filtering
    }))
    // Trigger search with new filters
    get().searchSkins()
  },

  setLoading: (loading: boolean) => 
    set({ isLoading: loading }),

  setPagination: (pagination: Partial<SkinStore['pagination']>) =>
    set((state) => ({
      pagination: { ...state.pagination, ...pagination }
    })),

  searchSkins: async () => {
    const { filters, pagination } = get()
    set({ isLoading: true })

    try {
      // Build query parameters
      const params = new URLSearchParams()
      
      if (filters.search) params.append('search', filters.search)
      if (filters.weapon_types?.length) params.append('weapon_types', filters.weapon_types.join(','))
      if (filters.rarities?.length) params.append('rarities', filters.rarities.join(','))
      if (filters.conditions?.length) params.append('conditions', filters.conditions.join(','))
      if (filters.price_min !== undefined) params.append('price_min', filters.price_min.toString())
      if (filters.price_max !== undefined) params.append('price_max', filters.price_max.toString())
      if (filters.sort_by) params.append('sort_by', filters.sort_by)
      
      params.append('page', pagination.page.toString())
      params.append('limit', pagination.limit.toString())

      const response = await fetch(`/api/skins?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch skins')
      }

      const data = await response.json()
      
      set({
        skins: data.data,
        filteredSkins: data.data,
        pagination: {
          page: data.page,
          limit: data.limit,
          total: data.total,
          totalPages: data.totalPages
        },
        isLoading: false
      })

    } catch (error) {
      console.error('Error searching skins:', error)
      set({ isLoading: false })
    }
  },

  clearFilters: () => {
    set({
      filters: {
        search: '',
        weapon_types: [],
        rarities: [],
        conditions: [],
        price_min: undefined,
        price_max: undefined,
        sort_by: 'name_asc'
      },
      pagination: { page: 1, limit: 12, total: 0, totalPages: 0 }
    })
    get().searchSkins()
  },

  loadMore: () => {
    const { pagination } = get()
    if (pagination.page < pagination.totalPages) {
      set((state) => ({
        pagination: { ...state.pagination, page: state.pagination.page + 1 }
      }))
      get().searchSkins()
    }
  },

  getSkinById: (id: string): Skin | undefined => {
    return get().skins.find(skin => skin.id === id)
  },

  getPopularSkins: (): Skin[] => {
    // Return first 6 skins as "popular" (in real app, this would be based on actual data)
    return get().skins.slice(0, 6)
  },

  getFeaturedSkins: (): Skin[] => {
    // Return skins with covert or classified rarity as "featured"
    return get().skins.filter(skin => ['covert', 'classified'].includes(skin.rarity)).slice(0, 3)
  },
}))

// Initialize the store with some data on first load
if (typeof window !== 'undefined') {
  useSkinStore.getState().searchSkins()
}