'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'

interface GlassButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDragStart'> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon,
    fullWidth = false,
    className = '',
    ...props
  }, ref) => {
    const isDisabled = disabled || loading

    const variants = {
      primary: 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border-blue-500/30 text-white',
      secondary: 'bg-white/10 hover:bg-white/20 border-white/20 text-white',
      success: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border-green-500/30 text-white',
      danger: 'bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border-red-500/30 text-white',
      warning: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border-yellow-500/30 text-white'
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    const baseClasses = `
      relative overflow-hidden
      backdrop-blur-lg
      border
      rounded-xl
      font-semibold
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500/50
      disabled:opacity-50 disabled:cursor-not-allowed
      ${fullWidth ? 'w-full' : ''}
      ${variants[variant]}
      ${sizes[size]}
      ${className}
    `

    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        
        <div className="flex items-center justify-center gap-2">
          {icon && !loading && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          {children}
        </div>
        
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      </motion.button>
    )
  }
)

GlassButton.displayName = 'GlassButton'

export default GlassButton