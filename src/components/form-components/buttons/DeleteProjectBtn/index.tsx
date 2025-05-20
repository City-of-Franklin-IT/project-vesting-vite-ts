import { useHandleBtnClick } from './hooks'
import styles from './DeleteProjectBtn.module.css'

function DeleteProjectBtn({ uuid }: { uuid: string }) {
  const { handleClick, active } = useHandleBtnClick(uuid)

  return (
    <button 
      type="button"
      onClick={handleClick}
      className={!active ? styles.btn : styles.btnActive}>
        {!active ? 'Delete Project' : 'Confirm Delete'}
    </button>
  )
}

export default DeleteProjectBtn
