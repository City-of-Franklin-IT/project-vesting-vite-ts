import styles from '../Forms.module.css'

function FormError({ error }: { error: string | undefined }) {
  if(!error) return null

  return (
      <div data-testid="form-error" className={styles.error}>{error}</div>
  )
}

export default FormError