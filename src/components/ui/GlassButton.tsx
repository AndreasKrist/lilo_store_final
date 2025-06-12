'use client'

import { motion } from 'framer-motion'
import { ReactNode, forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'glass' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  animated?: boolean
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ 
    children, 
    variant = 'glass', 
    size = 'md', 
    className = '',
    loading = false,
    animated = true,
    disabled,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...props
  }, ref) => {
    const baseClasses = 'font-medium rounded-lg transition-all duration-300 ease-out relative overflow-hidden inline-flex items-center justify-center gap-2'
    
    const variants = {
      primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25',
      secondary: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25',
      success: 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg hover:shadow-emerald-500/25',
      danger: 'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:shadow-lg hover:shadow-red-500/25',
      glass: 'bg-white/5 backdrop-blur-[10px] border border-white/10 text-white hover:bg-white/8'
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }

    const isDisabled = disabled || loading

    const buttonClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      isDisabled && 'opacity-50 cursor-not-allowed',
      className
    )

    // Filter out potentially conflicting props for framer-motion
    const { onDragStart, onDrag, onDragEnd, ...filteredProps } = props

    if (animated) {
      return (
        <motion.button
          ref={ref}
          className={buttonClasses}
          disabled={isDisabled}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onFocus={onFocus}
          onBlur={onBlur}
          whileHover={!isDisabled ? { scale: 1.02 } : {}}
          whileTap={!isDisabled ? { scale: 0.98 } : {}}
          {...filteredProps}
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          )}
          {children}
        </motion.button>
      )
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        {...filteredProps}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

GlassButton.displayName = 'GlassButton'

export default GlassButton