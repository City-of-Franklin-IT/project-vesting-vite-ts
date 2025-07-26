import { useHandleFilterBtnClick } from './hooks'

// Types
import { ProjectInterface } from "@/context/types"

export const FilterBtns = () => { 

  return (
    <div className="flex flex-col gap-4 mt-6 lg:flex-row">
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
      className={`btn btn-lg btn-outline text-neutral-content font-[jura] px-3 outline outline-neutral-content w-full lg:w-[200px] hover:text-neutral ${ active ? 'bg-neutral outline-none hover:text-neutral-content' : null }`}>
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">{type}</div>
    </button>
  )
}