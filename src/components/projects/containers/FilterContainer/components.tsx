import { useContext } from "react"
import ProjectsCtx from "../ProjectsContainer/context"

// Types
import { ProjectInterface } from "@/context/App/types"

export const FilterBtns = () => { 
  const { filter } = useContext(ProjectsCtx)

  if(!filter) return null

  return (
    <div className="mt-6 m-none md:m-auto">
      <FilterBtn type={'Development Plan'} />
      <FilterBtn type={'Preliminary Plat'} />
      <FilterBtn type={'Site Plan'} />
    </div>
  )
}

export const ClearFilterBtn = () => {
  const { filter, dispatch } = useContext(ProjectsCtx)

  if(!filter) return null

  return (
    <button 
      onClick={() => dispatch({ type: 'SET_TYPE_FILTER', payload: '' })}
      className="btn btn-ghost font-[jura] w-[200px] h-[40px] px-3 outline outline-neutral-content rounded-xl shadow-xl shadow-neutral-content">
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">Clear Filter</div>
    </button>
  )
}

const FilterBtn = ({ type }: { type: ProjectInterface['type'] }) => {
  const { dispatch } = useContext(ProjectsCtx)

  return (
    <button 
      onClick={() => dispatch({ type: 'SET_TYPE_FILTER', payload: type })}
      className="btn btn-ghost font-[jura] w-[200px] h-[40px] px-3 outline outline-neutral-content rounded-xl shadow-xl shadow-neutral-content">
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">{type}</div>
    </button>
  )
}