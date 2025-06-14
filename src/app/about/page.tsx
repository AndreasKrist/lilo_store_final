'use client'
import GlassCard from '@/components/ui/GlassCard'

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">About Lilo Store</h1>
        <div className="space-y-8">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              Lilo Store is dedicated to providing the safest, most personalized CS2 skin trading experience. 
              We believe every trade should be secure, transparent, and tailored to your needs.
            </p>
          </GlassCard>
          
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Why We're Different</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">🎯 Personalized Service</h3>
                <p className="text-gray-300 text-sm">Every trade is manually reviewed by our expert team</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">🔒 Maximum Security</h3>
                <p className="text-gray-300 text-sm">Advanced fraud protection and secure payment processing</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">⚡ Lightning Fast</h3>
                <p className="text-gray-300 text-sm">Quick quotes and instant payments</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">💬 24/7 Support</h3>
                <p className="text-gray-300 text-sm">Always here when you need help</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}