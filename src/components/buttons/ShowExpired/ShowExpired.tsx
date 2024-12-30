import { useState } from "react"
import { useShowExpired } from "."
import styles from './ShowExpired.module.css'

// Types
import { ShowExpiredState } from "./types"

function ShowExpired() {
  const [state, setState] = useState<ShowExpiredState>({ showExpired: true })

  useShowExpired(state) // Handle ctx on change

  return (
    <div className={styles.container}>
      <label className={styles.label}>Show Expired:</label>
      <input 
        type="checkbox"
        checked={state.showExpired}
        className="checkbox checkbox-primary"
        onChange={() => setState(prevState => ({ showExpired: !prevState.showExpired }))} />
    </div>
  )
}

export default ShowExpired
