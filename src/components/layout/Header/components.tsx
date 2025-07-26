import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router"
import { useMsal } from "@azure/msal-react"
import useHandleLogoutRedirect from "@/context/Auth/hooks/useHandleLogoutRedirect"

// Types
import { ProjectInterface } from "@/context/types"

export const Buttons = () => { // Buttons
  const { instance } = useMsal()

  const activeAccount = instance.getActiveAccount()

  if(!activeAccount) return null

  return (
    <div className="flex gap-2">
      <CreateBtns />
      <LogoutBtn />
    </div>
  )
}

export const ReportLink = ({ href }: { href: string }) => { // Link to Power BI report
  const [state, setState] = useState({ isValid: false })

  useEffect(() => { // Ensure href is resolvable (user is on network)
    const checkURL = async () => {
      await fetch(href, { method: 'HEAD', mode: 'no-cors' })
        .then(() => setState({ isValid: true }))
        .catch(() => setState({ isValid: false }))
    }

    checkURL()
  }, [href])

  if(!state.isValid) return null

  return (
    <a href={href} target="_blank" className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none">View Report</a>
  )
}

export const LoginPageLink = () => { // Link to login page
  const { instance } = useMsal()

  const activeAccount = instance.getActiveAccount()

  const pathname = useLocation().pathname

  if(activeAccount || pathname === '/') return null

  return (
    <Link to={'/'} className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none">Login</Link>
  )
}

const LogoutBtn = () => { // Logout button
  const { instance } = useMsal()
  const activeAccount = instance.getActiveAccount()

  const handleLogoutRedirect = useHandleLogoutRedirect()

  if(!activeAccount) return null

  return (
    <button 
      type="button"
      onClick={handleLogoutRedirect}
      className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none">
        Logout
    </button>
  )
}

const CreateBtns = () => {

  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary">
        <span>Create</span>
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-primary text-neutral-content z-[1] w-52">
        <CreateBtn
          href={'/create?type=Development Plan'}
          label={'Development Plan'} />
        <CreateBtn
          href={'/create?type=Preliminary Plat'}
          label={'Preliminary Plat'} />
        <CreateBtn
          href={'/create?type=Site Plan'}
          label={'Site Plan'} />
      </ul>
    </div>
  )
}

const CreateBtn = ({ href, label }: { href: string, label: ProjectInterface['type'] }) => {

  return (
    <li className="hover:cursor-pointer hover:bg-neutral"><Link to={href}>{label}</Link></li>
  )
}