// Types
import { Dispatch, SetStateAction } from "react"
import { NavigateFunction } from 'react-router-dom'
import { Project } from "../../../context/App/types"

export interface TableProps { // Table props
  data: Project[]
}

export interface TableState { // Table state object
  expanded: string[],
  hovered: string
}

export interface SetProjectCellProps { // setProjectCell fn props
  data: Project,
  state: TableState,
  setState: Dispatch<SetStateAction<TableState>>,
  hovered: boolean,
  token: string
}

export interface SetMilestoneCellProps { // setMilestoneCell fn props
  data: Project,
  hovered: boolean,
  navigate: NavigateFunction
}

export interface SetVestingCellProps { // setVestingCell fn props
  data: Project,
  hovered: boolean,
  navigate: NavigateFunction
}

export interface HandleRowStylingProps { // handleRowStyling fn props
  data: Project,
  index: number,
}

export interface TableRow extends Project {
  id: number
}