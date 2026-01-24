import { useContext } from "react"
import ProjectsCtx from '@/components/projects/containers/ProjectsContainer/context'

// Types
import { ChangeEvent } from "react"

/**
* Returns search input onChange handler and value
**/
export const useHandleSearch = () => {
  const { searchValue, dispatch } = useContext(ProjectsCtx)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const payload = e.currentTarget.value

    if(searchValue !== payload) {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
    }
  }

  const value = searchValue

  return { onChange, value }
}

/**
* Returns clear search button visibility and onClick handler
**/
export const useHandleClearBtn = () => {
  const { searchValue, dispatch } = useContext(ProjectsCtx)

  const visible = !!searchValue

  const onClick = () => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
  }

  return { visible, onClick }
}