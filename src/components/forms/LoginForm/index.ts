import { useForm } from 'react-hook-form'
import { loginUser } from '../../../context/User/UserActions'
import { authPopup, errorPopup } from '../../../utils/Toast/Toast'

// Types
import { LoginFormUseFormState, OnSubmitProps } from './types'

export const useLoginForm = () => { // LoginForm useForm
  return useForm<LoginFormUseFormState>({
    defaultValues: {
      email :'',
      password: ''
    }
  })
}

export const onSubmit = async (formData: OnSubmitProps['formData'], navigate: OnSubmitProps['navigate']) => { // Form submit
  const result = await loginUser(formData)
  
  if(result.success) { // On success
    setTimeout(() => {
      navigate('/')
    }, 500)

    return authPopup()
  } else errorPopup(result.msg)
}