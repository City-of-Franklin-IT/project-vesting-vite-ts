import { useHandleFilterBtn } from './hooks'

// Types
import * as AppTypes from "@/context/types"

export const FilterBtns = () => { 

  return (
    <div className="flex flex-col gap-4 mt-6 lg:flex-row">
      <FilterBtn type={'Development Plan'} />
      <FilterBtn type={'Preliminary Plat'} />
      <FilterBtn type={'Site Plan'} />
    </div>
  )
}

const FilterBtn = ({ type }: { type: AppTypes.ProjectInterface['type'] }) => {
  const btnProps = useHandleFilterBtn(type)

  return (
    <button { ...btnProps }>
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">{type}</div>
    </button>
  )
}