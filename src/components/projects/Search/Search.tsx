import styles from './Search.module.css'

// Types
import { SearchProps } from './types'

// Components
import { ClearBtn } from './components'

function Search({ searchValue, setSearchValue }: SearchProps) {

  return (
    <div className={styles.container}>
      <div className={styles.header}>Search</div>
      <input 
        type="text" 
        value={searchValue} 
        placeholder="by project name, COF #, or zoning ordinance.." 
        onChange={(e) => setSearchValue(prevState => ({ ...prevState, searchValue: e.target.value }))} 
        className={styles.searchInput} />
      <ClearBtn setSearchValue={setSearchValue} />
    </div>
  )
}

export default Search