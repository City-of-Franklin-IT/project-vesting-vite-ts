import { useNavigate } from 'react-router-dom'
import styles from './CreateBtn.module.css'

// Types
import { CreatBtnProps } from './types'

function CreateBtn({ type }: CreatBtnProps) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(`/create?type=${ type }`)}
      className={styles.btn}>
      {type}
    </button>
  )
}

export default CreateBtn
