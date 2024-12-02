import { useCallback, useContext, useEffect } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { UseShowExpiredProps } from "./types"

export const useShowExpired = (state: UseShowExpiredProps['state']) => { // Show / hide expired ctx
  const { dispatch } = useContext(AppContext)

  const showExpired = useCallback(() => {
    dispatch({ type: 'TOGGLE_SHOW_EXPIRED', payload: state.showExpired })

  }, [state.showExpired, dispatch])

  useEffect(() => {
    showExpired()
  }, [showExpired])
}