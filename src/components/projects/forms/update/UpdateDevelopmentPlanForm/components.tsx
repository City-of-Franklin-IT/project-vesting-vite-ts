import React from 'react'
import { useNavigate } from 'react-router'
import { useFieldArray } from 'react-hook-form'
import { useProjectCreateCtx, useExpireProject, useMilestoneExt } from '@/helpers/hooks'
import { useHandleBOMADateChange } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormError from "../../../../form-components/FormError/FormError"
import FormLabel from '@/components/form-components/FormLabel/FormLabel'
import { OrdinanceOptions } from '@/helpers/components'
import CancelBtn from '@/components/form-components/buttons/CancelBtn/CancelBtn'
import SaveBtn from '@/components/form-components/buttons/SaveBtn/SaveBtn'

export const ExpiredCheckbox = () => { // Project expired checkbox
  const { methods } = useProjectCreateCtx()

  const checked = methods.watch('expired')

  const expireProject = useExpireProject()

  return (
    <div className="flex gap-1 ml-auto">
      <label htmlFor="expired" className={styles.checkboxLabel}>Project Expired</label>
      <input 
        type="checkbox"
        id="expired"
        checked={checked}
        className="checkbox checkbox-secondary"
        { ...methods.register('expired', {
          onChange: () => expireProject
        }) } />
    </div>
  )
}

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

export const OrdinanceInput = () => {
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

export const ApprovalInputs = () => {

  return (
    <div className="flex gap-3">
      <FPMCApprovalDateInput />
      <BOMAApprovalDateInput />
    </div>
  )
}

export const ResolutionInput = () => { // Resolution input
  const { methods, disabled } = useProjectCreateCtx()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Resolution #'}
          name={'resolution'}
          required={true} />
        <input 
          type="text"
          disabled={disabled}
          { ...methods.register('Resolution.resolution', {
            required: "Resolution # is required",
            maxLength: {
              value: 10,
              message: "Resolution # must be 10 character or less"
            }
          }) }
          className={styles.input} />
      </div>
      <FormError field={'Resolution.resolution'} />
    </div>
  )
}

export const VestingInputs = () => {

  return (
    <div className={styles.groupedSection}>
      <TenYearVestingInputs />
      <FifteenYearVestingInputs />
    </div>
  )
}

export const MilestoneInputs = () => {

  return (
    <div className={styles.groupedSection}>
      <FirstMilestoneInputs />
      <SecondMilestoneInputs />
    </div>
  )
}

export const NotificationInputs = () => {

  return (
    <div className={`${ styles.groupedSection } flex-row mb-8 justify-evenly flex-wrap`}>
      <InitialNotificationInput />
      <LastCallNotificationInput />
      <LostVestingNotificationInput />
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

const FPMCApprovalDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const bomaDate = methods.watch(`Approvals.${ 1 }.date`)

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
            onBlur: () => methods.trigger(`Approvals.${ 0 }.date`),
            validate: value => 
              !value || new Date(value) > new Date(bomaDate) ? "FPMC approval date must be before BOMA approval date" : true
          })}
          className={styles.input} />
      </div>
      <FormError field={`Approvals.${ 0 }.date`} />
    </div>
  )
}

const BOMAApprovalDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const fpmcDate = methods.watch(`Approvals.${ 0 }.date`)

  const handleBOMADateChange = useHandleBOMADateChange()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'BOMA Approval'}
          name={'bomaApproval'}
          required={true} />
        <input 
          type="date"
          disabled={disabled}
          { ...methods.register(`Approvals.${ 1 }.date`, {
            required: "BOMA approval date is required",
            onChange: () => handleBOMADateChange,
            onBlur: () => methods.trigger(`Approvals.${ 1 }.date`),
            validate: value => 
              !value || new Date(value) > new Date(fpmcDate) ? "BOMA approval date must be after FPMC approval date" : true
          })}
          className={styles.input} />
      </div>
      <FormError field={`Approvals.${ 1 }.date`} />
    </div>
  )
}

const AddVestingPeriodsBtns = () => {
  const { methods: { getValues, control } } = useProjectCreateCtx()

  const { append } = useFieldArray({
    control,
    name: 'VestingPeriods'
  })

  const add10YPeriod = () => {
    append({
      type: "10Y",
      date: "",
      parentId: "",
    })
  }

  const add15YPeriod = () => {
    append({
      type: "15Y",
      date: "", 
      parentId: ""
    })
  }

  const vestingPeriods = getValues('VestingPeriods')

  return (
    <div className="flex gap-10">
      <AddVestingPeriodBtn
        onClick={add10YPeriod}
        disabled={vestingPeriods.some(period => period.type === "10Y")}>
          Add 10Y Vesting Period
      </AddVestingPeriodBtn>
      <AddVestingPeriodBtn
        onClick={add15YPeriod}
        disabled={vestingPeriods.some(period => period.type === "15Y")}>
          Add 15Y Vesting Period
      </AddVestingPeriodBtn>
    </div>
  )
}

type AddVestingPeriodBtnProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'> & { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean, children: React.ReactNode }

const AddVestingPeriodBtn = (props: AddVestingPeriodBtnProps) => {
  if(props.disabled) return null

  return (
    <button 
      type="button"
      onClick={props.onClick}
      className="btn btn-lg btn-primary uppercase">
      {props.children}
    </button>
  )
}

const TenYearVestingInputs = () => {

  return (
    <div className={styles.groupedSection}>
      <TenYearVestingDateInput />
      <TenYearVestingExtensionInput />

      <div className="flex py-6 justify-evenly">
        <TenYearVestingAchievedCheckbox />
        <TenYearVestingExpiredCheckbox />
      </div>
    </div>
  )
}

const TenYearVestingDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const index = methods.getValues('VestingPeriods')?.findIndex(period => period.type === "10Y") // Check if 10Y is in form state

  if(index === -1) return null

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
          { ...methods.register(`VestingPeriods.${ index }.date`) }
          className={styles.input} />
      </div>
      <div className="flex gap-2">
        <FormError field={`VestingPeriods.${ index }.date`} />
      </div>
    </div>
  )
}

const TenYearVestingExtensionInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const vestingPeriods = methods.getValues('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "10Y" && period.VestingExtension) // Check if 10Y vesting extension is in form state

  if(index === -1) return <AddVestingExtensionBtn type="10Y" />

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="10YVestingExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
        <input 
          type="date"
          id="10YVestingExt"
          disabled={disabled}
          {...methods.register(`VestingPeriods.${ index }.VestingExtension.date`, {
            validate: value =>
            new Date(value) < new Date(vestingPeriods[index].date) ? "Extension must be after original vesting date" : true
          })}
          className={styles.input} />
      </div>
      <FormError field={`VestingPeriods.${ index }.VestingExtension.date`} />
    </div>
  )
}

const AddVestingExtensionBtn = ({ type }: { type: "10Y" | "15Y" }) => {
  const { methods: { getValues, setValue } } = useProjectCreateCtx()

  const vestingPeriods = getValues('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === type)

  const handleBtnClick = () => {
    const period = vestingPeriods[index]

    setValue(`VestingPeriods.${ index }.VestingExtension.date`, "", { shouldValidate: true, shouldDirty: true })
    setValue(`VestingPeriods.${ index }.VestingExtension.parentId`, period.uuid as string, { shouldValidate: true, shouldDirty: true })
  }

  return (
    <button 
      type="button"
      onClick={handleBtnClick}
      className="btn btn-lg btn-primary uppercase">
        Add Extension
    </button>
  )
}

const TenYearVestingAchievedCheckbox = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const vestingPeriods = methods.getValues('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "10Y")

  if(index === -1) return null

  const checked = methods.getValues(`VestingPeriods.${ index }.VestingStatus.achieved`)

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="10YAchieved" className={styles.checkboxLabel}>Achieved</label>
      <input 
        type="checkbox"
        id="10YAchieved"
        checked={checked}
        disabled={disabled}
        {...methods.register(`VestingPeriods.${ index }.VestingStatus.achieved`, {
          validate: value =>
            value && methods.watch(`VestingPeriods.${ index }.VestingStatus.expired`) ? "Vesting cannot be both achieved and expired" : true
        })}
        className="checkbox checkbox-secondary" />
      <FormError field={`VestingPeriods.${ index }.VestingStatus.achieved`} />
    </div>
  )
}

const TenYearVestingExpiredCheckbox = () => { // Ten year vesting period expired checkbox
  const { methods, disabled } = useProjectCreateCtx()

  const vestingPeriods = methods.getValues('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "10Y")

  if(index === -1) return null

  const checked = methods.getValues(`VestingPeriods.${ index }.VestingStatus.expired`)

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="10YExpired" className={styles.checkboxLabel}>Expired</label>
      <input 
        type="checkbox"
        id="10YExpired"
        checked={checked}
        disabled={disabled}
        {...methods.register(`VestingPeriods.${ index }.VestingStatus.expired`, {
          validate: value =>
            value && methods.watch(`VestingPeriods.${ index }.VestingStatus.achieved`) ? "Vesting cannot be both achieved and expired" : true
        })}
        className="checkbox checkbox-secondary" />
    </div>
  )
}

const FifteenYearVestingInputs = () => {

  return (
    <div className={styles.groupedSection}>
      <FifteenYearVestingDateInput />
      <FifteenYearVestingExtensionInput />

      <div className="flex py-6 justify-evenly">
        <FifteenYearVestingAchievedCheckbox />
        <FifteenYearVestingExpiredCheckbox />
      </div>
    </div>
  )
}

const FifteenYearVestingDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const index = methods.getValues('VestingPeriods')?.findIndex(period => period.type === "15Y") // Check if 15Y is in form state

  if(index === -1) return null

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'15Y Vesting Period'}
          name={'15YVesting'} />
        <input 
          type="date"
          disabled={disabled}
          { ...methods.register(`VestingPeriods.${ index }.date`) }
          className={styles.input} />
      </div>
      <div className="flex gap-2">
        <FormError field={`VestingPeriods.${ index }.date`} />
      </div>
    </div>
  )
}

const FifteenYearVestingExtensionInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const vestingPeriods = methods.getValues('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "15Y") // Check if 15Y vesting extension is in form state

  if(index === -1) return <AddVestingExtensionBtn type="15Y" />

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="10YVestingExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
        <input 
          type="date"
          id="10YVestingExt"
          disabled={disabled}
          {...methods.register(`VestingPeriods.${ index }.VestingExtension.date`, {
            validate: value =>
            new Date(value) < new Date(vestingPeriods[index].date) ? "Extension must be after original vesting date" : true
          })}
          className={styles.input} />
      </div>
      <FormError field={`VestingPeriods.${ index }.VestingExtension.date`} />
    </div>
  )
}

const FifteenYearVestingAchievedCheckbox = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const vestingPeriods = methods.getValues('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "15Y")

  if(index === -1) return null

  const checked = methods.getValues(`VestingPeriods.${ index }.VestingStatus.achieved`)

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="10YAchieved" className={styles.checkboxLabel}>Achieved</label>
      <input 
        type="checkbox"
        id="10YAchieved"
        checked={checked}
        disabled={disabled}
        {...methods.register(`VestingPeriods.${ index }.VestingStatus.achieved`, {
          validate: value =>
            value && methods.watch(`VestingPeriods.${ index }.VestingStatus.expired`) ? "Vesting cannot be both achieved and expired" : true
        })}
        className="checkbox checkbox-secondary" />
      <FormError field={`VestingPeriods.${ index }.VestingStatus.achieved`} />
    </div>
  )
}

const FifteenYearVestingExpiredCheckbox = () => { // Fifteen year vesting period expired checkbox
  const { methods, disabled } = useProjectCreateCtx()

  const vestingPeriods = methods.getValues('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "15Y")

  if(index === -1) return null

  const checked = methods.getValues(`VestingPeriods.${ index }.VestingStatus.expired`)

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="10YExpired" className={styles.checkboxLabel}>Expired</label>
      <input 
        type="checkbox"
        id="10YExpired"
        checked={checked}
        disabled={disabled}
        {...methods.register(`VestingPeriods.${ index }.VestingStatus.expired`, {
          validate: value =>
            value && methods.watch(`VestingPeriods.${ index }.VestingStatus.achieved`) ? "Vesting cannot be both achieved and expired" : true
        })}
        className="checkbox checkbox-secondary" />
    </div>
  )
}

const FirstMilestoneInputs = () => {

  return (
    <div className={styles.groupedSection}>
      <FirstMilestoneDateInput />
      <FirstMilestoneExtensionInput />

      <div className="flex py-6 justify-evenly">
        <FirstMilestoneAchievedCheckbox />
        <FirstMilestoneExpiredCheckbox />
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

const FirstMilestoneExtensionInput = () => { // 
  const { methods, disabled } = useProjectCreateCtx()

  const milestoneExt = useMilestoneExt()

  const firstMilestone = methods.watch(`Milestones.${ 0 }`)

  if(!firstMilestone.MilestoneExtension) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="firstMilestoneExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
        <input 
          type="date"
          id="firstMilestoneExt"
          disabled={disabled}
          {...methods.register(`Milestones.${ 0 }.MilestoneExtension.date`, {
            onChange: () => milestoneExt,
            validate: value =>
            !firstMilestone || new Date(value) < new Date(firstMilestone.date) ? "Extension must be after original milestone date" : true
          })}
          className={styles.input} />
      </div>
      <FormError field={`Milestones.${ 0 }.MilestoneExtension.date`} />
    </div>
  )
}

const FirstMilestoneAchievedCheckbox = () => { // First milestone achieved checkbox
  const { methods, disabled } = useProjectCreateCtx()

  const checked = methods.watch(`Milestones.${ 0 }.MilestoneStatus.achieved`)

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="firstMilestoneAchieved" className={styles.checkboxLabel}>Achieved</label>
      <input 
        type="checkbox"
        id="firstMilestoneAchieved"
        checked={checked}
        disabled={disabled}
        className="checkbox checkbox-secondary"
        {...methods.register(`Milestones.${ 0 }.MilestoneStatus.achieved`, {
          validate: value =>
            value && methods.watch(`Milestones.${ 0 }.MilestoneStatus.expired`) ? "Milestone cannot be both achieved and expired" : true
        })} />
      <FormError field={`Milestones.${ 0 }.MilestoneStatus.achieved`} />
    </div>
  )
}

const FirstMilestoneExpiredCheckbox = () => { // First milestone expired checkbox
  const { methods, disabled } = useProjectCreateCtx()

  const checked = methods.watch(`Milestones.${ 0 }.MilestoneStatus.expired`)

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="firstMilestoneExpired" className={styles.checkboxLabel}>Expired</label>
      <input 
        type="checkbox"
        id="firstMilestoneExpired"
        checked={checked}
        disabled={disabled}
        className="checkbox checkbox-secondary"
        {...methods.register(`Milestones.${ 0 }.MilestoneStatus.expired`,{
          validate: value =>
            value && methods.watch(`Milestones.${ 0 }.MilestoneStatus.achieved`) ? "Milestone cannot be both achieved and expired" : true
        })} />
    </div>
  )
}

const SecondMilestoneInputs = () => {

  return (
    <div className={styles.groupedSection}>
      <SecondMilestoneDateInput />
      <SecondMilestoneExtensionInput />

      <div className="flex py-6 justify-evenly">
        <SecondMilestoneAchievedCheckbox />
        <SecondMilestoneExpiredCheckbox />
      </div>
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
            validate: value =>
              !value || new Date(value) < new Date(firstMilestoneDate) ? "Second milestone must be after first milestone" : true
          }) }
          className={styles.input} />
      </div>
      <FormError field={`Milestones.${ 1 }.date`} />
    </div>
  )
}

const SecondMilestoneExtensionInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const secondMilestone = methods.watch(`Milestones.${ 1 }`)

  if(!secondMilestone.MilestoneExtension) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="secondMilestoneExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
        <input 
          type="date"
          id="secondMilestoneExt"
          disabled={disabled}
          {...methods.register(`Milestones.${ 1 }.MilestoneExtension.date`, {
            validate: value =>
            !secondMilestone || new Date(value) < new Date(secondMilestone.date) ? "Extension must be after original milestone date" : true
          })}
          className={styles.input} />
      </div>
      <FormError field={`Milestones.${ 1 }.MilestoneExtension.date`} />
    </div>
  )
}

const SecondMilestoneAchievedCheckbox = () => { // Second milestone achieved checkbox
  const { methods, disabled } = useProjectCreateCtx()

  const checked = methods.watch(`Milestones.${ 1 }.MilestoneStatus.achieved`)

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="secondMilestoneAchieved" className={styles.checkboxLabel}>Achieved</label>
      <input 
        type="checkbox"
        id="secondMilestoneAchieved"
        checked={checked}
        disabled={disabled}
        className="checkbox checkbox-secondary"
        {...methods.register(`Milestones.${ 1 }.MilestoneStatus.achieved`, {
          validate: value =>
            value && methods.watch(`Milestones.${ 1 }.MilestoneStatus.expired`) ? "Milestone cannot be both achieved and expired" : true
        })} />
      <FormError field={`Milestones.${ 1 }.MilestoneStatus.achieved`} />
    </div>
  )
}

const SecondMilestoneExpiredCheckbox = () => { // Second milestone expired checkbox
  const { methods, disabled } = useProjectCreateCtx()

  const checked = methods.watch(`Milestones.${ 1 }.MilestoneStatus.expired`)

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="secondMilestoneExpired" className={styles.checkboxLabel}>Expired</label>
      <input 
        type="checkbox"
        id="secondMilestoneExpired"
        checked={checked}
        disabled={disabled}
        className="checkbox checkbox-secondary"
        {...methods.register(`Milestones.${ 1 }.MilestoneStatus.expired`,{
          validate: value =>
            value && methods.watch(`Milestones.${ 1 }.MilestoneStatus.achieved`) ? "Milestone cannot be both achieved and expired" : true
        })} />
    </div>
  )
}

const InitialNotificationInput = () => { // Initial notification input
  const { methods, disabled } = useProjectCreateCtx()

  const notifications = methods.getValues('VestingNotifications') || []

  const index = notifications.findIndex(notification => notification.type === 'Initial')

  if(index === -1) return null

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="initialNotification" className={`${ styles.label } flex-1`}>Initial</label>
        <input 
          type="date"
          id="initialNotification"
          disabled={disabled}
          {...methods.register(`VestingNotifications.${ index }.date`)}
          className={styles.input} />
      </div>
    </div>
  )
}

const LastCallNotificationInput = () => { // Last call notification input
  const { methods, disabled } = useProjectCreateCtx()

  const notifications = methods.getValues('VestingNotifications') || []

  const index = notifications.findIndex(notification => notification.type === 'Last Call')

  if(index === -1) return null

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="lastCallNotification" className={`${ styles.label } flex-1`}>Last Call</label>
        <input 
          type="date"
          id="lastCallNotification"
          disabled={disabled}
          {...methods.register(`VestingNotifications.${ index }.date`)}
          className={styles.input} />
      </div>
    </div>
  )
}

const LostVestingNotificationInput = () => { // Lost vesting notification input
  const { methods, disabled } = useProjectCreateCtx()

  const notifications = methods.getValues('VestingNotifications') || []

  const index = notifications.findIndex(notification => notification.type === 'Lost Vesting')

  if(index === -1) return null

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="lostVestingNotification" className={`${ styles.label } flex-1`}>Lost Vesting</label>
        <input 
          type="date"
          id="lostVestingNotification"
          disabled={disabled}
          {...methods.register(`VestingNotifications.${ index }.date`)}
          className={styles.input} />
      </div>
    </div>
  )
}