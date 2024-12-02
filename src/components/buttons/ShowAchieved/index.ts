import { useCallback } from "react"

// Types
import { UseShowAchievedProps, HandleMilestonesProps } from "./types"

export const useShowAchieved = (state: UseShowAchievedProps['state'], dispatch: UseShowAchievedProps['dispatch']) => useCallback(() => {
  dispatch({ type: 'TOGGLE_SHOW_ACHIEVED', payload: state.showAchieved })
}, [state, dispatch])

export const handleMilestones = (event: HandleMilestonesProps['event'], setState: HandleMilestonesProps['setState']): void => {
  if(event.target.id === 'firstMilestone') { // firstMilestone
    if(event.target.checked) { 
      setState(prevState => ({ showAchieved: { firstMilestone: true, secondMilestone: prevState.showAchieved.secondMilestone } }))
    } else setState(({ showAchieved: { firstMilestone: false, secondMilestone: false } })) // If firstMilestone is unchecked - make secondMilestone unchecked
  } else { // secondMilestone
    if(event.target.checked) {
      setState({ showAchieved: { firstMilestone: true, secondMilestone: true } })
    } else setState(prevState => ({ showAchieved: { firstMilestone: prevState.showAchieved.firstMilestone, secondMilestone: false } }))
  }
}