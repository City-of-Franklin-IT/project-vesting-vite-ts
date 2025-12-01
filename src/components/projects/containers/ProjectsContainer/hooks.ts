import { useContext, useRef } from 'react'
import { scrollToTop } from './utils'

// Types
import * as AppTypes from '@/context/types'
import ProjectsCtx from './context'

export const useHandleProjectsContainer = (projects: AppTypes.ProjectInterface[]) => {
  const topRef = useRef<HTMLDivElement>(null)
  const tableData = useSetTableData(projects)
  const onBackToTopBtnClick = () => scrollToTop(topRef)

  return { topRef, tableData, onBackToTopBtnClick }
}

export const useHandleShowExpiredCheckbox = () => {
  const { showExpired, dispatch } = useContext(ProjectsCtx)

  const onChange = () => {
    dispatch({ type: 'TOGGLE_SHOW_EXPIRED' })
  }

  const checked = showExpired

  return { onChange, checked }
}

export const useHandleShowCompletedCheckbox = () => {
  const { showCompleted, dispatch } = useContext(ProjectsCtx)

  const onChange = () => {
    dispatch({ type: 'TOGGLE_SHOW_COMPLETED' })
  }
  
  const checked = showCompleted

  return { onChange, checked }
}

const useSetTableData = (projects: AppTypes.ProjectInterface[]) => { // Set projects array
  const { filter, searchValue, milestoneFilter, showAchieved, showCompleted, showExpired, currentPage, resultsPerPage } = useContext(ProjectsCtx)

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

    array = array.filter(project => 
      project.Milestones?.some(milestone => {
        const milestoneDate = !milestone.MilestoneExtension ? new Date(milestone.date) : new Date(milestone.MilestoneExtension.date) // Check for extension

        return milestoneDate > start && milestoneDate < end
      })
    )
  }

  if(!showAchieved.firstMilestone) { // If !showAchieved.firstMilestone - remove projects with achieved firstMilestone
    array = array.filter(project => {
      const milestone = project.Milestones?.find(milestone => milestone.number === 1)

      if(!milestone?.MilestoneStatus?.achieved) {
        return milestone
      }
    })
  }

  if(!showAchieved.secondMilestone) { // If !showAchieved.secondMilestone - remove projects with achieved secondMilestone
    array = array.filter(project => {
      const milestone = project.Milestones?.find(milestone => milestone.number === 2)

      if(!milestone?.MilestoneStatus?.achieved) {
        return milestone
      }
    })
  }

  if(!showExpired) {
    array = array.filter(obj => !obj.expired)
  }

  if(showCompleted) {
    return array.slice((currentPage * resultsPerPage) - resultsPerPage, currentPage * resultsPerPage)
  } else {
    return array.filter(project => {
      let completed = false

      project.VestingPeriods?.forEach(period => {
        if(period.VestingStatus?.achieved) {
          completed = true
        }
      })

      if(!completed) {
        return project
      }
    }).slice((currentPage * resultsPerPage) - resultsPerPage, currentPage * resultsPerPage)
  }
}