import { useDisableBtn } from './hooks'

function SaveBtn() {
  const disabled = useDisableBtn()

  return (
    <button 
      type="submit"
      className="flex-1 btn btn-success btn-lg uppercase"
      disabled={disabled}>
        Save
    </button>
  )
}

export default SaveBtn
