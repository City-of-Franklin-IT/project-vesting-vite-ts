import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useHandleEndpointItem } from '../hooks'

describe('useHandleEndpointItem', () => {
  it('starts with isOpen false', () => {
    const { result } = renderHook(() => useHandleEndpointItem())

    expect(result.current.checked).toBe(false)
  })

  it('toggles to true on onChange', () => {
    const { result } = renderHook(() => useHandleEndpointItem())

    act(() => {
      result.current.onChange()
    })

    expect(result.current.checked).toBe(true)
  })

  it('toggles back to false on second onChange', () => {
    const { result } = renderHook(() => useHandleEndpointItem())

    act(() => {
      result.current.onChange()
    })

    act(() => {
      result.current.onChange()
    })

    expect(result.current.checked).toBe(false)
  })

  it('returns an onChange function', () => {
    const { result } = renderHook(() => useHandleEndpointItem())

    expect(typeof result.current.onChange).toBe('function')
  })
})
