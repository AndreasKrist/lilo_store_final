// src/lib/utils.ts - Fixed with compatible syntax for Vercel builds

import { type ClassValue, clsx } from 'clsx'
import { SkinCondition, SkinRarity, WeaponType } from '@/types'
import { SKIN_RARITIES, WEAPON_TYPES, SKIN_CONDITIONS, RARITY_HIERARCHY } from '@/lib/constants'

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

// Get CS2 rarity color classes
export function getRarityColor(rarity: SkinRarity): string {
  const rarityData = SKIN_RARITIES[rarity]
  if (!rarityData) return 'border-gray-500 bg-gray-500/10'
  
  return rarityData.borderColor + ' ' + rarityData.bgColor
}

// Get CS2 rarity badge color
export function getRarityBadgeColor(rarity: SkinRarity): string {
  const rarityColors = {
    consumer: 'bg-gray-500',
    industrial: 'bg-blue-600', 
    milspec: 'bg-indigo-500',
    restricted: 'bg-purple-500',
    classified: 'bg-pink-500',
    covert: 'bg-red-500',
    contraband: 'bg-orange-500',
    extraordinary: 'bg-yellow-500'
  }
  return rarityColors[rarity] || rarityColors.consumer
}

// Get CS2 rarity text color
export function getRarityTextColor(rarity: SkinRarity): string {
  const rarityData = SKIN_RARITIES[rarity]
  return rarityData?.textColor || 'text-gray-400'
}

// Get weapon type name
export function getWeaponTypeName(weaponType: WeaponType): string {
  const weaponData = WEAPON_TYPES[weaponType]
  return weaponData?.name || 'Unknown'
}

// Get weapon type emoji (for components that still need it)
export function getWeaponEmoji(weaponType: WeaponType): string {
  const weaponEmojis = {
    pistol: '🔫',
    rifle: '🔫', 
    smg: '🔫',
    shotgun: '💥',
    sniper: '🎯',
    heavy: '🔫',
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
  const conditionData = SKIN_CONDITIONS[condition]
  return conditionData?.name || 'Unknown'
}

// Get condition color
export function getConditionColor(condition: SkinCondition): string {
  const conditionData = SKIN_CONDITIONS[condition]
  return conditionData?.color || 'text-gray-400'
}

// Get condition float range
export function getConditionFloatRange(condition: SkinCondition): string {
  const conditionData = SKIN_CONDITIONS[condition]
  return conditionData?.floatRange || '0.00 - 1.00'
}

// Get rarity name
export function getRarityName(rarity: SkinRarity): string {
  const rarityData = SKIN_RARITIES[rarity]
  return rarityData?.name || 'Unknown'
}

// Get rarity probability
export function getRarityProbability(rarity: SkinRarity): string {
  const rarityData = SKIN_RARITIES[rarity]
  return rarityData?.probability || 'Unknown'
}

// Sort skins by rarity (rare to common or vice versa)
export function sortByRarity(skins: any[], ascending: boolean = false): any[] {
  return skins.sort((a, b) => {
    const aRarity = RARITY_HIERARCHY[a.rarity as SkinRarity] || 0
    const bRarity = RARITY_HIERARCHY[b.rarity as SkinRarity] || 0
    return ascending ? aRarity - bRarity : bRarity - aRarity
  })
}

// Check if skin is StatTrak
export function isStatTrak(skinName: string): boolean {
  return skinName.toLowerCase().includes('stattrak')
}

// Check if skin is Souvenir
export function isSouvenir(skinName: string): boolean {
  return skinName.toLowerCase().includes('souvenir')
}

// Get skin category based on weapon type
export function getSkinCategory(weaponType: WeaponType): string {
  const weaponData = WEAPON_TYPES[weaponType]
  return weaponData?.category || 'Unknown'
}

// Calculate estimated market value based on condition and rarity
export function estimateMarketValue(basePrice: number, rarity: SkinRarity, condition: SkinCondition, isStatTrak: boolean = false, isSouvenir: boolean = false): number {
  let price = basePrice

  // Condition multipliers (based on CS2 market data)
  const conditionMultipliers = {
    fn: 1.0,
    mw: 0.85,
    ft: 0.70,
    ww: 0.55,
    bs: 0.40
  }

  // Rarity multipliers
  const rarityMultipliers = {
    consumer: 1.0,
    industrial: 1.2,
    milspec: 1.5,
    restricted: 2.0,
    classified: 3.5,
    covert: 6.0,
    contraband: 50.0,
    extraordinary: 8.0
  }

  price *= conditionMultipliers[condition] || 1.0
  price *= rarityMultipliers[rarity] || 1.0

  if (isStatTrak) price *= 1.2
  if (isSouvenir) price *= 0.8

  return Math.round(price * 100) / 100
}

// Check if float is valid for condition
export function isValidFloat(floatValue: number, condition: SkinCondition): boolean {
  const ranges = {
    fn: { min: 0.00, max: 0.07 },
    mw: { min: 0.07, max: 0.15 },
    ft: { min: 0.15, max: 0.38 },
    ww: { min: 0.38, max: 0.45 },
    bs: { min: 0.45, max: 1.00 }
  }

  const range = ranges[condition]
  return floatValue >= range.min && floatValue <= range.max
}

// Get condition from float value
export function getConditionFromFloat(floatValue: number): SkinCondition {
  if (floatValue >= 0.00 && floatValue < 0.07) return 'fn'
  if (floatValue >= 0.07 && floatValue < 0.15) return 'mw'
  if (floatValue >= 0.15 && floatValue < 0.38) return 'ft'
  if (floatValue >= 0.38 && floatValue < 0.45) return 'ww'
  return 'bs'
}

// Format float value for display
export function formatFloat(floatValue: number): string {
  return floatValue.toFixed(8)
}

// Parse CS2 skin name components
export function parseSkinName(skinName: string): {
  weapon: string
  skinName: string
  isStatTrak: boolean
  isSouvenir: boolean
} {
  let cleanName = skinName.trim()
  
  const isStatTrak = cleanName.toLowerCase().includes('stattrak™')
  const isSouvenir = cleanName.toLowerCase().includes('souvenir')
  
  // Remove prefixes
  cleanName = cleanName.replace(/^(StatTrak™|Souvenir)\s+/i, '')
  
  // Split weapon and skin name
  const parts = cleanName.split(' | ')
  const weapon = parts[0] || ''
  const skin = parts[1] || ''
  
  return {
    weapon: weapon.trim(),
    skinName: skin.trim(),
    isStatTrak,
    isSouvenir
  }
}

// Generate skin search keywords - FIXED: Compatible with older TypeScript targets
export function generateSkinKeywords(skin: any): string[] {
  const keywords = []
  
  // Basic info
  keywords.push(skin.name.toLowerCase())
  keywords.push(skin.weapon_type)
  keywords.push(skin.rarity)
  
  // Parse skin name
  const parsed = parseSkinName(skin.name)
  keywords.push(parsed.weapon.toLowerCase())
  keywords.push(parsed.skinName.toLowerCase())
  
  // Weapon name variations
  if (skin.weapon_name) {
    keywords.push(skin.weapon_name.toLowerCase())
  }
  
  // Collection
  if (skin.collections && skin.collections.length > 0) {
    keywords.push(...skin.collections.map((c: string) => c.toLowerCase()))
  }
  
  // Pattern name
  if (skin.pattern_name) {
    keywords.push(skin.pattern_name.toLowerCase())
  }
  
  // Special attributes
  if (parsed.isStatTrak) keywords.push('stattrak')
  if (parsed.isSouvenir) keywords.push('souvenir')
  
  // FIXED: Remove duplicates using Array.from instead of spread operator
  return Array.from(new Set(keywords))
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

// Validate CS2 skin data
export function validateSkinData(skin: any): boolean {
  if (!skin.name || !skin.weapon_type || !skin.rarity) return false
  if (!Object.keys(WEAPON_TYPES).includes(skin.weapon_type)) return false
  if (!Object.keys(SKIN_RARITIES).includes(skin.rarity)) return false
  return true
}

// Calculate skin profit margin for trading
export function calculateProfitMargin(buyPrice: number, sellPrice: number): number {
  if (buyPrice === 0) return 0
  return ((sellPrice - buyPrice) / buyPrice) * 100
}

// Get skin investment recommendation
export function getSkinInvestmentRating(skin: any): 'buy' | 'hold' | 'sell' | 'avoid' {
  // This is a simplified example - in reality you'd use market data, trends, etc.
  const rarity = skin.rarity as SkinRarity
  const rarityScore = RARITY_HIERARCHY[rarity] || 0
  
  if (rarityScore >= 6) return 'buy' // Covert, Contraband, Extraordinary
  if (rarityScore >= 4) return 'hold' // Restricted, Classified
  if (rarityScore >= 2) return 'sell' // Industrial, Mil-Spec
  return 'avoid' // Consumer
}

// Format large numbers (1000 -> 1K, 1000000 -> 1M)
export function formatLargeNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

// Check if skin is a knife
export function isKnife(weaponType: WeaponType): boolean {
  return weaponType === 'knife'
}

// Check if skin is gloves
export function isGloves(weaponType: WeaponType): boolean {
  return weaponType === 'gloves'
}

// Get trading fees (Steam takes 15% total)
export function calculateTradingFees(price: number): {
  steamFee: number
  publisherFee: number
  total: number
  netReceived: number
} {
  const steamFee = Math.floor(price * 0.05 * 100) / 100 // 5%
  const publisherFee = Math.floor(price * 0.10 * 100) / 100 // 10%
  const total = steamFee + publisherFee
  const netReceived = price - total
  
  return {
    steamFee,
    publisherFee,
    total,
    netReceived
  }
}