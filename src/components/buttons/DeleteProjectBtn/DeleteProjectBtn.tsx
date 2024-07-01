import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../../helpers'
import { handleClick } from '.'
import styles from './DeleteProjectBtn.module.css'

// Types
import { DeleteProjectBtnProps, DeleteProjectBtnState } from './types'

function DeleteProjectBtn({ uuid }: DeleteProjectBtnProps) {
  const [state, setState] = useState<DeleteProjectBtnState>({ active: false })

  const user = getUser()

  const navigate = useNavigate()

  return (
    <button 
      type="button"
      onClick={() => handleClick(state.active, setState, uuid, navigate, user.token)}
      className={!state.active ? styles.btn : styles.btnActive}>
      <div>{!state.active ? 'Delete Project' : 'Confirm Delete'}</div>
    </button>
  )
}

export default DeleteProjectBtn
