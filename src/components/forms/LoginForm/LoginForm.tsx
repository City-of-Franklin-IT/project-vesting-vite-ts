import { useNavigate } from "react-router-dom"
import { FormProvider } from "react-hook-form"
import image from '../../../assets/icons/cof/cof.jpeg'
import { useLoginForm, onSubmit } from '.'
import styles from './LoginForm.module.css'

// Components
import { EmailInput, PasswordInput, Button } from "./components"

function LoginForm() {
  const navigate = useNavigate()

  const methods = useLoginForm()

  return (
    <div className={styles.container}>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => onSubmit(formData, navigate))}>
          <img src={image} alt="cof logo" className="w-fit hidden md:block" />
          <div className={styles.body}>

            <h1 className={styles.title}>Planning Dept Login</h1>
            
            <EmailInput />
            <PasswordInput />

            <Button />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default LoginForm