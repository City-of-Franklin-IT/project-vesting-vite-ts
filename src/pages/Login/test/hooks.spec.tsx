import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { useAuth } from '@/context/Auth'
import { useRedirectAuthenticated } from '../hooks'

const mockNavigate = vi.fn()

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()

  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe('useRedirectAuthenticated', () => {
  it('redirects to /projects when authenticated and not loading', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      token: 'token-123',
      refreshToken: vi.fn()
    })

    renderHook(() => useRedirectAuthenticated('/projects'), { wrapper })

    expect(mockNavigate).toHaveBeenCalledWith('/projects')
  })

  it('does not redirect when not authenticated', () => {
    mockNavigate.mockClear()
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      token: undefined,
      refreshToken: vi.fn()
    })

    renderHook(() => useRedirectAuthenticated('/projects'), { wrapper })

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('does not redirect when loading', () => {
    mockNavigate.mockClear()
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      isLoading: true,
      token: 'token-123',
      refreshToken: vi.fn()
    })

    renderHook(() => useRedirectAuthenticated('/projects'), { wrapper })

    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('redirects to the specified path', () => {
    mockNavigate.mockClear()
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      token: 'token-123',
      refreshToken: vi.fn()
    })

    renderHook(() => useRedirectAuthenticated('/dashboard'), { wrapper })

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })
})
