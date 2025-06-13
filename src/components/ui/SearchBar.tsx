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
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search CS2 skins...", 
  initialValue = ''
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

  return (
    <GlassCard className="p-4 lg:p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 lg:gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full bg-transparent border border-gray-600 rounded-lg pl-10 lg:pl-12 pr-3 lg:pr-4 py-2.5 lg:py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors text-sm lg:text-base"
          />
        </div>
        <GlassButton 
          variant="primary" 
          type="submit"
          className="w-full sm:w-auto px-6 lg:px-8"
          size="sm"
        >
          Search
        </GlassButton>
      </form>
    </GlassCard>
  )
}