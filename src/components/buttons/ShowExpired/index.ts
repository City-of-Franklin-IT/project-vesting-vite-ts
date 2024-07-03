import { useCallback } from "react"

// Types
import { UseShowExpiredProps } from "./types"

export const useShowExpired = (state: UseShowExpiredProps['state'], dispatch: UseShowExpiredProps['dispatch'], cookies: UseShowExpiredProps['cookies'], setCookie: UseShowExpiredProps['setCookie']) => useCallback(() => { // 
  dispatch({ type: 'TOGGLE_SHOW_EXPIRED', payload: state.showExpired })

  setCookie("userPreferences", { showExpired: state.showExpired, showAchieved: { firstMilestone: cookies.userPreferences?.showAchieved.firstMilestone, secondMilestone: cookies.userPreferences?.showAchieved.secondMilestone } }) // Update userPreferences cookie
}, [state.showExpired])