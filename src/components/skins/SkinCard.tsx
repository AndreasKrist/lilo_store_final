'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import { Skin } from '@/types'
import { formatPrice, getRarityColor, getRarityBadgeColor, getRarityTextColor, getWeaponTypeName } from '@/lib/utils'
import { Eye, TrendingUp, TrendingDown, Minus, Star, Zap } from 'lucide-react'

interface SkinCardProps {
  skin: Skin & {
    skin_condition_prices?: Array<{
      id: string
      condition: string
      condition_name: string
      current_price: number
      price_change_24h?: number
    }>
    price_range?: {
      min: number
      max: number
      count: number
    }
    investment_rating?: 'excellent' | 'good' | 'fair' | 'poor'
    popularity_score?: number
    market_trend?: 'up' | 'down' | 'stable'
  }
  onView?: (skin: Skin) => void
  showActions?: boolean
  compact?: boolean
}

export default function SkinCard({ 
  skin, 
  onView, 
  showActions = true,
  compact = false 
}: SkinCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Get condition prices data
  const skinConditions = skin.skin_condition_prices || []
  const priceRange = skin.price_range
  
  if (skinConditions.length === 0 && !priceRange) {
    return null // Don't render if no price data
  }

  // Calculate price display values
  const minPrice = priceRange?.min || 0
  const maxPrice = priceRange?.max || 0
  const conditionCount = priceRange?.count || skinConditions.length

  const handleCardClick = () => {
    if (onView) {
      onView(skin)
    }
  }

  const handleViewClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onView) {
      onView(skin)
    }
  }

  // Get trend icon
  const getTrendIcon = () => {
    switch (skin.market_trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-400" />
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-400" />
      default:
        return <Minus className="w-3 h-3 text-gray-400" />
    }
  }

  // Get investment rating color
  const getInvestmentColor = () => {
    switch (skin.investment_rating) {
      case 'excellent':
        return 'text-green-400'
      case 'good':
        return 'text-blue-400'
      case 'fair':
        return 'text-yellow-400'
      default:
        return 'text-gray-400'
    }
  }

  if (compact) {
    // List view - horizontal layout with IMPROVED spacing
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <GlassCard 
          className={`overflow-hidden border-l-4 ${getRarityColor(skin.rarity)} group cursor-pointer hover:scale-[1.01] transition-all duration-300`}
          onClick={handleCardClick}
        >
          {/* BIGGER: Better padding and spacing */}
          <div className="flex items-center p-5 lg:p-7 gap-5 lg:gap-7">
            {/* Image Section - BIGGER: Larger image */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-lg overflow-hidden flex-shrink-0">
              {/* Rarity indicator */}
              <div className="absolute top-1 left-1 w-3 h-3 rounded-full" style={{ backgroundColor: skin.rarity_color }} />
              
              {/* Special badges */}
              <div className="absolute top-1 right-1 flex flex-col gap-1">
                {skin.stattrak && (
                  <div className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                    ST
                  </div>
                )}
                {skin.souvenir && (
                  <div className="bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded font-bold">
                    SV
                  </div>
                )}
              </div>

              {/* Skin Image */}
              {skin.image_url && !imageError ? (
                <img 
                  src={skin.image_url}
                  alt={skin.name}
                  className="absolute inset-0 w-full h-full object-contain p-2"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl opacity-60 text-gray-400">
                    ?
                  </div>
                </div>
              )}
              
              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                animate={isHovered ? { x: '100%' } : { x: '-100%' }}
                transition={{ duration: 0.8 }}
              />
            </div>

            {/* Content Section - IMPROVED: Better spacing */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  {/* IMPROVED: Better title sizing and spacing */}
                  <h3 className="font-bold text-base sm:text-lg lg:text-xl text-white truncate mb-2">
                    {skin.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`${getRarityBadgeColor(skin.rarity)} text-white text-xs px-2.5 py-1 rounded-full capitalize font-medium`}>
                      {skin.rarity_name || skin.rarity}
                    </span>
                    <span className="text-gray-400 text-sm capitalize">
                      {getWeaponTypeName(skin.weapon_type)}
                    </span>
                    {/* Popularity stars */}
                    {skin.popularity_score && skin.popularity_score >= 7 && (
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-yellow-400 ml-1">Hot</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm">
                      {conditionCount} condition{conditionCount > 1 ? 's' : ''}
                    </span>
                    {/* Market trend */}
                    <div className="flex items-center gap-1">
                      {getTrendIcon()}
                    </div>
                    {/* Investment rating */}
                    {skin.investment_rating && skin.investment_rating !== 'poor' && (
                      <span className={`text-sm ${getInvestmentColor()}`}>
                        {skin.investment_rating}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price and Actions - IMPROVED: Better spacing */}
                <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
                  <div className="text-right">
                    {minPrice === maxPrice ? (
                      <span className="text-xl lg:text-2xl font-bold text-green-400 block">
                        {formatPrice(minPrice)}
                      </span>
                    ) : (
                      <>
                        <span className="text-xl lg:text-2xl font-bold text-green-400 block">
                          {formatPrice(maxPrice)}
                        </span>
                        <span className="text-sm text-gray-400">
                          from {formatPrice(minPrice)}
                        </span>
                      </>
                    )}
                  </div>
                  
                  {showActions && (
                    <GlassButton
                      size="sm"
                      variant="primary"
                      onClick={handleViewClick}
                      className="text-sm px-3 lg:px-4 py-2 min-w-[70px] lg:min-w-[80px] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </GlassButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    )
  }

  // Grid view - vertical layout with IMPROVED spacing
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassCard 
        className={`overflow-hidden border-l-4 ${getRarityColor(skin.rarity)} group cursor-pointer h-full flex flex-col hover:scale-[1.02] transition-all duration-300`}
        onClick={handleCardClick}
      >
        {/* Image Section - BIGGER: Much taller image area */}
        <div className="relative h-48 sm:h-56 lg:h-64 xl:h-72 bg-gradient-to-br from-gray-800/20 to-gray-900/20 overflow-hidden">
          {/* Top badges */}
          <div className="absolute top-3 left-3 z-10 flex gap-2">
            <span className={`${getRarityBadgeColor(skin.rarity)} text-white text-xs px-2.5 py-1 rounded-full capitalize font-medium`}>
              {skin.rarity_name || skin.rarity}
            </span>
            {/* Popularity indicator */}
            {skin.popularity_score && skin.popularity_score >= 8 && (
              <div className="bg-yellow-500 text-white text-xs px-2.5 py-1 rounded-full flex items-center">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Hot
              </div>
            )}
          </div>

          {/* Top right badges */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
            {conditionCount > 0 && (
              <span className="bg-black/60 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                {conditionCount} condition{conditionCount > 1 ? 's' : ''}
              </span>
            )}
            {/* Special attributes */}
            <div className="flex gap-1">
              {skin.stattrak && (
                <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold">
                  StatTrak™
                </div>
              )}
              {skin.souvenir && (
                <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded font-bold">
                  Souvenir
                </div>
              )}
            </div>
          </div>

          {/* Skin Image */}
          {skin.image_url && !imageError ? (
            <img 
              src={skin.image_url}
              alt={skin.name}
              className="absolute inset-0 w-full h-full object-contain p-3"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl opacity-60 text-gray-400">
                ?
              </div>
            </div>
          )}

          {/* View Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <GlassButton
              size="sm"
              variant="primary"
              onClick={handleViewClick}
              className="text-sm px-4 lg:px-6 py-2.5"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </GlassButton>
          </div>

          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.8 }}
          />

          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content Section - BIGGER: More generous padding and spacing */}
        <div className="p-5 sm:p-6 lg:p-8 flex-1 flex flex-col">
          <div className="flex-1">
            {/* IMPROVED: Better title spacing */}
            <h3 className="font-bold text-sm sm:text-base lg:text-lg text-white line-clamp-2 mb-3">
              {skin.name}
            </h3>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm lg:text-base capitalize">
                {getWeaponTypeName(skin.weapon_type)}
              </span>
              {/* Market trend indicator */}
              <div className="flex items-center gap-1">
                {getTrendIcon()}
                <span className="text-xs text-gray-400">24h</span>
              </div>
            </div>
          </div>
          
          {/* Price Section - IMPROVED: Better spacing */}
          <div className="mb-4 lg:mb-5">
            {minPrice === maxPrice ? (
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400 block">
                {formatPrice(minPrice)}
              </span>
            ) : (
              <>
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400 block">
                  {formatPrice(maxPrice)}
                </span>
                <span className="text-sm text-gray-400 mt-1 block">
                  from {formatPrice(minPrice)} • {conditionCount} condition{conditionCount > 1 ? 's' : ''}
                </span>
              </>
            )}
          </div>

          {/* Investment rating and popularity - IMPROVED: Better spacing */}
          <div className="flex items-center justify-between mb-4">
            {skin.investment_rating && (
              <span className={`text-sm ${getInvestmentColor()} flex items-center`}>
                <Zap className="w-3 h-3 mr-1" />
                {skin.investment_rating} investment
              </span>
            )}
            {skin.popularity_score && (
              <div className="flex items-center text-sm text-gray-400">
                <Star className="w-3 h-3 mr-1" />
                {skin.popularity_score}/10
              </div>
            )}
          </div>

          {/* Click hint */}
          <div className="text-center text-xs text-gray-400 mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view conditions & trade
          </div>

          {/* Additional metadata - IMPROVED: Better spacing */}
          <div className="mt-4 pt-3 border-t border-white/10 hidden sm:block">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span className={`capitalize ${getRarityTextColor(skin.rarity)}`}>
                {skin.rarity_name || skin.rarity}
              </span>
              <span>CS2 Official</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

// Loading skeleton for SkinCard with enhanced placeholder
export function SkinCardSkeleton({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <GlassCard className="overflow-hidden animate-pulse">
        {/* BIGGER: Better skeleton spacing */}
        <div className="flex items-center p-5 lg:p-7 gap-5 lg:gap-7">
          <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white/10 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-white/10 rounded w-3/4" />
            <div className="flex gap-2">
              <div className="h-6 bg-white/10 rounded w-20" />
              <div className="h-6 bg-white/10 rounded w-16" />
            </div>
            <div className="h-4 bg-white/10 rounded w-1/2" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-7 bg-white/10 rounded w-24" />
            <div className="h-9 bg-white/10 rounded w-20" />
          </div>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="overflow-hidden animate-pulse h-full flex flex-col">
      {/* BIGGER: Taller skeleton image area */}
      <div className="h-48 sm:h-56 lg:h-64 xl:h-72 bg-white/10 relative">
        <div className="absolute top-3 left-3">
          <div className="h-6 bg-white/20 rounded-full w-24" />
        </div>
        <div className="absolute top-3 right-3">
          <div className="h-5 bg-white/20 rounded-full w-20" />
        </div>
      </div>
      {/* BIGGER: Better skeleton content spacing */}
      <div className="p-5 sm:p-6 lg:p-8 flex-1 flex flex-col space-y-4">
        <div className="space-y-3 flex-1">
          <div className="h-5 bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-white/10 rounded w-1/2" />
        </div>
        <div className="h-8 bg-white/10 rounded w-1/3" />
        <div className="flex justify-between">
          <div className="h-4 bg-white/10 rounded w-1/4" />
          <div className="h-4 bg-white/10 rounded w-1/4" />
        </div>
        <div className="h-4 bg-white/10 rounded w-full" />
      </div>
    </GlassCard>
  )
}