import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, LoginCredentials, RegisterCredentials } from '@/types/auth'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true })
        try {
          // 実際のAPI呼び出しをシミュレート
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // デモ用のユーザーデータ
          const user: User = {
            id: '1',
            email: credentials.email,
            name: 'デモユーザー',
            plan: 'free',
            createdAt: new Date(),
            lastLoginAt: new Date()
          }
          
          set({ user, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true })
        try {
          // 実際のAPI呼び出しをシミュレート
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // デモ用のユーザーデータ
          const user: User = {
            id: '1',
            email: credentials.email,
            name: credentials.name,
            plan: 'free',
            createdAt: new Date(),
            lastLoginAt: new Date()
          }
          
          set({ user, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: async (data: Partial<User>) => {
        const { user } = get()
        if (user) {
          const updatedUser = { ...user, ...data }
          set({ user: updatedUser })
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
)
