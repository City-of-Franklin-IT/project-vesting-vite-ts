import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { useAuth } from '@/context/Auth'
import { useRedirect } from '../hooks'

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

describe('useRedirect (Redirect page)', () => {
  it('navigates to the given href when authenticated and not loading', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      token: 'token-123',
      refreshToken: vi.fn()
    })

    renderHook(() => useRedirect('/projects'), { wrapper })

    expect(mockNavigate).toHaveBeenCalledWith('/projects')
  })

  it('navigates to / when not authenticated and not loading', () => {
    mockNavigate.mockClear()
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      token: undefined,
      refreshToken: vi.fn()
    })

    renderHook(() => useRedirect('/projects'), { wrapper })

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('does not navigate when loading', () => {
    mockNavigate.mockClear()
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: true,
      token: undefined,
      refreshToken: vi.fn()
    })

    renderHook(() => useRedirect('/projects'), { wrapper })

    expect(mockNavigate).not.toHaveBeenCalled()
  })
})
