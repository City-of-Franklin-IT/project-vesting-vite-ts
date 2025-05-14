import styles from './CancelBtn.module.css'

// Types
import { CancelBtnProps } from './types'

function CancelBtn({ handleClick }: CancelBtnProps) {
  return (
    <button 
      type="button" 
      onClick={() => handleClick()}
      className={styles.btn}>
        Cancel
    </button>
  )
}

export default CancelBtn