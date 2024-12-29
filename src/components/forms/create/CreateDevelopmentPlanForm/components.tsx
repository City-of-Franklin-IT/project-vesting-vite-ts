import { useNavigate } from 'react-router-dom'
import { ordinanceOptions } from '../../../../utils'
import { useCreateDevelopmentPlanFormContext } from './hooks'
import styles from '../../Forms.module.css'

// Components
import FormLabel from '../../FormLabel/FormLabel'
import FormError from '../../FormError/FormError'
import CancelBtn from '../../../buttons/CancelBtn/CancelBtn'
import SaveBtn from '../../../buttons/SaveBtn/SaveBtn'

export const NameInput = () => { // Name input
  const { methods, disabled } = useCreateDevelopmentPlanFormContext()

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
  const { methods, disabled } = useCreateDevelopmentPlanFormContext()

  return (
    <div className="flex flex-col gap-2">
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

export const ResolutionInput = () => { // Resolution input
  const { methods, disabled } = useCreateDevelopmentPlanFormContext()

  return (
    <div className="'flex flex-col gap-2 w-1/2">
      <div className="flex">
        <FormLabel
          label={'Resolution #'}
          name={'resolution'}
          required={true} />
        <input 
          type="text"
          id="resolution" 
          disabled={disabled}
          { ...methods.register("resolution.resolution", {
            required: "Resolution # is required",
            maxLength: {
              value: 10,
              message: "Resolution # must be 10 character or less"
            }
          }) }
          className={styles.input} />
      </div>
      <FormError field={'resolution'} />
    </div>
  )
}

export const OrdinanceInput = () => { // Ordinance input
  const { methods, disabled } = useCreateDevelopmentPlanFormContext()

  return (
    <div className="flex flex-col gap-2 w-1/2">
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
            {ordinanceOptions.map((obj, index) => {
              return (
                <option key={`select-option-${ index }`} value={obj.value}>{obj.text}</option>
              )
            })}
          </select>
      </div>
      <FormError field={'ordinance'} />
    </div>
  )
}

export const FPMCApprovalInput = () => { // FPMC approval date input
  const { methods, disabled } = useCreateDevelopmentPlanFormContext()

  const bomaDate = methods.watch('approval.BOMA.date')

  return (
    <div className="flex flex-col gap-2 w-1/2">
      <div className="flex">
        <FormLabel 
          label={'FPMC Approval'}
          name={'fpmcApproval'}
          required={true} />
        <input 
          type="date"
          id="fpmcApproval"
          disabled={disabled}
          { ...methods.register("approval.FPMC.date", {
            required: "FPMC approval date is required",
            onBlur: () => methods.trigger('approval.FPMC.date'),
            validate: value =>
              !value || new Date(value as Date) > new Date(bomaDate as Date) ? "FPMC approval date must be before BOMA approval date" : true
          }) }
          className={styles.input} />
      </div>
      <FormError field={'fpmcApproval'} />
    </div>
  )
}

export const BOMAApprovalInput = () => { // BOMA approval date input
  const { methods, disabled } = useCreateDevelopmentPlanFormContext()

  const fpmcDate = methods.watch('approval.FPMC.date')

  return (
    <div className="flex flex-col gap-2 w-1/2">
      <div className="flex">
        <FormLabel
          label={'BOMA Approval'}
          name={'bomaApproval'}
          required={true} />
        <input 
          type="date"
          id="bomaApproval"
          disabled={disabled}
          { ...methods.register("approval.BOMA.date", {
            required: "BOMA approval date is required",
            onBlur: () => methods.trigger('approval.BOMA.date'),
            validate: value => 
              !value || new Date(value as Date) < new Date(fpmcDate as Date) ? "BOMA approval date must be after FPMC approval date" : true
          })}
          className={styles.input} />
      </div>
      <FormError field={'approval.BOMA.date'} />
    </div>
  )
}

export const TenYearVestingInput = () => { // Ten year vesting date input
  const { methods, disabled } = useCreateDevelopmentPlanFormContext()

  const fifteenYearDate = methods.watch('vesting.fifteenYear.date')

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'10Y Vesting Period'}
          name={'10YVesting'} />
        <input 
          type="date"
          id="10YVesting"
          disabled={disabled}
          { ...methods.register("vesting.tenYear.date", {
            validate: value =>
              new Date(value as Date) > new Date(fifteenYearDate as Date) ? "10Y vesting date must be before 15Y vesting date" : true
          }) }
          className={styles.input} />
      </div>
      <FormError field={'vesting.tenYear.date'} />
    </div>
  )
}

export const FifteenYearVestingInput = () => { // Fifteen year vesting date input
  const { methods, disabled } = useCreateDevelopmentPlanFormContext()

  const tenYearDate = methods.watch('vesting.tenYear.date')

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'15Y Vesting Period'}
          name={'15YVesting'} />
        <input 
          type="date"
          id="15YVesting"
          disabled={disabled}
          { ...methods.register("vesting.fifteenYear.date", {
            validate: value =>
              new Date(value as Date) < new Date(tenYearDate as Date) ? "15Y vesting date must be after 10Y vesting date" : true
          }) }
          className={styles.input} />
          <FormError field={'vesting.fifteenYear.date'} />
      </div>
    </div>
  )
}

export const FirstMilestoneDateInput = () => { // First milestone date input
  const { methods, disabled } = useCreateDevelopmentPlanFormContext()

  const secondMilestoneDate = methods.watch('milestones.second.date')

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Milestone #1'}
          name={'firstMilestone'}
          required={true} />
        <input 
          type="date"
          id="firstMilestone"
          disabled={disabled}
          { ...methods.register("milestones.first.date", {
            required: "First milestone is required",
            validate: value =>
              !value || new Date(value as Date) > new Date(secondMilestoneDate as Date) ? "First milestone must be before second milestone" : true
          }) }
          className={styles.input} />
      </div>
      <FormError field={'milestones.first.date'} />
    </div>
  )
}

export const SecondMilestoneDateInput = () => { // Second milestone date input
  const { methods, disabled } = useCreateDevelopmentPlanFormContext()

  const firstMilestoneDate = methods.watch('milestones.first.date')

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Milestone #2'}
          name={'secondMilestone'}
          required={true} />
        <input 
          type="date"
          id="secondMilestone"
          disabled={disabled}
          { ...methods.register("milestones.second.date", {
            required: "Second milestone is required",
            onBlur: () => methods.trigger('milestones.second.date'),
            validate: value =>
              !value || new Date(value as Date) < new Date(firstMilestoneDate as Date) ? "Second milestone must be after first milestone" : true
          }) } 
          className={styles.input} />
      </div>
      <FormError field={'milestones.second.date'} />
    </div>
  )
}

export const NotesInput = () => { // Notes input
  const { methods, disabled } = useCreateDevelopmentPlanFormContext()

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