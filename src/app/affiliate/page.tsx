'use client'

import Link from 'next/link'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

const benefits = [
  {
    icon: '💰',
    title: 'Earn Commission',
    description: 'Get paid for every successful trade from your referrals'
  },
  {
    icon: '🎯',
    title: 'High Conversion',
    description: 'Our platform converts well with professional service'
  },
  {
    icon: '📊',
    title: 'Real-time Tracking',
    description: 'Monitor your referrals and earnings in real-time'
  },
  {
    icon: '🔒',
    title: 'Reliable Payments',
    description: 'Monthly payments with multiple payout options'
  }
]

const requirements = [
  {
    icon: '✅',
    title: 'Content Creator',
    description: 'YouTube, Twitch, TikTok, or other gaming content platforms'
  },
  {
    icon: '👥',
    title: 'Active Community',
    description: 'Engaged audience interested in CS2 and gaming'
  },
  {
    icon: '🎮',
    title: 'Gaming Focus',
    description: 'Content related to CS2, gaming, or trading'
  },
  {
    icon: '📈',
    title: 'Quality Content',
    description: 'Professional, family-friendly content with good engagement'
  }
]

const commissionTiers = [
  {
    tier: 'Bronze',
    referrals: '1-10',
    commission: '5%',
    color: 'border-orange-600 bg-orange-500/10',
    textColor: 'text-orange-400'
  },
  {
    tier: 'Silver',
    referrals: '11-25',
    commission: '7%',
    color: 'border-gray-400 bg-gray-500/10',
    textColor: 'text-gray-300'
  },
  {
    tier: 'Gold',
    referrals: '26-50',
    commission: '10%',
    color: 'border-yellow-500 bg-yellow-500/10',
    textColor: 'text-yellow-400'
  },
  {
    tier: 'Diamond',
    referrals: '51+',
    commission: '15%',
    color: 'border-blue-400 bg-blue-500/10',
    textColor: 'text-blue-400'
  }
]

export default function AffiliatePage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Partner with{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Lilo Store
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our affiliate program and earn money by promoting the most trusted CS2 skin trading platform
          </p>
          <GlassButton variant="primary" size="lg" className="mb-4">
            Apply Now - Contact Us Manually
          </GlassButton>
          <p className="text-sm text-gray-400">
            Currently accepting applications via direct contact only
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Why Partner With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <GlassCard key={index} className="p-6 text-center h-full">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Commission Structure */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Commission Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commissionTiers.map((tier, index) => (
              <GlassCard key={index} className={`p-6 text-center border-2 ${tier.color}`}>
                <div className={`text-2xl font-bold mb-2 ${tier.textColor}`}>
                  {tier.tier}
                </div>
                <div className="text-white text-lg mb-2">
                  {tier.commission} Commission
                </div>
                <div className="text-gray-400 text-sm mb-4">
                  {tier.referrals} monthly trades
                </div>
                <div className="text-gray-300 text-xs">
                  Commission per successful trade from your referrals
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              Commission is calculated based on monthly successful trades from your referrals
            </p>
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Application Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((req, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl flex-shrink-0">{req.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white">{req.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {req.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">Apply & Get Approved</h3>
              <p className="text-gray-300 text-sm">
                Contact us with your content portfolio and audience details for manual review
              </p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">Promote & Share</h3>
              <p className="text-gray-300 text-sm">
                Share your unique referral links and promote Lilo Store to your audience
              </p>
            </GlassCard>
            
            <GlassCard className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">Earn Commission</h3>
              <p className="text-gray-300 text-sm">
                Get paid monthly for every successful trade from your referred users
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Application Process */}
        <section className="mb-12">
          <GlassCard className="p-8">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Application Process</h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Currently: Manual Application Only</h3>
                <p className="text-gray-300 mb-4">
                  We're currently accepting affiliate applications through direct contact to ensure the best partnerships and personalized support.
                </p>
                <div className="space-y-3 text-sm text-gray-300">
                  <p><strong>What to include in your application:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Your content platform(s) and follower count</li>
                    <li>Examples of your CS2/gaming content</li>
                    <li>Audience demographics and engagement rates</li>
                    <li>Previous affiliate/partnership experience</li>
                    <li>Why you want to partner with Lilo Store</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <GlassButton variant="primary" size="lg">
                      📧 Contact Form
                    </GlassButton>
                  </Link>
                  <a href="https://discord.gg/yF59qGnpgX" target="_blank" rel="noopener noreferrer">
                    <GlassButton variant="secondary" size="lg">
                      💬 Discord DM
                    </GlassButton>
                  </a>
                </div>
                <p className="text-sm text-gray-400">
                  Email: partnerships@lilostore.com | Response time: 24-48 hours
                </p>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Affiliate FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold mb-3 text-white">How are commissions paid?</h3>
              <p className="text-gray-300 text-sm">
                Commissions are paid monthly via PayPal, bank transfer, or cryptocurrency. Minimum payout is $50.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold mb-3 text-white">When do I get credited?</h3>
              <p className="text-gray-300 text-sm">
                You earn commission when a referred user completes their first successful trade on our platform.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold mb-3 text-white">Can I promote on multiple platforms?</h3>
              <p className="text-gray-300 text-sm">
                Yes! You can promote on YouTube, Twitch, TikTok, Discord, and other platforms with appropriate content.
              </p>
            </GlassCard>
            
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold mb-3 text-white">Are there promotional restrictions?</h3>
              <p className="text-gray-300 text-sm">
                Content must be family-friendly, honest, and comply with platform guidelines. No misleading claims allowed.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <GlassCard className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Partner With Us?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join successful content creators earning with Lilo Store
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/contact">
                <GlassButton variant="primary" size="lg">
                  Apply Now - Contact Us
                </GlassButton>
              </Link>
              <Link href="/about">
                <GlassButton size="lg">
                  Learn More About Us
                </GlassButton>
              </Link>
            </div>
            <div className="text-sm text-gray-400">
              🤝 Trusted by creators • 💰 Competitive rates • 📈 Growing platform
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  )
}