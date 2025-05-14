// Types
import { Dispatch, SetStateAction } from 'react'
import { NavigateFunction } from 'react-router'

export interface DeleteProjectBtnProps { // DeleteProjectBtn props
  uuid: string
}

export interface DeleteProjectBtnState { // DeleteProjectBtn state object
  active: boolean
}

export interface HandleClickProps { // handleClick fn props
  active: boolean
  uuid: string
  options: {
    setState: Dispatch<SetStateAction<DeleteProjectBtnState>>
    navigate: NavigateFunction
  }
}