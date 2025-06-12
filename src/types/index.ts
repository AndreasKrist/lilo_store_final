// Skin related types
export type SkinCondition = 'fn' | 'mw' | 'ft' | 'ww' | 'bs'
export type WeaponType = 'rifle' | 'pistol' | 'sniper' | 'smg' | 'shotgun' | 'knife' | 'gloves'
export type SkinRarity = 'covert' | 'classified' | 'restricted' | 'milspec' | 'industrial' | 'consumer'

// Ticket and transaction types
export type TicketType = 'buy' | 'sell'
export type TicketStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'quote_sent'

// User and authentication types
export interface User {
  id: string
  email: string
  name: string
  avatar_url: string
  trade_link?: string
  phone_number?: string
  created_at: string
  updated_at: string
}

// Skin and market data types
export interface Skin {
  id: string
  name: string
  weapon_type: WeaponType
  rarity: SkinRarity
  image_url: string
  description: string
  market_hash_name: string
  steam_market_url?: string
  created_at: string
  updated_at: string
}

export interface SkinConditionPrice {
  id: string
  skin_id: string
  condition: SkinCondition
  condition_name: string
  float_range: string
  base_price: number
  current_price: number
  steam_price?: number
  last_updated: string
}

// Ticket system types
export interface Ticket {
  id: string
  user_id: string
  type: TicketType
  skin_name: string
  condition: SkinCondition
  condition_name: string
  price?: number
  quoted_price?: number
  status: TicketStatus
  notes?: string
  admin_notes?: string
  steam_trade_url?: string
  payment_method?: string
  created_at: string
  updated_at: string
  user?: User
  skin?: Skin
}

// Search and filter types
export interface SkinFilters {
  search?: string
  weapon_types?: WeaponType[]
  rarities?: SkinRarity[]
  conditions?: SkinCondition[]
  price_min?: number
  price_max?: number
  sort_by?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest'
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form types
export interface TicketFormData {
  type: TicketType
  skin_name: string
  condition: SkinCondition
  notes?: string
}

export interface ProfileFormData {
  trade_link?: string
  phone_number?: string
}

// Component prop types
export interface SkinCardProps {
  skin: Skin
  conditionData: SkinConditionPrice
  onBuy: (skinId: string, condition: SkinCondition) => void
  onSell: (skinId: string, condition: SkinCondition) => void
}

export interface TicketCardProps {
  ticket: Ticket
  onUpdate?: (ticketId: string) => void
}

// Store types for Zustand
export interface AuthStore {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export interface SkinStore {
  skins: Skin[]
  filteredSkins: Skin[]
  filters: SkinFilters
  isLoading: boolean
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  setSkins: (skins: Skin[]) => void
  setFilters: (filters: Partial<SkinFilters>) => void
  setLoading: (loading: boolean) => void
  setPagination: (pagination: Partial<SkinStore['pagination']>) => void
  searchSkins: () => Promise<void>
  clearFilters: () => void
  loadMore: () => void
  getSkinById: (id: string) => Skin | undefined
  getPopularSkins: () => Skin[]
  getFeaturedSkins: () => Skin[]
}

export interface TicketStore {
  tickets: Ticket[]
  isLoading: boolean
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: {
    status?: TicketStatus
    type?: TicketType
  }
  setTickets: (tickets: Ticket[]) => void
  addTicket: (ticket: Ticket) => void
  updateTicket: (ticketId: string, updates: Partial<Ticket>) => void
  setLoading: (loading: boolean) => void
  setPagination: (pagination: Partial<TicketStore['pagination']>) => void
  setFilters: (filters: Partial<TicketStore['filters']>) => void
  fetchTickets: () => Promise<void>
  createTicket: (ticketData: TicketFormData) => Promise<Ticket | null>
  updateTicketStatus: (ticketId: string, updates: Partial<Ticket>) => Promise<boolean>
  loadMore: () => void
  refresh: () => void
  getTicketById: (id: string) => Ticket | undefined
  getTicketsByStatus: (status: string) => Ticket[]
  getRecentTickets: (limit?: number) => Ticket[]
}

// Constants
export const SKIN_CONDITIONS: Record<SkinCondition, string> = {
  fn: 'Factory New',
  mw: 'Minimal Wear',
  ft: 'Field-Tested',
  ww: 'Well-Worn',
  bs: 'Battle-Scarred'
}

export const WEAPON_TYPES: Record<WeaponType, string> = {
  rifle: 'Rifles',
  pistol: 'Pistols',
  sniper: 'Sniper Rifles',
  smg: 'SMGs',
  shotgun: 'Shotguns',
  knife: 'Knives',
  gloves: 'Gloves'
}

export const SKIN_RARITIES: Record<SkinRarity, { name: string; color: string }> = {
  covert: { name: 'Covert', color: 'red' },
  classified: { name: 'Classified', color: 'purple' },
  restricted: { name: 'Restricted', color: 'blue' },
  milspec: { name: 'Mil-Spec', color: 'indigo' },
  industrial: { name: 'Industrial', color: 'gray' },
  consumer: { name: 'Consumer', color: 'gray' }
}