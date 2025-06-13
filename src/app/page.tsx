'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import SearchBar from '@/components/ui/SearchBar'
import SkinDetailModal from '@/components/ui/SkinDetailModal'
import BuySellModal from '@/components/ui/BuySellModal'
import { TrendingUp, Shield, Clock, Users } from 'lucide-react'
import { formatPrice, getRarityColor, getRarityBadgeColor, getWeaponEmoji } from '@/lib/utils'

// Mock data for featured skins with multiple conditions each
const featuredSkins = [
  {
    id: '1',
    name: 'AK-47 | Redline',
    weapon_type: 'rifle' as const,
    rarity: 'classified' as const,
    image_url: '',
    description: 'A powerful automatic rifle, the AK-47 fires 7.62mm Soviet rounds and is the preferred assault rifle of many terrorist organizations.',
    market_hash_name: 'AK-47 | Redline',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    skin_condition_prices: [
      {
        id: '1-1',
        skin_id: '1',
        condition: 'fn' as const,
        condition_name: 'Factory New',
        float_range: '0.00-0.07',
        base_price: 120.00,
        current_price: 115.00,
        last_updated: new Date().toISOString()
      },
      {
        id: '1-2',
        skin_id: '1',
        condition: 'mw' as const,
        condition_name: 'Minimal Wear',
        float_range: '0.07-0.15',
        base_price: 95.00,
        current_price: 92.00,
        last_updated: new Date().toISOString()
      },
      {
        id: '1-3',
        skin_id: '1',
        condition: 'ft' as const,
        condition_name: 'Field-Tested',
        float_range: '0.15-0.38',
        base_price: 90.00,
        current_price: 85.00,
        last_updated: new Date().toISOString()
      },
      {
        id: '1-4',
        skin_id: '1',
        condition: 'ww' as const,
        condition_name: 'Well-Worn',
        float_range: '0.38-0.45',
        base_price: 75.00,
        current_price: 72.00,
        last_updated: new Date().toISOString()
      }
    ]
  },
  {
    id: '2',
    name: 'AWP | Lightning Strike',
    weapon_type: 'sniper' as const,
    rarity: 'classified' as const,
    image_url: '',
    description: 'High risk and high reward, the infamous AWP is recognizable by its signature report and one-shot, one-kill policy.',
    market_hash_name: 'AWP | Lightning Strike',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    skin_condition_prices: [
      {
        id: '2-1',
        skin_id: '2',
        condition: 'fn' as const,
        condition_name: 'Factory New',
        float_range: '0.00-0.07',
        base_price: 250.00,
        current_price: 245.00,
        last_updated: new Date().toISOString()
      },
      {
        id: '2-2',
        skin_id: '2',
        condition: 'mw' as const,
        condition_name: 'Minimal Wear',
        float_range: '0.07-0.15',
        base_price: 180.00,
        current_price: 175.00,
        last_updated: new Date().toISOString()
      }
    ]
  },
  {
    id: '3',
    name: 'M4A4 | Asiimov',
    weapon_type: 'rifle' as const,
    rarity: 'covert' as const,
    image_url: '',
    description: 'More accurate but less damaging than its AK-47 counterpart, the M4A4 is the full-auto assault rifle of choice for CTs.',
    market_hash_name: 'M4A4 | Asiimov',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    skin_condition_prices: [
      {
        id: '3-1',
        skin_id: '3',
        condition: 'fn' as const,
        condition_name: 'Factory New',
        float_range: '0.00-0.07',
        base_price: 180.00,
        current_price: 175.00,
        last_updated: new Date().toISOString()
      },
      {
        id: '3-2',
        skin_id: '3',
        condition: 'ft' as const,
        condition_name: 'Field-Tested',
        float_range: '0.15-0.38',
        base_price: 85.00,
        current_price: 82.00,
        last_updated: new Date().toISOString()
      },
      {
        id: '3-3',
        skin_id: '3',
        condition: 'bs' as const,
        condition_name: 'Battle-Scarred',
        float_range: '0.45-1.00',
        base_price: 70.00,
        current_price: 65.00,
        last_updated: new Date().toISOString()
      }
    ]
  }
]

const stats = [
  { label: 'Total Traded', value: '$2.4M+', icon: TrendingUp },
  { label: 'Happy Traders', value: '15,000+', icon: Users },
  { label: 'Success Rate', value: '99.8%', icon: Shield },
  { label: 'Avg Response', value: '< 1 hour', icon: Clock },
]

const features = [
  {
    title: 'Safe & Secure',
    description: 'All transactions are manually verified by our expert team',
    icon: Shield,
  },
  {
    title: 'Instant Payments',
    description: 'Get paid immediately after your trade is confirmed',
    icon: TrendingUp,
  },
  {
    title: 'Fast Support',
    description: '24/7 customer support via Discord and tickets',
    icon: Clock,
  },
  {
    title: 'Community Driven',
    description: 'Built by traders, for traders with transparent pricing',
    icon: Users,
  },
]

interface BuySellModalState {
  isOpen: boolean
  type: 'buy' | 'sell'
  skinName: string
  condition: string
  price: number
  skinId: string
}

export default function HomePage() {
  const router = useRouter()
  const [selectedSkin, setSelectedSkin] = useState<any>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [buySellModal, setBuySellModal] = useState<BuySellModalState>({
    isOpen: false,
    type: 'buy',
    skinName: '',
    condition: '',
    price: 0,
    skinId: ''
  })

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Navigate to browse page with search query
      router.push(`/browse?search=${encodeURIComponent(query.trim())}`)
    } else {
      router.push('/browse')
    }
  }

  const handleViewSkin = (skin: any) => {
    setSelectedSkin(skin)
    setShowDetailModal(true)
  }

  const handleCloseDetailModal = () => {
    setShowDetailModal(false)
    setSelectedSkin(null)
  }

  const handleBuySkin = (skinId: string, condition: string) => {
    const skin = featuredSkins.find(s => s.id === skinId) || selectedSkin
    if (!skin) return

    // Find the condition data
    const conditionData = skin.skin_condition_prices?.find(
      (p: any) => p.condition === condition
    ) || skin.skin_condition_prices?.[0]

    if (!conditionData) return

    // Close detail modal first
    setShowDetailModal(false)

    setBuySellModal({
      isOpen: true,
      type: 'buy',
      skinName: skin.name,
      condition: conditionData.condition_name,
      price: conditionData.current_price,
      skinId: skin.id
    })
  }

  const handleSellSkin = (skinId: string, condition: string) => {
    const skin = featuredSkins.find(s => s.id === skinId) || selectedSkin
    if (!skin) return

    // Find the condition data
    const conditionData = skin.skin_condition_prices?.find(
      (p: any) => p.condition === condition
    ) || skin.skin_condition_prices?.[0]

    if (!conditionData) return

    // Close detail modal first
    setShowDetailModal(false)

    setBuySellModal({
      isOpen: true,
      type: 'sell',
      skinName: skin.name,
      condition: conditionData.condition_name,
      price: conditionData.current_price * 0.85, // Offer 85% for selling
      skinId: skin.id
    })
  }

  const closeBuySellModal = () => {
    setBuySellModal(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 lg:mb-6 floating-animation text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Premium{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              CS2 Skins
            </span>
            <br />
            Trading Platform
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-300 mb-6 lg:mb-8 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the future of skin trading with our ticket-based system. 
            Safe, secure, and professionally managed transactions.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 lg:mb-12"
          >
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search CS2 skins (e.g., AK-47 Redline)"
            />
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <GlassCard key={stat.label} className="p-4 lg:p-6 text-center">
                  <Icon className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-2 lg:mb-3 text-blue-400" />
                  <div className="text-xl lg:text-2xl xl:text-3xl font-bold gradient-text mb-1 lg:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-xs lg:text-sm">{stat.label}</div>
                </GlassCard>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Skins */}
      <section className="px-4 pb-12 lg:pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 lg:mb-8 gap-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">Featured Skins</h2>
            <Link href="/browse">
              <GlassButton size="sm" className="w-full sm:w-auto">View All Skins</GlassButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {featuredSkins.map((skin, index) => {
              // Get the highest price from all conditions
              const prices = skin.skin_condition_prices.map(condition => condition.current_price)
              const highestPrice = Math.max(...prices)
              
              return (
                <motion.div
                  key={skin.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard 
                    className={`overflow-hidden ${getRarityColor(skin.rarity)} group cursor-pointer hover:scale-[1.02] transition-transform`}
                    onClick={() => handleViewSkin(skin)}
                  >
                    <div className="relative h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-gray-800/20 to-gray-900/20 overflow-hidden">
                      <div className="absolute top-2 lg:top-3 left-2 lg:left-3">
                        <span className={`${getRarityBadgeColor(skin.rarity)} text-white text-xs px-2 py-1 rounded-full capitalize`}>
                          {skin.rarity}
                        </span>
                      </div>
                      <div className="absolute top-2 lg:top-3 right-2 lg:right-3">
                        <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                          {skin.skin_condition_prices.length} conditions
                        </span>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-3xl sm:text-4xl lg:text-6xl opacity-50">{getWeaponEmoji(skin.weapon_type)}</div>
                      </div>

                      {/* View Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <GlassButton
                          size="sm"
                          variant="primary"
                          className="text-sm px-3 lg:px-4 py-2"
                        >
                          View Details
                        </GlassButton>
                      </div>
                      
                      {/* Shimmer effect on hover */}
                      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="p-3 sm:p-4 lg:p-6">
                      <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-2 text-white line-clamp-1">{skin.name}</h3>
                      <p className="text-gray-400 text-xs lg:text-sm mb-3 lg:mb-4 capitalize">{skin.weapon_type}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400 block">
                            {formatPrice(highestPrice)}
                          </span>
                          <span className="text-xs text-gray-400">
                            up to • {skin.skin_condition_prices.length} conditions
                          </span>
                        </div>
                        <div className="text-center text-xs text-gray-400">
                          Click to view
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 pb-12 lg:pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12 text-white">How Lilo Store Works</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Selling Process */}
            <GlassCard className="p-6 lg:p-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-xl lg:text-2xl">
                  💰
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white">Selling Your Skins</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Submit Request', desc: 'Create a sell ticket with your skin details' },
                  { step: 2, title: 'Get Quote', desc: 'Our experts evaluate and provide pricing' },
                  { step: 3, title: 'Send & Get Paid', desc: 'Trade via Steam and receive instant payment' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-green-500 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold flex-shrink-0 text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white text-sm lg:text-base">{item.title}</h4>
                      <p className="text-gray-300 text-xs lg:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Buying Process */}
            <GlassCard className="p-6 lg:p-8">
              <div className="text-center mb-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-xl lg:text-2xl">
                  🛒
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-4 text-white">Buying Skins</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Request Skin', desc: 'Specify the skin and condition you want' },
                  { step: 2, title: 'Secure Payment', desc: 'Pay to reserve your item' },
                  { step: 3, title: 'Receive Item', desc: 'Get your skin after 7-8 day trade hold' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-4">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold flex-shrink-0 text-white">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white text-sm lg:text-base">{item.title}</h4>
                      <p className="text-gray-300 text-xs lg:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-12 lg:pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12 text-white">Why Choose Lilo Store?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard className="p-4 lg:p-6 text-center h-full">
                    <Icon className="w-8 h-8 lg:w-12 lg:h-12 mx-auto mb-3 lg:mb-4 text-blue-400" />
                    <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-300 text-xs lg:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-12 lg:pb-20">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-6 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-white">Ready to Start Trading?</h2>
            <p className="text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8">
              Join thousands of satisfied traders on the most trusted CS2 skin platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse">
                <GlassButton variant="primary" size="lg" className="w-full sm:w-auto">
                  Browse Skins
                </GlassButton>
              </Link>
              <Link href="/sell">
                <GlassButton variant="secondary" size="lg" className="w-full sm:w-auto">
                  Sell Your Skins
                </GlassButton>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Skin Detail Modal */}
      <SkinDetailModal
        isOpen={showDetailModal}
        onClose={handleCloseDetailModal}
        skin={selectedSkin}
        onBuy={handleBuySkin}
        onSell={handleSellSkin}
      />

      {/* Buy/Sell Modal */}
      <BuySellModal
        isOpen={buySellModal.isOpen}
        onClose={closeBuySellModal}
        type={buySellModal.type}
        skinName={buySellModal.skinName}
        condition={buySellModal.condition}
        price={buySellModal.price}
        skinId={buySellModal.skinId}
      />
    </div>
  )
}