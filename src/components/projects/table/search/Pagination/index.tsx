import { useSetTotalPages, useResetActivePage, useScrollToTopRef } from './hooks'

// Components
import React from 'react'
import * as Components from './components'

function Pagination({ topRef, projectsCount }: { topRef: React.RefObject<HTMLDivElement>, projectsCount: number }) {
  useSetTotalPages(projectsCount) // Set total pages
  useResetActivePage() // Reset active page on filter change
  useScrollToTopRef(topRef) // Scroll to top on page change

  return (
    <Components.PaginationButtons />
  )
}

export default Pagination