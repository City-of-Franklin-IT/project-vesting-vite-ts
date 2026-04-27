import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { useAuth } from '@/context/Auth'
import DeleteProjectBtn from '../index'

const mockNavigate = vi.fn()

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router')>()

  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

vi.mock('@/context/AppActions', () => ({
  deleteProject: vi.fn(() => Promise.resolve({ success: true, msg: 'Deleted' }))
}))

vi.mock('@/utils/Toast/Toast', () => ({
  savedPopup: vi.fn(),
  errorPopup: vi.fn()
}))

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe('DeleteProjectBtn', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      token: 'token-123',
      refreshToken: vi.fn()
    })
  })

  it('renders Delete Project button initially', () => {
    render(<DeleteProjectBtn uuid="test-uuid" />, { wrapper })

    expect(screen.getByRole('button', { name: 'Delete Project' })).toBeInTheDocument()
  })

  it('shows Confirm Delete on first click', () => {
    render(<DeleteProjectBtn uuid="test-uuid" />, { wrapper })

    fireEvent.click(screen.getByRole('button'))

    expect(screen.getByRole('button', { name: 'Confirm Delete' })).toBeInTheDocument()
  })

  it('calls deleteProject and navigates on second click', async () => {
    const { deleteProject } = await import('@/context/AppActions')
    render(<DeleteProjectBtn uuid="test-uuid" />, { wrapper })

    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(deleteProject).toHaveBeenCalledWith('test-uuid', expect.any(Headers))
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/projects')
    })
  })

  it('shows errorPopup when delete fails', async () => {
    const { deleteProject } = await import('@/context/AppActions')
    const { errorPopup } = await import('@/utils/Toast/Toast')
    vi.mocked(deleteProject).mockResolvedValueOnce({ success: false, msg: 'Error deleting' })

    render(<DeleteProjectBtn uuid="fail-uuid" />, { wrapper })

    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(errorPopup).toHaveBeenCalledWith('Error deleting')
    })
  })
})
