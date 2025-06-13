'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { X, ShoppingCart, DollarSign, Star, TrendingUp, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import { Skin, SkinConditionPrice } from '@/types'
import { formatPrice, getRarityColor, getRarityBadgeColor, getWeaponEmoji, getConditionColor } from '@/lib/utils'

interface SkinDetailModalProps {
  isOpen: boolean
  onClose: () => void
  skin: Skin | null
  onBuy?: (skinId: string, condition: string) => void
  onSell?: (skinId: string, condition: string) => void
}

export default function SkinDetailModal({ 
  isOpen, 
  onClose, 
  skin,
  onBuy,
  onSell 
}: SkinDetailModalProps) {
  const { data: session } = useSession()
  const [selectedCondition, setSelectedCondition] = useState<SkinConditionPrice | null>(null)

  if (!isOpen || !skin) return null

  const skinConditions = (skin as any).skin_condition_prices || []
  const currentCondition = selectedCondition || skinConditions[0]

  // Calculate price stats
  const prices = skinConditions.map((condition: any) => condition.current_price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  const handleBuyClick = () => {
    if (!session) {
      alert('Please sign in to buy skins')
      return
    }
    
    if (onBuy && currentCondition) {
      onBuy(skin.id, currentCondition.condition)
    }
  }

  const handleSellClick = () => {
    if (!session) {
      alert('Please sign in to sell skins')
      return
    }
    
    if (onSell && currentCondition) {
      onSell(skin.id, currentCondition.condition)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          <GlassCard className="overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 lg:p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <span className={`${getRarityBadgeColor(skin.rarity)} text-white text-xs px-3 py-1 rounded-full capitalize font-medium`}>
                  {skin.rarity}
                </span>
                <h2 className="text-xl lg:text-2xl font-bold text-white truncate">
                  {skin.name}
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 lg:p-6">
                {/* Left Side - Image and Basic Info */}
                <div className="space-y-4">
                  {/* Large Skin Display */}
                  <div className={`relative h-64 lg:h-80 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-xl overflow-hidden border-l-4 ${getRarityColor(skin.rarity)}`}>
                    {/* Weapon Emoji (placeholder for actual image) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl lg:text-9xl opacity-60">
                        {getWeaponEmoji(skin.weapon_type)}
                      </div>
                    </div>
                    
                    {/* Floating Stats */}
                    <div className="absolute top-4 left-4 space-y-2">
                      <div className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center space-x-2">
                        <Star className="w-3 h-3" />
                        <span>Popular</span>
                      </div>
                      {currentCondition && (
                        <div className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                          Float: {currentCondition.float_range}
                        </div>
                      )}
                    </div>
                    
                    {/* Price Badge */}
                    {currentCondition && (
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-lg">
                          {formatPrice(currentCondition.current_price)}
                        </div>
                      </div>
                    )}
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 shimmer opacity-30" />
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-gray-400 text-sm mb-1">Weapon Type</div>
                      <div className="text-white font-semibold capitalize">{skin.weapon_type}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 text-center">
                      <div className="text-gray-400 text-sm mb-1">Rarity</div>
                      <div className={`font-semibold capitalize ${getRarityColor(skin.rarity).includes('red') ? 'text-red-400' : getRarityColor(skin.rarity).includes('purple') ? 'text-purple-400' : getRarityColor(skin.rarity).includes('blue') ? 'text-blue-400' : 'text-gray-400'}`}>
                        {skin.rarity}
                      </div>
                    </div>
                  </div>

                  {/* Price Range Info */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3">Price Range</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Lowest Price</span>
                        <span className="text-green-400 font-semibold">{formatPrice(minPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Highest Price</span>
                        <span className="text-green-400 font-semibold">{formatPrice(maxPrice)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Available Conditions</span>
                        <span className="text-white">{skinConditions.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Conditions and Actions */}
                <div className="space-y-6">
                  {/* Condition Selector */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Select Condition</h3>
                    <div className="space-y-3">
                      {skinConditions.map((condition: SkinConditionPrice) => (
                        <div
                          key={condition.id}
                          onClick={() => setSelectedCondition(condition)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            currentCondition?.id === condition.id
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-white/20 bg-white/5 hover:border-white/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className={`font-semibold ${getConditionColor(condition.condition)}`}>
                                {condition.condition_name}
                              </div>
                              <div className="text-gray-400 text-sm">
                                Float: {condition.float_range}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-green-400 font-bold text-lg">
                                {formatPrice(condition.current_price)}
                              </div>
                              {condition.base_price !== condition.current_price && (
                                <div className="text-gray-400 text-sm line-through">
                                  {formatPrice(condition.base_price)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Market Info */}
                  {currentCondition && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-400 mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Market Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Current Price</span>
                          <span className="text-green-400 font-semibold">{formatPrice(currentCondition.current_price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Base Price</span>
                          <span className="text-white">{formatPrice(currentCondition.base_price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Sell Price (85%)</span>
                          <span className="text-orange-400 font-semibold">{formatPrice(currentCondition.current_price * 0.85)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Updated</span>
                          <span className="text-white flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {new Date(currentCondition.last_updated).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <GlassButton
                      onClick={handleBuyClick}
                      variant="primary"
                      className="w-full py-4 text-lg font-semibold"
                      disabled={!currentCondition}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Buy for {currentCondition ? formatPrice(currentCondition.current_price) : '$0.00'}
                    </GlassButton>
                    
                    <GlassButton
                      onClick={handleSellClick}
                      variant="secondary"
                      className="w-full py-4 text-lg font-semibold"
                      disabled={!currentCondition}
                    >
                      <DollarSign className="w-5 h-5 mr-2" />
                      Sell for {currentCondition ? formatPrice(currentCondition.current_price * 0.85) : '$0.00'}
                    </GlassButton>

                    {!session && (
                      <p className="text-center text-sm text-gray-400 mt-2">
                        Please sign in to buy or sell this skin
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Description</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {skin.description || `This ${skin.name} is a ${skin.rarity} ${skin.weapon_type} skin with exceptional design and craftsmanship. Available in multiple conditions to suit every budget and preference.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}