// Types
import { useCallback, useMemo } from 'react'
import { Project } from '../../../context/App/types'
import { UseSearchProps, UseSetProjectsProps, UseSetPagesProps, UseResetActivePageProps, ScrollToTopProps } from './types'

export const useSearch = (state: UseSearchProps['state'], filter: UseSearchProps['filter'], dispatch: UseSearchProps['dispatch']): () => void => useCallback(() => { // Handle search
  const cleanTimeout = setTimeout(() => {
    if(state.searchValue) {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: state.searchValue })

      if(filter) { // Clear filter
        dispatch({ type: 'SET_FILTER', payload: '' })
      }
    }
  }, 1000)

  return () => clearTimeout(cleanTimeout)
}, [state.searchValue, filter])

export const useSetProjects = (data: UseSetProjectsProps['data'], filter: UseSetProjectsProps['filter'], showExpired: UseSetProjectsProps['showExpired'], searchValue: UseSetProjectsProps['searchValue'], milestoneFilter: UseSetProjectsProps['milestoneFilter']): Project[] => useMemo(() => { // Set projects array
  let array = []

  if(filter) { // Type filter applied
    array = data.filter(obj => obj.type === filter)
    if(searchValue) {
      const regex = new RegExp(searchValue, 'i')

      array = array.filter(obj => { // Search by project name and COF #
        for(const prop in obj) {
          if(['name', 'cof'].includes(prop) && regex.test(obj[prop])) {
            return true
          }
        }
      })
    }
  } else { // No type filter applied
    if(searchValue) {
      const regex = new RegExp(searchValue, 'i')

      array = data.filter(obj => { // Search by project name and COF #
        for(const prop in obj) {
          if(['name', 'cof', 'ordinance'].includes(prop) && regex.test(obj[prop])) {
            return true
          }
        }
      })
    } else array = data
  }

  if(milestoneFilter.start && milestoneFilter.end) { // Milestone filter applied
    const start = new Date(milestoneFilter.start)
    const end = new Date(milestoneFilter.end)

    array = array.filter(obj => 
      obj.VestingMilestones.some(milestone => {
        const milestoneDate = new Date(milestone.date);
        return milestoneDate > start && milestoneDate < end;
      })
    )
  }

  if(showExpired) { // Return expired
    return array
  } else return data.filter(obj => !obj.expired) // Filter out expired
}, [data, filter, showExpired, searchValue, milestoneFilter])

export const useSetPages = (projects: UseSetPagesProps['projects'], state: UseSetPagesProps['state']): number => useMemo(() => { // Set total pages
  return Math.ceil(projects.length / state.resultsPerPage)
}, [projects, state.resultsPerPage])

export const useResetActivePage = (filter: UseResetActivePageProps['filter'], searchValue: UseResetActivePageProps['searchValue'], setState: UseResetActivePageProps['setState']): () => void => useCallback(() => { // Reset active page on filter / searchValue change
  setState(prevState => ({ ...prevState, activePage: 1 }))
}, [filter, searchValue])

export const scrollToTop = (topRef: ScrollToTopProps['topRef']): void => { // Scroll to top
  topRef.current?.scrollIntoView({ behavior: 'smooth' })
}