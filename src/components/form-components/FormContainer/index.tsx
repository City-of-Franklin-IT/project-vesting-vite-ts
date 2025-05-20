import styles from './FormContainer.module.css'

// Icons
import cofIcon from '../../../assets/icons/cof/cof.svg'

function FormContainer({ children }: { children: React.ReactNode }) {

  return (
    <div className={styles.container}>
      <img src={cofIcon} className={styles.icon}></img>
      {children}
    </div>
  )
}

export default FormContainer
