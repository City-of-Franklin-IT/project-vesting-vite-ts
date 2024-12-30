import styles from './FilterContainer.module.css'

// Components
import FilterBtn from '../../buttons/FilterBtn/FilterBtn'
import MilestoneFilter from '../MilestoneFilter/MilestoneFilter'
import { ClearFilterBtn } from './components'

function FilterContainer() {

  return (
    <section className={styles.container}>
      <div className={styles.buttons}>
        <FilterBtn type={'Development Plan'} />
        <FilterBtn type={'Preliminary Plat'} />
        <FilterBtn type={'Site Plan'} />
      </div>
      <ClearFilterBtn />
      <div className="mt-8">
        <MilestoneFilter />
      </div>
    </section>
  )
}

export default FilterContainer