import { useNavigate } from "react-router"
import { useProjectCreateCtx } from "@/helpers/hooks"
import { useHandleFPMCDateChange } from "./hooks"
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormLabel from '../../../../form-components/FormLabel/FormLabel'
import FormError from '../../../../form-components/FormError/FormError'
import CancelBtn from '../../../../form-components/buttons/CancelBtn/CancelBtn'
import SaveBtn from '../../../../form-components/buttons/SaveBtn/SaveBtn'
import { OrdinanceOptions } from "@/helpers/components"

export const NameInput = () => { // Name input
  const { methods, disabled } = useProjectCreateCtx()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Project Name'}
          name={'name'}
          required={true} />
        <input 
          type="text" 
          id="name"
          disabled={disabled}
          { ...methods.register('name', {
            required: "Project name is required",
            maxLength: {
              value: 255,
              message: "Project name must be 255 characters or less"
            },
            onBlur: () => methods.trigger('name'),
            onChange: () => methods.trigger('name')
          }) }
          className={styles.input} />
      </div>
      <FormError field={'name'} />
    </div>
  )
}

export const COFNumberInput = () => { // COF number input
  const { methods, disabled } = useProjectCreateCtx()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'COF #'}
          name={'cof'}
          required={true} />
        <input 
          type="number"
          id="cof" 
          disabled={disabled}
          { ...methods.register('cof', {
            required: "COF # is required",
            onChange: () => methods.trigger('cof')
          }) }
          className={styles.input} />
      </div>
      <FormError field={'cof'} />
    </div>
  )
}

export const OrdinanceInput = () => { // Ordinance input
  const { methods, disabled } = useProjectCreateCtx()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Zoning Ordinance'}
          name={'ordinance'}
          required={true} />
        <select 
          id="ordinance"
          disabled={disabled}
          { ...methods.register("ordinance", {
            required: "Zoning ordinance is required",
            onBlur: () => methods.trigger('ordinance')
          }) }
          className={styles.input}>
            <OrdinanceOptions />
          </select>
      </div>
      <FormError field={'ordinance'} />
    </div>
  )
}

export const VestingInputs = () => {

  return (
    <div className="flex gap-3">
      <TenYearVestingDateInput />
      <FifteenYearVestingDateInput />
    </div>
  )
}

export const MilestoneInputs = () => {

  return (
    <div className="flex gap-3">
      <FirstMilestoneDateInput />
      <SecondMilestoneDateInput />
    </div>
  )
}

export const FPMCApprovalInput = () => { // FPMC approval date input
  const { methods, disabled } = useProjectCreateCtx()

  const handleFPMCDateChange = useHandleFPMCDateChange()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'FPMC Approval'}
          name={'fpmcApproval'}
          required={true} />
        <input 
          type="date"
          disabled={disabled}
          { ...methods.register(`Approvals.${ 0 }.date`, {
            required: "FPMC approval date is required",
            onChange: () => handleFPMCDateChange,
            onBlur: () => methods.trigger(`Approvals.${ 0 }.date`),
          })}
          className={styles.input} />
      </div>
      <FormError field={`Approvals.${ 0 }.date`} />
    </div>
  )
}

export const NotesInput = () => { // Notes input
  const { methods, disabled } = useProjectCreateCtx()

  return (
    <div className="flex">
      <FormLabel
        label={'Notes'}
        name={'notes'} />
      <textarea 
        rows={6}
        id="notes"
        disabled={disabled}
        { ...methods.register("notes") }
        className={styles.input}>
      </textarea>
    </div>
  )
}

export const Buttons = () => { // Form buttons
  const navigate = useNavigate()

  return (
    <div className={styles.buttonsContainer}>
      <CancelBtn handleClick={() => navigate('/')} />
      <SaveBtn />
    </div>
  )
}

const TenYearVestingDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const fifteenYearDate = methods.watch(`VestingPeriods.${ 1 }.date`)

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'10Y Vesting Period'}
          name={'10YVesting'} />
        <input 
          type="date"
          id="10YVesting"
          disabled={disabled}
          { ...methods.register(`VestingPeriods.${ 0 }.date`, {
            validate: value =>
              new Date(value) > new Date(fifteenYearDate) ? "10Y vesting date must be before 15Y vesting date" : true
            , onChange: () => methods.trigger(`VestingPeriods.${ 0 }.date`)
          }) }
          className={styles.input} />
      </div>
      <div className="flex gap-2">
        <FormError field={`VestingPeriods.${ 0 }.date`} />
      </div>
    </div>
  )
}

const FifteenYearVestingDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const tenYearDate = methods.watch(`VestingPeriods.${ 0 }.date`)

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'15Y Vesting Period'}
          name={'15YVesting'} />
        <input 
          type="date"
          disabled={disabled}
          { ...methods.register(`VestingPeriods.${ 1 }.date`, {
            validate: value =>
              new Date(value) < new Date(tenYearDate) ? "15Y vesting date must be after 10Y vesting date" : true
          }) }
          className={styles.input} />
      </div>
      <div className="flex gap-2">
        <FormError field={`VestingPeriods.${ 1 }.date`} />
      </div>
    </div>
  )
}

const FirstMilestoneDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const secondMilestoneDate = methods.watch(`Milestones.${ 1 }.date`)

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Milestone #1'}
          name={'firstMilestone'}
          required={true} />
        <input 
          type="date"
          disabled={disabled}
          { ...methods.register(`Milestones.${ 0 }.date`, {
            required: "First milestone is required",
            validate: value =>
              !value || new Date(value) > new Date(secondMilestoneDate) ? "First milestone must be before second milestone" : true
          }) }
          className={styles.input} />
      </div>
      <FormError field={`Milestones.${ 0 }.date`} />
    </div>
  )
}

const SecondMilestoneDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const firstMilestoneDate = methods.watch(`Milestones.${ 0 }.date`)

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Milestone #2'}
          name={'secondMilestone'}
          required={true} />
        <input 
          type="date"
          disabled={disabled}
          { ...methods.register(`Milestones.${ 1 }.date`, {
            required: "Second milestone is required",
            onBlur: () => methods.trigger(`Milestones.${ 1 }.date`),
            validate: value =>
              !value || new Date(value) < new Date(firstMilestoneDate) ? "Second milestone must be after first milestone" : true
          }) } 
          className={styles.input} />
      </div>
      <FormError field={`Milestones.${ 1 }.date`} />
    </div>
  )
}