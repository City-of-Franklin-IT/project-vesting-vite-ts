import { useValidateUser } from '../../helpers'

// Components
import Layout from '../../components/layout/Layout/Layout'
import FormContainer from '../../components/forms/FormContainer/FormContainer'
import ErrorBoundary from '../../components/error/ErrorBoundary/ErrorBoundary'
import { Form } from './components'

function Create() {
  useValidateUser()

  return (
    <Layout>
      <ErrorBoundary href={'/'}>
        <FormContainer>
          <Form />
        </FormContainer>
      </ErrorBoundary>
    </Layout>
  )
}

export default Create