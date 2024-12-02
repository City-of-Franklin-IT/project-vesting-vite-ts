// Types
import { Dispatch, ChangeEvent, SetStateAction } from "react"
import { Action } from "../../../context/App/types"

export interface ShowAchievedState { // ShowAchieved state object
  showAchieved: {
    firstMilestone: boolean,
    secondMilestone: boolean
  }
}

export interface UseShowAchievedProps { // useShowAchieved props
  state: ShowAchievedState
  dispatch: Dispatch<Action>
}

export interface HandleMilestonesProps { // handleMilestones fn props
  event: ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<ShowAchievedState>>
}