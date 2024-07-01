// Types
import { NavigateFunction } from 'react-router-dom'
import { CookieSetOptions } from 'universal-cookie'

export interface LoginFormUseFormState { // LoginForm useForm state object
  email: string,
  password: string
}

export interface OnSubmitProps { // onSubmit fn props
  formData: LoginFormUseFormState,
  setCookie: SetCookieFunction,
  navigate: NavigateFunction
}

type SetCookieFunction = (name: "user", value: any, options?: CookieSetOptions | undefined) => void