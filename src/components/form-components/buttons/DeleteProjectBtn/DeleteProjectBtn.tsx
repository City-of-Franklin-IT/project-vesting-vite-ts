import { useState } from 'react'
import { useNavigate } from 'react-router'
import { handleClick } from '.'
import styles from './DeleteProjectBtn.module.css'

// Types
import { DeleteProjectBtnProps, DeleteProjectBtnState } from './types'

function DeleteProjectBtn({ uuid }: DeleteProjectBtnProps) {
  const [state, setState] = useState<DeleteProjectBtnState>({ active: false })

  const navigate = useNavigate()

  return (
    <button 
      type="button"
      onClick={() => handleClick(state.active, uuid, { setState, navigate })}
      className={!state.active ? styles.btn : styles.btnActive}>
      <div>{!state.active ? 'Delete Project' : 'Confirm Delete'}</div>
    </button>
  )
}

export default DeleteProjectBtn
