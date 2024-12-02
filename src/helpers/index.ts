import { useEffect, useContext, useCallback } from "react"
import { useQuery } from "react-query"
import UserContext from "../context/User/UserContext"
import { validateToken, refreshToken } from "../context/User/UserActions"

// Types
import { UseQueryResult } from "react-query"
import { ValidateTokenResponse } from "../context/User/types"

export const useValidateUser = (): void => { // Validate user
  const { dispatch } = useContext(UserContext)

  const { data } = useValidateToken()

  const { data: refreshData } = useRefreshToken(data?.success ? false : true)

  const onSuccess = useCallback(() => {
    if(data && data?.success) {
      dispatch({ type: 'SET_USER', payload: data.data })
    }
    
    if(refreshData && refreshData?.success) {
      dispatch({ type: 'SET_USER', payload: refreshData.data })
    } 
  }, [data, refreshData, dispatch])

  const onFail = useCallback(() => {
    if(refreshData && !refreshData?.success) {
      dispatch({ type: 'SET_USER', payload: undefined })
    }
  }, [refreshData, dispatch])

  useEffect(() => {
    onSuccess()
    onFail()
  }, [onSuccess, onFail])
}

const useValidateToken = (): UseQueryResult<ValidateTokenResponse> => { // Handle token validation
  return useQuery('validateToken', () => validateToken(), { suspense: true })
}

const useRefreshToken = (refresh: boolean | undefined): UseQueryResult<ValidateTokenResponse> => { // Handle token refresh
  return useQuery('refreshToken', () => refreshToken(), { enabled: refresh })
}