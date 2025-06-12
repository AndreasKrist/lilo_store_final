'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  className = '',
  text = 'Loading...'
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4'
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div 
        className={cn(
          'border-white/20 border-t-white rounded-full animate-spin',
          sizes[size]
        )}
      />
      {text && (
        <p className="text-gray-300 text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}

// Skeleton loader for cards
interface SkeletonProps {
  className?: string
}

export function SkeletonCard({ className = '' }: SkeletonProps) {
  return (
    <div className={cn('bg-white/5 backdrop-blur-[15px] border border-white/10 rounded-xl p-6 animate-pulse', className)}>
      <div className="space-y-4">
        <div className="h-48 bg-white/10 rounded-lg" />
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
    </div>
  )
}

// Skeleton for lists
export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i}
          className="bg-white/5 backdrop-blur-[15px] border border-white/10 rounded-xl p-4 animate-pulse"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded w-3/4" />
              <div className="h-3 bg-white/10 rounded w-1/2" />
            </div>
            <div className="h-8 bg-white/10 rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Page loading component
export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="xl" text="Loading Lilo Store..." />
    </div>
  )
}