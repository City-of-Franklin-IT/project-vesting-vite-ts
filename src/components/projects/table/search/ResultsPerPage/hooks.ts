import React, { useContext } from 'react'
import ProjectsCtx from '@/components/projects/containers/ProjectsContainer/context'

/**
* Returns results per page select onChange handler and value
**/
export const useHandleResultsPerPage = () => {
  const { resultsPerPage, dispatch } = useContext(ProjectsCtx)

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const payload = Number(e.currentTarget.value)

    dispatch({ type: 'SET_RESULTS_PER_PAGE', payload })
  }

  return { onChange, value: resultsPerPage }
}