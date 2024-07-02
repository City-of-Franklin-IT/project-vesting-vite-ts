import { useCallback } from "react"

// Types
import { UseSetMilestoneFilterProps } from "./types"

export const useSetMilestoneFilter = (state: UseSetMilestoneFilterProps['state'], dispatch: UseSetMilestoneFilterProps['dispatch']) => useCallback(() => {
  dispatch({ type: 'SET_MILESTONE_FILTER', payload: { start: state.start, end: state.end } })
}, [state.start, state.end])