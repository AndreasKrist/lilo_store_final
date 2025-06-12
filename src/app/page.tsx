'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import SearchBar from '@/components/ui/SearchBar'
import { TrendingUp, Shield, Clock, Users } from 'lucide-react'

// Mock data for featured skins
const featuredSkins = [
  {
    id: '1',
    name: 'AK-47 | Redline',
    condition: 'Field-Tested',
    rarity: 'classified',
    price: 85.00,
    float: '0.007',
    emoji: '🔥'
  },
  {
    id: '2',
    name: 'AWP | Lightning Strike',
    condition: 'Factory New',
    rarity: 'classified',
    price: 245.00,
    float: '0.023',
    emoji: '⚡'
  },
  {
    id: '3',
    name: 'M4A4 | Asiimov',
    condition: 'Battle-Scarred',
    rarity: 'covert',
    price: 65.00,
    float: '0.156',
    emoji: '🌊'
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

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // In a real app, this would navigate to /browse with the search query
    console.log('Searching for:', query)
  }

  const handleBuySkin = (skinId: string, condition: string) => {
    // In a real app, this would navigate to the buy flow
    console.log('Buy skin:', skinId, condition)
  }

  const handleSellSkin = (skinId: string, condition: string) => {
    // In a real app, this would navigate to the sell flow
    console.log('Sell skin:', skinId, condition)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 floating-animation"
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
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
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
            className="mb-12"
          >
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search CS2 skins (e.g., AK-47 Redline)"
            />
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <GlassCard key={stat.label} className="p-6 text-center">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </GlassCard>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Skins */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Skins</h2>
            <Link href="/browse">
              <GlassButton>View All Skins</GlassButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSkins.map((skin, index) => (
              <motion.div
                key={skin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className={`overflow-hidden rarity-${skin.rarity} group`}>
                  <div className="relative h-48 bg-gradient-to-br from-gray-800/20 to-gray-900/20 overflow-hidden">
                    <div className="absolute top-4 left-4">
                      <span className={`bg-${skin.rarity === 'classified' ? 'purple' : 'red'}-500 text-white text-xs px-2 py-1 rounded-full capitalize`}>
                        {skin.rarity}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        Float: {skin.float}
                      </span>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-50">{skin.emoji}</div>
                    </div>
                    
                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-white">{skin.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{skin.condition}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-400">
                        ${skin.price.toFixed(2)}
                      </span>
                      <div className="flex space-x-2">
                        <GlassButton
                          size="sm"
                          onClick={() => handleBuySkin(skin.id, skin.condition)}
                        >
                          Buy
                        </GlassButton>
                        <GlassButton
                          size="sm"
                          variant="secondary"
                          onClick={() => handleSellSkin(skin.id, skin.condition)}
                        >
                          Sell
                        </GlassButton>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">How Lilo Store Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Selling Process */}
            <GlassCard className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  💰
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Selling Your Skins</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Submit Request', desc: 'Create a sell ticket with your skin details' },
                  { step: 2, title: 'Get Quote', desc: 'Our experts evaluate and provide pricing' },
                  { step: 3, title: 'Send & Get Paid', desc: 'Trade via Steam and receive instant payment' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">{item.title}</h4>
                      <p className="text-gray-300 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Buying Process */}
            <GlassCard className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                  🛒
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Buying Skins</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Request Skin', desc: 'Specify the skin and condition you want' },
                  { step: 2, title: 'Secure Payment', desc: 'Pay to reserve your item' },
                  { step: 3, title: 'Receive Item', desc: 'Get your skin after 7-8 day trade hold' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">{item.title}</h4>
                      <p className="text-gray-300 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Lilo Store?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard className="p-6 text-center h-full">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
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
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Start Trading?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied traders on the most trusted CS2 skin platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse">
                <GlassButton variant="primary" size="lg">
                  Browse Skins
                </GlassButton>
              </Link>
              <Link href="/sell">
                <GlassButton variant="secondary" size="lg">
                  Sell Your Skins
                </GlassButton>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}