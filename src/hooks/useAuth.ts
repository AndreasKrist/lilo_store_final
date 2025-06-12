import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { User } from '@/types'

export function useAuth() {
  const { data: session, status } = useSession()
  const { user, setUser, setLoading, logout } = useAuthStore()

  useEffect(() => {
    setLoading(status === 'loading')

    if (status === 'authenticated' && session?.user) {
      const userData: User = {
        id: session.user.id!,
        email: session.user.email!,
        name: session.user.name!,
        avatar_url: session.user.image!,
        trade_link: (session.user as any).trade_link,
        phone_number: (session.user as any).phone_number,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setUser(userData)
    } else if (status === 'unauthenticated') {
      logout()
    }
  }, [session, status, setUser, setLoading, logout])

  return {
    user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    session,
  }
}

export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth()
  
  return {
    isAuthenticated,
    isLoading,
    canAccess: isAuthenticated && !isLoading,
  }
}