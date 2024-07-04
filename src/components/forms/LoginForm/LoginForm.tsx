import { useNavigate, Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useForm } from "react-hook-form"
import image from '../../../assets/icons/cof/cof.jpeg'
import { onSubmit } from '.'
import styles from './LoginForm.module.css'

// Types
import { LoginFormUseFormState } from './types'

// Components
import LoginBtn from "../../buttons/LoginBtn/LoginBtn"

function LoginForm() {
  const [_, setCookie] = useCookies(["user", "userPreferences"])

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { isValid } } = useForm<LoginFormUseFormState>({
      defaultValues: {
        email :'',
        password: ''
      }
    })

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(formData => onSubmit(formData, setCookie, navigate))}>
        <img src={image} alt="cof logo" className="w-fit hidden md:block" />
        <div className={styles.body}>
          <h1 className={styles.title}>Planning Dept Login</h1>
          
            <div className={styles.inputSection}>
              <div className="flex flex-col">
                <label htmlFor="email" className={styles.label}>Email</label>
                <input 
                  { ...register('email', {
                    required: {
                      value: true,
                      message: 'Email is required'
                    }
                  }) }
                  type="email" 
                  className={styles.input} />
              </div>
            </div>

            <div className={styles.inputSection}>
              <div className="flex flex-col">
                <label htmlFor="password" className={styles.label}>Password</label>
                <input 
                  { ...register('password', {
                    required: {
                      value: true,
                      message: 'Password is required'
                    }
                  }) }
                  type="password" 
                  className={styles.input} />
              </div>
            </div>

          <div className="flex flex-col mt-8 gap-3">
            <LoginBtn disabled={!isValid && true} />
            <Link to={'/'} className="mx-auto text-info font-bold uppercase hover:text-warning">Back to project vesting</Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginForm