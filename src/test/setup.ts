import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('@/context/Auth', () => ({
  useAuth: vi.fn(() => ({
    isAuthenticated: false,
    token: undefined,
    isLoading: false,
    refreshToken: vi.fn()
  })),
  AuthProvider: ({ children }: any) => children
}))
