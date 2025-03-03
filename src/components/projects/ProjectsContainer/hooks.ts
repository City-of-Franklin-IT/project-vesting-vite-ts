import { useCallback, useMemo, useContext, useEffect } from 'react'
import AppContext from '../../../context/App/AppContext'

// Types
import { Project } from '../../../context/App/types'
import { UseSearchProps, UseSetProjectsProps, UseSetPagesProps, UseResetActivePageProps } from './types'

export const useSearch = (state: UseSearchProps['state']): void => { // Set search value to ctx on change
  const { dispatch } = useContext(AppContext)

  const search = useCallback(() => {
    const cleanTimeout = setTimeout(() => {
      dispatch({ type: 'SET_SEARCH_VALUE', payload: state.searchValue })
    }, 1000)
  
    return () => clearTimeout(cleanTimeout)
  }, [state.searchValue, dispatch])

  useEffect(() => {
    search()
  }, [search])
}

export const useSetProjects = (projects: UseSetProjectsProps['projects']): Project[] => { // Set projects array
  const { filter, searchValue, milestoneFilter, showAchieved, showCompleted, showExpired } = useContext(AppContext)

  let array = []

  if(filter) { // Type filter applied
    array = projects.filter(project => project.type === filter)

    if(searchValue) {
      const regex = new RegExp(searchValue, 'i')

      array = array.filter(project => { // Search by project name and COF #
        for(const prop in project) {
          if(['name', 'cof'].includes(prop) && regex.test(project[prop])) {
            return true
          }
        }
      })
    }
  } else { // No type filter applied
    if(searchValue) {
      const regex = new RegExp(searchValue, 'i')

      array = projects.filter(project => { // Search by project name and COF #
        for(const prop in project) {
          if(['name', 'cof', 'ordinance'].includes(prop) && regex.test(project[prop])) {
            return true
          }
        }
      })
    } else array = projects
  }

  if(milestoneFilter.start && milestoneFilter.end) { // Milestone filter applied
    const start = new Date(milestoneFilter.start)
    const end = new Date(milestoneFilter.end)

    array = array.filter(obj => 
      obj.Milestones.some(milestone => {
        const milestoneDate = !milestone.MilestoneExtension ? new Date(milestone.date) : new Date(milestone.MilestoneExtension.date) // Check for extension
        return milestoneDate > start && milestoneDate < end
      })
    )
  }

  if(!showAchieved.firstMilestone) { // If !showAchieved.firstMilestone - remove projects with achieved firstMilestone
    array = array.filter(obj => {
      const milestone = obj.Milestones.find(milestone => milestone.number === 1)
      return !milestone?.MilestoneStatus.achieved
    })
  }

  if(!showAchieved.secondMilestone) { // If !showAchieved.secondMilestone - remove projects with achieved secondMilestone
    array = array.filter(obj => {
      const milestone = obj.Milestones.find(milestone => milestone.number === 2)
      return !milestone?.MilestoneStatus.achieved
    })
  }

  if(showExpired) {
    null
  } else array = array.filter(obj => !obj.expired) // Filter out expired

  if(showCompleted) {
    return array
  } else {
    return array.filter(obj => {
      let completed = false

      obj.VestingPeriods.forEach(period => {
        if(period.VestingStatus.achieved) {
          completed = true
        }
      })

      if(!completed) {
        return obj
      }
    })
  }
}

export const useSetPages = (projects: UseSetPagesProps['projects'], state: UseSetPagesProps['state']): number => useMemo(() => { // Set total pages
  return Math.ceil(projects.length / state.resultsPerPage)
}, [projects, state.resultsPerPage])

export const useResetActivePage = (setState: UseResetActivePageProps['setState']) => { // Reset active page on filter / searchValue change
  const setActivePage = useCallback(() => {
    setState(prevState => ({ ...prevState, activePage: 1 }))
  }, [setState])

  useEffect(() => {
    setActivePage()
  }, [setActivePage])
}