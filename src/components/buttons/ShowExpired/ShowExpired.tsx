import { useState, useContext, useEffect } from "react"
import { useCookies } from "react-cookie"
import AppContext from "../../../context/App/AppContext"
import { useShowExpired } from "."
import styles from './ShowExpired.module.css'

// Types
import { ShowExpiredState } from "./types"

function ShowExpired() {
  const { dispatch } = useContext(AppContext)

  const [cookies, setCookie] = useCookies(["userPreferences"])

  const [state, setState] = useState<ShowExpiredState>({ showExpired: cookies.userPreferences?.showExpired ?? true })

  const showExpired = useShowExpired(state, dispatch, cookies, setCookie)

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
