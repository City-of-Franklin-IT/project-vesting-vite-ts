// Components
import MilestoneFilter from '../../table/filter/MilestoneFilter'
import * as Components from './components'

function FilterContainer() {

  return (
    <div className="flex flex-col justify-evenly gap-4 w-full">
      <Components.FilterBtns />
      
      <div className="mt-8">
        <MilestoneFilter />
      </div>
    </div>
  )
}

export default FilterContainer