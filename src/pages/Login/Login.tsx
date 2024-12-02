import styles from './Login.module.css'

// Components
import Layout from '../../components/layout/Layout/Layout'
import LoginForm from '../../components/forms/LoginForm/LoginForm'

function Login() {
  
  return (
    <Layout>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </Layout>
  )
}

export default Login