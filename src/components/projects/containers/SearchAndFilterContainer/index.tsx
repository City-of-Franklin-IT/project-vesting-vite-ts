// Components
import Search from '../../table/search/Search'
import FilterContainer from '../FilterContainer'

function SearchAndFilterContainer() {

  return (
    <div className="flex gap-4 items-end flex-wrap justify-center w-full xl:justify-start xl:flex-nowrap xl:flex-2">
      <FilterContainer />
      <Search />
    </div>
  )
}

export default SearchAndFilterContainer
