'use client'

import { motion } from 'framer-motion'
import { ReactNode, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  animated?: boolean
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', hover = true, onClick, animated = true }, ref) => {
    const baseClasses = `
      bg-white/5 backdrop-blur-[15px] border border-white/10 rounded-xl
      transition-all duration-300 ease-out
      ${hover ? 'hover:bg-white/8 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20' : ''}
      ${onClick ? 'cursor-pointer' : ''}
    `

    if (animated) {
      return (
        <motion.div
          ref={ref}
          className={cn(baseClasses, className)}
          onClick={onClick}
          whileHover={hover ? { y: -2 } : {}}
          whileTap={onClick ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(baseClasses, className)}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

export default GlassCard