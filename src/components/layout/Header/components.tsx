import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router"
import { APP_TITLE } from "@/config"
import { useMsal } from "@azure/msal-react"
import cofIcon from '@/assets/icons/cof/cof-primary-content.svg'
import useHandleLogoutRedirect from "@/context/Auth/hooks/useHandleLogoutRedirect"

// Types
import * as AppTypes from "@/context/types"

export const Title = () => {
  const { pathname } = useLocation()

  const href = pathname === '/' ? '/' : '/projects'

  return (
    <Link to={href} className="flex flex-col text-primary-content text-center mt-4 w-fit lg:my-4">
      <div className="flex gap-4 text-primary-content items-center justify-center">
        <img src={cofIcon} alt="cof icon" className="w-20" />
        <h1 className="text-lg font-bold text-center md:text-xl lg:text-3xl">{APP_TITLE}</h1>
      </div>
    </Link>
  )
}

export const Buttons = () => { // Buttons
  const { instance } = useMsal()

  const activeAccount = instance.getActiveAccount()

  if(!activeAccount) return (
      <LoginPageLink />
  )

  return (
    <div className="flex flex-nowrap gap-2 overflow-visible w-full pl-4">
      <ReportLink href={'https://cofdbv10/reports/powerbi/Planning/Project%20Vesting'} />
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
    <a href={href} target="_blank" className="btn btn-ghost rounded-none uppercase hover:bg-primary hover:shadow-none hover:text-primary-content">View Report</a>
  )
}

export const LoginPageLink = () => { // Link to login page
  const { instance } = useMsal()

  const activeAccount = instance.getActiveAccount()

  const pathname = useLocation().pathname

  if(activeAccount || pathname === '/') return null

  return (
    <Link to={'/'} className="btn btn-ghost rounded-none uppercase hover:bg-primary hover:shadow-none hover:text-primary-content">Login</Link>
  )
}

const LogoutBtn = () => { // Logout button
  const onClick = useHandleLogoutRedirect()

  return (
    <button 
      type="button"
      onClick={onClick}
      className="btn btn-ghost rounded-none uppercase hover:bg-primary hover:shadow-none hover:text-primary-content">
        Logout
    </button>
  )
}

const CreateBtns = () => {

  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="btn btn-ghost rounded-none uppercase hover:bg-primary hover:shadow-none hover:text-primary-content">
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

const CreateBtn = ({ href, label }: { href: string, label: AppTypes.ProjectInterface['type'] }) => {

  return (
    <li className="hover:cursor-pointer hover:bg-neutral"><Link to={href}>{label}</Link></li>
  )
}