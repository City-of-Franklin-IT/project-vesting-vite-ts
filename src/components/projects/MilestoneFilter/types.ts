// Types
import { Action } from '../../../context/App/types'
import { Dispatch, SetStateAction } from 'react'

export interface MilestoneFilterState { // MilestoneFilter state object
  start: string,
  end: string
}

export interface UseSetMilestoneFilterProps { // useSetMilestoneFilter hooks props
  state: MilestoneFilterState,
  dispatch: Dispatch<Action>
}