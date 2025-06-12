'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GlassCard className="p-12">
            {/* 404 Illustration */}
            <motion.div
              className="text-8xl mb-6"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🔍
            </motion.div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              404 - Page Not Found
            </h1>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              The page you're looking for doesn't exist. It might have been moved, 
              deleted, or you entered the wrong URL.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <GlassButton variant="primary" className="w-full sm:w-auto">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </GlassButton>
              </Link>
              
              <button onClick={() => window.history.back()}>
                <GlassButton className="w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </GlassButton>
              </button>
              
              <Link href="/browse">
                <GlassButton className="w-full sm:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Browse Skins
                </GlassButton>
              </Link>
            </div>
            
            {/* Help Section */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="font-semibold text-white mb-3">Looking for something specific?</h3>
              <div className="flex flex-wrap gap-2 justify-center text-sm">
                <Link href="/browse" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Browse Skins
                </Link>
                <span className="text-gray-500">•</span>
                <Link href="/sell" className="text-green-400 hover:text-green-300 transition-colors">
                  Sell Skins
                </Link>
                <span className="text-gray-500">•</span>
                <Link href="/tickets" className="text-purple-400 hover:text-purple-300 transition-colors">
                  My Tickets
                </Link>
                <span className="text-gray-500">•</span>
                <Link href="/support" className="text-orange-400 hover:text-orange-300 transition-colors">
                  Get Help
                </Link>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}