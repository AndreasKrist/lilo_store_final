'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Filter, Grid, List, Star, TrendingUp } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import SearchBar from '@/components/ui/SearchBar'
import SkinCard, { SkinCardSkeleton } from '@/components/skins/SkinCard'
import SkinDetailModal from '@/components/ui/SkinDetailModal'
import BuySellModal from '@/components/ui/BuySellModal'
import { useSkins } from '@/hooks/useSkins'
import { SkinFilters, WeaponType, SkinRarity, Skin } from '@/types'
import { PRICE_RANGES, QUICK_FILTERS } from '@/lib/constants'

// FIXED: Simple weapon types without emojis
const WEAPON_TYPES = {
  pistol: { name: 'Pistols' },
  rifle: { name: 'Rifles' },
  smg: { name: 'SMGs' },
  shotgun: { name: 'Shotguns' },
  sniper: { name: 'Sniper Rifles' },
  heavy: { name: 'Heavy' },
  knife: { name: 'Knives' },
  gloves: { name: 'Gloves' }
}

// FIXED: Proper rarity data  
const SKIN_RARITIES = {
  consumer: { name: 'Consumer Grade', color: '#B0C3D9' },
  industrial: { name: 'Industrial Grade', color: '#5E98D9' },
  milspec: { name: 'Mil-Spec Grade', color: '#4B69FF' },
  restricted: { name: 'Restricted', color: '#8847FF' },
  classified: { name: 'Classified', color: '#D32CE6' },
  covert: { name: 'Covert', color: '#EB4B4B' },
  contraband: { name: 'Contraband', color: '#E4AE39' },
  extraordinary: { name: 'Extraordinary', color: '#FFEAA7' }
}

interface BuySellModalState {
  isOpen: boolean
  type: 'buy' | 'sell'
  skinName: string
  condition: string
  price: number
  skinId: string
}

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [buySellModal, setBuySellModal] = useState<BuySellModalState>({
    isOpen: false,
    type: 'buy',
    skinName: '',
    condition: '',
    price: 0,
    skinId: ''
  })
  
  const {
    skins,
    filters,
    isLoading,
    pagination,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    clearFilters,
  } = useSkins()

  // Handle URL search parameters
  useEffect(() => {
    const urlSearch = searchParams.get('search')
    if (urlSearch && urlSearch !== filters.search) {
      handleSearch(urlSearch)
    }
  }, [searchParams, filters.search, handleSearch])

  const handleViewSkin = (skin: Skin) => {
    setSelectedSkin(skin)
    setShowDetailModal(true)
  }

  const handleCloseDetailModal = () => {
    setShowDetailModal(false)
    setSelectedSkin(null)
  }

  const handleBuySkin = (skinId: string, condition: string) => {
    const skin = skins.find(s => s.id === skinId) || selectedSkin
    if (!skin) return

    const conditionData = (skin as any).skin_condition_prices?.find(
      (p: any) => p.condition === condition
    ) || (skin as any).skin_condition_prices?.[0]

    if (!conditionData) return

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
    const skin = skins.find(s => s.id === skinId) || selectedSkin
    if (!skin) return

    const conditionData = (skin as any).skin_condition_prices?.find(
      (p: any) => p.condition === condition
    ) || (skin as any).skin_condition_prices?.[0]

    if (!conditionData) return

    setShowDetailModal(false)

    setBuySellModal({
      isOpen: true,
      type: 'sell',
      skinName: skin.name,
      condition: conditionData.condition_name,
      price: conditionData.current_price * 0.85,
      skinId: skin.id
    })
  }

  const closeBuySellModal = () => {
    setBuySellModal(prev => ({ ...prev, isOpen: false }))
  }

  const handleQuickFilter = (filter: string) => {
    handleSearch(filter)
  }

  const handlePriceRangeSelect = (range: { min: number; max: number | null }) => {
    handleFilterChange({ 
      price_min: range.min, 
      price_max: range.max || undefined 
    })
  }

  return (
    <div className="min-h-screen px-4 py-6 lg:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-4">Browse CS2 Skins</h1>
          <p className="text-gray-300 text-sm lg:text-base">
            Discover thousands of CS2 skins with real-time pricing and instant quotes
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 lg:mb-8">
          <SearchBar 
            onSearch={handleSearch}
            initialValue={filters.search}
            placeholder="Search by skin name, weapon, or collection..."
          />
        </div>

        {/* Quick Filters */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-white mb-3">Quick Filters</h3>
          <div className="flex flex-wrap gap-2">
            {QUICK_FILTERS.map((filter) => (
              <GlassButton
                key={filter}
                size="sm"
                onClick={() => handleQuickFilter(filter)}
                className="text-xs"
              >
                {filter}
              </GlassButton>
            ))}
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Sidebar Filters */}
          <div className={`w-full lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <GlassCard className="p-4 lg:p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-lg lg:text-xl font-bold text-white">Filters</h2>
                <GlassButton 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-xs"
                >
                  Clear All
                </GlassButton>
              </div>

              <div className="space-y-4 lg:space-y-6">
                {/* FIXED: Weapon Types with proper data */}
                <div>
                  <h3 className="font-semibold text-white mb-3 text-sm lg:text-base">Weapon Type</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {Object.entries(WEAPON_TYPES).map(([type, data]) => (
                      <label key={type} className="flex items-center space-x-2 lg:space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.weapon_types?.includes(type as WeaponType) || false}
                          onChange={(e) => {
                            const currentTypes = filters.weapon_types || []
                            const newTypes = e.target.checked
                              ? [...currentTypes, type as WeaponType]
                              : currentTypes.filter(t => t !== type)
                            handleFilterChange({ weapon_types: newTypes })
                          }}
                          className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                        />
                        <span className="text-xs lg:text-sm text-gray-300">
                          {data.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* FIXED: CS2 Rarity System with proper data */}
                <div>
                  <h3 className="font-semibold text-white mb-3 text-sm lg:text-base">Rarity</h3>
                  <div className="space-y-2">
                    {Object.entries(SKIN_RARITIES).map(([rarity, data]) => (
                      <label key={rarity} className="flex items-center space-x-2 lg:space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.rarities?.includes(rarity as SkinRarity) || false}
                          onChange={(e) => {
                            const currentRarities = filters.rarities || []
                            const newRarities = e.target.checked
                              ? [...currentRarities, rarity as SkinRarity]
                              : currentRarities.filter(r => r !== rarity)
                            handleFilterChange({ rarities: newRarities })
                          }}
                          className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                        />
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: data.color }}
                          />
                          <span className="text-xs lg:text-sm text-white">
                            {data.name}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-white mb-3 text-sm lg:text-base">Price Range</h3>
                  
                  {/* Quick Price Ranges */}
                  <div className="space-y-2 mb-4">
                    {PRICE_RANGES.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => handlePriceRangeSelect(range)}
                        className="block w-full text-left text-xs text-gray-300 hover:text-white p-2 rounded hover:bg-white/5 transition-colors"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>

                  {/* Custom Price Range */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Min Price ($)</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={filters.price_min || ''}
                        onChange={(e) => handleFilterChange({ 
                          price_min: e.target.value ? parseFloat(e.target.value) : undefined 
                        })}
                        className="form-input text-sm w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Max Price ($)</label>
                      <input
                        type="number"
                        placeholder="No limit"
                        value={filters.price_max || ''}
                        onChange={(e) => handleFilterChange({ 
                          price_max: e.target.value ? parseFloat(e.target.value) : undefined 
                        })}
                        className="form-input text-sm w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Special Attributes */}
                <div>
                  <h3 className="font-semibold text-white mb-3 text-sm lg:text-base">Special</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 lg:space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.stattrak || false}
                        onChange={(e) => handleFilterChange({ stattrak: e.target.checked })}
                        className="w-3 h-3 lg:w-4 lg:h-4 text-orange-600 bg-white/10 border-white/20 rounded focus:ring-orange-500"
                      />
                      <span className="text-xs lg:text-sm text-orange-400">
                        StatTrak™ Only
                      </span>
                    </label>
                    
                    <label className="flex items-center space-x-2 lg:space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.souvenir || false}
                        onChange={(e) => handleFilterChange({ souvenir: e.target.checked })}
                        className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-600 bg-white/10 border-white/20 rounded focus:ring-yellow-500"
                      />
                      <span className="text-xs lg:text-sm text-yellow-400">
                        Souvenir Only
                      </span>
                    </label>
                  </div>
                </div>

                {/* Active Filters Summary */}
                {(filters.weapon_types?.length || filters.rarities?.length || filters.price_min || filters.price_max || filters.stattrak || filters.souvenir) && (
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="font-semibold text-white mb-2 text-sm">Active Filters</h4>
                    <div className="flex flex-wrap gap-1">
                      {filters.weapon_types?.map(type => (
                        <span key={type} className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                          {WEAPON_TYPES[type].name}
                        </span>
                      ))}
                      {filters.rarities?.map(rarity => (
                        <span key={rarity} className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                          {SKIN_RARITIES[rarity].name}
                        </span>
                      ))}
                      {filters.price_min && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                          Min: ${filters.price_min}
                        </span>
                      )}
                      {filters.price_max && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                          Max: ${filters.price_max}
                        </span>
                      )}
                      {filters.stattrak && (
                        <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                          StatTrak™
                        </span>
                      )}
                      {filters.souvenir && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                          Souvenir
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
              <div className="flex items-center gap-3 lg:gap-4 w-full sm:w-auto">
                <GlassButton
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex-1 sm:flex-initial"
                  size="sm"
                >
                  <Filter size={16} />
                  <span className="ml-1">Filters</span>
                </GlassButton>
                
                <span className="text-gray-300 text-sm whitespace-nowrap">
                  {pagination.total} skins found
                </span>

                {/* Featured/Popular toggles */}
                <div className="hidden sm:flex items-center gap-2">
                  <GlassButton size="sm" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </GlassButton>
                  <GlassButton size="sm" className="text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Popular
                  </GlassButton>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:gap-4 w-full sm:w-auto">
                {/* Sort */}
                <select
                  value={filters.sort_by}
                  onChange={(e) => handleSortChange(e.target.value as SkinFilters['sort_by'])}
                  className="form-select text-sm flex-1 sm:flex-initial min-w-0"
                >
                  <option value="name_asc">Name A-Z</option>
                  <option value="name_desc">Name Z-A</option>
                  <option value="price_asc">Price Low-High</option>
                  <option value="price_desc">Price High-Low</option>
                  <option value="rarity_desc">Rarity: Rare First</option>
                  <option value="rarity_asc">Rarity: Common First</option>
                  <option value="newest">Newest First</option>
                </select>

                {/* View Mode */}
                <div className="flex bg-white/5 rounded-lg p-1 flex-shrink-0">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white/10' : ''}`}
                    title="Grid View"
                  >
                    <Grid size={16} className="text-gray-300" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white/10' : ''}`}
                    title="List View"
                  >
                    <List size={16} className="text-gray-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {isLoading ? (
              <div className={`grid ${viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'} gap-8 lg:gap-10`}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkinCardSkeleton key={i} compact={viewMode === 'list'} />
                ))}
              </div>
            ) : skins.length > 0 ? (
              <>
                {/* FIXED: Better grid spacing and BIGGER containers */}
                <div className={`grid ${viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'} gap-8 lg:gap-10`}
                >
                  {skins.map((skin) => (
                    <SkinCard
                      key={skin.id}
                      skin={skin}
                      onView={handleViewSkin}
                      compact={viewMode === 'list'}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center mt-8 lg:mt-12">
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      <GlassButton
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        size="sm"
                      >
                        Previous
                      </GlassButton>
                      
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        const page = i + 1
                        return (
                          <GlassButton
                            key={page}
                            onClick={() => handlePageChange(page)}
                            variant={pagination.page === page ? 'primary' : 'glass'}
                            size="sm"
                            className="w-10 h-10 p-0 flex items-center justify-center"
                          >
                            {page}
                          </GlassButton>
                        )
                      })}
                      
                      <GlassButton
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                        size="sm"
                      >
                        Next
                      </GlassButton>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <GlassCard className="p-8 lg:p-12 text-center">
                <div className="text-4xl lg:text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No skins found</h3>
                <p className="text-gray-300 mb-6">
                  Try adjusting your filters or search terms. Here are some suggestions:
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {QUICK_FILTERS.slice(0, 4).map((filter) => (
                    <GlassButton
                      key={filter}
                      size="sm"
                      onClick={() => handleQuickFilter(filter)}
                    >
                      {filter}
                    </GlassButton>
                  ))}
                </div>
                <GlassButton onClick={clearFilters}>
                  Clear All Filters
                </GlassButton>
              </GlassCard>
            )}
          </div>
        </div>

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
    </div>
  )
}