'use client'

import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

interface FAQItem {
  question: string
  answer: string
  category: 'trading' | 'account' | 'payments' | 'security'
}

const faqData: FAQItem[] = [
  // Trading Questions
  {
    category: 'trading',
    question: 'How does the ticket-based trading system work?',
    answer: 'Our ticket system allows you to submit buy or sell requests. Our experts manually review each request, provide quotes, and handle the trade process to ensure maximum security and fair pricing.'
  },
  {
    category: 'trading',
    question: 'How long does it take to get a quote?',
    answer: 'You\'ll typically receive a quote within 30 minutes to 2 hours during business hours. For complex or high-value items, it may take up to 4 hours for thorough evaluation.'
  },
  {
    category: 'trading',
    question: 'What happens if I don\'t like the quote?',
    answer: 'No worries! You can decline any quote without any obligation. You can also provide feedback or negotiate if you feel the price is unfair.'
  },
  {
    category: 'trading',
    question: 'Do you accept all skin conditions?',
    answer: 'Yes, we accept skins in all conditions from Factory New to Battle-Scarred. Our pricing accurately reflects the condition and float value of your items.'
  },
  
  // Account Questions
  {
    category: 'account',
    question: 'Do I need to create an account to trade?',
    answer: 'Yes, you need to sign in with Google to create buy/sell requests. This helps us maintain security and track your trading history.'
  },
  {
    category: 'account',
    question: 'How do I set up my Steam trade URL?',
    answer: 'Go to your Steam inventory, click "Trade Offers," then "Who can send me Trade Offers?" Copy the trade URL and add it to your Lilo Store profile.'
  },
  {
    category: 'account',
    question: 'Can I change my trade URL later?',
    answer: 'Yes, you can update your Steam trade URL anytime in your profile settings. We recommend keeping it updated for smooth trading.'
  },
  
  // Payment Questions
  {
    category: 'payments',
    question: 'What payment methods do you accept?',
    answer: 'We support PayPal, bank transfers, cryptocurrency (Bitcoin, Ethereum), and Steam Wallet funds. More payment options are being added regularly.'
  },
  {
    category: 'payments',
    question: 'When do I get paid for selling items?',
    answer: 'Payment is processed immediately after we receive and verify your items through Steam trade. Most payments are instant.'
  },
  {
    category: 'payments',
    question: 'Are there any fees?',
    answer: 'We don\'t charge trading fees to users. Payment processing fees (like PayPal fees) may apply depending on your chosen payment method.'
  },
  {
    category: 'payments',
    question: 'What about Steam\'s 7-day trade hold?',
    answer: 'If you have trade holds enabled, you\'ll receive your items 7 days after the trade is initiated. We\'ll keep you updated throughout the process.'
  },
  
  // Security Questions
  {
    category: 'security',
    question: 'How do you ensure trading security?',
    answer: 'All trades are manually verified by our team, we use official Steam trading systems, implement fraud detection, and provide 24/7 monitoring for suspicious activity.'
  },
  {
    category: 'security',
    question: 'What if something goes wrong with my trade?',
    answer: 'Our support team is available 24/7 to resolve any issues. We provide full dispute resolution and guarantee protection for all verified trades.'
  },
  {
    category: 'security',
    question: 'Do you store my Steam login information?',
    answer: 'No, we never store Steam passwords or login credentials. We only use your public Steam information and trade URLs for processing trades.'
  },
  {
    category: 'security',
    question: 'How do I report suspicious activity?',
    answer: 'Contact our security team immediately at security@lilostore.com or through our Discord server. We investigate all reports within 30 minutes.'
  }
]

const categories = [
  { id: 'all', name: 'All Questions', icon: '❓' },
  { id: 'trading', name: 'Trading', icon: '🔄' },
  { id: 'account', name: 'Account', icon: '👤' },
  { id: 'payments', name: 'Payments', icon: '💰' },
  { id: 'security', name: 'Security', icon: '🔒' }
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleExpanded = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index)
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-300 text-lg">
            Find answers to common questions about trading CS2 skins on Lilo Store
          </p>
        </div>

        {/* Search Bar */}
        <GlassCard className="p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </GlassCard>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <GlassButton
                key={category.id}
                size="sm"
                variant={selectedCategory === category.id ? 'primary' : 'glass'}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <span>{category.icon}</span>
                {category.name}
              </GlassButton>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-8">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <GlassCard key={index} className="overflow-hidden">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full p-6 text-left flex justify-between items-start hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{faq.question}</h3>
                    <span className="text-xs text-gray-400 capitalize">{faq.category}</span>
                  </div>
                  <span className="text-gray-400 ml-4 flex-shrink-0">
                    {expandedItem === index ? '−' : '+'}
                  </span>
                </button>
                
                {expandedItem === index && (
                  <div className="px-6 pb-6 border-t border-white/10">
                    <div className="pt-4 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </GlassCard>
            ))
          ) : (
            <GlassCard className="p-8 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
              <p className="text-gray-300">
                Try adjusting your search terms or browse different categories.
              </p>
            </GlassCard>
          )}
        </div>

        {/* Contact Section */}
        <GlassCard className="p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Can't find what you're looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlassButton variant="primary" className="flex items-center gap-2">
              <span>📧</span>
              Email Support
            </GlassButton>
            <GlassButton className="flex items-center gap-2">
              <span>💬</span>
              Discord Chat
            </GlassButton>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            Average response time: Under 2 hours
          </div>
        </GlassCard>
      </div>
    </div>
  )
}