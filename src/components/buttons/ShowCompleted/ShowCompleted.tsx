import { useState } from 'react'
import { useShowCompleted } from '.'
import styles from './ShowCompleted.module.css'

// Types
import { ShowCompletedState } from './types'

function ShowCompleted() {
  const [state, setState] = useState<ShowCompletedState>({ showCompleted: true })

  useShowCompleted(state) // Handle ctx and userPreferences cookie on change

  return (
    <div className={styles.container}>
      <label className={styles.label}>Show Completed:</label>
      <input 
        type="checkbox"
        checked={state.showCompleted}
        className="checkbox checkbox-primary"
        onChange={() => setState(prevState => ({ showCompleted: !prevState.showCompleted }))} />
    </div>
  )
}

export default ShowCompleted