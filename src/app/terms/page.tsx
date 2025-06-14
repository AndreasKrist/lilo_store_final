'use client'

import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

export default function TermsPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <GlassCard className="p-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-6">
              By accessing and using Lilo Store, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
            
            <h2 className="text-xl font-bold text-white mb-4">2. Trading Rules</h2>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>• All trades must go through our official platform</li>
              <li>• Users must provide accurate information about their items</li>
              <li>• Fraudulent activity will result in immediate account termination</li>
              <li>• We reserve the right to cancel any suspicious transactions</li>
            </ul>
            
            <h2 className="text-xl font-bold text-white mb-4">3. User Responsibilities</h2>
            <p className="text-gray-300 mb-6">
              Users are responsible for maintaining the security of their accounts and for all activities that occur under their accounts.
            </p>
            
            <h2 className="text-xl font-bold text-white mb-4">4. Prohibited Activities</h2>
            <ul className="text-gray-300 space-y-2 mb-6">
              <li>• Using the platform for illegal activities</li>
              <li>• Attempting to manipulate prices or markets</li>
              <li>• Creating multiple accounts to circumvent restrictions</li>
              <li>• Harassing other users or staff members</li>
            </ul>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-8">
              <p className="text-blue-300 text-sm">
                For questions about these terms, contact us at legal@lilostore.com
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}