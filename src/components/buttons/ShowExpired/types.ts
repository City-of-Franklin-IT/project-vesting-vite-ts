// Types
import { Dispatch } from "react"
import { CookieSetOptions } from 'universal-cookie'
import { Action } from "../../../context/App/types"

export interface ShowExpiredState { // ShowExpired props
  showExpired: boolean
}

export interface UseShowExpiredProps { // useShowExpired hook props
  state: ShowExpiredState
  dispatch: Dispatch<Action>
  cookies: { userPreferences?: { showExpired: boolean, showAchieved: { firstMilestone: boolean, secondMilestone: boolean } } }
  setCookie: SetCookieFunction
}

type SetCookieFunction = (name: "userPreferences", value: any, options?: CookieSetOptions | undefined) => void