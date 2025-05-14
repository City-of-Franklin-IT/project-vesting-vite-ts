import icon from '../../../assets/icons/required/required.svg'

// Types
import { RequiredIconProps } from './types'

function RequiredIcon({ width }: RequiredIconProps) {
  return (
    <div className="mb-auto mt-1">
      <img src={icon} alt="required icon" className={width} />
    </div>
  )
}

export default RequiredIcon