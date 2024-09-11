import { useState } from "react"
import { useSetMilestoneFilter } from '.'
import styles from './MilestoneFilter.module.css'

// Types
import { MilestoneFilterState } from "./types"

// Components
import ShowAchieved from "../../buttons/ShowAchieved/ShowAchieved"

function MilestoneFilter() {
  const [state, setState] = useState<MilestoneFilterState>({ start: '', end: '' })

  useSetMilestoneFilter(state)

  return (
    <div className={styles.container}>
      <div className="flex flex-col text-center">
        <div className={styles.title}>Milestone Filter</div>
        <small className="italic text-primaryContent">Return projects with qualifying milestones..</small>
      </div>
      <div className="flex flex-col gap-10 w-full md:flex-row md:m-auto md:w-fit">
        <div className="flex flex-col items-center">
          <label htmlFor="start" className={styles.label}>Start:</label>
          <input 
            type="date"
            className={styles.input}
            value={state.start as string}
            onChange={(e) => setState(prevState => ({ ...prevState, start: e.target.value }))} />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="end" className={styles.label}>End:</label>
          <input 
            type="date"
            className={styles.input}
            value={state.end as string}
            onChange={(e) => setState(prevState => ({ ...prevState, end: e.target.value }))} />
        </div>
      </div>
      {state.start && state.end && (
        <div className="mt-2">
          <button
            type="button"
            className={styles.btn}
            onClick={() => setState(({ start: '', end: '' }))}>
              Remove Filter
          </button>
        </div>
      )}
      <ShowAchieved />
    </div>
  )
}

export default MilestoneFilter
