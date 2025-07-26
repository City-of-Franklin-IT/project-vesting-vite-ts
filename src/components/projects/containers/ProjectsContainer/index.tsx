import { useRef } from 'react'
import { useSetTableData } from './hooks'
import { scrollToTop } from './utils'

// Types
import { ProjectInterface } from '@/context/types'

// Components
import SearchAndFilterContainer from '../SearchAndFilterContainer'
import ResultsPerPage from '../../table/search/ResultsPerPage'
import Pagination from '../../table/search/Pagination'
import Table from '../../table/Table'
import BackToTopBtn from '../../../buttons/BackToTopBtn'
import * as Components from './components'

function ProjectsContainer({ projects }: { projects: ProjectInterface[] }) {
  const topRef = useRef<HTMLDivElement>(null)

  const tableData = useSetTableData(projects)

  return (
    <div className="flex flex-col gap-6 my-10 w-full">

      <div ref={topRef} className="flex flex-col gap-10 justify-between lg:flex-row">
        <SearchAndFilterContainer />
        <div className="flex gap-8 items-end">
          <div className="flex flex-col gap-2 lg:flex-row lg:gap-6">
            <Components.ShowExpiredCheckbox />
            <Components.ShowCompletedCheckbox />
          </div>
          <div className="flex flex-col gap-4">
            <ResultsPerPage />
            <Pagination
              topRef={topRef}
              projectsCount={projects.length} />
          </div>
        </div>
      </div>

      <div className="shadow-xl rounded-lg">
        <Table projects={tableData || []} />
      </div>

      <div className="ml-auto">
        <Pagination
          topRef={topRef}
          projectsCount={projects.length} />
      </div>

      <BackToTopBtn handleClick={() => scrollToTop(topRef)} />
        
    </div>      
  )
}

export default ProjectsContainer
