// Components
import * as Components from './components'

function Search() {

  return (
    <div className="relative flex w-4/5 min-h-[50px] rounded-lg shadow-xl mr-auto">
      <Components.Header />
      <Components.SearchInput />
      <Components.ClearBtn />
    </div>
  )
}

export default Search