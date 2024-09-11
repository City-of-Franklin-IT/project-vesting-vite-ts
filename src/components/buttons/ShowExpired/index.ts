import { useCallback, useContext, useEffect } from "react"
import { useCookies } from "react-cookie"
import AppContext from "../../../context/App/AppContext"

// Types
import { UseShowExpiredProps } from "./types"

export const useShowExpired = (state: UseShowExpiredProps['state']) => { // Show / hide expired ctx and update userPreferences cookie
  const { dispatch } = useContext(AppContext)

  const [cookies, setCookie] = useCookies(["userPreferences"])

  const showExpired = useCallback(() => {
    dispatch({ type: 'TOGGLE_SHOW_EXPIRED', payload: state.showExpired })

    setCookie("userPreferences", { showExpired: state.showExpired, showAchieved: { firstMilestone: cookies.userPreferences?.showAchieved.firstMilestone, secondMilestone: cookies.userPreferences?.showAchieved.secondMilestone }, showCompleted: cookies.userPreferences?.showCompleted }) // Update userPreferences cookie
  }, [state.showExpired])

  useEffect(() => {
    showExpired()
  }, [state.showExpired])
}