import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ProjectsProvider } from '@/components/projects/containers/ProjectsContainer/context'
import { useHandleSearch, useHandleClearBtn } from '../hooks'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProjectsProvider>{children}</ProjectsProvider>
)

describe('useHandleSearch', () => {
  it('starts with empty search value', () => {
    const { result } = renderHook(() => useHandleSearch(), { wrapper })

    expect(result.current.value).toBe('')
  })

  it('updates search value on onChange', () => {
    const { result } = renderHook(() => useHandleSearch(), { wrapper })

    act(() => {
      result.current.onChange({ currentTarget: { value: 'downtown' } } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.value).toBe('downtown')
  })

  it('does not dispatch when value is unchanged', () => {
    const { result } = renderHook(() => useHandleSearch(), { wrapper })

    act(() => {
      result.current.onChange({ currentTarget: { value: '' } } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.value).toBe('')
  })
})

describe('useHandleClearBtn', () => {
  const useCombined = () => ({ search: useHandleSearch(), clear: useHandleClearBtn() })

  it('starts with visible false when search is empty', () => {
    const { result } = renderHook(() => useHandleClearBtn(), { wrapper })

    expect(result.current.visible).toBe(false)
  })

  it('becomes visible when search has a value', () => {
    const { result } = renderHook(() => useCombined(), { wrapper })

    act(() => {
      result.current.search.onChange({ currentTarget: { value: 'test' } } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.clear.visible).toBe(true)
  })

  it('clears search value on onClick', () => {
    const { result } = renderHook(() => useCombined(), { wrapper })

    act(() => {
      result.current.search.onChange({ currentTarget: { value: 'test' } } as React.ChangeEvent<HTMLInputElement>)
    })

    act(() => {
      result.current.clear.onClick()
    })

    expect(result.current.search.value).toBe('')
    expect(result.current.clear.visible).toBe(false)
  })
})
