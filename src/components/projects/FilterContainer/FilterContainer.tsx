import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './FilterContainer.module.css'

// Components
import FilterBtn from '../../buttons/FilterBtn/FilterBtn'

function FilterContainer() {
  const { filter } = useContext(AppContext)

  return (
    <section className={styles.container}>
      <div className={styles.buttons}>
        <FilterBtn type={'Development Plan'} />
        <FilterBtn type={'Preliminary Plat'} />
        <FilterBtn type={'Site Plan'} />
      </div>
      {filter && ( // Clear filter button
        <div style={{ margin: "auto" }}>
          <FilterBtn />
        </div>
      )}
    </section>
  )
}

export default FilterContainer