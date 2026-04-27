import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('@azure/msal-react', () => ({
  useMsal: vi.fn(() => ({
    instance: {
      getActiveAccount: vi.fn(() => null)
    },
    inProgress: 'none'
  }))
}))

import { useHandleProjectCell, useHandleTableRowHover, useHandleProjectName } from '../hooks'

describe('useHandleProjectCell', () => {
  it('starts not expanded', () => {
    const { result } = renderHook(() => useHandleProjectCell())

    expect(result.current.expanded).toBe(false)
  })

  it('toggles expanded on onClick', () => {
    const { result } = renderHook(() => useHandleProjectCell())

    act(() => {
      result.current.onClick()
    })

    expect(result.current.expanded).toBe(true)
  })

  it('toggles back to false on second onClick', () => {
    const { result } = renderHook(() => useHandleProjectCell())

    act(() => {
      result.current.onClick()
    })

    act(() => {
      result.current.onClick()
    })

    expect(result.current.expanded).toBe(false)
  })
})

describe('useHandleTableRowHover', () => {
  it('starts not hovered', () => {
    const { result } = renderHook(() => useHandleTableRowHover())

    expect(result.current.hovered).toBe(false)
  })

  it('sets hovered true on onMouseEnter for wide viewport', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1280, configurable: true })
    const { result } = renderHook(() => useHandleTableRowHover())

    act(() => {
      result.current.trProps.onMouseEnter()
    })

    expect(result.current.hovered).toBe(true)
  })

  it('sets hovered false on onMouseLeave', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1280, configurable: true })
    const { result } = renderHook(() => useHandleTableRowHover())

    act(() => {
      result.current.trProps.onMouseEnter()
    })

    act(() => {
      result.current.trProps.onMouseLeave()
    })

    expect(result.current.hovered).toBe(false)
  })

  it('does not set hovered on mobile viewport', () => {
    Object.defineProperty(window, 'innerWidth', { value: 800, configurable: true })
    const { result } = renderHook(() => useHandleTableRowHover())

    act(() => {
      result.current.trProps.onMouseEnter()
    })

    expect(result.current.hovered).toBe(false)
  })
})

describe('useHandleProjectName', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns false when no active account', () => {
    const { result } = renderHook(() => useHandleProjectName())

    expect(result.current).toBe(false)
  })

  it('returns true when active account exists', async () => {
    const { useMsal } = await import('@azure/msal-react')
    vi.mocked(useMsal).mockReturnValue({
      instance: { getActiveAccount: vi.fn(() => ({ username: 'user@example.com' })) },
      inProgress: 'none'
    } as any)

    const { result } = renderHook(() => useHandleProjectName())

    expect(result.current).toBe(true)
  })
})
