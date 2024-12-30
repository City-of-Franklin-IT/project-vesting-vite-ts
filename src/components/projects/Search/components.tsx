import { useContext } from "react"
import AppContext from "../../../context/App/AppContext"
import styles from './Search.module.css'

// Types
import { Dispatch, SetStateAction } from "react"
import { ProjectsContainerState } from "../ProjectsContainer/types"

export const ClearBtn = ({ setSearchValue }: { setSearchValue: Dispatch<SetStateAction<ProjectsContainerState>> }) => { // Clear search button
  const { searchValue, dispatch } = useContext(AppContext)

  return (
    <>
      {searchValue && (
        <button 
          type="button" 
          onClick={() => {
            dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
            setSearchValue(prevState => ({ ...prevState, searchValue: '' }))
          }}
          className={styles.clearBtn}>
          Clear
        </button>
      )}
    </>
  )
}