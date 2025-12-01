// Components
import * as Components from './components'

function Search() {

  return (
    <div className="flex gap-4 items-center w-full lg:w-1/2 xl:w-full">
      <Components.Header />
      <Components.SearchInput />
      <Components.ClearBtn />
    </div>
  )
}

export default Search