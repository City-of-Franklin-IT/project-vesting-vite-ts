// Components
import MilestoneFilter from '../../table/filter/MilestoneFilter'

function FilterContainer() {

  return (
    <div className="flex flex-col justify-evenly gap-4">
      <div className="mt-8">
        <MilestoneFilter />
      </div>
    </div>
  )
}

export default FilterContainer