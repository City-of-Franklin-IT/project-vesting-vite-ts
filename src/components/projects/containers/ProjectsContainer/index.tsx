import { useRef } from 'react'
import { useSetTableData, useResetActivePage, useSetTotalPages } from './hooks'
import { scrollToTop } from './utils'

// Types
import { ProjectInterface } from '@/context/App/types'

// Components
import SearchAndFilterContainer from '../SearchAndFilterContainer'
import ResultsPerPage from '../../table/search/ResultsPerPage'
import Pagination from '../../table/search/Pagination'
import Table from '../../table/Table'
import BackToTopBtn from '../../../buttons/BackToTopBtn/BackToTopBtn'
import * as Components from './components'

function ProjectsContainer({ projects }: { projects: ProjectInterface[] }) {
  useSetTotalPages(projects)
  useResetActivePage()

  const tableData = useSetTableData(projects)

  const topRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col gap-6 mt-10 w-full">

      <div ref={topRef} className="flex justify-between">
        <SearchAndFilterContainer />
        <div className="flex gap-8 items-end">
          <div className="flex gap-6">
            <Components.ShowExpiredCheckbox />
            <Components.ShowCompletedCheckbox />
          </div>
          <div className="flex flex-col gap-4">
            <ResultsPerPage />
            <Pagination />
          </div>
        </div>
      </div>

      <div className="shadow-xl rounded-lg">
        <Table projects={tableData || []} />
      </div>

      <div className="ml-auto">
        <Pagination />
      </div>

      <BackToTopBtn handleClick={() => scrollToTop(topRef)} />
        
    </div>      
  )
}

export default ProjectsContainer
