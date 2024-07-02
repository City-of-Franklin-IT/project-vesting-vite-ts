import { useCallback } from "react"

// Types
import { UseShowExpiredProps } from "./types"

export const useShowExpired = (state: UseShowExpiredProps['state'], dispatch: UseShowExpiredProps['dispatch']) => useCallback(() => { // 
  dispatch({ type: 'TOGGLE_SHOW_EXPIRED', payload: state.showExpired })
}, [state.showExpired])