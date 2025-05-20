import styles from './DetailsBtn.module.css'

// Components
import Icons from '../../icons/Icons/Icons'

type DetailsBtnProps = { expanded: boolean, hovered: boolean, handleClick: () => void }

function DetailsBtn(props: DetailsBtnProps) {
  
  return (
    <button 
      type="button"
      onClick={props.handleClick}
      className={styles.btn}>
        <Icons
          type={props.expanded ? 'minimize' : 'expand'}
          variant={props.hovered ? 'light' : 'dark' }
          size={"small"} />
    </button> 
  )
}

export default DetailsBtn
