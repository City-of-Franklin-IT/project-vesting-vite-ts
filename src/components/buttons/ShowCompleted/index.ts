import { useContext, useCallback, useEffect } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { UseShowCompletedProps } from "./types"

export const useShowCompleted = (state: UseShowCompletedProps['state']) => { // Show / hide expired ctx
  const { dispatch } = useContext(AppContext)

  const showCompleted = useCallback(() => {
    dispatch({ type: 'TOGGLE_SHOW_COMPLETED', payload: state.showCompleted })

  }, [state.showCompleted, dispatch])

  useEffect(() => {
    showCompleted()
  }, [showCompleted])
}