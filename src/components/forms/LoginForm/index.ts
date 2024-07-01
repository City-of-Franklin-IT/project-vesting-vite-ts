import { loginUser, getUser } from '../../../context/App/AppActions'
import { authPopup, errorPopup } from '../../../utils/Toast/Toast'

// Types
import { OnSubmitProps } from './types'

export const onSubmit = async (formData: OnSubmitProps['formData'], setCookie: OnSubmitProps['setCookie'], navigate: OnSubmitProps['navigate']) => {
  const result = await loginUser(formData)
  
  if(result.success) { // On success
    const user = await getUser(result.token)

    if(user.success) {
      setCookie("user", { ...user.data, token: result.token })

      authPopup()

      navigate('/')
    }
  } else errorPopup(result.msg)
}