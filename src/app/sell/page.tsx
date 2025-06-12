'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import TicketForm from '@/components/tickets/TicketForm'
import { useAuth } from '@/hooks/useAuth'
import { DollarSign, Clock, Shield, Users } from 'lucide-react'

const benefits = [
  {
    icon: DollarSign,
    title: 'Instant Payments',
    description: 'Get paid immediately after your trade is confirmed',
    color: 'text-green-400'
  },
  {
    icon: Clock,
    title: 'Quick Quotes',
    description: 'Receive expert evaluation within 30 minutes',
    color: 'text-blue-400'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'All transactions manually verified by our team',
    color: 'text-purple-400'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: '24/7 customer support and trading assistance',
    color: 'text-orange-400'
  }
]

const process = [
  {
    step: 1,
    title: 'Submit Your Skin',
    description: 'Fill out our form with your skin details and condition',
    icon: '📝'
  },
  {
    step: 2,
    title: 'Get Expert Quote',
    description: 'Our experts evaluate your skin and provide a fair market price',
    icon: '💰'
  },
  {
    step: 3,
    title: 'Accept & Trade',
    description: 'Accept the quote and send your skin via Steam trade',
    icon: '🤝'
  },
  {
    step: 4,
    title: 'Get Paid',
    description: 'Receive instant payment once we confirm the trade',
    icon: '✅'
  }
]

const faqs = [
  {
    question: 'How quickly will I get a quote?',
    answer: 'Our expert team provides quotes within 30 minutes during business hours. Outside business hours, expect a response within 2-4 hours.'
  },
  {
    question: 'What payment methods do you support?',
    answer: 'We support PayPal, bank transfers, crypto payments (Bitcoin, Ethereum), and Steam Wallet funds. More payment options coming soon.'
  },
  {
    question: 'Do you accept all skin conditions?',
    answer: 'Yes! We accept skins in all conditions from Factory New to Battle-Scarred. Our pricing reflects the actual condition and float value.'
  },
  {
    question: 'Is there a minimum value requirement?',
    answer: 'We accept skins starting from $5 USD. For high-value items over $1000, we may require additional verification steps.'
  },
  {
    question: 'What if I change my mind?',
    answer: 'You can cancel your sell request anytime before accepting our quote. Once you accept and initiate the trade, the sale is final.'
  }
]

export default function SellPage() {
  const [showForm, setShowForm] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const { isAuthenticated } = useAuth()

  const handleFormSuccess = () => {
    setShowForm(false)
    // Could show a success message or redirect
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sell Your{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              CS2 Skins
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get the best prices for your CS2 skins with our expert evaluation service. 
            Fast quotes, instant payments, and secure transactions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {isAuthenticated ? (
              <GlassButton 
                variant="secondary" 
                size="lg"
                onClick={() => setShowForm(true)}
              >
                Start Selling Now
              </GlassButton>
            ) : (
              <div className="space-y-4">
                <GlassButton variant="secondary" size="lg">
                  Sign In to Start Selling
                </GlassButton>
                <p className="text-sm text-gray-400">
                  Quick sign-up with Google - no lengthy registration required
                </p>
              </div>
            )}
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Why Sell With Lilo Store?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard className="p-6 text-center h-full">
                    <Icon className={`w-12 h-12 mx-auto mb-4 ${benefit.color}`} />
                    <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 text-center relative">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                  
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-lg font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Sell Form Section */}
        {showForm && (
          <section className="mb-16">
            <div className="max-w-2xl mx-auto">
              <TicketForm
                initialType="sell"
                onSuccess={handleFormSuccess}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <GlassCard key={index} className="overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <h3 className="font-semibold text-white">{faq.question}</h3>
                  <span className="text-gray-400 ml-4">
                    {expandedFaq === index ? '−' : '+'}
                  </span>
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-6 border-t border-white/10">
                    <p className="text-gray-300 pt-4">{faq.answer}</p>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <GlassCard className="p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Turn Your Skins Into Cash?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied sellers who trust Lilo Store
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <GlassButton 
                  variant="secondary" 
                  size="lg"
                  onClick={() => setShowForm(true)}
                >
                  Submit Sell Request
                </GlassButton>
              ) : (
                <GlassButton variant="secondary" size="lg">
                  Sign In to Get Started
                </GlassButton>
              )}
              
              <Link href="/browse">
                <GlassButton size="lg">
                  Browse Market Prices
                </GlassButton>
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 text-sm text-gray-400">
              <p>💼 Professional evaluation • 🔒 Secure transactions • ⚡ Instant payments</p>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  )
}