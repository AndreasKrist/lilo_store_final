'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import { useTickets } from '@/hooks/useTickets'
import { useAuth } from '@/hooks/useAuth'
import { TicketType, SkinCondition, SKIN_CONDITIONS } from '@/types'
import { getConditionName } from '@/lib/utils'

const ticketSchema = z.object({
  type: z.enum(['buy', 'sell'] as const),
  skin_name: z.string().min(1, 'Skin name is required').max(100, 'Skin name too long'),
  condition: z.enum(['fn', 'mw', 'ft', 'ww', 'bs'] as const),
  notes: z.string().max(500, 'Notes too long').optional(),
})

type TicketFormData = z.infer<typeof ticketSchema>

interface TicketFormProps {
  initialType?: TicketType
  initialSkinName?: string
  initialCondition?: SkinCondition
  onSuccess?: () => void
  onCancel?: () => void
}

export default function TicketForm({ 
  initialType = 'buy',
  initialSkinName = '',
  initialCondition = 'fn',
  onSuccess,
  onCancel 
}: TicketFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isAuthenticated } = useAuth()
  const { handleCreateTicket } = useTickets()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      type: initialType,
      skin_name: initialSkinName,
      condition: initialCondition,
      notes: ''
    }
  })

  const watchedType = watch('type')

  const onSubmit = async (data: TicketFormData) => {
    if (!isAuthenticated) {
      alert('Please sign in to create a ticket')
      return
    }

    setIsSubmitting(true)

    try {
      const ticket = await handleCreateTicket({
        type: data.type,
        skin_name: data.skin_name,
        condition: data.condition,
        notes: data.notes
      })

      if (ticket) {
        reset()
        onSuccess?.()
        alert(`${data.type === 'buy' ? 'Buy' : 'Sell'} request submitted successfully! We'll get back to you soon.`)
      } else {
        throw new Error('Failed to create ticket')
      }
    } catch (error) {
      console.error('Error creating ticket:', error)
      alert('Failed to create ticket. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <GlassCard className="p-8 text-center">
        <h3 className="text-xl font-bold mb-4 text-white">Sign In Required</h3>
        <p className="text-gray-300 mb-6">
          You need to be signed in to create buy/sell requests.
        </p>
        <GlassButton variant="primary">
          Sign In with Google
        </GlassButton>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {watchedType === 'buy' ? 'Buy Request' : 'Sell Request'}
        </h2>
        <p className="text-gray-300 text-sm">
          {watchedType === 'buy' 
            ? 'Tell us what skin you want to buy and we\'ll find it for you.'
            : 'Submit your skin for evaluation and get an instant quote.'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Request Type */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Request Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="relative">
              <input
                type="radio"
                value="buy"
                {...register('type')}
                className="sr-only"
              />
              <div className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all text-center
                ${watchedType === 'buy' 
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400' 
                  : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/30'
                }
              `}>
                <div className="text-2xl mb-2">🛒</div>
                <div className="font-medium">Buy Skin</div>
                <div className="text-xs opacity-75">Request a specific skin</div>
              </div>
            </label>

            <label className="relative">
              <input
                type="radio"
                value="sell"
                {...register('type')}
                className="sr-only"
              />
              <div className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all text-center
                ${watchedType === 'sell' 
                  ? 'border-green-500 bg-green-500/10 text-green-400' 
                  : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/30'
                }
              `}>
                <div className="text-2xl mb-2">💰</div>
                <div className="font-medium">Sell Skin</div>
                <div className="text-xs opacity-75">Get a quote for your skin</div>
              </div>
            </label>
          </div>
        </div>

        {/* Skin Name */}
        <div>
          <label htmlFor="skin_name" className="block text-sm font-medium text-white mb-2">
            Skin Name *
          </label>
          <input
            id="skin_name"
            type="text"
            placeholder="e.g., AK-47 | Redline"
            {...register('skin_name')}
            className="form-input"
          />
          {errors.skin_name && (
            <p className="mt-1 text-sm text-red-400">{errors.skin_name.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-400">
            Enter the exact name of the skin you want to {watchedType}.
          </p>
        </div>

        {/* Condition */}
        <div>
          <label htmlFor="condition" className="block text-sm font-medium text-white mb-2">
            Condition *
          </label>
          <select
            id="condition"
            {...register('condition')}
            className="form-select"
          >
            {Object.entries(SKIN_CONDITIONS).map(([code, name]) => (
              <option key={code} value={code} className="bg-gray-800">
                {name}
              </option>
            ))}
          </select>
          {errors.condition && (
            <p className="mt-1 text-sm text-red-400">{errors.condition.message}</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-white mb-2">
            Additional Notes
          </label>
          <textarea
            id="notes"
            rows={4}
            placeholder={
              watchedType === 'buy' 
                ? 'Any specific requirements? Float range preferences? Budget constraints?'
                : 'Describe the condition, any special features, or other details about your skin.'
            }
            {...register('notes')}
            className="form-textarea"
          />
          {errors.notes && (
            <p className="mt-1 text-sm text-red-400">{errors.notes.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-400">
            Optional: Add any additional information that might help us process your request.
          </p>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <GlassButton
            type="submit"
            variant={watchedType === 'buy' ? 'primary' : 'secondary'}
            loading={isSubmitting}
            disabled={!isValid}
            className="flex-1"
          >
            {isSubmitting 
              ? 'Submitting...' 
              : `Submit ${watchedType === 'buy' ? 'Buy' : 'Sell'} Request`
            }
          </GlassButton>
          
          {onCancel && (
            <GlassButton
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </GlassButton>
          )}
        </div>
      </form>

      {/* Info Section */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <h3 className="font-semibold text-white mb-3">What happens next?</h3>
        <div className="space-y-2 text-sm text-gray-300">
          {watchedType === 'buy' ? (
            <>
              <p>• We'll search for your requested skin and provide pricing</p>
              <p>• You'll receive a quote within 1-2 hours</p>
              <p>• Pay to secure your order and receive it after trade hold</p>
            </>
          ) : (
            <>
              <p>• Our experts will evaluate your skin and provide a quote</p>
              <p>• You'll receive pricing within 30 minutes</p>
              <p>• Accept the quote and send your skin to get paid instantly</p>
            </>
          )}
        </div>
      </div>
    </GlassCard>
  )
}