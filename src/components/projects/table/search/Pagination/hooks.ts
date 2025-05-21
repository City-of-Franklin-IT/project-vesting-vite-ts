import { useContext, useCallback, useEffect } from "react"
import ProjectsCtx from "@/components/projects/containers/ProjectsContainer/context"

export const useHandlePaginationBtns = () => {
  const { currentPage, totalPages, dispatch } = useContext(ProjectsCtx)
  
  const handlePrevPage = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })
  }

  const handleNextPage = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })
  }

  return { handlePrevPage, handleNextPage, currentPage, totalPages }
}

export const useSetTotalPages = (projectsCount: number) => {
  const { resultsPerPage, dispatch } = useContext(ProjectsCtx)

  useEffect(() => {
    dispatch({ type: 'SET_TOTAL_PAGES', payload: Math.ceil(projectsCount / resultsPerPage) })
  }, [projectsCount, resultsPerPage])
}

export const useResetActivePage = () => { // Reset active page on filter / searchValue change
  const { filter, milestoneFilter, showExpired, showAchieved, showCompleted, searchValue, resultsPerPage, dispatch } = useContext(ProjectsCtx)

  const setActivePage = useCallback(() => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 })
  }, [filter, milestoneFilter, showExpired, showAchieved, showCompleted, searchValue, resultsPerPage])

  useEffect(() => {
    setActivePage()
  }, [setActivePage])
}

export const useScrollToTopRef = (topRef: React.RefObject<HTMLDivElement>) => {
  const { currentPage } = useContext(ProjectsCtx)

  useEffect(() => {
    if(topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [currentPage, topRef])
}