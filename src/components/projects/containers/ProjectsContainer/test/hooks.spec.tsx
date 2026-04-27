import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ProjectsProvider } from '../context'
import { useHandleShowExpiredCheckbox, useHandleShowCompletedCheckbox } from '../hooks'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProjectsProvider>{children}</ProjectsProvider>
)

describe('useHandleShowExpiredCheckbox', () => {
  it('starts with checked true', () => {
    const { result } = renderHook(() => useHandleShowExpiredCheckbox(), { wrapper })

    expect(result.current.checked).toBe(true)
  })

  it('toggles showExpired on onChange', () => {
    const { result } = renderHook(() => useHandleShowExpiredCheckbox(), { wrapper })

    act(() => {
      result.current.onChange()
    })

    expect(result.current.checked).toBe(false)
  })

  it('toggles back to true on second onChange', () => {
    const { result } = renderHook(() => useHandleShowExpiredCheckbox(), { wrapper })

    act(() => {
      result.current.onChange()
    })

    act(() => {
      result.current.onChange()
    })

    expect(result.current.checked).toBe(true)
  })
})

describe('useHandleShowCompletedCheckbox', () => {
  it('starts with checked true', () => {
    const { result } = renderHook(() => useHandleShowCompletedCheckbox(), { wrapper })

    expect(result.current.checked).toBe(true)
  })

  it('toggles showCompleted on onChange', () => {
    const { result } = renderHook(() => useHandleShowCompletedCheckbox(), { wrapper })

    act(() => {
      result.current.onChange()
    })

    expect(result.current.checked).toBe(false)
  })
})
