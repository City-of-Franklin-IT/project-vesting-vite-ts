// Types
import { Dispatch, SetStateAction } from "react"
import { Project } from "../../../context/App/types"

export interface TableProps { // Table props
  projects: Project[]
}

export interface TableState { // Table state object
  expanded: string[],
  hovered: string
}

export interface SetProjectCellProps { // setProjectCell fn props
  project: Project
  hovered: boolean
  options: {
    authenticated: boolean
    state: TableState
    setState: Dispatch<SetStateAction<TableState>>
  }
}

export interface SetMilestoneCellProps { // setMilestoneCell fn props
  project: Project
  hovered: boolean
}

export interface SetVestingCellProps { // setVestingCell fn props
  project: Project
  hovered: boolean
}

export interface HandleRowStylingProps { // handleRowStyling fn props
  project: Project
  index: number
}

export interface TableRow extends Project {
  id: number
}