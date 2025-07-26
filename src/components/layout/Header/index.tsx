import { Link } from 'react-router'
import { APP_TITLE } from '@/config'

// Components
import * as Components from './components'

function Header() {

  return (
    <header className="flex justify-between font-[play] tracking-[.25rem] items-center bg-primary py-1 px-8 w-full h-[14vh] shadow-xl 2xl:h-[10vh]">
      <Link to={'/projects'} className="flex flex-col text-primary-content items-start w-fit">
        <h1 className="text-lg font-bold whitespace-nowrap lg:text-2xl">City of Franklin</h1>
        <span className="text-sm ml-2 w-fit lg:ml-6 lg:text-xl lg:whitespace-nowrap">{APP_TITLE}</span>
      </Link>
      <div className="flex gap-4">
        <Components.ReportLink href={'https://cofdbv10/reports/powerbi/Planning/Project%20Vesting'} />
        <Components.Buttons />
        <Components.LoginPageLink />
      </div>
    </header>
  )
}

export default Header
