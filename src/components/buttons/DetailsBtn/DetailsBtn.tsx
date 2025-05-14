import styles from './DetailsBtn.module.css'

// Types
import { DetailsBtnProps } from './types'

// Components
import Icons from '../../icons/Icons/Icons'

function DetailsBtn({ expanded, hovered, handleClick }: DetailsBtnProps) {
  
  return (
    <button 
      type="button"
      onClick={() => handleClick()}
      className={styles.btn}>
        <Icons
          type={expanded ? 'minimize' : 'expand'}
          variant={hovered ? 'light' : 'dark' }
          size={"small"} />
    </button> 
  )
}

export default DetailsBtn
