import { useHandleRemoveFilterBtn, useHandleShowAchieved, useHandleDateInput } from './hooks'

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
    <div className="flex flex-col gap-6 px-10 w-full md:flex-row md:m-auto md:w-fit xl:gap-10">
      <DateInput field={'start'} />
      <DateInput field={'end'} />
    </div>
  )
}

export const RemoveFilterBtn = () => {
  const { visible, onClick } = useHandleRemoveFilterBtn()

  if(!visible) return null

  return (
    <div className="mt-2">
      <button
        type="button"
        className="btn btn-ghost text-neutral-content font-[jura] uppercase hover:text-neutral"
        onClick={onClick}>
          Remove Filter
      </button>
    </div>
  )
}

export const ShowAchieved = () => {
  const { firstMilestoneProps, secondMilestoneProps } = useHandleShowAchieved()

  return (
    <div className="flex flex-col gap-2 px-10 items-center">
      <h3 className="text-warning font-[play] text-lg uppercase text-center">Show Achieved Milestones:</h3>

      <div className="flex gap-8">
        <MilestoneCheckbox
          label={'1st Milestone:'}
          id={'firstMilestone'}
          { ...firstMilestoneProps } />
        <MilestoneCheckbox
          label={'2nd Milestone:'}
          id={'secondMilestone'}
          { ...secondMilestoneProps } />
      </div>
    </div>
  )
}

const DateInput = ({ field }: { field: 'start' | 'end' }) => {
  const { inputProps, label } = useHandleDateInput(field)

  return (
    <div className="flex flex-col items-center">
      <label htmlFor={field} className="text-neutral-content font-[play] uppercase">{label}</label>
      <input
        id={field}
        type="date"
        className="input"
        { ...inputProps } />
    </div>
  )
}

type MilestoneCheckboxProps = { label: string, id: string, checked: boolean, onChange: React.ChangeEventHandler<HTMLInputElement> }

const MilestoneCheckbox = (props: MilestoneCheckboxProps) => {

  return (
    <div className="flex flex-col items-center gap-1">
      <label htmlFor={props.id} className="text-primary-content text-sm font-[play] uppercase text-center">{props.label}</label>
      <input
        type="checkbox"
        id={props.id}
        checked={props.checked}
        className="checkbox checkbox-primary"
        onChange={props.onChange} />
    </div>
  )
}