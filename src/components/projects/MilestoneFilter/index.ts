import { useCallback, useEffect, useContext } from "react"
import AppContext from "../../../context/App/AppContext"

// Types
import { UseSetMilestoneFilterProps } from "./types"

export const useSetMilestoneFilter = (state: UseSetMilestoneFilterProps['state']): void => { // Set milestone date range filter to ctx on change
  const { dispatch } = useContext(AppContext)

  const setMilestoneFilter = useCallback(() => {
    dispatch({ type: 'SET_MILESTONE_FILTER', payload: { start: state.start, end: state.end } })
  }, [state])

  useEffect(() => {
    setMilestoneFilter()
  }, [state])
}