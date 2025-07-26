// Components
import * as Components from './components'

function Search() {

  return (
    <div className="relative flex w-full min-h-[50px] rounded-lg shadow-xl mr-auto lg:w-4/5">
      <Components.Header />
      <Components.SearchInput />
      <Components.ClearBtn />
    </div>
  )
}

export default Search