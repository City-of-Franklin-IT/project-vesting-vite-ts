// Types
import { Dispatch } from "react"
import { Action } from "../../../context/App/types";

export interface ShowExpiredState { // ShowExpired props
  showExpired: boolean;
}

export interface UseShowExpiredProps { // useShowExpired hook props
  state: ShowExpiredState,
  dispatch: Dispatch<Action>
}