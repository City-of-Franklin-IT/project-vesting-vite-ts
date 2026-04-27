import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ProjectsProvider } from '@/components/projects/containers/ProjectsContainer/context'
import { useHandleRemoveFilterBtn, useHandleShowAchieved, useHandleDateInput } from '../hooks'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProjectsProvider>{children}</ProjectsProvider>
)

describe('useHandleRemoveFilterBtn', () => {
  const useCombined = () => ({ date: useHandleDateInput('start'), filter: useHandleRemoveFilterBtn() })

  it('is not visible when no filter is set', () => {
    const { result } = renderHook(() => useHandleRemoveFilterBtn(), { wrapper })

    expect(result.current.visible).toBeFalsy()
  })

  it('becomes visible when a date filter is set', () => {
    const { result } = renderHook(() => useCombined(), { wrapper })

    act(() => {
      result.current.date.inputProps.onChange({ currentTarget: { value: '2024-01-01' } } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.filter.visible).toBeTruthy()
  })

  it('clears milestone filter on onClick', () => {
    const { result } = renderHook(() => useCombined(), { wrapper })

    act(() => {
      result.current.date.inputProps.onChange({ currentTarget: { value: '2024-01-01' } } as React.ChangeEvent<HTMLInputElement>)
    })

    act(() => {
      result.current.filter.onClick()
    })

    expect(result.current.date.inputProps.value).toBe('')
  })
})

describe('useHandleShowAchieved', () => {
  it('both milestones start as checked true', () => {
    const { result } = renderHook(() => useHandleShowAchieved(), { wrapper })

    expect(result.current.firstMilestoneProps.checked).toBe(true)
    expect(result.current.secondMilestoneProps.checked).toBe(true)
  })

  it('unchecking first milestone unchecks both', () => {
    const { result } = renderHook(() => useHandleShowAchieved(), { wrapper })

    act(() => {
      result.current.firstMilestoneProps.onChange()
    })

    expect(result.current.firstMilestoneProps.checked).toBe(false)
    expect(result.current.secondMilestoneProps.checked).toBe(false)
  })

  it('unchecking second milestone only unchecks second', () => {
    const { result } = renderHook(() => useHandleShowAchieved(), { wrapper })

    act(() => {
      result.current.secondMilestoneProps.onChange()
    })

    expect(result.current.firstMilestoneProps.checked).toBe(true)
    expect(result.current.secondMilestoneProps.checked).toBe(false)
  })

  it('re-checking first milestone restores first milestone only', () => {
    const { result } = renderHook(() => useHandleShowAchieved(), { wrapper })

    act(() => {
      result.current.firstMilestoneProps.onChange()
    })

    act(() => {
      result.current.firstMilestoneProps.onChange()
    })

    expect(result.current.firstMilestoneProps.checked).toBe(true)
  })
})

describe('useHandleDateInput', () => {
  it('returns correct label for start field', () => {
    const { result } = renderHook(() => useHandleDateInput('start'), { wrapper })

    expect(result.current.label).toBe('Start:')
  })

  it('returns correct label for end field', () => {
    const { result } = renderHook(() => useHandleDateInput('end'), { wrapper })

    expect(result.current.label).toBe('End:')
  })

  it('starts with empty value', () => {
    const { result } = renderHook(() => useHandleDateInput('start'), { wrapper })

    expect(result.current.inputProps.value).toBe('')
  })

  it('updates start date on onChange', () => {
    const { result } = renderHook(() => useHandleDateInput('start'), { wrapper })

    act(() => {
      result.current.inputProps.onChange({ currentTarget: { value: '2024-06-01' } } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.inputProps.value).toBe('2024-06-01')
  })

  it('updates end date on onChange', () => {
    const { result } = renderHook(() => useHandleDateInput('end'), { wrapper })

    act(() => {
      result.current.inputProps.onChange({ currentTarget: { value: '2024-12-31' } } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.inputProps.value).toBe('2024-12-31')
  })
})
