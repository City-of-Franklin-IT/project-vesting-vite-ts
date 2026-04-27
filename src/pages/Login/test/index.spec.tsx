import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { useAuth } from '@/context/Auth'
import Login from '../index'

vi.mock('@azure/msal-react', () => ({
  useMsal: vi.fn(() => ({
    instance: { getActiveAccount: vi.fn(() => null) },
    inProgress: 'none',
    accounts: []
  })),
  MsalProvider: ({ children }: any) => children
}))

vi.mock('@/context/Auth/hooks/useHandleLoginRedirect', () => ({
  default: () => vi.fn()
}))

vi.mock('@/context/Auth/hooks/useHandleLogoutRedirect', () => ({
  default: () => vi.fn()
}))

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe('Login page', () => {
  it('renders the Login button', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      token: undefined,
      refreshToken: vi.fn()
    })

    render(<Login />, { wrapper })

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('renders the View Projects link', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      token: undefined,
      refreshToken: vi.fn()
    })

    render(<Login />, { wrapper })

    expect(screen.getByRole('link', { name: /view projects/i })).toBeInTheDocument()
  })

  it('renders the Franklin Planning Department heading', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      token: undefined,
      refreshToken: vi.fn()
    })

    render(<Login />, { wrapper })

    expect(screen.getByText(/Franklin Planning Department Login/i)).toBeInTheDocument()
  })
})
