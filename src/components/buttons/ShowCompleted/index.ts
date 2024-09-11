import { useContext, useCallback, useEffect } from "react"
import { useCookies } from "react-cookie"
import AppContext from "../../../context/App/AppContext"

// Types
import { UseShowCompletedProps } from "./types"

export const useShowCompleted = (state: UseShowCompletedProps['state']) => { // Show / hide expired ctx and update userPreferences cookie
  const { dispatch } = useContext(AppContext)

  const [cookies, setCookie] = useCookies(["userPreferences"])

  const showCompleted = useCallback(() => {
    dispatch({ type: 'TOGGLE_SHOW_COMPLETED', payload: state.showCompleted })

    setCookie("userPreferences", { showExpired: cookies.userPreferences?.showExpired, showAchieved: { firstMilestone: cookies.userPreferences?.showAchieved.firstMilestone, secondMilestone: cookies.userPreferences?.showAchieved.secondMilestone }, showCompleted: state.showCompleted }) // Update userPreferences cookie
  }, [state.showCompleted])

  useEffect(() => {
    showCompleted()
  }, [state.showCompleted])
}