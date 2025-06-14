'use client'

import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

export default function HelpPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Help Center</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">🛒 How to Buy Skins</h2>
            <ol className="text-gray-300 space-y-2 text-sm">
              <li>1. Browse our skin catalog</li>
              <li>2. Click on the skin you want</li>
              <li>3. Select condition and create buy request</li>
              <li>4. Receive quote and make payment</li>
              <li>5. Get your skin after trade hold</li>
            </ol>
          </GlassCard>
          
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold text-white mb-4">💰 How to Sell Skins</h2>
            <ol className="text-gray-300 space-y-2 text-sm">
              <li>1. Create a sell request</li>
              <li>2. Our experts evaluate your skin</li>
              <li>3. Receive instant price quote</li>
              <li>4. Accept quote and send via Steam</li>
              <li>5. Get paid immediately</li>
            </ol>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}