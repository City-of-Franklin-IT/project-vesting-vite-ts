import { useFormContext, Path } from 'react-hook-form'
import styles from '../Forms.module.css'

// Types
import { ProjectCreateInterface, ProjectUpdateInterface } from '@/context/App/types'

function FormError({ field }: { field: Path<ProjectCreateInterface|ProjectUpdateInterface> }) {
  const { formState: { errors } } = useFormContext()

  return (
    errors[field] ? (
      <div data-testid="form-error" className={styles.error}>{errors[field].message?.toString()}</div>
    ) : null
  )
}

export default FormError