import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './Search.module.css'

// Types
import { SearchProps } from './types'

function Search({ searchValue, setSearchValue }: SearchProps) {
  const { searchValue: searchValue_ctx, dispatch } = useContext(AppContext)

  return (
    <div className={styles.container}>
      <div className={styles.header}>Search</div>
      <input 
        type="text" 
        value={searchValue} 
        placeholder="by project name, COF #, or zoning ordinance.." 
        onChange={(e) => setSearchValue(prevState => ({ ...prevState, searchValue: e.target.value }))} 
        className={styles.searchInput} />
      {searchValue_ctx && (
        <>
          <button 
            type="button" 
            onClick={() => {
              dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
              setSearchValue(prevState => ({ ...prevState, searchValue: '' }))
            }}
            className={styles.clearBtn}>
            Clear
          </button>
        </>
      )}
    </div>
  )
}

export default Search