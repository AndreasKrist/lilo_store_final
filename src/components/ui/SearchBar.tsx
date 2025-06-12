'use client'

import { useState, useCallback } from 'react'
import { Search } from 'lucide-react'
import GlassCard from './GlassCard'
import GlassButton from './GlassButton'
import { debounce } from '@/lib/utils'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  initialValue?: string
  showQuickFilters?: boolean
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search CS2 skins...", 
  initialValue = '',
  showQuickFilters = true 
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue)

  // Debounced search to avoid too many API calls
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery)
    }, 300),
    [onSearch]
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    debouncedSearch(newQuery)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleQuickFilter = (filter: string) => {
    setQuery(filter)
    onSearch(filter)
  }

  const quickFilters = [
    'AK-47',
    'AWP',
    'M4A4',
    'Knife',
    'Gloves',
    'Under $100',
    'Factory New',
    'Covert'
  ]

  return (
    <GlassCard className="p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full bg-transparent border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>
        <GlassButton variant="primary" type="submit">
          Search
        </GlassButton>
      </form>
      
      {showQuickFilters && (
        <div className="flex flex-wrap gap-2 mt-4">
          {quickFilters.map((filter) => (
            <GlassButton
              key={filter}
              size="sm"
              onClick={() => handleQuickFilter(filter)}
              className="rounded-full"
            >
              {filter}
            </GlassButton>
          ))}
        </div>
      )}
    </GlassCard>
  )
}