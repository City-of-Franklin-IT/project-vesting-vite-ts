// Types
import { Dispatch, SetStateAction } from 'react'
import { ProjectsContainerState } from '../ProjectsContainer/types'

export interface SearchProps { // Search props
  searchValue: string,
  setSearchValue: Dispatch<SetStateAction<ProjectsContainerState>>
}