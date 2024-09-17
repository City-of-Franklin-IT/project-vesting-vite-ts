import { useEffect, useContext} from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../context/User/UserContext"
import { validateToken, refreshToken } from "../context/User/UserActions"

// Types
import { ValidateTokenResponse } from "../context/User/types"
import { errorPopup } from "../utils/Toast/Toast"

export const  useValidateUser = () => { // Validate user
  const { dispatch } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    validateUser()
      .then(response => {
        if(isMounted) {
          if(response.success) {
            dispatch({ type: 'SET_USER', payload: response.data })
          } else {
            refreshToken()
              .then(data => {
                if(isMounted) {
                  const payload = data.success ? data.data : undefined
                  dispatch({ type: 'SET_USER', payload })
                }
              })
              .catch(_ => {
                errorPopup()
              })
          }
        }
      })
    .catch(_ => {
      errorPopup()
    })

    return () => {
      isMounted = false
    }
  }, [dispatch, navigate])
}

const validateUser = async (): Promise<ValidateTokenResponse> => {
  const result = await validateToken()

  return result
}