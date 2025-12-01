import { useContext } from "react"
import ProjectsCtx from "../ProjectsContainer/context"

// Types
import * as AppTypes from "@/context/types"

export const useHandleFilterBtn = (type: AppTypes.ProjectInterface['type']) => {
  const { filter, dispatch } = useContext(ProjectsCtx)

  const active = filter === type

  const onClick = () => {
    dispatch({ type: 'SET_TYPE_FILTER', payload: !active ? type : '' })
  }

  const className = `btn btn-lg btn-outline text-neutral-content font-[jura] px-3 outline outline-neutral-content w-full lg:w-[200px] hover:text-neutral ${ active ? 'bg-neutral outline-none hover:text-neutral-content' : null }`

  return { onClick, className }
}