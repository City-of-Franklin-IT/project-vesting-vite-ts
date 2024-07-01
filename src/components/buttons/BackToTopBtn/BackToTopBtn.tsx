import styles from './BackToTopBtn.module.css'

// Types
import { BackToTopBtnProps } from './types'

function BackToTopBtn({ handleClick }: BackToTopBtnProps) {
  return (
    <button
      type="button" 
      onClick={() => handleClick()}
      className={styles.btn}>
        Back To Top
    </button>
  )
}

export default BackToTopBtn