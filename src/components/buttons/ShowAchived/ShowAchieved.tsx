import { useState, useContext, useEffect } from "react"
import { useCookies } from "react-cookie"
import AppContext from "../../../context/App/AppContext"
import { useShowAchieved, handleMilestones } from "."
import styles from './ShowAchieved.module.css'

// Types
import { ShowAchievedState } from "./types"

function ShowAchieved() {
  const { dispatch } = useContext(AppContext)

  const [cookies, setCookie] = useCookies(["userPreferences"])

  const [state, setState] = useState<ShowAchievedState>({ showAchieved: { firstMilestone: cookies.userPreferences?.showAchieved.firstMilestone ?? true, secondMilestone: cookies.userPreferences?.showAchieved.secondMilestone ?? true } })

  const showAchieved = useShowAchieved(state, dispatch, cookies, setCookie)

  useEffect(() => {
    showAchieved()
  }, [state])

  return (
    <div className={styles.container}>
      <div className={styles.title}>Show Achieved Milestones:</div>
      <div className="flex gap-8">
        <div className="flex flex-col gap-1">
          <label className={styles.label}>1st Milestone:</label>
          <input 
            type="checkbox"
            id="firstMilestone"
            checked={state.showAchieved.firstMilestone}
            className={styles.checkbox}
            onChange={(e) => handleMilestones(e, setState)} />
        </div>
        <div className="flex flex-col gap-1">
          <label className={styles.label}>2nd Milestone:</label>
          <input 
            type="checkbox"
            id="secondMilestone"
            checked={state.showAchieved.secondMilestone}
            className={styles.checkbox}
            onChange={(e) => handleMilestones(e, setState)} />
        </div>
      </div>
    </div>
  )
}

export default ShowAchieved
