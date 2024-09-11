// Types
import { NavigateFunction } from 'react-router-dom'

export interface LoginFormUseFormState { // LoginForm useForm state object
  email: string,
  password: string
}

export interface OnSubmitProps { // onSubmit fn props
  formData: LoginFormUseFormState
  navigate: NavigateFunction
  cookies: {
    userPreferences?: {
      showExpired: boolean
      showAchieved: {
        firstMilestone: boolean
        secondMilestone: boolean
      }
    }
  }
}