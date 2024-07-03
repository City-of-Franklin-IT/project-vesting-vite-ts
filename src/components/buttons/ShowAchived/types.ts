// Types
import { Dispatch, ChangeEvent, SetStateAction } from "react"
import { CookieSetOptions } from 'universal-cookie'
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
  cookies: { userPreferences?: { showExpired: boolean, showAchieved: { firstMilestone: boolean, secondMilestone: boolean } } }
  setCookie: SetCookieFunction
}

export interface HandleMilestonesProps { // handleMilestones fn props
  event: ChangeEvent<HTMLInputElement>,
  setState: Dispatch<SetStateAction<ShowAchievedState>>
}

type SetCookieFunction = (name: "userPreferences", value: any, options?: CookieSetOptions | undefined) => void