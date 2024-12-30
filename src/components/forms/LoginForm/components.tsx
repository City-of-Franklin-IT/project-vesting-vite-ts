import { Link } from "react-router-dom"
import { useFormContext } from "react-hook-form"
import styles from './LoginForm.module.css'

// Types
import { LoginFormUseFormState } from "./types"

// Components
import LoginBtn from "../../buttons/LoginBtn/LoginBtn"

export const EmailInput = () => { // Email input
  const methods = useFormContext<LoginFormUseFormState>()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <label htmlFor="email" className={styles.label}>Email</label>
        <input 
          { ...methods.register('email', {
            required: 'Email is required',
            onBlur: () => methods.trigger('email')
          }) }
          type="email" 
          className={styles.input} />
      </div>
    </div>
  )
}

export const PasswordInput = () => { // Password input
  const methods = useFormContext<LoginFormUseFormState>()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <label htmlFor="password" className={styles.label}>Password</label>
        <input 
          { ...methods.register('password', {
            required: 'Password is required',
            onBlur: () => methods.trigger('password')
          }) }
          type="password" 
          className={styles.input} />
      </div>
    </div>
  )
}

export const Button = () => {
  const methods = useFormContext<LoginFormUseFormState>()

  return (
    <div className="flex flex-col mt-8 gap-3">
      <LoginBtn disabled={!methods.formState.isValid || methods.formState.isSubmitting && true} />
      <Link to={'/'} className="mx-auto text-info font-bold uppercase hover:text-warning">Back to project vesting</Link>
    </div>
  )
}