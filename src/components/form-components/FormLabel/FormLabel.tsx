import styles from '../Forms.module.css'

// Types
import { FormLabelProps } from './types'

// Components
import RequiredIcon from '../RequiredIcon/RequiredIcon'

function FormLabel({ label, name, required }: FormLabelProps) {
  return (
    <label data-testid="form-label" htmlFor={name} className={styles.label}>{label}{required && <RequiredIcon width="w-3" />}</label>
  )
}

export default FormLabel