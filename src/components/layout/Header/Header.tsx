import { Link } from 'react-router-dom'
import { APP_TITLE } from '../../../config'
import styles from './Header.module.css'

// Components
import { Buttons, ReportLink, LoginPageLink } from './components'

function Header() {

  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <div className={styles.title}>
          <h1 className={styles.h1}>City of Franklin</h1>
          <h2 className={styles.h2}>{APP_TITLE}</h2>
        </div>
      </Link>
      <div className="flex gap-4">
        <ReportLink href={'http://cofdbv10/reports/powerbi/Planning/Project%20Vesting'} />
        <Buttons />
        <LoginPageLink />
      </div>
    </header>
  )
}

export default Header
