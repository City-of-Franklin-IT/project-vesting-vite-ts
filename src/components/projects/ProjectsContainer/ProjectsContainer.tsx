import { useState, useContext, useRef } from 'react'
import AppContext from '../../../context/App/AppContext'
import { useSearch, useSetProjects, useSetPages, useResetActivePage } from './hooks'
import { scrollToTop } from './utils'
import styles from './ProjectsContainer.module.css'

// Types
import { ProjectsContainerProps, ProjectsContainerState } from './types'

// Components
import SearchAndFilterContainer from '../SearchAndFilterContainer/SearchAndFilterContainer'
import ResultsPerPage from '../ResultsPerPage/ResultsPerPage'
import ShowExpired from '../../buttons/ShowExpired/ShowExpired'
import ShowCompleted from '../../buttons/ShowCompleted/ShowCompleted'
import Pagination from '../Pagination/Pagination'
import Table from '../Table/Table'
import BackToTopBtn from '../../buttons/BackToTopBtn/BackToTopBtn'

function ProjectsContainer({ data }: ProjectsContainerProps) {
  const { searchValue } = useContext(AppContext)

  const [state, setState] = useState<ProjectsContainerState>({ searchValue: searchValue || '', resultsPerPage: 100, activePage: 1 })

  const topRef = useRef<HTMLDivElement>(null)

  const projects = useSetProjects(data)

  const pages = useSetPages(projects, state)

  useSearch(state) // Handle search

  useResetActivePage(setState) // Reset active page

  return (
    <div className={styles.container}>

      <div ref={topRef} className={styles.searchFilterDiv}>
        <SearchAndFilterContainer 
          searchValue={state.searchValue} 
          setSearchValue={setState} />
        <div className="flex gap-8 items-end">
          <div className="flex gap-6">
            <ShowExpired />
            <ShowCompleted />
          </div>
          <div className="flex flex-col gap-4">
            <ResultsPerPage
              resultsPerPage={state.resultsPerPage}
              setResultsPerPage={setState} />
            <Pagination
              activePage={state.activePage}
              pages={pages}
              handleNextPage={() => setState(prevState => ({ ...prevState, activePage: state.activePage + 1 }))}
              handlePrevPage={() => setState(prevState => ({ ...prevState, activePage: state.activePage - 1 }))} />
          </div>
        </div>
      </div>

      <div className={styles.tableDiv}>
        <Table projects={projects ? projects.slice((state.activePage * state.resultsPerPage) - state.resultsPerPage, state.activePage * state.resultsPerPage) : []} />
      </div>

      <div className="ml-auto">
        <Pagination
          activePage={state.activePage}
          pages={pages}
          handleNextPage={() => {
            setState(prevState => ({ ...prevState, activePage: state.activePage + 1 }))
            scrollToTop(topRef)
          }}
          handlePrevPage={() => {
            setState(prevState => ({ ...prevState, activePage: state.activePage - 1 }))
            scrollToTop(topRef)
          }} />
      </div>

      <BackToTopBtn handleClick={() => scrollToTop(topRef)} />
        
    </div>      
  )
}

export default ProjectsContainer
