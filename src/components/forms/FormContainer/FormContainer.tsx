import styles from './FormContainer.module.css'

// Icons
import cofIcon from '../../../assets/icons/cof/cof.svg'

// Types
import { FormContainerProps } from './types'

function FormContainer({ children }: FormContainerProps) {
  return (
    <div className={styles.container}>
      <img src={cofIcon} className={styles.icon}></img>
      {children}
    </div>
  )
}

export default FormContainer
