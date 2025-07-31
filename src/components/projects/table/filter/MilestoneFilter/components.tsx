import React, { useContext } from "react"
import ProjectsCtx from "@/components/projects/containers/ProjectsContainer/context"

export const Header = () => {

  return (
    <div className="flex flex-col text-center">
      <h3 className="text-warning font-[play] text-xl uppercase">Milestone Filter</h3>

      <small className="italic text-primary-content">Return projects with qualifying milestones..</small>
    </div>
  )
}

export const DateInputs = () => {

  return (
    <div className="flex flex-col gap-12 px-10 w-full md:flex-row md:m-auto md:w-fit">
      <StartDateInput />
      <EndDateInput />
    </div>
  )
}

export const RemoveFilterBtn = () => {
  const { milestoneFilter, dispatch } = useContext(ProjectsCtx)

  if(!milestoneFilter.start || !milestoneFilter.end) return null

  return (
    <div className="mt-2">
      <button
        type="button"
        className="btn btn-ghost text-neutral-content font-[jura] uppercase hover:text-neutral"
        onClick={() => dispatch({ type: 'SET_MILESTONE_FILTER', payload: { start: '', end: '' } })}>
          Remove Filter
      </button>
    </div>
  )
}

export const ShowAchieved = () => {
  const { showAchieved: { firstMilestone, secondMilestone }, dispatch } = useContext(ProjectsCtx)

  return (
    <div className="flex flex-col gap-2 px-10 items-center">
      <h3 className="text-warning font-[play] text-lg uppercase text-center">Show Achieved Milestones:</h3>

      <div className="flex gap-8">
        <MilestoneCheckbox
          label={'1st Milestone:'}
          checked={firstMilestone}
          onClick={() => {
            if(!firstMilestone) {
              dispatch({ type: 'SET_SHOW_ACHIEVED_FILTER', payload: { firstMilestone: true, secondMilestone } })
            } else dispatch({ type: 'SET_SHOW_ACHIEVED_FILTER', payload: { firstMilestone: false, secondMilestone: false } })
          }} />
        <MilestoneCheckbox
          label={'2nd Milestone:'}
          checked={secondMilestone}
          onClick={() => {
            if(!secondMilestone) {
              dispatch({ type: 'SET_SHOW_ACHIEVED_FILTER', payload: { firstMilestone: true, secondMilestone: true } })
            } else dispatch({ type: 'SET_SHOW_ACHIEVED_FILTER', payload: { firstMilestone, secondMilestone: false } })
          }} />
      </div>
    </div>
  )
}

const StartDateInput = () => {
  const {  milestoneFilter: { start, end }, dispatch } = useContext(ProjectsCtx)

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="start" className="text-neutral-content font-[play] uppercase">Start:</label>
      <input
        data-testid="start-input"
        id="start"
        type="date"
        className="input"
        value={start}
        onChange={(e) => dispatch({ type: 'SET_MILESTONE_FILTER', payload: { start: e.currentTarget.value, end } })} />
    </div>
  )
}

const EndDateInput = () => {
  const {  milestoneFilter: { start, end }, dispatch } = useContext(ProjectsCtx)

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="end" className="text-neutral-content font-[play] uppercase">End:</label>
      <input 
        data-testid="end-input"
        id="end"
        type="date"
        className="input"
        value={end}
        onChange={(e) => dispatch({ type: 'SET_MILESTONE_FILTER', payload: { start, end: e.currentTarget.value } })} />
    </div>
  )
}

type MilestoneCheckboxProps = { label: string, checked: boolean, onClick: React.ChangeEventHandler<HTMLInputElement> }

const MilestoneCheckbox = (props: MilestoneCheckboxProps) => {

  return (
    <div className="flex flex-col items-center gap-1">
      <label className="text-primary-content text-sm font-[play] uppercase text-center">{props.label}</label>
      <input 
        type="checkbox"
        id="firstMilestone"
        checked={props.checked}
        className="checkbox checkbox-primary"
        onChange={props.onClick} />
    </div>
  )
}