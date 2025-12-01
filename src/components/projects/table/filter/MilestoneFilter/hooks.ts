import { useContext } from "react"
import ProjectsCtx from "@/components/projects/containers/ProjectsContainer/context"

export const useHandleRemoveFilterBtn = () => {
  const { milestoneFilter, dispatch } = useContext(ProjectsCtx)

  const visible = milestoneFilter.start || milestoneFilter.end

  const onClick = () => {
    dispatch({ type: 'SET_MILESTONE_FILTER', payload: { start: '', end: '' } })
  }

  return { visible, onClick }
}

export const useHandleShowAchieved = () => {
  const { showAchieved, dispatch } = useContext(ProjectsCtx)

  const firstMilestoneOnClick = () => {
    const payload = !showAchieved.firstMilestone ?
    { firstMilestone: true, secondMilestone: showAchieved.secondMilestone } :
    { firstMilestone: false, secondMilestone: false }

    dispatch({ type: 'SET_SHOW_ACHIEVED_FILTER', payload })
  }

  const secondMilestoneOnClick = () => {
    const payload = !showAchieved.secondMilestone ?
    { firstMilestone: true, secondMilestone: true } :
    { firstMilestone: showAchieved.firstMilestone, secondMilestone: false }

    dispatch({ type: 'SET_SHOW_ACHIEVED_FILTER', payload })
  }

  return {
    firstMilestoneProps: {
      onChange: firstMilestoneOnClick,
      checked: showAchieved.firstMilestone
    },
    secondMilestoneProps: {
      onChange: secondMilestoneOnClick,
      checked: showAchieved.secondMilestone
    }
  }
}

export const useHandleDateInput = (field: 'start' | 'end') => {
  const { milestoneFilter, dispatch } = useContext(ProjectsCtx)

  const value = milestoneFilter[field]

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    const payload = field === 'start' ?
    { start: value, end: milestoneFilter.end } :
    { start: milestoneFilter.start, end: value }

    dispatch({ type: 'SET_MILESTONE_FILTER', payload })
  }

  const label = field === 'start' ? 'Start:' : 'End:'

  const inputProps = {
    value,
    onChange
  }

  return { inputProps, label }
}