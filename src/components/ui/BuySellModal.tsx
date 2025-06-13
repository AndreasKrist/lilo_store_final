'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { X, ShoppingCart, DollarSign, AlertCircle } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

interface BuySellModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'buy' | 'sell'
  skinName: string
  condition: string
  price: number
  skinId: string
}

export default function BuySellModal({ 
  isOpen, 
  onClose, 
  type, 
  skinName, 
  condition, 
  price,
  skinId 
}: BuySellModalProps) {
  const { data: session } = useSession()
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (!session) {
      alert('Please sign in to continue')
      return
    }

    setIsSubmitting(true)

    try {
      // Map condition name to code
      const conditionCode = condition.toLowerCase().includes('factory') ? 'fn' :
                           condition.toLowerCase().includes('minimal') ? 'mw' :
                           condition.toLowerCase().includes('field') ? 'ft' :
                           condition.toLowerCase().includes('well') ? 'ww' :
                           condition.toLowerCase().includes('battle') ? 'bs' : 'fn'

      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          skin_name: skinName,
          condition: conditionCode,
          notes: notes || `${type === 'buy' ? 'Buy' : 'Sell'} request for ${skinName} (${condition})`
        }),
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error('Server response:', errorData)
        throw new Error('Failed to create ticket')
      }

      const ticket = await response.json()
      console.log('✅ Ticket created:', ticket)
      
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
        setNotes('')
      }, 2000)

    } catch (error) {
      console.error('❌ Error creating ticket:', error)
      alert('Failed to create ticket. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <GlassCard className="max-w-md w-full p-6 lg:p-8 text-center">
          <div className="text-4xl lg:text-6xl mb-4">✅</div>
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">Success!</h2>
          <p className="text-gray-300 mb-4 text-sm lg:text-base">
            Your {type} request has been submitted successfully. 
            You can track its progress in "My Tickets".
          </p>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <GlassCard className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-white/10 sticky top-0 bg-white/5 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            {type === 'buy' ? (
              <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
            ) : (
              <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
            )}
            <h2 className="text-lg lg:text-xl font-bold text-white">
              {type === 'buy' ? 'Buy Request' : 'Sell Request'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </div>

        <div className="p-4 lg:p-6">
          {/* Skin Info */}
          <div className="bg-white/5 rounded-lg p-4 mb-4 lg:mb-6">
            <h3 className="font-bold text-white mb-2 text-base lg:text-lg">{skinName}</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">{condition}</span>
              <span className="text-xl lg:text-2xl font-bold text-green-400">
                ${price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Process Info */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4 lg:mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-300">
                {type === 'buy' ? (
                  <div>
                    <p className="font-semibold mb-1">How buying works:</p>
                    <ul className="space-y-1 text-xs lg:text-sm">
                      <li>• We'll find the skin and provide exact pricing</li>
                      <li>• Pay to secure your order</li>
                      <li>• Receive your skin after 7-day trade hold</li>
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold mb-1">How selling works:</p>
                    <ul className="space-y-1 text-xs lg:text-sm">
                      <li>• We'll evaluate your skin and provide a quote</li>
                      <li>• Accept the quote and send via Steam trade</li>
                      <li>• Get paid instantly after confirmation</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-4 lg:mb-6">
            <label className="block text-sm font-medium text-white mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={
                type === 'buy' 
                  ? 'Any specific requirements? Float range? Budget constraints?'
                  : 'Describe your skin condition, special features, or other details.'
              }
              rows={3}
              className="w-full bg-white/5 border border-white/20 rounded-lg px-3 lg:px-4 py-2 lg:py-3 text-white placeholder-gray-400 focus:border-purple-500 focus:bg-white/10 transition-all resize-none text-sm lg:text-base"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <GlassButton
              onClick={handleSubmit}
              variant={type === 'buy' ? 'primary' : 'secondary'}
              loading={isSubmitting}
              className="flex-1 text-sm lg:text-base"
            >
              {isSubmitting 
                ? 'Submitting...' 
                : `Submit ${type === 'buy' ? 'Buy' : 'Sell'} Request`
              }
            </GlassButton>
            <GlassButton
              onClick={onClose}
              disabled={isSubmitting}
              className="sm:w-auto text-sm lg:text-base"
            >
              Cancel
            </GlassButton>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}