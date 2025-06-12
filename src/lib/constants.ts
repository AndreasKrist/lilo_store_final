import { SkinCondition, WeaponType, SkinRarity, TicketStatus } from '@/types'

// Application constants
export const APP_NAME = 'Lilo Store'
export const APP_DESCRIPTION = 'Premium CS2 Skin Trading Platform'
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// Skin conditions with display names and colors
export const SKIN_CONDITIONS: Record<SkinCondition, { name: string; color: string; shortName: string }> = {
  fn: { name: 'Factory New', color: 'text-green-400', shortName: 'FN' },
  mw: { name: 'Minimal Wear', color: 'text-blue-400', shortName: 'MW' },
  ft: { name: 'Field-Tested', color: 'text-yellow-400', shortName: 'FT' },
  ww: { name: 'Well-Worn', color: 'text-orange-400', shortName: 'WW' },
  bs: { name: 'Battle-Scarred', color: 'text-red-400', shortName: 'BS' }
}

// Weapon types with display names and emojis
export const WEAPON_TYPES: Record<WeaponType, { name: string; emoji: string; category: string }> = {
  rifle: { name: 'Rifles', emoji: '🔫', category: 'Primary' },
  pistol: { name: 'Pistols', emoji: '🔫', category: 'Secondary' },
  sniper: { name: 'Sniper Rifles', emoji: '🎯', category: 'Primary' },
  smg: { name: 'SMGs', emoji: '🔫', category: 'Primary' },
  shotgun: { name: 'Shotguns', emoji: '🔫', category: 'Primary' },
  knife: { name: 'Knives', emoji: '🔪', category: 'Melee' },
  gloves: { name: 'Gloves', emoji: '🧤', category: 'Equipment' }
}

// Skin rarities with colors and styling
export const SKIN_RARITIES: Record<SkinRarity, { 
  name: string; 
  color: string; 
  bgColor: string; 
  borderColor: string;
  probability: string;
}> = {
  covert: { 
    name: 'Covert', 
    color: 'text-red-400', 
    bgColor: 'bg-red-500/20', 
    borderColor: 'border-red-500',
    probability: '0.64%'
  },
  classified: { 
    name: 'Classified', 
    color: 'text-purple-400', 
    bgColor: 'bg-purple-500/20', 
    borderColor: 'border-purple-500',
    probability: '3.20%'
  },
  restricted: { 
    name: 'Restricted', 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-500/20', 
    borderColor: 'border-blue-500',
    probability: '15.98%'
  },
  milspec: { 
    name: 'Mil-Spec', 
    color: 'text-indigo-400', 
    bgColor: 'bg-indigo-500/20', 
    borderColor: 'border-indigo-500',
    probability: '79.92%'
  },
  industrial: { 
    name: 'Industrial Grade', 
    color: 'text-gray-400', 
    bgColor: 'bg-gray-500/20', 
    borderColor: 'border-gray-500',
    probability: 'N/A'
  },
  consumer: { 
    name: 'Consumer Grade', 
    color: 'text-gray-300', 
    bgColor: 'bg-gray-400/20', 
    borderColor: 'border-gray-400',
    probability: 'N/A'
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

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  SKINS_PER_PAGE: 12,
  TICKETS_PER_PAGE: 10,
  MAX_PER_PAGE: 50
}

// Price ranges for filtering
export const PRICE_RANGES = [
  { label: 'Under $10', min: 0, max: 10 },
  { label: '$10 - $50', min: 10, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $500', min: 100, max: 500 },
  { label: '$500 - $1000', min: 500, max: 1000 },
  { label: 'Over $1000', min: 1000, max: null }
]

// Sort options for skins
export const SKIN_SORT_OPTIONS = [
  { value: 'name_asc', label: 'Name A-Z' },
  { value: 'name_desc', label: 'Name Z-A' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' }
]

// Quick filter suggestions
export const QUICK_FILTERS = [
  'AK-47',
  'AWP',
  'M4A4',
  'Knife',
  'Gloves',
  'Factory New',
  'Covert',
  'Under $100'
]

// Steam-related constants
export const STEAM_CONSTANTS = {
  TRADE_HOLD_DAYS: 7,
  TRADE_URL_PATTERN: /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[a-zA-Z0-9_-]+$/,
  PROFILE_URL_PATTERN: /^https:\/\/steamcommunity\.com\/(id|profiles)\/[a-zA-Z0-9_-]+\/?$/
}

// API endpoints (for external integrations)
export const API_ENDPOINTS = {
  STEAM_MARKET: 'https://steamcommunity.com/market/listings/730',
  CSGOFLOAT: 'https://csgofloat.com/api/v1',
  CSMONEY: 'https://cs.money/csgo/store'
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
  ANALYTICS: process.env.NODE_ENV === 'production'
}

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  AUTH_REQUIRED: 'You need to be signed in to perform this action.',
  INVALID_INPUT: 'Please check your input and try again.',
  RATE_LIMITED: 'Too many requests. Please wait a moment.',
  SERVER_ERROR: 'Server error. Our team has been notified.'
}

// Success messages
export const SUCCESS_MESSAGES = {
  TICKET_CREATED: 'Your request has been submitted successfully!',
  PROFILE_UPDATED: 'Your profile has been updated.',
  PAYMENT_SUCCESS: 'Payment processed successfully.',
  TRADE_COMPLETED: 'Trade completed successfully!'
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