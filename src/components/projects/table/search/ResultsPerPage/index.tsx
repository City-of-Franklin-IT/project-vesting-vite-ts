import { useHandleResultsPerPage } from './hooks'

function ResultsPerPage() {
  const selectProps = useHandleResultsPerPage()
  
  return (
    <div className="flex flex-col gap-1 items-center">
      <label htmlFor="resultsPerPage" className="text-neutral-content font-[jura] text-sm uppercase">Results Per Page:</label>
      <select
        className="input"
        { ...selectProps }>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
      </select>
    </div>
  )
}

export default ResultsPerPage