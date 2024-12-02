// Types
import { RefObject, Dispatch, SetStateAction } from "react"
import { Action } from "../../../context/App/types"
import { Project } from "../../../context/App/types"

export interface ProjectsContainerProps { // ProjectsContainer props
  data: Project[]
}

export interface ProjectsContainerState { // ProjectsContainer state object
  searchValue: string,
  resultsPerPage: number,
  activePage: number
}

export interface UseSetProjectsProps { // useSetProjects hook props
  data: Project[]
}

export interface UseSearchProps { // useSearch hook props
  state: ProjectsContainerState,
  dispatch: Dispatch<Action>
}

export interface UseSetPagesProps { // useSetPages hook props
  projects: Project[],
  state: ProjectsContainerState
}

export interface UseResetActivePageProps { // useResetActivePage hook props
  setState: Dispatch<SetStateAction<ProjectsContainerState>>
}

export interface ScrollToTopProps { // scrollToTop fn props
  topRef: RefObject<HTMLElement>
}