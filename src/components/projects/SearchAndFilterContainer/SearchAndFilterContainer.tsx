import styles from './SearchAndFilterContainer.module.css'

// Types
import { SearchAndFilterContainerProps } from './types'

// Components
import Search from '../Search/Search'
import FilterContainer from '../FilterContainer/FilterContainer'

function SearchAndFilterContainer({ searchValue, setSearchValue }: SearchAndFilterContainerProps) {
  return (
    <div className={styles.container}>
      <div className="ml-8 w-full">
        <Search 
          searchValue={searchValue} 
          setSearchValue={setSearchValue} />
      </div>
      <FilterContainer />
    </div>
  )
}

export default SearchAndFilterContainer
