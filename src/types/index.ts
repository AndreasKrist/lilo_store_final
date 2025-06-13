// src/types/index.ts - CORRECTED with official CS2 categorization

// CS2 Skin Conditions (Wear Levels)
export type SkinCondition = 'fn' | 'mw' | 'ft' | 'ww' | 'bs'

// CORRECTED CS2 Weapon Categories (based on actual CS2 weapon classification)
export type WeaponType = 'pistol' | 'rifle' | 'smg' | 'shotgun' | 'sniper' | 'heavy' | 'knife' | 'gloves'

// CORRECTED CS2 Rarity System (8 official tiers)
export type SkinRarity = 'consumer' | 'industrial' | 'milspec' | 'restricted' | 'classified' | 'covert' | 'contraband' | 'extraordinary'

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

// Enhanced Skin interface with proper CS2 data
export interface Skin {
  id: string
  name: string
  weapon_type: WeaponType
  weapon_name?: string
  category?: string
  rarity: SkinRarity
  rarity_name: string
  rarity_color: string
  pattern_name?: string
  min_float?: number
  max_float?: number
  stattrak?: boolean
  souvenir?: boolean
  image_url: string
  description?: string
  market_hash_name: string
  steam_market_url?: string
  collections?: string[]
  crates?: string[]
  wears?: string[]
  type: string
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
  high_price?: number
  low_price?: number
  volume?: number
  price_change_24h?: number
  market_trend?: 'up' | 'down' | 'stable'
  last_updated: string
}

// Enhanced Ticket interface
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

// Enhanced Search and filter types
export interface SkinFilters {
  search?: string
  weapon_types?: WeaponType[]
  rarities?: SkinRarity[]
  conditions?: SkinCondition[]
  price_min?: number
  price_max?: number
  stattrak?: boolean
  souvenir?: boolean
  collections?: string[]
  sort_by?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest' | 'rarity_asc' | 'rarity_desc'
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

// CORRECTED CS2 Constants with proper values
export const SKIN_CONDITIONS: Record<SkinCondition, string> = {
  fn: 'Factory New',
  mw: 'Minimal Wear',
  ft: 'Field-Tested',
  ww: 'Well-Worn',
  bs: 'Battle-Scarred'
}

export const WEAPON_TYPES: Record<WeaponType, string> = {
  pistol: 'Pistols',
  rifle: 'Rifles', 
  smg: 'SMGs',
  shotgun: 'Shotguns',
  sniper: 'Sniper Rifles',
  heavy: 'Heavy',
  knife: 'Knives',
  gloves: 'Gloves'
}

// CORRECTED CS2 Rarity System (8 official tiers)
export const SKIN_RARITIES: Record<SkinRarity, { 
  name: string; 
  color: string; 
  displayColor: string;
  probability: string;
}> = {
  consumer: { 
    name: 'Consumer Grade', 
    color: 'white', 
    displayColor: '#B0C3D9',
    probability: '~80%'
  },
  industrial: { 
    name: 'Industrial Grade', 
    color: 'lightblue', 
    displayColor: '#5E98D9',
    probability: '~16%'
  },
  milspec: { 
    name: 'Mil-Spec Grade', 
    color: 'blue', 
    displayColor: '#4B69FF',
    probability: '~79.92%'
  },
  restricted: { 
    name: 'Restricted', 
    color: 'purple', 
    displayColor: '#8847FF',
    probability: '~15.98%'
  },
  classified: { 
    name: 'Classified', 
    color: 'pink', 
    displayColor: '#D32CE6',
    probability: '~3.20%'
  },
  covert: { 
    name: 'Covert', 
    color: 'red', 
    displayColor: '#EB4B4B',
    probability: '~0.64%'
  },
  contraband: { 
    name: 'Contraband', 
    color: 'orange', 
    displayColor: '#E4AE39',
    probability: 'Unique (M4A4 Howl only)'
  },
  extraordinary: { 
    name: 'Extraordinary', 
    color: 'gold', 
    displayColor: '#FFEAA7',
    probability: '~0.26% (Gloves only)'
  }
}

// CS2 Condition Float Ranges
export const CONDITION_FLOAT_RANGES: Record<SkinCondition, { min: number; max: number }> = {
  fn: { min: 0.00, max: 0.07 },
  mw: { min: 0.07, max: 0.15 },
  ft: { min: 0.15, max: 0.38 },
  ww: { min: 0.38, max: 0.45 },
  bs: { min: 0.45, max: 1.00 }
}

// CORRECTED CS2 Weapon Subcategories (for detailed filtering)
export const WEAPON_SUBCATEGORIES: Record<WeaponType, string[]> = {
  pistol: ['Glock-18', 'USP-S', 'P2000', 'P250', 'Five-SeveN', 'Tec-9', 'CZ75-Auto', 'Desert Eagle', 'R8 Revolver', 'Dual Berettas'],
  rifle: ['AK-47', 'M4A4', 'M4A1-S', 'FAMAS', 'Galil AR', 'AUG', 'SG 553'],
  smg: ['MAC-10', 'MP9', 'MP7', 'MP5-SD', 'UMP-45', 'P90', 'PP-Bizon'],
  shotgun: ['Nova', 'XM1014', 'Sawed-Off', 'MAG-7'],
  sniper: ['AWP', 'SSG 08', 'G3SG1', 'SCAR-20'],
  heavy: ['Negev', 'M249'],
  knife: ['Bayonet', 'Flip Knife', 'Gut Knife', 'Karambit', 'M9 Bayonet', 'Huntsman Knife', 'Falchion Knife', 'Bowie Knife', 'Butterfly Knife', 'Shadow Daggers', 'Paracord Knife', 'Survival Knife', 'Ursus Knife', 'Navaja Knife', 'Nomad Knife', 'Stiletto Knife', 'Talon Knife', 'Skeleton Knife', 'Classic Knife', 'Kukri Knife'],
  gloves: ['Bloodhound Gloves', 'Sport Gloves', 'Driver Gloves', 'Hand Wraps', 'Moto Gloves', 'Specialist Gloves', 'Hydra Gloves', 'Broken Fang Gloves']
}