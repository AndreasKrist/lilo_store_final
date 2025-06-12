import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, AuthStore } from '@/types'

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      
      setUser: (user: User | null) => set({ user }),
      
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      
      logout: () => set({ user: null, isLoading: false }),
      
      updateUser: (updates: Partial<User>) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)