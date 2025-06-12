import { useEffect, useCallback } from 'react'
import { useSkinStore } from '@/store/skinStore'
import { SkinFilters } from '@/types'

export function useSkins() {
  const {
    skins,
    filteredSkins,
    filters,
    isLoading,
    pagination,
    setSkins,
    setFilters,
    setLoading,
    searchSkins,
    clearFilters,
    loadMore,
    getSkinById,
    getPopularSkins,
    getFeaturedSkins,
  } = useSkinStore()

  const handleSearch = useCallback((searchQuery: string) => {
    setFilters({ search: searchQuery })
  }, [setFilters])

  const handleFilterChange = useCallback((newFilters: Partial<SkinFilters>) => {
    setFilters(newFilters)
  }, [setFilters])

  const handleSortChange = useCallback((sortBy: SkinFilters['sort_by']) => {
    setFilters({ sort_by: sortBy })
  }, [setFilters])

  const handlePageChange = useCallback((page: number) => {
    useSkinStore.setState((state) => ({
      pagination: { ...state.pagination, page }
    }))
    searchSkins()
  }, [searchSkins])

  // Initial load
  useEffect(() => {
    if (skins.length === 0 && !isLoading) {
      searchSkins()
    }
  }, [skins.length, isLoading, searchSkins])

  return {
    skins: filteredSkins,
    filters,
    isLoading,
    pagination,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    clearFilters,
    loadMore,
    getSkinById,
    getPopularSkins,
    getFeaturedSkins,
    refresh: searchSkins,
  }
}

export function useSkinDetail(skinId: string) {
  const { getSkinById, searchSkins } = useSkinStore()
  const skin = getSkinById(skinId)

  useEffect(() => {
    if (!skin) {
      searchSkins()
    }
  }, [skin, searchSkins])

  return {
    skin,
    isLoading: !skin,
  }
}

export function useFeaturedSkins() {
  const { getFeaturedSkins, searchSkins, isLoading } = useSkinStore()

  useEffect(() => {
    searchSkins()
  }, [])

  return {
    featuredSkins: getFeaturedSkins(),
    isLoading,
  }
}

export function usePopularSkins() {
  const { getPopularSkins, searchSkins, isLoading } = useSkinStore()

  useEffect(() => {
    searchSkins()
  }, [])

  return {
    popularSkins: getPopularSkins(),
    isLoading,
  }
}