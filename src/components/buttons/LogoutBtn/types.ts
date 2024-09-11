// Types
import { Dispatch } from "react"
import { NavigateFunction } from "react-router-dom"
import { UserAction } from "../../../context/User/types"

export interface HandleLogoutClick { // Handle logout btn click
  navigate: NavigateFunction
  dispatch: Dispatch<UserAction>
}