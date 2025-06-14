// src/components/layout/Footer.tsx - Complete Footer with Real Links
'use client'

import Link from 'next/link'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Browse Skins', href: '/browse', description: 'Explore thousands of CS2 skins' },
        { name: 'Sell Skins', href: '/sell', description: 'Get instant quotes for your skins' },
        { name: 'My Tickets', href: '/tickets', description: 'Track your trading requests' },
        { name: 'Price Tracker', href: '/prices', description: 'Real-time market prices' },
        { name: 'Trade Calculator', href: '/calculator', description: 'Calculate trade values' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help', description: 'Find answers to common questions' },
        { name: 'Contact Us', href: '/contact', description: 'Get in touch with our team' },
        { name: 'Discord Community', href: 'https://discord.gg/yF59qGnpgX', external: true, description: 'Join our Discord server' },
        { name: 'Safety Guide', href: '/safety', description: 'Learn about safe trading' },
        { name: 'Trading Guide', href: '/guide', description: 'How to trade CS2 skins' },
        { name: 'FAQ', href: '/faq', description: 'Frequently asked questions' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '/terms', description: 'Our terms and conditions' },
        { name: 'Privacy Policy', href: '/privacy', description: 'How we protect your data' },
        { name: 'Cookie Policy', href: '/cookies', description: 'Our cookie usage policy' },
        { name: 'Refund Policy', href: '/refunds', description: 'Returns and refunds' },
        { name: 'Anti-Fraud Policy', href: '/anti-fraud', description: 'Our security measures' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about', description: 'Learn about Lilo Store' },
        { name: 'Why Choose Us', href: '/why-us', description: 'What makes us different' },
        { name: 'Security', href: '/security', description: 'Our security practices' },
        { name: 'API Documentation', href: '/api-docs', description: 'For developers' },
        { name: 'Affiliate Program', href: '/affiliate', description: 'Earn with referrals' },
        { name: 'Status Page', href: '/status', description: 'System status and uptime' },
      ]
    }
  ]

  return (
    <footer className="px-4 pb-8">
      <div className="max-w-6xl mx-auto">
        <GlassCard className="p-8" animated={false}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                {/* Updated Logo Section */}
                <div className="relative w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  {/* Use your logo image */}
                  <Image
                    src="/logo.png"
                    alt="LiloStore"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    onError={(e) => {
                      // Fallback to text if image fails
                      e.currentTarget.style.display = 'none'
                      const parent = e.currentTarget.parentElement
                      if (parent) {
                        parent.innerHTML = '<span class="text-lg font-bold text-white">L</span>'
                      }
                    }}
                  />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  LiloStore
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                The most personalized platform for CS2 skin trading with professional service and secure transactions.
              </p>
              
              {/* Trust Badges */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Trusted by 1000+ traders</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>24/7 Customer Support</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Safe & Secure Trading</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <Link 
                  href="https://discord.gg/yF59qGnpgX" 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Discord"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                </Link>
                <Link 
                  href="https://twitter.com/lilostore" 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
                <Link 
                  href="https://youtube.com/@lilostore" 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors text-sm group"
                        {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                        title={link.description}
                      >
                        <span className="group-hover:text-blue-400 transition-colors">
                          {link.name}
                        </span>
                        {link.external && (
                          <svg className="w-3 h-3 inline ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400">
                  &copy; {currentYear} Lilo Store. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  CS2 is a trademark of Valve Corporation. Lilo Store is not affiliated with Valve Corporation.
                </p>
              </div>
              <div className="flex items-center space-x-6 text-xs text-gray-400">
                <span>Made with ❤️ for the CS2 community</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
            
            {/* Additional Legal & Trust Info */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500">
                <span>🔒 SSL Secured</span>
                <span>•</span>
                <span>⚡ 99.9% Uptime</span>
                <span>•</span>
                <span>🛡️ Fraud Protection</span>
                <span>•</span>
                <span>📧 support@lilostore.com</span>
                <span>•</span>
                <Link href="/status" className="hover:text-gray-400 transition-colors">
                  📊 System Status
                </Link>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </footer>
  )
}