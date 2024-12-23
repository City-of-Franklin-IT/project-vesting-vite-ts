import { useContext, useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import UserContext from "../../../context/User/UserContext"
import styles from './Header.module.css'

// Types
import { ReactNode } from "react"

// Components
import CreateContainer from "../../create/CreateContainer/CreateContainer"
import LogoutBtn from "../../buttons/LogoutBtn/LogoutBtn"

export const Buttons = () => { // Buttons
  const { user } = useContext(UserContext)

  return (
    <>
      {user?.email && (
        <div className="flex gap-2">
          <CreateContainer />
          <LogoutBtn />
        </div>
      )}
    </>
  )
}

export const ReportLink = ({ href }: { href: string }) => { // Link to Power BI report
  const [state, setState] = useState({ isValid: false })

  useEffect(() => { // Ensure href is resolvable (user is on network)
    const checkURL = async () => {
      await fetch(href, { method: 'HEAD', mode: 'no-cors' })
        .catch(() => setState({ isValid: false }))
        .then(() => setState({ isValid: true }))
    }

    checkURL()
  }, [href])

  return (
    <>
      {state.isValid && (
        <a href={href} target="_blank" className={styles.link}>
          View Report
        </a>
      )}
    </>
  )
}

export const LoginPageLink = () => { // Link to login page
  const { user } = useContext(UserContext)

  const pathname = useLocation().pathname

  return (
    <>
      {(!user?.email && pathname !== '/login') && (
        <Link to={'/login'} className={styles.link}>Planning Dept Login</Link>
      )}
    </>
  )
}