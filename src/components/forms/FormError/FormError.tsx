import { useFormContext } from 'react-hook-form'
import styles from '../Forms.module.css'

// Types
import { FormErrorProps } from './types'

function FormError({ field }: FormErrorProps) {
  const { formState: { errors } } = useFormContext()

  return (
    errors[field] ? (
      <div data-testid="form-error" className={styles.error}>{errors[field].message?.toString()}</div>
    ) : null
  )
}

export default FormError