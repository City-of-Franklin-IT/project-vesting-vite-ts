import { useHandleProjectsContainer } from './hooks'

// Types
import * as AppTypes from '@/context/types'

// Components
import SearchAndFilterContainer from '../SearchAndFilterContainer'
import ResultsPerPage from '../../table/search/ResultsPerPage'
import Pagination from '../../table/search/Pagination'
import Table from '../../table/Table'
import BackToTopBtn from '../../../buttons/BackToTopBtn'
import * as Components from './components'

function ProjectsContainer({ projects }: { projects: AppTypes.ProjectInterface[] }) {
  const { topRef, tableData, onBackToTopBtnClick } = useHandleProjectsContainer(projects)

  return (
    <div className="flex flex-col gap-6 my-10 w-full">

      <div ref={topRef} className="flex flex-wrap gap-10 justify-between items-end">
        <SearchAndFilterContainer />
        <div className="flex gap-8 items-end justify-end w-full lg:w-auto lg:flex-1">
          <div className="flex flex-col gap-2 items-end">
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

      <BackToTopBtn onClick={onBackToTopBtnClick} />
    </div>      
  )
}

export default ProjectsContainer
