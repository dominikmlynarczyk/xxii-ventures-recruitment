import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { storage } from '../../provider/storage'

type User = {
  email: string
  name: string | null
  avatarUrl: string | null
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
}

const MOCK_CREDENTIALS = {
  email: 'test@example.com',
  password: 'password123',
} as const

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })

        try {
          // Mock authentication delay, simulate a network request
          await new Promise((resolve) => setTimeout(resolve, 1000))

          if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
            set({
              user: {
                email: MOCK_CREDENTIALS.email,
                name: null,
                avatarUrl: null,
              },
              isAuthenticated: true,
            })
          } else {
            throw new Error('Invalid credentials')
          }
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        })
      },

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }))
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => storage),
    }
  )
)
