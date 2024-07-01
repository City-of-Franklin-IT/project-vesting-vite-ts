import { useCookies } from "react-cookie"
import styles from './LogoutBtn.module.css'

function LogoutBtn() {
  const [cookies, removeCookies] = useCookies(["user"])

  return (
    <button 
      type="button"
      className={styles.btn}
      onClick={() => removeCookies("user", {}, { path: '/' })}>
      Logout
    </button>
  )
}

export default LogoutBtn
