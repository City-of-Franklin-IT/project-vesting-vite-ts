import { useContext } from "react"
import ProjectsCtx from "../ProjectsContainer/context"

// Types
import { ProjectInterface } from "@/context/types"

export const useHandleFilterBtnClick = (type: ProjectInterface['type']) => {
  const { filter, dispatch } = useContext(ProjectsCtx)

  const active = filter === type

  return { handleFilterBtnClick: () => dispatch({ type: 'SET_TYPE_FILTER', payload: !active ? type : '' }), active }
}