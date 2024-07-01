// Types
import { Dispatch, SetStateAction } from 'react'
import { ProjectsContainerState } from '../ProjectsContainer/types'

export interface SearchAndFilterContainerProps { // SearchAndFilterContainer props
  searchValue: string,
  setSearchValue: Dispatch<SetStateAction<ProjectsContainerState>>
}