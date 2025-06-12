'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import { Skin, SkinConditionPrice } from '@/types'
import { formatPrice, getRarityColor, getRarityBadgeColor, getWeaponEmoji, getConditionColor } from '@/lib/utils'

interface SkinCardProps {
  skin: Skin
  conditionData?: SkinConditionPrice
  onBuy?: (skinId: string, condition: string) => void
  onSell?: (skinId: string, condition: string) => void
  showActions?: boolean
  compact?: boolean
}

export default function SkinCard({ 
  skin, 
  conditionData, 
  onBuy, 
  onSell, 
  showActions = true,
  compact = false 
}: SkinCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { data: session } = useSession()

  // Use the first condition if no specific condition is provided
  const displayCondition = conditionData || (skin as any).skin_condition_prices?.[0]
  
  if (!displayCondition) {
    return null // Don't render if no price data
  }

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!session) {
      alert('Please sign in to buy skins')
      return
    }
    
    if (onBuy) {
      onBuy(skin.id, displayCondition.condition)
    }
  }

  const handleSellClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!session) {
      alert('Please sign in to sell skins')
      return
    }
    
    if (onSell) {
      onSell(skin.id, displayCondition.condition)
    }
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <GlassCard 
          className={`overflow-hidden border-l-4 ${getRarityColor(skin.rarity)} group cursor-pointer ${compact ? 'h-auto' : ''}`}
        >
          {/* Image Section */}
          <div className={`relative ${compact ? 'h-32' : 'h-48'} bg-gradient-to-br from-gray-800/20 to-gray-900/20 overflow-hidden`}>
            {/* Rarity Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className={`${getRarityBadgeColor(skin.rarity)} text-white text-xs px-2 py-1 rounded-full capitalize font-medium`}>
                {skin.rarity}
              </span>
            </div>

            {/* Float Badge */}
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                {displayCondition.float_range}
              </span>
            </div>

            {/* Weapon Emoji (placeholder for actual image) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`${compact ? 'text-4xl' : 'text-6xl'} opacity-60`}>
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

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Content Section */}
          <div className={`p-${compact ? '4' : '6'}`}>
            <div className="space-y-2">
              <h3 className={`font-bold ${compact ? 'text-base' : 'text-lg'} text-white line-clamp-1`}>
                {skin.name}
              </h3>
              <p className={`${getConditionColor(displayCondition.condition)} ${compact ? 'text-xs' : 'text-sm'} font-medium`}>
                {displayCondition.condition_name}
              </p>
            </div>
            
            <div className={`flex items-center justify-between ${compact ? 'mt-3' : 'mt-4'}`}>
              <div>
                <span className={`${compact ? 'text-xl' : 'text-2xl'} font-bold text-green-400`}>
                  {formatPrice(displayCondition.current_price)}
                </span>
                {displayCondition.base_price !== displayCondition.current_price && (
                  <span className="text-xs text-gray-400 line-through ml-2">
                    {formatPrice(displayCondition.base_price)}
                  </span>
                )}
              </div>
              
              {showActions && (
                <div className="flex space-x-2">
                  <GlassButton
                    size="sm"
                    variant="primary"
                    onClick={handleBuyClick}
                    className={`${compact ? 'text-xs px-2 py-1' : ''} opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    Buy
                  </GlassButton>
                  <GlassButton
                    size="sm"
                    variant="secondary"
                    onClick={handleSellClick}
                    className={`${compact ? 'text-xs px-2 py-1' : ''} opacity-0 group-hover:opacity-100 transition-opacity`}
                  >
                    Sell
                  </GlassButton>
                </div>
              )}
            </div>

            {/* Additional info for non-compact view */}
            {!compact && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="capitalize">{skin.weapon_type}</span>
                  <span>Updated {new Date(displayCondition.last_updated).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

// Loading skeleton for SkinCard
export function SkinCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <GlassCard className="overflow-hidden animate-pulse">
      <div className={`${compact ? 'h-32' : 'h-48'} bg-white/10`} />
      <div className={`p-${compact ? '4' : '6'} space-y-3`}>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-3 bg-white/10 rounded w-1/2" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-white/10 rounded w-1/4" />
          <div className="flex space-x-2">
            <div className="h-8 bg-white/10 rounded w-16" />
            <div className="h-8 bg-white/10 rounded w-16" />
          </div>
        </div>
      </div>
    </GlassCard>
  )
}