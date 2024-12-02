import { useLocation } from 'react-router-dom'
import { useValidateUser } from '../../helpers'
import { handleFormType } from '.'

// Components
import Layout from '../../components/layout/Layout/Layout'
import FormContainer from '../../components/forms/FormContainer/FormContainer'

// Types
import { FormTypes } from './types'

function Create() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const type = params.get('type') as FormTypes

  useValidateUser()

  return (
    <Layout>
      <FormContainer>
        {handleFormType(type)}
      </FormContainer>
    </Layout>
  )
}

export default Create