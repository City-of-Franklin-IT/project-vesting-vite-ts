import { useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import UserContext from "../context/User/UserContext"
import { validateToken, refreshToken } from "../context/User/UserActions"

// Types
import { UseQueryResult } from "react-query"
import { ValidateTokenResponse } from "../context/User/types"

export const useValidateUser = (): { isAuthenticated: boolean, isLoading: boolean } => { // Validate user
  const [state, setState] = useState<{ retries: number }>({ retries: 0 })
  const { dispatch } = useContext(UserContext)

  const navigate = useNavigate()

  const validateToken = useValidateToken()

  const tryRefresh = validateToken.isSuccess && !validateToken.data?.success

  const refreshToken = useRefreshToken(tryRefresh, state.retries)

  const isAuthenticated = (validateToken.isSuccess && validateToken.data?.success) || 
  (refreshToken.isSuccess && refreshToken.data?.success)

  const isLoading = validateToken.isLoading || refreshToken.isLoading

  useEffect(() => {
    if(isAuthenticated) {
      const userData = validateToken.data?.success 
        ? validateToken.data?.data 
        : refreshToken.data?.data
        
      dispatch({ type: 'SET_USER', payload: userData })
      setState({ retries: 0 }) // Reset retries state on success
    }
  }, [isAuthenticated, validateToken.data, refreshToken.data, dispatch])

  useEffect(() => {
    if(refreshToken.isSuccess && !refreshToken.data?.success) {
      if(state.retries >= 5) {
        dispatch({ type: 'SET_USER', payload: undefined })
        navigate('/')
      } else {
        setState(prevState => ({ retries: prevState.retries + 1 }))
      }
    }
  }, [refreshToken.isSuccess, refreshToken.data, state.retries, dispatch, navigate])

  return { isAuthenticated, isLoading }
}

export const useEnableQuery = (isAuthenticated: boolean, isLoading: boolean) => {
  const [state, setState] = useState<{ enabled: boolean }>({ enabled: false })

  const isReady = isAuthenticated && !isLoading

  useEffect(() => {
    let timeout = null

    if(isReady) {
      timeout = setTimeout(() => {
        setState({ enabled: true })
      }, 300) // 300ms delay
    } else setState({ enabled: false })

    return () => {
      if(timeout) {
        clearTimeout(timeout)
      }
    }
  }, [isReady])

  return state.enabled
}

const useValidateToken = (): UseQueryResult<ValidateTokenResponse> => { // Handle token validation
  return useQuery('validateToken', () => validateToken())
}

const useRefreshToken = (refresh: boolean | undefined, retries: number): UseQueryResult<ValidateTokenResponse> => { // Handle token refresh
  return useQuery(['refreshToken', retries], () => refreshToken(), { enabled: refresh })
}