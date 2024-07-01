import styles from './SearchAndFilterContainer.module.css'

// Types
import { SearchAndFilterContainerProps } from './types'

// Components
import Search from '../Search/Search'
import FilterContainer from '../FilterContainer/FilterContainer'

function SearchAndFilterContainer({ searchValue, setSearchValue }: SearchAndFilterContainerProps) {
  return (
    <div className={styles.container}>
      <Search 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} />
      <FilterContainer />
    </div>
  )
}

export default SearchAndFilterContainer
