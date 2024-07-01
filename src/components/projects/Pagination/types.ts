export interface PaginationProps { // Pagination props
  activePage: number,
  pages: number,
  handleNextPage: () => void,
  handlePrevPage: () => void
}