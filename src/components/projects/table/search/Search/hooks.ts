import { useContext } from "react"
import ProjectsCtx from '@/components/projects/containers/ProjectsContainer/context'

// Types
import { ChangeEvent } from "react"

export const useHandleSearch = () => {
  const { searchValue, dispatch } = useContext(ProjectsCtx)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value

    dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
  }

  const value = searchValue

  return { onChange, value }
}

export const useHandleClearBtn = () => {
  const { searchValue, dispatch } = useContext(ProjectsCtx)

  const visible = !!searchValue

  const onClick = () => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
  }

  return { visible, onClick }
}