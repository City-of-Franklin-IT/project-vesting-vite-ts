import styles from './ResultsPerPage.module.css'

// Types
import { ResultsPerPageProps } from './types'

function ResultsPerPage({ resultsPerPage, setResultsPerPage }: ResultsPerPageProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="resultsPerPage" className={styles.label}>Results Per Page:</label>
      <select 
        id="resultsPerPage" 
        value={resultsPerPage} 
        onChange={(e) => setResultsPerPage(prevState => ({ ...prevState, resultsPerPage: parseInt(e.target.value)}))} 
        className={styles.input}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
      </select>
    </div>
  )
}

export default ResultsPerPage