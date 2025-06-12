'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { User, Settings, Shield, Clock, Edit, Save, X } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useAuth } from '@/hooks/useAuth'
import { useTicketStats } from '@/hooks/useTickets'
import { isValidSteamTradeUrl, isValidPhoneNumber, formatDate } from '@/lib/utils'

const profileSchema = z.object({
  trade_link: z.string()
    .optional()
    .refine((val) => !val || isValidSteamTradeUrl(val), {
      message: 'Please enter a valid Steam trade URL'
    }),
  phone_number: z.string()
    .optional()
    .refine((val) => !val || isValidPhoneNumber(val), {
      message: 'Please enter a valid phone number'
    })
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const { user, isLoading, isAuthenticated } = useAuth()
  const stats = useTicketStats()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      trade_link: user?.trade_link || '',
      phone_number: user?.phone_number || ''
    }
  })

  const onSubmit = async (data: ProfileFormData) => {
    setIsUpdating(true)
    
    try {
      // In a real app, this would make an API call to update the user profile
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      // Update the user in the store (you'd implement this in the auth store)
      console.log('Updating profile:', data)
      
      setIsEditing(false)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCancel = () => {
    reset()
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading profile..." />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-12">
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="text-3xl font-bold text-white mb-4">Sign In Required</h1>
            <p className="text-gray-300 mb-8">
              You need to be signed in to view your profile.
            </p>
            <GlassButton variant="primary" size="lg">
              Sign In with Google
            </GlassButton>
          </GlassCard>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-300">
            Manage your account information and trading preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={user.avatar_url}
                    alt="Profile"
                    fill
                    className="rounded-full"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{user.email}</p>
                
                <div className="text-xs text-gray-500">
                  Member since {formatDate(user.created_at)}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-semibold text-white mb-3">Trading Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Tickets</span>
                    <span className="text-white">{stats.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Completed</span>
                    <span className="text-green-400">{stats.completed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Buy Requests</span>
                    <span className="text-blue-400">{stats.buyTickets}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Sell Requests</span>
                    <span className="text-green-400">{stats.sellTickets}</span>
                  </div>
                </div>
              </div>
              
              {/* Account Status */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="font-semibold text-white mb-3">Account Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">Verified Account</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {user.trade_link ? (
                      <Shield className="w-4 h-4 text-green-400" />
                    ) : (
                      <Shield className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className="text-sm text-gray-300">
                      Trade URL {user.trade_link ? 'Added' : 'Not Set'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {user.phone_number ? (
                      <Shield className="w-4 h-4 text-green-400" />
                    ) : (
                      <Shield className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-300">
                      Phone {user.phone_number ? 'Verified' : 'Not Added'}
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Basic Information</h3>
                <div className="text-sm text-gray-400">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Updated {formatDate(user.updated_at)}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    disabled
                    className="form-input opacity-60 cursor-not-allowed"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Name is synced from your Google account and cannot be changed here.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="form-input opacity-60 cursor-not-allowed"
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Email is synced from your Google account and cannot be changed here.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Trading Information */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Trading Information</h3>
                {!isEditing ? (
                  <GlassButton 
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </GlassButton>
                ) : (
                  <div className="flex space-x-2">
                    <GlassButton
                      size="sm"
                      variant="secondary"
                      onClick={handleSubmit(onSubmit)}
                      disabled={!isDirty || isUpdating}
                      loading={isUpdating}
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </GlassButton>
                    <GlassButton
                      size="sm"
                      onClick={handleCancel}
                      disabled={isUpdating}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </GlassButton>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Steam Trade URL
                  </label>
                  <input
                    type="url"
                    {...register('trade_link')}
                    disabled={!isEditing}
                    placeholder="https://steamcommunity.com/tradeoffer/new/?partner=..."
                    className={`form-input ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                  {errors.trade_link && (
                    <p className="mt-1 text-sm text-red-400">{errors.trade_link.message}</p>
                  )}
                  <div className="mt-2 text-xs text-gray-400">
                    <p>Required for trading. You can find this in Steam:</p>
                    <ol className="list-decimal list-inside mt-1 space-y-1">
                      <li>Go to Steam → Inventory → Trade Offers</li>
                      <li>Click "Who can send me Trade Offers?"</li>
                      <li>Copy the Trade URL</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    {...register('phone_number')}
                    disabled={!isEditing}
                    placeholder="+1234567890"
                    className={`form-input ${!isEditing ? 'opacity-60 cursor-not-allowed' : ''}`}
                  />
                  {errors.phone_number && (
                    <p className="mt-1 text-sm text-red-400">{errors.phone_number.message}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-400">
                    Optional: For urgent notifications about high-value trades.
                  </p>
                </div>
              </form>
            </GlassCard>

            {/* Security */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Security & Privacy</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-400">
                      Secured through your Google account
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-green-400">Enabled</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Data Privacy</h4>
                    <p className="text-sm text-gray-400">
                      Your data is encrypted and never shared
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-green-400">Protected</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">Account Verification</h4>
                    <p className="text-sm text-gray-400">
                      Verified through Google OAuth
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-green-400">Verified</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Account Actions */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-6">Account Actions</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-yellow-500/20 bg-yellow-500/10 rounded-lg">
                  <div>
                    <h4 className="font-medium text-yellow-400">Download My Data</h4>
                    <p className="text-sm text-gray-400">
                      Export all your trading data and history
                    </p>
                  </div>
                  <GlassButton size="sm">
                    Download
                  </GlassButton>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-red-500/20 bg-red-500/10 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-400">Delete Account</h4>
                    <p className="text-sm text-gray-400">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <GlassButton size="sm" variant="danger">
                    Delete
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}