import { useContext, useState, useEffect } from "react"
import AppContext from "../../../context/App/AppContext"
import { useSetMilestoneFilter } from '.'
import styles from './MilestoneFilter.module.css'

// Types
import { MilestoneFilterState } from "./types"

function MilestoneFilter() {
  const { dispatch } = useContext(AppContext)

  const [state, setState] = useState<MilestoneFilterState>({ start: '', end: '' })

  const setMilestoneFilter = useSetMilestoneFilter(state, dispatch)

  useEffect(() => {
    setMilestoneFilter()
  }, [state])

  return (
    <div className={styles.container}>
      <div className="flex flex-col text-center">
        <div className={styles.title}>Milestone Filter</div>
        <small className="italic text-primaryContent">Return projects with qualifying milestones..</small>
      </div>
      <div className="flex gap-8">
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
            onClick={() => setState(({ start: '', end: '' }))}
            >Remove Filter
          </button>
        </div>
      )}
    </div>
  )
}

export default MilestoneFilter
