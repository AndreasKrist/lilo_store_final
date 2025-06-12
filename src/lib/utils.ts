import { type ClassValue, clsx } from 'clsx'
import { SkinCondition, SkinRarity, WeaponType } from '@/types'

// Utility function to combine class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Format price with currency
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

// Format date
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

// Get relative time (e.g., "2 hours ago")
export function getRelativeTime(date: string | Date): string {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  
  return formatDate(date)
}

// Get rarity color classes
export function getRarityColor(rarity: SkinRarity): string {
  const rarityColors = {
    covert: 'border-red-500 bg-red-500/10',
    classified: 'border-purple-500 bg-purple-500/10',
    restricted: 'border-blue-500 bg-blue-500/10',
    milspec: 'border-indigo-500 bg-indigo-500/10',
    industrial: 'border-gray-500 bg-gray-500/10',
    consumer: 'border-gray-400 bg-gray-400/10'
  }
  return rarityColors[rarity] || rarityColors.consumer
}

// Get rarity badge color
export function getRarityBadgeColor(rarity: SkinRarity): string {
  const rarityBadgeColors = {
    covert: 'bg-red-500',
    classified: 'bg-purple-500',
    restricted: 'bg-blue-500',
    milspec: 'bg-indigo-500',
    industrial: 'bg-gray-500',
    consumer: 'bg-gray-400'
  }
  return rarityBadgeColors[rarity] || rarityBadgeColors.consumer
}

// Get weapon type emoji
export function getWeaponEmoji(weaponType: WeaponType): string {
  const weaponEmojis = {
    rifle: '🔫',
    pistol: '🔫',
    sniper: '🎯',
    smg: '🔫',
    shotgun: '🔫',
    knife: '🔪',
    gloves: '🧤'
  }
  return weaponEmojis[weaponType] || '⚡'
}

// Validate Steam trade URL
export function isValidSteamTradeUrl(url: string): boolean {
  const steamTradeUrlPattern = /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[a-zA-Z0-9_-]+$/
  return steamTradeUrlPattern.test(url)
}

// Validate phone number (basic international format)
export function isValidPhoneNumber(phone: string): boolean {
  const phonePattern = /^\+?[1-9]\d{1,14}$/
  return phonePattern.test(phone.replace(/[\s\-\(\)]/g, ''))
}

// Generate ticket ID
export function generateTicketId(): string {
  return `LILO-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
}

// Calculate float range middle point
export function getFloatMiddle(floatRange: string): number {
  const [min, max] = floatRange.split('-').map(Number)
  return (min + max) / 2
}

// Get condition name from condition code
export function getConditionName(condition: SkinCondition): string {
  const conditionNames = {
    fn: 'Factory New',
    mw: 'Minimal Wear',
    ft: 'Field-Tested',
    ww: 'Well-Worn',
    bs: 'Battle-Scarred'
  }
  return conditionNames[condition]
}

// Get condition color
export function getConditionColor(condition: SkinCondition): string {
  const conditionColors = {
    fn: 'text-green-400',
    mw: 'text-blue-400',
    ft: 'text-yellow-400',
    ww: 'text-orange-400',
    bs: 'text-red-400'
  }
  return conditionColors[condition] || 'text-gray-400'
}

// Debounce function for search
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Convert file to base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

// Sleep utility for testing
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Create URL-friendly slug
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}