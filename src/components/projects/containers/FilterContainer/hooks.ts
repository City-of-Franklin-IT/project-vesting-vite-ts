import { useContext } from "react"
import ProjectsCtx from "../ProjectsContainer/context"

// Types
import * as AppTypes from "@/context/types"

/**
* Returns filter button props
**/
export const useHandleFilterBtn = (type: AppTypes.ProjectTypes) => {
  const { filter, dispatch } = useContext(ProjectsCtx)

  const active = filter === type

  const onClick = () => {
    const payload = !active ?
      type :
      ''

    dispatch({ type: 'SET_TYPE_FILTER', payload })
  }

  const className = `btn btn-lg btn-outline text-neutral-content font-[jura] px-3 outline outline-neutral-content w-full lg:w-[200px] hover:text-neutral ${ active ? 'bg-neutral outline-none hover:text-neutral-content' : '' }`

  return { onClick, className }
}