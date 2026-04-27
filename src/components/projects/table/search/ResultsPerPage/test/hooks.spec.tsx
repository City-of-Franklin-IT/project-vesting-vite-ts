import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ProjectsProvider } from '@/components/projects/containers/ProjectsContainer/context'
import { useHandleResultsPerPage } from '../hooks'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProjectsProvider>{children}</ProjectsProvider>
)

describe('useHandleResultsPerPage', () => {
  it('starts with 100 results per page', () => {
    const { result } = renderHook(() => useHandleResultsPerPage(), { wrapper })

    expect(result.current.value).toBe(100)
  })

  it('updates results per page on onChange', () => {
    const { result } = renderHook(() => useHandleResultsPerPage(), { wrapper })

    act(() => {
      result.current.onChange({ currentTarget: { value: '25' } } as React.ChangeEvent<HTMLSelectElement>)
    })

    expect(result.current.value).toBe(25)
  })

  it('converts the string value to a number', () => {
    const { result } = renderHook(() => useHandleResultsPerPage(), { wrapper })

    act(() => {
      result.current.onChange({ currentTarget: { value: '50' } } as React.ChangeEvent<HTMLSelectElement>)
    })

    expect(typeof result.current.value).toBe('number')
    expect(result.current.value).toBe(50)
  })
})
