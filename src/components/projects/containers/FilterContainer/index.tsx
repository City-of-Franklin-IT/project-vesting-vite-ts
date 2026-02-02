// Components
import MilestoneFilter from '../../table/filter/MilestoneFilter'
import * as Components from './components'

function FilterContainer() {

  return (
    <div className="flex gap-4">
      <MilestoneFilter />
      <Components.FilterBtns />
    </div>
  )
}

export default FilterContainer