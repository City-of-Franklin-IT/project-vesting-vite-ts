import { useContext } from 'react'
import ProjectsCtx from '@/components/projects/containers/ProjectsContainer/context'

function ResultsPerPage() {
  const { resultsPerPage, dispatch } = useContext(ProjectsCtx)
  
  return (
    <div className="flex flex-col gap-1 items-center">
      <label htmlFor="resultsPerPage" className="text-neutral-content font-[jura] text-sm uppercase">Results Per Page:</label>
      <select 
        id="resultsPerPage" 
        value={resultsPerPage} 
        onChange={(e) => dispatch({ type: 'SET_RESULTS_PER_PAGE', payload: parseInt(e.currentTarget.value) })} 
        className="input">
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
      </select>
    </div>
  )
}

export default ResultsPerPage