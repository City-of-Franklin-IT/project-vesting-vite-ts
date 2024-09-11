import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../../context/User/UserContext'
import { handleLogoutClick } from '.'
import styles from './LogoutBtn.module.css'

function LogoutBtn() {
  const { dispatch } = useContext(UserContext)

  const navigate = useNavigate()

  return (
    <button 
      type="button"
      className={styles.btn}
      onClick={() => handleLogoutClick(navigate, dispatch)}>
      Logout
    </button>
  )
}

export default LogoutBtn
