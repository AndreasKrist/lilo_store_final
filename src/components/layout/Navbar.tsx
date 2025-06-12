'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Menu, X, User, LogOut, Settings, Ticket } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'

export default function Navbar() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: 'Browse', href: '/browse' },
    { name: 'Sell', href: '/sell' },
    { name: 'My Tickets', href: '/tickets' },
    { name: 'Support', href: '/support' },
  ]

  const profileMenuItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'My Tickets', href: '/tickets', icon: Ticket },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  // Don't render auth-dependent content until mounted
  const renderAuthSection = () => {
    // Show loading skeleton during initial mount and auth loading
    if (!mounted || status === 'loading') {
      return (
        <div className="flex items-center space-x-3">
          <div className="w-16 h-8 bg-white/10 rounded-lg animate-pulse" />
          <div className="w-20 h-8 bg-white/10 rounded-lg animate-pulse" />
        </div>
      )
    }

    if (session) {
      return (
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src={session.user?.image || ''}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="hidden md:block text-white text-sm">
              {session.user?.name}
            </span>
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {isProfileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-[15px] border border-white/20 rounded-xl shadow-xl overflow-hidden z-50"
              >
                {profileMenuItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Icon size={16} />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
                <button
                  onClick={() => {
                    signOut()
                    setIsProfileMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 transition-colors w-full text-left"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }

    return (
      <div className="flex items-center space-x-3">
        <button
          onClick={() => signIn('google')}
          className="px-6 py-3 text-base font-medium rounded-lg bg-white/5 backdrop-blur-[10px] border border-white/10 text-white hover:bg-white/8 transition-all duration-300"
        >
          Sign In
        </button>
        <button
          onClick={() => signIn('google')}
          className="px-6 py-3 text-base font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    )
  }

  return (
    <>
      <GlassCard className="fixed top-4 left-4 right-4 z-50 px-6 py-4" animated={false}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold">
              L
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Lilo Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {renderAuthSection()}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-gray-700 overflow-hidden"
            >
              <div className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>

      {/* Click outside handler for profile menu */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </>
  )
}