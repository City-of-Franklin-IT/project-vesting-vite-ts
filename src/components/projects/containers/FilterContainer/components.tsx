import { useHandleFilterBtn } from './hooks'

// Types
import * as AppTypes from "@/context/types"

export const FilterBtns = () => { 

  return (
    <div className="flex flex-col gap-2 mt-auto">
      <span className="text-lg text-primary-content font-[play] text-center">Filter By Type:</span>
      <div className="flex flex-col gap-4">
        <FilterBtn type={'Development Plan'} />
        <FilterBtn type={'Preliminary Plat'} />
        <FilterBtn type={'Site Plan'} />
      </div>
    </div>
  )
}

const FilterBtn = ({ type }: { type: AppTypes.ProjectTypes }) => {
  const btnProps = useHandleFilterBtn(type)

  return (
    <button { ...btnProps }>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">{type}</div>
    </button>
  )
}