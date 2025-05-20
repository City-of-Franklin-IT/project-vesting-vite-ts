import { useHandleFilterBtnClick } from './hooks'

// Types
import { ProjectInterface } from "@/context/types"

export const FilterBtns = () => { 

  return (
    <div className="flex gap-4 mt-6 md:m-auto">
      <FilterBtn type={'Development Plan'} />
      <FilterBtn type={'Preliminary Plat'} />
      <FilterBtn type={'Site Plan'} />
    </div>
  )
}

const FilterBtn = ({ type }: { type: ProjectInterface['type'] }) => {
  const { handleFilterBtnClick, active } = useHandleFilterBtnClick(type)

  return (
    <button 
      onClick={handleFilterBtnClick}
      className={`btn btn-lg btn-outline text-neutral-content font-[jura] px-3 outline outline-neutral-content w-[200px] hover:text-neutral ${ active ? 'bg-neutral outline-none hover:text-neutral-content' : null }`}>
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">{type}</div>
    </button>
  )
}