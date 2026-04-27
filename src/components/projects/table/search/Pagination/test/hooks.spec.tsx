import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ProjectsProvider } from '@/components/projects/containers/ProjectsContainer/context'
import { useHandlePaginationBtns } from '../hooks'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProjectsProvider>{children}</ProjectsProvider>
)

describe('useHandlePaginationBtns', () => {
  it('prev button starts as disabled on page 1', () => {
    const { result } = renderHook(() => useHandlePaginationBtns(), { wrapper })

    expect(result.current.prevBtnProps.disabled).toBe(true)
  })

  it('next button starts as disabled when totalPages is 1', () => {
    const { result } = renderHook(() => useHandlePaginationBtns(), { wrapper })

    expect(result.current.nextBtnProps.disabled).toBe(true)
  })

  it('advances to next page on handleNextPage', () => {
    const { result } = renderHook(() => useHandlePaginationBtns(), { wrapper })

    act(() => {
      result.current.nextBtnProps.onClick()
    })

    expect(result.current.prevBtnProps.disabled).toBe(false)
  })

  it('goes back to previous page on handlePrevPage', () => {
    const { result } = renderHook(() => useHandlePaginationBtns(), { wrapper })

    act(() => {
      result.current.nextBtnProps.onClick()
    })

    act(() => {
      result.current.prevBtnProps.onClick()
    })

    expect(result.current.prevBtnProps.disabled).toBe(true)
  })
})
