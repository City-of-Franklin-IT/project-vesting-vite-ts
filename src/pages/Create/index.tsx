import { useRedirect } from './hooks'

// Components
import FormContainer from '@/components/form-components/FormContainer'
import ErrorBoundary from '@/components/error/ErrorBoundary/ErrorBoundary'
import * as Components from './components'

function Create() {
  useRedirect()

  return (
    <ErrorBoundary href={'/projects'}>
      <FormContainer>
        <Components.Form />
      </FormContainer>
    </ErrorBoundary>
  )
}

export default Create