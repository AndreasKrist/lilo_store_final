'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import { Skin } from '@/types'
import { formatPrice, getRarityColor, getRarityBadgeColor, getWeaponEmoji } from '@/lib/utils'
import { Eye } from 'lucide-react'

interface SkinCardProps {
  skin: Skin
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

  // Get all available conditions and find price range
  const skinConditions = (skin as any).skin_condition_prices || []
  
  if (skinConditions.length === 0) {
    return null // Don't render if no price data
  }

  // Calculate price range
  const prices = skinConditions.map((condition: any) => condition.current_price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const priceRange = minPrice === maxPrice ? formatPrice(minPrice) : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`

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

  if (compact) {
    // List view - horizontal layout
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <GlassCard 
          className={`overflow-hidden border-l-4 ${getRarityColor(skin.rarity)} group cursor-pointer hover:scale-[1.02] transition-transform`}
          onClick={handleCardClick}
        >
          <div className="flex items-center p-4 gap-4">
            {/* Image Section */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-lg overflow-hidden flex-shrink-0">
              {/* Weapon Emoji */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl sm:text-3xl opacity-60">
                  {getWeaponEmoji(skin.weapon_type)}
                </div>
              </div>
              
              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                animate={isHovered ? { x: '100%' } : { x: '-100%' }}
                transition={{ duration: 0.8 }}
              />
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base lg:text-lg text-white truncate">
                    {skin.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`${getRarityBadgeColor(skin.rarity)} text-white text-xs px-2 py-1 rounded-full capitalize`}>
                      {skin.rarity}
                    </span>
                    <span className="text-gray-400 text-xs capitalize">
                      {skin.weapon_type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">
                    {skinConditions.length} condition{skinConditions.length > 1 ? 's' : ''} available
                  </p>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <span className="text-lg lg:text-xl font-bold text-green-400 block">
                      {priceRange}
                    </span>
                  </div>
                  
                  {showActions && (
                    <GlassButton
                      size="sm"
                      variant="primary"
                      onClick={handleViewClick}
                      className="text-xs px-3 py-1.5 min-w-[60px] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="w-3 h-3 mr-1" />
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

  // Grid view - vertical layout
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlassCard 
        className={`overflow-hidden border-l-4 ${getRarityColor(skin.rarity)} group cursor-pointer h-full flex flex-col hover:scale-[1.02] transition-transform`}
        onClick={handleCardClick}
      >
        {/* Image Section */}
        <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-800/20 to-gray-900/20 overflow-hidden">
          {/* Rarity Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`${getRarityBadgeColor(skin.rarity)} text-white text-xs px-2 py-1 rounded-full capitalize font-medium`}>
              {skin.rarity}
            </span>
          </div>

          {/* Conditions Count */}
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              {skinConditions.length} condition{skinConditions.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Weapon Emoji */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl sm:text-6xl opacity-60">
              {getWeaponEmoji(skin.weapon_type)}
            </div>
          </div>

          {/* View Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <GlassButton
              size="sm"
              variant="primary"
              onClick={handleViewClick}
              className="text-sm px-4 py-2"
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

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-bold text-base lg:text-lg text-white line-clamp-2 mb-2">
              {skin.name}
            </h3>
            <p className="text-gray-400 text-sm mb-3 capitalize">
              {skin.weapon_type}
            </p>
          </div>
          
          {/* Price Section */}
          <div className="mb-4">
            <span className="text-xl lg:text-2xl font-bold text-green-400 block">
              {priceRange}
            </span>
            <span className="text-xs text-gray-400">
              {skinConditions.length} condition{skinConditions.length > 1 ? 's' : ''} available
            </span>
          </div>

          {/* Click to view hint */}
          <div className="text-center text-xs text-gray-400 mt-auto">
            Click to view conditions & buy/sell
          </div>

          {/* Additional info */}
          <div className="mt-3 pt-3 border-t border-white/10 hidden sm:block">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="capitalize">{skin.rarity} rarity</span>
              <span>Updated recently</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

// Loading skeleton for SkinCard
export function SkinCardSkeleton({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <GlassCard className="overflow-hidden animate-pulse">
        <div className="flex items-center p-4 gap-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="flex gap-2">
              <div className="h-5 bg-white/10 rounded w-16" />
              <div className="h-5 bg-white/10 rounded w-16" />
            </div>
            <div className="h-3 bg-white/10 rounded w-1/2" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-6 bg-white/10 rounded w-20" />
            <div className="h-8 bg-white/10 rounded w-16" />
          </div>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="overflow-hidden animate-pulse h-full flex flex-col">
      <div className="h-40 sm:h-48 bg-white/10" />
      <div className="p-4 sm:p-6 flex-1 flex flex-col space-y-3">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-3 bg-white/10 rounded w-1/2" />
        </div>
        <div className="h-6 bg-white/10 rounded w-1/3" />
        <div className="h-3 bg-white/10 rounded w-full" />
      </div>
    </GlassCard>
  )
}