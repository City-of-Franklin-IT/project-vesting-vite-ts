import React, { useContext, useCallback, useEffect } from "react"
import ProjectsCtx from "@/components/projects/containers/ProjectsContainer/context"

export const useHandlePagination = (topRef: React.RefObject<HTMLDivElement>, projectsCount: number) => {
  useSetTotalPages(projectsCount) // Set total pages
  useResetActivePage() // Reset active page on filter change
  useScrollToTopRef(topRef) // Scroll to top on page change
}

export const useHandlePaginationBtns = () => {
  const { currentPage, totalPages, dispatch } = useContext(ProjectsCtx)
  
  const handlePrevPage = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })
  }

  const handleNextPage = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })
  }

  const prevBtnProps = {
    disabled: currentPage === 1,
    onClick: handlePrevPage
  }

  const nextBtnProps = {
    disabled: currentPage === totalPages,
    onClick: handleNextPage
  }

  return { prevBtnProps, nextBtnProps }
}

const useSetTotalPages = (projectsCount: number) => {
  const { resultsPerPage, dispatch } = useContext(ProjectsCtx)

  useEffect(() => {
    dispatch({ type: 'SET_TOTAL_PAGES', payload: Math.ceil(projectsCount / resultsPerPage) })
  }, [projectsCount, resultsPerPage])
}

const useResetActivePage = () => { // Reset active page on filter / searchValue change
  const { filter, milestoneFilter, showExpired, showAchieved, showCompleted, searchValue, resultsPerPage, dispatch } = useContext(ProjectsCtx)

  const setActivePage = useCallback(() => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 })
  }, [filter, milestoneFilter, showExpired, showAchieved, showCompleted, searchValue, resultsPerPage])

  useEffect(() => {
    setActivePage()
  }, [setActivePage])
}

const useScrollToTopRef = (topRef: React.RefObject<HTMLDivElement>) => {
  const { currentPage } = useContext(ProjectsCtx)

  useEffect(() => {
    if(topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [currentPage, topRef])
}