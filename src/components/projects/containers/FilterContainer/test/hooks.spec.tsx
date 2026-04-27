import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ProjectsProvider } from '@/components/projects/containers/ProjectsContainer/context'
import { useHandleFilterBtn } from '../hooks'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ProjectsProvider>{children}</ProjectsProvider>
)

describe('useHandleFilterBtn', () => {
  it('className changes when the filter becomes active', () => {
    const { result } = renderHook(() => useHandleFilterBtn('Development Plan'), { wrapper })
    const inactiveClassName = result.current.className

    act(() => {
      result.current.onClick()
    })

    expect(result.current.className).not.toBe(inactiveClassName)
  })

  it('className reverts to inactive state on second onClick (toggle off)', () => {
    const { result } = renderHook(() => useHandleFilterBtn('Preliminary Plat'), { wrapper })
    const inactiveClassName = result.current.className

    act(() => {
      result.current.onClick()
    })

    act(() => {
      result.current.onClick()
    })

    expect(result.current.className).toBe(inactiveClassName)
  })

  it('returns a className string', () => {
    const { result } = renderHook(() => useHandleFilterBtn('Site Plan'), { wrapper })

    expect(typeof result.current.className).toBe('string')
  })

  it('returns an onClick function', () => {
    const { result } = renderHook(() => useHandleFilterBtn('Site Plan'), { wrapper })

    expect(typeof result.current.onClick).toBe('function')
  })
})
