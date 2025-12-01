import styles from '../Forms.module.css'

// Types
import { Path } from 'react-hook-form'
import * as AppTypes from '@/context/types'

// Components
import RequiredIcon from '../RequiredIcon'

type FormLabelProps = { name: Path<AppTypes.ProjectCreateInterface>, required?: boolean, children: React.ReactNode }

function FormLabel(props: FormLabelProps) {
  
  return (
    <label data-testid="form-label" htmlFor={props.name} className={styles.label}>{props.children}{props.required && <RequiredIcon width="w-3" />}</label>
  )
}

export default FormLabel