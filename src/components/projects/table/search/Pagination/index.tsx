import { useHandlePagination } from './hooks'

// Components
import React from 'react'
import * as Components from './components'

function Pagination({ topRef, projectsCount }: { topRef: React.RefObject<HTMLDivElement>, projectsCount: number }) {
  useHandlePagination(topRef, projectsCount)

  return (
    <Components.PaginationButtons />
  )
}

export default Pagination