import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './FilterBtn.module.css'

// Types
import { FilterBtnProps } from './types'

function FilterBtn({ type }: FilterBtnProps) {
  const { dispatch } = useContext(AppContext)

  return (
    <button 
      onClick={() => dispatch({ type: 'SET_FILTER', payload: type ? type : '' })}
      className={styles.btn}>
        <div className={styles.label}>{type || 'Remove Filter'}</div>
    </button>
  )
}

export default FilterBtn