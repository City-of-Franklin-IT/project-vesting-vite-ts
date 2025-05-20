import { useRedirect } from './hooks'

// Components
import Layout from '@/components/layout/Layout'
import FormContainer from '@/components/form-components/FormContainer'
import ErrorBoundary from '@/components/error/ErrorBoundary/ErrorBoundary'
import * as Components from './components'

function Create() {
  // useRedirect()

  return (
    <Layout>
      <ErrorBoundary href={'/projects'}>
        <FormContainer>
          <Components.Form />
        </FormContainer>
      </ErrorBoundary>
    </Layout>
  )
}

export default Create