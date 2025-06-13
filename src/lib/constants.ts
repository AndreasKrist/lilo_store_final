// src/lib/constants.ts - CORRECTED with official CS2 system

import { SkinCondition, WeaponType, SkinRarity, TicketStatus } from '@/types'

// Application constants
export const APP_NAME = 'Lilo Store'
export const APP_DESCRIPTION = 'Premium CS2 Skin Trading Platform'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// CS2 Skin conditions with accurate display info and colors
export const SKIN_CONDITIONS: Record<SkinCondition, { 
  name: string; 
  color: string; 
  shortName: string;
  floatRange: string;
  description: string;
}> = {
  fn: { 
    name: 'Factory New', 
    color: 'text-green-400', 
    shortName: 'FN',
    floatRange: '0.00 - 0.07',
    description: 'Minimal signs of wear'
  },
  mw: { 
    name: 'Minimal Wear', 
    color: 'text-blue-400', 
    shortName: 'MW',
    floatRange: '0.07 - 0.15', 
    description: 'Slightly worn but well-maintained'
  },
  ft: { 
    name: 'Field-Tested', 
    color: 'text-yellow-400', 
    shortName: 'FT',
    floatRange: '0.15 - 0.38',
    description: 'Noticeable wear from field use'
  },
  ww: { 
    name: 'Well-Worn', 
    color: 'text-orange-400', 
    shortName: 'WW',
    floatRange: '0.38 - 0.45',
    description: 'Considerable wear and tear'
  },
  bs: { 
    name: 'Battle-Scarred', 
    color: 'text-red-400', 
    shortName: 'BS',
    floatRange: '0.45 - 1.00',
    description: 'Heavy battle damage'
  }
}

// CORRECTED CS2 Weapon types - matches official CS2 categorization
export const WEAPON_TYPES: Record<WeaponType, { 
  name: string; 
  emoji: string; 
  category: string;
  description: string;
}> = {
  pistol: { 
    name: 'Pistols', 
    emoji: '🔫', 
    category: 'Secondary',
    description: 'Sidearms for backup and eco rounds'
  },
  rifle: { 
    name: 'Rifles', 
    emoji: '🔫', 
    category: 'Primary',
    description: 'Main assault weapons for all ranges'
  },
  smg: { 
    name: 'SMGs', 
    emoji: '🔫', 
    category: 'Primary',
    description: 'Submachine guns for close-quarters'
  },
  shotgun: { 
    name: 'Shotguns', 
    emoji: '💥', 
    category: 'Heavy',
    description: 'Close-range devastating power'
  },
  sniper: { 
    name: 'Sniper Rifles', 
    emoji: '🎯', 
    category: 'Primary',
    description: 'Long-range precision weapons'
  },
  heavy: { 
    name: 'Heavy', 
    emoji: '🔫', 
    category: 'Heavy',
    description: 'Machine guns for suppressive fire'
  },
  knife: { 
    name: 'Knives', 
    emoji: '🔪', 
    category: 'Melee',
    description: 'Melee weapons with unique designs'
  },
  gloves: { 
    name: 'Gloves', 
    emoji: '🧤', 
    category: 'Equipment',
    description: 'Hand protection with style'
  }
}

// OFFICIAL CS2 Rarity System (8 tiers) with accurate colors and probabilities
export const SKIN_RARITIES: Record<SkinRarity, { 
  name: string; 
  color: string; 
  bgColor: string; 
  borderColor: string;
  textColor: string;
  probability: string;
  description: string;
}> = {
  consumer: { 
    name: 'Consumer Grade', 
    color: '#B0C3D9',
    bgColor: 'bg-gray-500/20', 
    borderColor: 'border-gray-500',
    textColor: 'text-gray-300',
    probability: '~80%',
    description: 'Most common skins with basic designs'
  },
  industrial: { 
    name: 'Industrial Grade', 
    color: '#5E98D9',
    bgColor: 'bg-blue-600/20', 
    borderColor: 'border-blue-600',
    textColor: 'text-blue-300',
    probability: '~16%',
    description: 'Common skins with improved aesthetics'
  },
  milspec: { 
    name: 'Mil-Spec Grade', 
    color: '#4B69FF',
    bgColor: 'bg-indigo-500/20', 
    borderColor: 'border-indigo-500',
    textColor: 'text-indigo-400',
    probability: '~79.92%', // From cases
    description: 'Rare skins with distinct patterns'
  },
  restricted: { 
    name: 'Restricted', 
    color: '#8847FF',
    bgColor: 'bg-purple-500/20', 
    borderColor: 'border-purple-500',
    textColor: 'text-purple-400',
    probability: '~15.98%', // From cases
    description: 'Rare skins with unique designs'
  },
  classified: { 
    name: 'Classified', 
    color: '#D32CE6',
    bgColor: 'bg-pink-500/20', 
    borderColor: 'border-pink-500',
    textColor: 'text-pink-400',
    probability: '~3.20%', // From cases
    description: 'Very rare skins with premium artwork'
  },
  covert: { 
    name: 'Covert', 
    color: '#EB4B4B',
    bgColor: 'bg-red-500/20', 
    borderColor: 'border-red-500',
    textColor: 'text-red-400',
    probability: '~0.64%', // From cases, includes all knives
    description: 'Extremely rare skins and all knives'
  },
  contraband: { 
    name: 'Contraband', 
    color: '#E4AE39',
    bgColor: 'bg-orange-500/20', 
    borderColor: 'border-orange-500',
    textColor: 'text-orange-400',
    probability: 'Unique',
    description: 'M4A4 Howl - removed from cases'
  },
  extraordinary: { 
    name: 'Extraordinary', 
    color: '#FFEAA7',
    bgColor: 'bg-yellow-500/20', 
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-400',
    probability: '~0.26%', // Gloves only
    description: 'Exclusive gloves with premium materials'
  }
}

// Ticket status configuration
export const TICKET_STATUS: Record<TicketStatus, {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}> = {
  pending: {
    name: 'Pending Review',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30',
    description: 'Your request is waiting for admin review'
  },
  quote_sent: {
    name: 'Quote Sent',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30',
    description: 'We\'ve sent you a price quote'
  },
  processing: {
    name: 'Processing',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    description: 'Trade is being processed'
  },
  completed: {
    name: 'Completed',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    description: 'Trade completed successfully'
  },
  cancelled: {
    name: 'Cancelled',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    description: 'Request was cancelled'
  }
}

// CORRECTED CS2 Weapon Subcategories for advanced filtering
export const WEAPON_SUBCATEGORIES: Record<WeaponType, string[]> = {
  pistol: [
    'Glock-18', 'USP-S', 'P2000', 'P250', 'Five-SeveN', 
    'Tec-9', 'CZ75-Auto', 'Desert Eagle', 'R8 Revolver', 'Dual Berettas'
  ],
  rifle: [
    'AK-47', 'M4A4', 'M4A1-S', 'FAMAS', 'Galil AR', 'AUG', 'SG 553'
  ],
  smg: [
    'MAC-10', 'MP9', 'MP7', 'MP5-SD', 'UMP-45', 'P90', 'PP-Bizon'
  ],
  shotgun: [
    'Nova', 'XM1014', 'Sawed-Off', 'MAG-7'
  ],
  sniper: [
    'AWP', 'SSG 08', 'G3SG1', 'SCAR-20'
  ],
  heavy: [
    'Negev', 'M249'
  ],
  knife: [
    'Bayonet', 'Flip Knife', 'Gut Knife', 'Karambit', 'M9 Bayonet',
    'Huntsman Knife', 'Falchion Knife', 'Bowie Knife', 'Butterfly Knife',
    'Shadow Daggers', 'Paracord Knife', 'Survival Knife', 'Ursus Knife',
    'Navaja Knife', 'Nomad Knife', 'Stiletto Knife', 'Talon Knife',
    'Skeleton Knife', 'Classic Knife', 'Kukri Knife'
  ],
  gloves: [
    'Bloodhound Gloves', 'Sport Gloves', 'Driver Gloves', 'Hand Wraps',
    'Moto Gloves', 'Specialist Gloves', 'Hydra Gloves', 'Broken Fang Gloves'
  ]
}

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  SKINS_PER_PAGE: 12,
  TICKETS_PER_PAGE: 10,
  MAX_PER_PAGE: 50
}

// Updated price ranges for filtering (CS2 market reality 2024-2025)
export const PRICE_RANGES = [
  { label: 'Under $1', min: 0, max: 1 },
  { label: '$1 - $10', min: 1, max: 10 },
  { label: '$10 - $50', min: 10, max: 50 },
  { label: '$50 - $200', min: 50, max: 200 },
  { label: '$200 - $1000', min: 200, max: 1000 },
  { label: '$1000 - $5000', min: 1000, max: 5000 },
  { label: 'Over $5000', min: 5000, max: null }
]

// Sort options for skins
export const SKIN_SORT_OPTIONS = [
  { value: 'name_asc', label: 'Name A-Z' },
  { value: 'name_desc', label: 'Name Z-A' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rarity_asc', label: 'Rarity: Common to Rare' },
  { value: 'rarity_desc', label: 'Rarity: Rare to Common' },
  { value: 'newest', label: 'Newest First' }
]

// Quick filter suggestions for CS2
export const QUICK_FILTERS = [
  'AK-47',
  'AWP',
  'M4A4',
  'Karambit',
  'Knife',
  'Gloves',
  'Factory New',
  'Covert',
  'Classified',
  'Dragon Lore',
  'Asiimov',
  'Under $100'
]

// OFFICIAL CS2 Case drop probabilities from Valve
export const CASE_DROP_PROBABILITIES = {
  'Mil-Spec': 79.92,
  'Restricted': 15.98,
  'Classified': 3.20,
  'Covert': 0.64,
  'Knives/Gloves': 0.26
}

// Popular CS2 skin collections
export const POPULAR_COLLECTIONS = [
  'The Dust 2 Collection',
  'The Mirage Collection', 
  'The Inferno Collection',
  'The Cache Collection',
  'The Cobblestone Collection',
  'The Overpass Collection',
  'The Norse Collection',
  'The Prisma Collection',
  'The Shattered Web Collection',
  'The Operation Riptide Collection'
]

// Steam-related constants
export const STEAM_CONSTANTS = {
  TRADE_HOLD_DAYS: 7,
  TRADE_URL_PATTERN: /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[a-zA-Z0-9_-]+$/,
  PROFILE_URL_PATTERN: /^https:\/\/steamcommunity\.com\/(id|profiles)\/[a-zA-Z0-9_-]+\/?$/,
  MARKET_BASE_URL: 'https://steamcommunity.com/market/listings/730'
}

// API endpoints (for external integrations)
export const API_ENDPOINTS = {
  STEAM_MARKET: 'https://steamcommunity.com/market/listings/730',
  CSGOFLOAT: 'https://csgofloat.com/api/v1',
  CSMONEY: 'https://cs.money/csgo/store',
  BYMYKEL_API: 'https://bymykel.github.io/CSGO-API/api/en'
}

// File upload constants
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_FILES_PER_UPLOAD: 5
}

// Feature flags
export const FEATURES = {
  REAL_TIME_NOTIFICATIONS: process.env.NODE_ENV === 'production',
  CRYPTO_PAYMENTS: false,
  MOBILE_APP_INTEGRATION: false,
  ADMIN_DASHBOARD: true,
  ANALYTICS: process.env.NODE_ENV === 'production',
  STATTRAK_FILTER: true,
  SOUVENIR_FILTER: true,
  COLLECTION_FILTER: true
}

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  AUTH_REQUIRED: 'You need to be signed in to perform this action.',
  INVALID_INPUT: 'Please check your input and try again.',
  RATE_LIMITED: 'Too many requests. Please wait a moment.',
  SERVER_ERROR: 'Server error. Our team has been notified.',
  SKIN_NOT_FOUND: 'Skin not found or no longer available.',
  INVALID_CONDITION: 'Invalid skin condition selected.',
  PRICE_OUT_OF_RANGE: 'Price is outside the acceptable range.'
}

// Success messages
export const SUCCESS_MESSAGES = {
  TICKET_CREATED: 'Your request has been submitted successfully!',
  PROFILE_UPDATED: 'Your profile has been updated.',
  PAYMENT_SUCCESS: 'Payment processed successfully.',
  TRADE_COMPLETED: 'Trade completed successfully!',
  FILTER_APPLIED: 'Filters applied successfully.',
  SEARCH_COMPLETED: 'Search completed.'
}

// Contact information
export const CONTACT_INFO = {
  SUPPORT_EMAIL: 'support@lilostore.com',
  DISCORD_URL: 'https://discord.gg/lilostore',
  TWITTER_URL: 'https://twitter.com/lilostore',
  BUSINESS_HOURS: 'Monday - Friday, 9 AM - 6 PM EST'
}

// Legal links
export const LEGAL_LINKS = {
  TERMS_OF_SERVICE: '/terms',
  PRIVACY_POLICY: '/privacy',
  COOKIE_POLICY: '/cookies',
  REFUND_POLICY: '/refunds'
}

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  SKINS: 300, // 5 minutes
  PRICES: 60, // 1 minute
  USER_PROFILE: 600, // 10 minutes
  STATIC_CONTENT: 3600 // 1 hour
}

// Rate limiting
export const RATE_LIMITS = {
  TICKETS_PER_HOUR: 10,
  SEARCHES_PER_MINUTE: 30,
  API_CALLS_PER_MINUTE: 100
}

// Responsive breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
}

// CS2 Specific Constants
export const CS2_CONSTANTS = {
  MAX_FLOAT_VALUE: 1.0,
  MIN_FLOAT_VALUE: 0.0,
  STATTRAK_MULTIPLIER: 1.25, // StatTrak adds ~25% to value
  SOUVENIR_MULTIPLIER: 0.8, // Souvenir skins are usually cheaper
  KNIFE_MIN_PRICE: 60, // Knives start around $60
  GLOVES_MIN_PRICE: 80, // Gloves start around $80
}

// CORRECTED Rarity hierarchy for sorting (lower number = more common)
export const RARITY_HIERARCHY: Record<SkinRarity, number> = {
  consumer: 1,
  industrial: 2,
  milspec: 3,
  restricted: 4,
  classified: 5,
  covert: 6,
  contraband: 7,
  extraordinary: 8
}