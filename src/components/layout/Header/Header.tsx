import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { APP_TITLE } from '../../../config'
import styles from './Header.module.css'

// Components
import CreateContainer from '../../create/CreateContainer/CreateContainer'
import LogoutBtn from '../../buttons/LogoutBtn/LogoutBtn'

function Header() {
  const [cookies] = useCookies(["user"])

  const role = cookies?.user?.role ?? undefined

  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <div className={styles.title}>
          <h1 className={styles.h1}>City of Franklin</h1>
          <h2 className={styles.h2}>{APP_TITLE}</h2>
        </div>
      </Link>
      {['Super User', 'Editor'].includes(role) ? (
        <div className="flex gap-2">
          <CreateContainer />
          <LogoutBtn />
        </div>
      ) : (
        <Link to={'/login'} className={styles.login}>Planning Dept Login</Link>
      )}
    </header>
  )
}

export default Header
