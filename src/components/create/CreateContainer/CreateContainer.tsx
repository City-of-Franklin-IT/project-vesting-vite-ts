import styles from './CreateContainer.module.css'

// Components
import CreateBtn from '../../buttons/CreateBtn/CreateBtn'

function CreateContainer() {
  return (
    <div className={styles.container}>
      <p className={styles.label}>Create:</p>
      <div className={styles.container}>
        <CreateBtn type={'Development Plan'} />
        <CreateBtn type={'Preliminary Plat'} />
        <CreateBtn type={'Site Plan'} />
      </div>
    </div>
  )
}

export default CreateContainer