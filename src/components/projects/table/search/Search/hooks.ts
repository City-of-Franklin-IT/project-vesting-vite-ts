import { useContext, useCallback } from "react"
import ProjectsCtx from '@/components/projects/containers/ProjectsContainer/context'

// Types
import { ChangeEvent } from "react"

export const useHandleSearch = () => {
  const { dispatch } = useContext(ProjectsCtx)

  return useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value

    dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
  }, [dispatch])
}