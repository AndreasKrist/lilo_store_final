'use client'

import { useState, useEffect } from 'react'
import { Filter, Grid, List, SortAsc } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import SearchBar from '@/components/ui/SearchBar'
import LoadingSpinner, { SkeletonCard } from '@/components/ui/LoadingSpinner'
import SkinCard, { SkinCardSkeleton } from '@/components/skins/SkinCard'
import BuySellModal from '@/components/ui/BuySellModal'
import { useSkins } from '@/hooks/useSkins'
import { SkinFilters, WeaponType, SkinRarity, SkinCondition, WEAPON_TYPES, SKIN_RARITIES } from '@/types'

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48]

interface ModalState {
  isOpen: boolean
  type: 'buy' | 'sell'
  skinName: string
  condition: string
  price: number
  skinId: string
}

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [modal, setModal] = useState<ModalState>({
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

  const handleBuySkin = (skinId: string, condition: string) => {
    const skin = skins.find(s => s.id === skinId)
    if (!skin) return

    // Find the condition data
    const conditionData = (skin as any).skin_condition_prices?.find(
      (p: any) => p.condition === condition
    ) || (skin as any).skin_condition_prices?.[0]

    if (!conditionData) return

    setModal({
      isOpen: true,
      type: 'buy',
      skinName: skin.name,
      condition: conditionData.condition_name,
      price: conditionData.current_price,
      skinId: skin.id
    })
  }

  const handleSellSkin = (skinId: string, condition: string) => {
    const skin = skins.find(s => s.id === skinId)
    if (!skin) return

    // Find the condition data
    const conditionData = (skin as any).skin_condition_prices?.find(
      (p: any) => p.condition === condition
    ) || (skin as any).skin_condition_prices?.[0]

    if (!conditionData) return

    setModal({
      isOpen: true,
      type: 'sell',
      skinName: skin.name,
      condition: conditionData.condition_name,
      price: conditionData.current_price * 0.85, // Offer 85% for selling
      skinId: skin.id
    })
  }

  const closeModal = () => {
    setModal(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Browse CS2 Skins</h1>
          <p className="text-gray-300">
            Discover thousands of CS2 skins with real-time pricing and instant quotes
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            initialValue={filters.search}
            placeholder="Search by skin name, weapon, or collection..."
          />
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <GlassCard className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                <GlassButton 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-xs"
                >
                  Clear All
                </GlassButton>
              </div>

              <div className="space-y-6">
                {/* Weapon Types */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Weapon Type</h3>
                  <div className="space-y-2">
                    {Object.entries(WEAPON_TYPES).map(([type, label]) => (
                      <label key={type} className="flex items-center space-x-3">
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
                          className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-300">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rarity */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Rarity</h3>
                  <div className="space-y-2">
                    {Object.entries(SKIN_RARITIES).map(([rarity, { name, color }]) => (
                      <label key={rarity} className="flex items-center space-x-3">
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
                          className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                        />
                        <span className={`text-sm text-${color}-400`}>{name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Price Range</h3>
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
                        className="form-input text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Max Price ($)</label>
                      <input
                        type="number"
                        placeholder="1000"
                        value={filters.price_max || ''}
                        onChange={(e) => handleFilterChange({ 
                          price_max: e.target.value ? parseFloat(e.target.value) : undefined 
                        })}
                        className="form-input text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Price Filters */}
                <div>
                  <h3 className="font-semibold text-white mb-3">Quick Filters</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Under $50', min: 0, max: 50 },
                      { label: '$50 - $100', min: 50, max: 100 },
                      { label: '$100 - $500', min: 100, max: 500 },
                      { label: 'Over $500', min: 500, max: undefined },
                    ].map((range) => (
                      <GlassButton
                        key={range.label}
                        size="sm"
                        onClick={() => handleFilterChange({ 
                          price_min: range.min, 
                          price_max: range.max 
                        })}
                        className="w-full text-left justify-start"
                      >
                        {range.label}
                      </GlassButton>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <GlassButton
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter size={16} />
                  Filters
                </GlassButton>
                
                <span className="text-gray-300 text-sm">
                  {pagination.total} skins found
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={filters.sort_by}
                  onChange={(e) => handleSortChange(e.target.value as SkinFilters['sort_by'])}
                  className="form-select text-sm"
                >
                  <option value="name_asc">Name A-Z</option>
                  <option value="name_desc">Name Z-A</option>
                  <option value="price_asc">Price Low-High</option>
                  <option value="price_desc">Price High-Low</option>
                  <option value="newest">Newest First</option>
                </select>

                {/* View Mode */}
                <div className="flex bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white/10' : ''}`}
                  >
                    <Grid size={16} className="text-gray-300" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white/10' : ''}`}
                  >
                    <List size={16} className="text-gray-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {isLoading ? (
              <div className={`grid ${viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'} gap-6`}
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkinCardSkeleton key={i} compact={viewMode === 'list'} />
                ))}
              </div>
            ) : skins.length > 0 ? (
              <>
                <div className={`grid ${viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'} gap-6`}
                >
                  {skins.map((skin) => (
                    <SkinCard
                      key={skin.id}
                      skin={skin}
                      onBuy={handleBuySkin}
                      onSell={handleSellSkin}
                      compact={viewMode === 'list'}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex items-center gap-2">
                      <GlassButton
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
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
                          >
                            {page}
                          </GlassButton>
                        )
                      })}
                      
                      <GlassButton
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.totalPages}
                      >
                        Next
                      </GlassButton>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <GlassCard className="p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No skins found</h3>
                <p className="text-gray-300 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <GlassButton onClick={clearFilters}>
                  Clear All Filters
                </GlassButton>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Buy/Sell Modal */}
        <BuySellModal
          isOpen={modal.isOpen}
          onClose={closeModal}
          type={modal.type}
          skinName={modal.skinName}
          condition={modal.condition}
          price={modal.price}
          skinId={modal.skinId}
        />
      </div>
    </div>
  )
}