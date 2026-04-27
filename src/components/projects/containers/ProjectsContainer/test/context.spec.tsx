import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useContext } from 'react'
import { ProjectsProvider } from '../context'
import ProjectsCtx from '../context'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProjectsProvider>{children}</ProjectsProvider>
)

describe('ProjectsCtx initial state', () => {
  it('starts on page 1', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    expect(result.current.currentPage).toBe(1)
  })

  it('starts with empty filter', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    expect(result.current.filter).toBe('')
  })

  it('starts with 100 results per page', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    expect(result.current.resultsPerPage).toBe(100)
  })

  it('starts with empty search value', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    expect(result.current.searchValue).toBe('')
  })

  it('starts with showExpired true', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    expect(result.current.showExpired).toBe(true)
  })

  it('starts with showCompleted true', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    expect(result.current.showCompleted).toBe(true)
  })

  it('starts with both showAchieved flags true', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    expect(result.current.showAchieved.firstMilestone).toBe(true)
    expect(result.current.showAchieved.secondMilestone).toBe(true)
  })

  it('starts with empty milestone filter', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    expect(result.current.milestoneFilter.start).toBe('')
    expect(result.current.milestoneFilter.end).toBe('')
  })
})

describe('ProjectsCtx reducer', () => {
  it('SET_CURRENT_PAGE updates currentPage', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    act(() => {
      result.current.dispatch({ type: 'SET_CURRENT_PAGE', payload: 3 })
    })

    expect(result.current.currentPage).toBe(3)
  })

  it('SET_SEARCH_VALUE updates searchValue', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    act(() => {
      result.current.dispatch({ type: 'SET_SEARCH_VALUE', payload: 'downtown' })
    })

    expect(result.current.searchValue).toBe('downtown')
  })

  it('SET_TOTAL_PAGES updates totalPages', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    act(() => {
      result.current.dispatch({ type: 'SET_TOTAL_PAGES', payload: 5 })
    })

    expect(result.current.totalPages).toBe(5)
  })

  it('SET_RESULTS_PER_PAGE updates resultsPerPage', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    act(() => {
      result.current.dispatch({ type: 'SET_RESULTS_PER_PAGE', payload: 25 })
    })

    expect(result.current.resultsPerPage).toBe(25)
  })

  it('SET_TYPE_FILTER updates filter', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    act(() => {
      result.current.dispatch({ type: 'SET_TYPE_FILTER', payload: 'Site Plan' })
    })

    expect(result.current.filter).toBe('Site Plan')
  })

  it('TOGGLE_SHOW_EXPIRED flips showExpired', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    act(() => {
      result.current.dispatch({ type: 'TOGGLE_SHOW_EXPIRED' })
    })

    expect(result.current.showExpired).toBe(false)

    act(() => {
      result.current.dispatch({ type: 'TOGGLE_SHOW_EXPIRED' })
    })

    expect(result.current.showExpired).toBe(true)
  })

  it('TOGGLE_SHOW_COMPLETED flips showCompleted', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    act(() => {
      result.current.dispatch({ type: 'TOGGLE_SHOW_COMPLETED' })
    })

    expect(result.current.showCompleted).toBe(false)
  })

  it('SET_MILESTONE_FILTER updates milestoneFilter', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    act(() => {
      result.current.dispatch({ type: 'SET_MILESTONE_FILTER', payload: { start: '2024-01-01', end: '2024-12-31' } })
    })

    expect(result.current.milestoneFilter.start).toBe('2024-01-01')
    expect(result.current.milestoneFilter.end).toBe('2024-12-31')
  })

  it('SET_SHOW_ACHIEVED_FILTER updates showAchieved', () => {
    const { result } = renderHook(() => useContext(ProjectsCtx), { wrapper })

    act(() => {
      result.current.dispatch({ type: 'SET_SHOW_ACHIEVED_FILTER', payload: { firstMilestone: false, secondMilestone: false } })
    })

    expect(result.current.showAchieved.firstMilestone).toBe(false)
    expect(result.current.showAchieved.secondMilestone).toBe(false)
  })
})
