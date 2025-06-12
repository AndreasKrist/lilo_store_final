'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider 
      refetchInterval={0} 
      refetchOnWindowFocus={false}
      // Disable automatic session fetching during SSR to prevent hydration issues
      refetchWhenOffline={false}
    >
      {children}
    </SessionProvider>
  )
}