import { useState, useContext, useEffect } from "react"
import AppContext from "../../../context/App/AppContext"
import { useShowExpired } from "."
import styles from './ShowExpired.module.css'

// Types
import { ShowExpiredState } from "./types"

function ShowExpired() {
  const { dispatch } = useContext(AppContext)

  const [state, setState] = useState<ShowExpiredState>({ showExpired: true })

  const showExpired = useShowExpired(state, dispatch)

  useEffect(() => {
    showExpired()
  }, [state.showExpired])

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
