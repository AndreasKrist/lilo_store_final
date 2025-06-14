'use client'

import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

export default function SafetyPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Trading Safety Guide</h1>
        
        <div className="space-y-8">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">🛡️ Our Security Measures</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">✅ What We Do</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Manual verification of all trades</li>
                  <li>• Advanced fraud detection systems</li>
                  <li>• Secure payment processing</li>
                  <li>• Steam trade URL validation</li>
                  <li>• 24/7 monitoring and support</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">🔒 Your Protection</h3>
                <ul className="text-gray-300 space-y-1 text-sm">
                  <li>• Never pay upfront for purchases</li>
                  <li>• All trades use official Steam system</li>
                  <li>• Instant refunds for failed trades</li>
                  <li>• Encrypted personal data storage</li>
                  <li>• Dispute resolution support</li>
                </ul>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">⚠️ Red Flags to Avoid</h2>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <ul className="text-red-300 space-y-2 text-sm">
                <li>• Never trade outside of our official platform</li>
                <li>• Don't share your Steam login credentials</li>
                <li>• Avoid deals that seem too good to be true</li>
                <li>• Never send items before receiving payment confirmation</li>
                <li>• Be wary of urgent or pressure tactics</li>
              </ul>
            </div>
          </GlassCard>
          
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">📞 Report Suspicious Activity</h2>
            <p className="text-gray-300 mb-4">
              If you encounter any suspicious behavior or potential scams, contact us immediately:
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-blue-300 font-medium">🚨 Emergency Contact: security@lilostore.com</p>
              <p className="text-gray-400 text-sm mt-2">Response time: Within 30 minutes during business hours</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}