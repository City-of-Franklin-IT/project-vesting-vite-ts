import styles from './LoginBtn.module.css'

// Types
import { LoginBtnProps } from './types'

function LoginBtn({ disabled }: LoginBtnProps) {
  return (
    <button 
      type="submit"
      className={styles.btn}
      disabled={disabled}
      >
      Login
    </button>
  )
}

export default LoginBtn
