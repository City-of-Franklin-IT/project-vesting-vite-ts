// Types
import { Dispatch, SetStateAction } from 'react'
import { NavigateFunction } from 'react-router-dom'

export interface DeleteProjectBtnProps { // DeleteProjectBtn props
  uuid: string
}

export interface DeleteProjectBtnState { // DeleteProjectBtn state object
  active: boolean
}

export interface HandleClickProps { // handleClick fn props
  active: boolean,
  setState: Dispatch<SetStateAction<DeleteProjectBtnState>>,
  uuid: string,
  navigate: NavigateFunction,
  token: string
}