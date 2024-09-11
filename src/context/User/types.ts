// Types
import { Dispatch } from "react"
import { ServerResponse } from "../App/types"

export interface LoginForm { // LoginForm props
  email: string,
  password: string
}

export interface ValidateTokenResponse extends ServerResponse { // validateToken response object
  data: UserObj
}

export interface UserContextObj { // UserContext
  dispatch: Dispatch<UserAction>
  user: UserObj | undefined
}

export interface UserState { // UserContext initial state obj
  user: UserObj | undefined
}

export interface UserReducerProps { // UserReducer props
  state: UserState
  action: UserAction
}

export type UserAction =
  | { type: 'SET_USER', payload: { email: string, role: Role | undefined, department: string } | undefined }

export interface UserObj {
  email: string
  role: Role | undefined
  department: string
}

type Role =
  | "Super User"
  | "Editor"