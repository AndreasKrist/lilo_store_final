'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import { RefreshCw, Home, AlertTriangle } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  const handleGoHome = () => {
    window.location.href = '/'
  }

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlassCard className="p-12">
            {/* Error Illustration */}
            <motion.div
              className="text-8xl mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AlertTriangle className="w-20 h-20 text-red-400 mx-auto" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              We encountered an unexpected error. Don't worry, our team has been notified 
              and we're working to fix it.
            </p>
            
            {/* Error Details (Development only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
                <h3 className="font-semibold text-red-400 mb-2">Error Details:</h3>
                <p className="text-sm text-gray-300 break-words">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-gray-400 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GlassButton 
                variant="primary" 
                onClick={reset}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </GlassButton>
              
              <GlassButton 
                onClick={handleGoHome}
                className="w-full sm:w-auto"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </GlassButton>
              
              <GlassButton 
                onClick={handleReload}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Page
              </GlassButton>
            </div>
            
            {/* Support Information */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="font-semibold text-white mb-3">Need help?</h3>
              <p className="text-sm text-gray-400 mb-4">
                If this problem persists, please contact our support team.
              </p>
              <div className="flex flex-wrap gap-4 justify-center text-sm">
                <a 
                  href="mailto:support@lilostore.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  📧 Email Support
                </a>
                <a 
                  href="https://discord.gg/lilostore" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  💬 Discord
                </a>
                <a 
                  href="/support" 
                  className="text-green-400 hover:text-green-300 transition-colors"
                >
                  🎫 Help Center
                </a>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}