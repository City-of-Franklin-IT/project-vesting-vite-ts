import { useState } from "react"
import { useCookies } from "react-cookie"
import { useShowExpired } from "."
import styles from './ShowExpired.module.css'

// Types
import { ShowExpiredState } from "./types"

function ShowExpired() {
  const [cookies, _] = useCookies(["userPreferences"])

  const [state, setState] = useState<ShowExpiredState>({ showExpired: cookies.userPreferences?.showExpired ?? true })

  useShowExpired(state) // Handle ctx and userPreferences cookie on change

  return (
    <div className={styles.container}>
      <label className={styles.label}>Show Expired:</label>
      <input 
        type="checkbox"
        checked={state.showExpired}
        className={styles.checkbox}
        onChange={() => setState(prevState => ({ showExpired: !prevState.showExpired }))} />
    </div>
  )
}

export default ShowExpired
