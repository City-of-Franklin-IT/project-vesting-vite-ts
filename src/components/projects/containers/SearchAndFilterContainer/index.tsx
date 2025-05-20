// Components
import Search from '../../table/search/Search'
import FilterContainer from '../FilterContainer'

function SearchAndFilterContainer() {

  return (
    <div className="flex flex-col gap-8 items-center mt-10 w-fit">
      <div className="w-full">
        <Search />
      </div>
      <FilterContainer />
    </div>
  )
}

export default SearchAndFilterContainer
