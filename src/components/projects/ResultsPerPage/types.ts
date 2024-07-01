// Types
import { Dispatch, SetStateAction } from 'react'
import { ProjectsContainerState } from '../ProjectsContainer/types'

export interface ResultsPerPageProps { // ResultsPerPage props
  resultsPerPage: number,
  setResultsPerPage: Dispatch<SetStateAction<ProjectsContainerState>>
}