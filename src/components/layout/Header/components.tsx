import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router"
import cofIcon from '@/assets/icons/cof/cof-primary-content.svg'
import claudeIcon from '@/assets/icons/claude/claude.webp'
import { useAuth } from "@/context/Auth"
import useHandleLogoutRedirect from "@/context/Auth/hooks/useHandleLogoutRedirect"
import { useAiChatPanel } from "../AiChatPanel/hooks"

export const Title = () => {
  const { pathname } = useLocation()

  const href = pathname === '/' ? 
    '/' : 
    '/projects'

  return (
    <Link to={href} className="flex flex-col text-primary-content text-center mt-4 w-fit lg:my-4">
      <div className="flex gap-4 text-primary-content items-center justify-center">
        <img src={cofIcon} alt="cof icon" className="w-20" />
        <h1 className="text-lg font-bold text-center md:text-xl lg:text-3xl">{import.meta.env.VITE_APP_TITLE}</h1>
      </div>
    </Link>
  )
}

export const Buttons = () => { // Buttons
  const { isAuthenticated } = useAuth()

  if(!isAuthenticated) return (
      <LoginPageLink />
  )

  return (
    <div className="flex flex-nowrap gap-2 overflow-visible w-full pl-4">
      <ReportLink href={'https://cofdbv10/reports/powerbi/Planning/Project%20Vesting'} />
      <CreateBtns />
      <AiChatToggleBtn />
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
    <a href={href} target="_blank" className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-nonet">View Report</a>
  )
}

export const LoginPageLink = () => { // Link to login page
  const { isAuthenticated } = useAuth()
  const { pathname } = useLocation()

  if(isAuthenticated || pathname === '/') return null

  return (
    <Link to={'/'} className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none">Login</Link>
  )
}

const LogoutBtn = () => { // Logout button
  const onClick = useHandleLogoutRedirect()

  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none">
        Logout
    </button>
  )
}

const CreateBtns = () => {

  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} role="button" className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none">
        <span>Create</span>
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-primary text-neutral-content z-[1] w-52">
        <CreateBtn href={'/create?type=Development Plan'}>
          Development Plan
        </CreateBtn>
        <CreateBtn href={'/create?type=Preliminary Plat'}>
          Preliminary Plat
        </CreateBtn>
        <CreateBtn href={'/create?type=Site Plan'}>
          Site Plan
        </CreateBtn>
      </ul>
    </div>
  )
}

const CreateBtn = ({ href, children }: { href: string, children: React.ReactNode }) => {

  return (
    <li className="hover:cursor-pointer hover:bg-neutral"><Link to={href}>{children}</Link></li>
  )
}

const AiChatToggleBtn = () => {
  const { open, dispatch } = useAiChatPanel()

  return (
    <button
      type="button"
      title="Ask Claude about this application"
      aria-label={open ? "Close assistant panel" : "Open assistant panel"}
      aria-expanded={open}
      onClick={() => dispatch({ type: "TOGGLE" })}
      className="btn btn-ghost btn-square rounded-none hover:bg-primary hover:shadow-none">
        <img src={claudeIcon} alt="" className="w-8 h-8" />
    </button>
  )
}