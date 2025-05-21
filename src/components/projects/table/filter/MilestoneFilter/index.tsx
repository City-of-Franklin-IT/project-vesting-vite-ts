// Components
import * as Components from './components'

function MilestoneFilter() {

  return (
    <div className="flex flex-col gap-14 items-center justify-around p-6 w-fit border border-warning rounded-lg">
      <div className="flex flex-col gap-2 items-center">
        <Components.Header />
        <Components.DateInputs />
      </div>
      <Components.RemoveFilterBtn />
      <Components.ShowAchieved />
    </div>
  )
}

export default MilestoneFilter
