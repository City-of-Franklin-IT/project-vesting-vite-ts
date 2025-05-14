import styles from './DeleteBtn.module.css'

// Types
import { DeleteBtnProps } from './types'

function DeleteBtn({ label, deleteFn }: DeleteBtnProps) {

  return (
    <button 
      type="button"
      onClick={() => deleteFn()}
      className={styles.btn}>
      {label}
    </button>
  )
}

export default DeleteBtn
