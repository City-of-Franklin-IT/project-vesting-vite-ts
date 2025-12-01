// Components
import * as Components from './components'

function Header() {

  return (
    <header className="flex flex-col text-primary-content font-[play] w-full">
      <div className="flex flex-col gap-4 justify-between font-[play] tracking-[.25rem] items-center bg-primary px-8 w-full shadow-xl 2xl:h-[10vh] lg:flex-row">
        <Components.Title />

        <div className="flex gap-2 overflow-visible justify-around w-fit lg:w-auto">
          <Components.Buttons />
        </div>
      </div>
    </header>
  )
}

export default Header
