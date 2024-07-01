import styles from './Pagination.module.css'

// Types
import { PaginationProps } from './types'

function Pagination({ activePage, pages, handleNextPage, handlePrevPage }: PaginationProps) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        disabled={activePage === 1} // Disable if on first page
        onClick={() => handlePrevPage()}
        className={activePage === 1 ? styles.disabled : styles.btn}>
        Prev Page
      </button>
      <button
        type="button"
        disabled={activePage === pages} // Disable if on last page
        onClick={() => handleNextPage()}
        className={activePage === pages ? styles.disabled : styles.btn}>
        Next Page
      </button>
    </div>
  )
}

export default Pagination