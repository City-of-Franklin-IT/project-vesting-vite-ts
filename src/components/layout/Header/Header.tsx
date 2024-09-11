import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import UserContext from '../../../context/User/UserContext'
import { APP_TITLE } from '../../../config'
import styles from './Header.module.css'

// Components
import CreateContainer from '../../create/CreateContainer/CreateContainer'
import LogoutBtn from '../../buttons/LogoutBtn/LogoutBtn'

function Header() {
  const { user } = useContext(UserContext)

  const location = useLocation()

  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <div className={styles.title}>
          <h1 className={styles.h1}>City of Franklin</h1>
          <h2 className={styles.h2}>{APP_TITLE}</h2>
        </div>
      </Link>
      {user?.email ? (
        <div className="flex gap-2">
          <CreateContainer />
          <LogoutBtn />
        </div>
      ) : (
        <>
          {location.pathname !== '/login' && (
            <Link to={'/login'} className={styles.login}>Planning Dept Login</Link>
          )}
        </>
      )}
    </header>
  )
}

export default Header
