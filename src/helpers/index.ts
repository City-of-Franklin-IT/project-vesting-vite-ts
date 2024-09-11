import { useEffect, useContext} from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../context/User/UserContext"
import { validateToken } from "../context/User/UserActions"

// Types
import { ValidateTokenResponse } from "../context/User/types"

export const useValidateUser = () => { // Validate user
  const { dispatch } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    validateUser()
      .then(response => {
        if(response.success) {
          dispatch({ type: 'SET_USER', payload: response.data })
        } else {
          dispatch({ type: 'SET_USER', payload: undefined })
        }
      })
  }, [dispatch, navigate])
}

const validateUser = async (): Promise<ValidateTokenResponse> => {
  const result = await validateToken()

  return result
}