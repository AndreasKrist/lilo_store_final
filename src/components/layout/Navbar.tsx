'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Menu, X, User, LogOut, Settings, Ticket, Crown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '@/components/ui/GlassCard'
import { isAdmin } from '@/lib/admin'


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
  ]

  if (session?.user?.email && ['andreasmk8@gmail.com', 'fraxav474@gmail.com'].includes(session.user.email)) {
  navigation.push({ name: '👑 Admin', href: '/admin' })
}

  const profileMenuItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'My Tickets', href: '/tickets', icon: Ticket },
    { name: 'Settings', href: '/profile', icon: Settings }, // Redirect to profile for now
  ]

  if (session?.user?.email && ['andreasmk8@gmail.com', 'fraxav474@gmail.com'].includes(session.user.email)) {
  profileMenuItems.push({ name: 'Admin Panel', href: '/admin', icon: Crown })
}
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false)
      }
      if (isProfileMenuOpen && !target.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen, isProfileMenuOpen])

  // Don't render auth-dependent content until mounted
  const renderAuthSection = () => {
    // Show loading skeleton during initial mount and auth loading
    if (!mounted || status === 'loading') {
      return (
        <div className="flex items-center space-x-2 lg:space-x-3">
          <div className="w-16 h-8 bg-white/10 rounded-lg animate-pulse" />
          <div className="w-20 h-8 bg-white/10 rounded-lg animate-pulse" />
        </div>
      )
    }

    if (session) {
      return (
        <div className="relative profile-menu-container">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center space-x-2 lg:space-x-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src={session.user?.image || ''}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full w-8 h-8"
            />
            <span className="hidden md:block text-white text-sm truncate max-w-24 lg:max-w-none">
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
      <div className="flex items-center space-x-2 lg:space-x-3">
        <button
          onClick={() => signIn('google')}
          className="px-3 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-medium rounded-lg bg-white/5 backdrop-blur-[10px] border border-white/10 text-white hover:bg-white/8 transition-all duration-300"
        >
          Sign In
        </button>
        <button
          onClick={() => signIn('google')}
          className="px-3 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 whitespace-nowrap"
        >
          Get Started
        </button>
      </div>
    )
  }

  return (
    <>
      <GlassCard className="fixed top-2 lg:top-4 left-2 lg:left-4 right-2 lg:right-4 z-50 px-4 lg:px-6 py-3 lg:py-4" animated={false}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            {/* Option 1: Using uploaded logo image */}
            <Image
              src="/logo.png"
              alt="Lilo Store"
              width={40}
              height={40}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg"
            />
            
            {/* Option 2: Keep gradient background with logo */}
            {/* <div className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo-white.png"
                alt="Lilo Store"
                width={24}
                height={24}
                className="w-6 h-6 lg:w-7 lg:h-7"
              />
            </div> */}
            
            <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent hidden sm:block">
              LiloStore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
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

          {/* Auth Section and Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Auth Section */}
            <div className="hidden sm:flex">
              {renderAuthSection()}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors mobile-menu-container"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
              className="lg:hidden mt-4 pt-4 border-t border-gray-700 overflow-hidden mobile-menu-container"
            >
              <div className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors py-2 px-2 rounded hover:bg-white/5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Auth Section */}
                <div className="pt-3 border-t border-gray-700 sm:hidden">
                  {session ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 px-2 py-2">
                        <Image
                          src={session.user?.image || ''}
                          alt="Profile"
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-white text-sm truncate">
                          {session.user?.name}
                        </span>
                      </div>
                      {profileMenuItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-3 px-2 py-2 text-gray-300 hover:text-white transition-colors rounded hover:bg-white/5"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Icon size={16} />
                            <span>{item.name}</span>
                          </Link>
                        )
                      })}
                      <button
                        onClick={() => {
                          signOut()
                          setIsMenuOpen(false)
                        }}
                        className="flex items-center space-x-3 px-2 py-2 text-gray-300 hover:text-white transition-colors w-full text-left rounded hover:bg-white/5"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          signIn('google')
                          setIsMenuOpen(false)
                        }}
                        className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-white/5 backdrop-blur-[10px] border border-white/10 text-white hover:bg-white/8 transition-all duration-300"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          signIn('google')
                          setIsMenuOpen(false)
                        }}
                        className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        Get Started
                      </button>
                    </div>
                  )}
                </div>
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