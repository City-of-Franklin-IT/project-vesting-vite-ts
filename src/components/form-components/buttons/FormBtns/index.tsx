// Components
import * as Components from './components'

function FormBtns() {

  return (
    <div className="flex gap-6 h-[44px] mt-6">
      <Components.CancelBtn />
      <Components.ResetBtn />
      <Components.SaveBtn />
    </div>
  )
}

export default FormBtns