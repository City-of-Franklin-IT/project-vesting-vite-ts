// Types
import { CancelBtnProps } from './types'

function CancelBtn({ handleClick }: CancelBtnProps) {
  
  return (
    <button 
      type="button" 
      onClick={() => handleClick()}
      className="flex-1 btn btn-error btn-lg uppercase">
        Cancel
    </button>
  )
}

export default CancelBtn