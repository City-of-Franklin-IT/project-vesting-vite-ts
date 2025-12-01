import { Controller } from 'react-hook-form'
import { useProjectCreateCtx, useExpireProject } from '@/helpers/hooks'
import { useHandleBOMADateChange, useHandleAddVestingExtensionBtn, useHandleNotificationInputs, useHandleAddVestingBtn, useHandleTenYearVestingDateInput, useHandleTenYearVestingExtensionInput, useHandleVestingAchievedCheckbox, useHandleFifteenYearVestingDateInput, useHandleFifteenYearVestingExtensionInput, useHandleVestingExpiredCheckbox, useHandleAddMilestoneExtensionBtn, useHandleMilestoneExtensionInput, useHandleMilestoneAchievedCheckbox, useHandleMilestoneExpiredCheckbox, useHandleAddNotificationBtn, useHandleNotificationInput } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormError from "../../../../form-components/FormError"
import FormLabel from '@/components/form-components/FormLabel'
import { OrdinanceOptions } from '@/helpers/components'
import * as AppTypes from '@/context/types'

export const ExpiredCheckbox = () => { // Project expired checkbox
  const { methods } = useProjectCreateCtx()

  const checked = methods.watch('expired')

  useExpireProject()

  return (
    <div className="flex gap-1 ml-auto">
      <label htmlFor="expired" className={styles.checkboxLabel}>Project Expired</label>
      <input 
        type="checkbox"
        checked={checked}
        className="checkbox checkbox-secondary"
        { ...methods.register('expired') } />
    </div>
  )
}

export const NameInput = () => { // Name input
  const { methods: { formState: { errors }, register }, disabled } = useProjectCreateCtx()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          name={'name'}
          required={true}>
            Project Name
        </FormLabel>
        <input 
          type="text"
          disabled={disabled} 
          className={styles.input}
          { ...register('name', {
            required: "Project name is required",
            maxLength: {
              value: 255,
              message: "Project name must be 255 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors.name?.message?.toString()} />
    </div>
  )
}

export const COFNumberInput = () => { // COF number input
  const { methods: { formState: { errors }, register }, disabled } = useProjectCreateCtx()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          name={'cof'}
          required={true}>
            COF #
        </FormLabel>
        <input
          type="number"
          disabled={disabled} 
          className={styles.input}
          { ...register('cof', {
            required: "COF # is required"
          }) } />
      </div>
      <FormError error={errors?.cof?.message?.toString()} />
    </div>
  )
}

export const OrdinanceInput = () => {
  const { methods: { formState: { errors }, register }, disabled } = useProjectCreateCtx()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          name={'ordinance'}
          required={true}>
            Zoning Ordinance
        </FormLabel>
        <select 
          disabled={disabled}
          className={styles.input}
          { ...register("ordinance", {
            required: "Zoning ordinance is required"
          }) }>
            <OrdinanceOptions />
        </select>
      </div>
      <FormError error={errors?.ordinance?.message?.toString()} />
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
  const { methods: { formState: { errors }, register }, disabled } = useProjectCreateCtx()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          name={'resolution'}
          required={true}>
            Resolution #
        </FormLabel>
        <input 
          type="text"
          disabled={disabled}
          className={styles.input}
          { ...register('Resolution.resolution', {
            required: "Resolution # is required",
            maxLength: {
              value: 10,
              message: "Resolution # must be 10 character or less"
            }
          }) } />
      </div>
      <FormError error={errors?.Resolution?.resolution?.message?.toString()} />
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
  const className = useHandleNotificationInputs()

  return (
    <div className={styles.groupedSection}>
      <div className={className}>
        <InitialNotificationInput />
        <LastCallNotificationInput />
        <LostVestingNotificationInput />
      </div>
      <NotificationBtns />
    </div>
  )
}

export const NotesInput = () => { // Notes input
  const { methods, disabled } = useProjectCreateCtx()

  return (
    <div className="flex">
      <FormLabel name={'notes'}>
          Notes
      </FormLabel>
      <textarea 
        rows={6}
        disabled={disabled}
        className={styles.input}
        { ...methods.register("notes") }>
      </textarea>
    </div>
  )
}

const FPMCApprovalDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const bomaDate = methods.watch(`Approvals.${ 1 }.date`)

  return (
    <Controller
      name={`Approvals.${ 0 }.date`}
      control={methods.control}
      rules={{
        required: "FPMC approval date is required",
        validate: value => 
          value && bomaDate && new Date(value) > new Date(bomaDate) ? "FPMC approval date must be before BOMA approval date" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { onBlur, ...props } = field

        return (
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel
                name={`Approvals.${ 0 }.date`}
                required={true}>
                  FPMC Approval
              </FormLabel>
              <input 
                type="date"
                disabled={disabled}
                className={styles.input}
                onBlur={() => methods.trigger(`Approvals.${ 0 }.date`)}
                { ...props } />
            </div>
            <FormError error={error?.message} />
          </div>
        )
      }} />
  )
}

const BOMAApprovalDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const fpmcDate = methods.watch(`Approvals.${ 0 }.date`)

  useHandleBOMADateChange()

  return (
    <Controller
      name={`Approvals.${ 1 }.date`}
      control={methods.control}
      rules={{
        required: "BOMA approval date is required",
        validate: value => 
          value && fpmcDate && new Date(value) < new Date(fpmcDate) ? "BOMA approval date must be after FPMC approval date" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2 w-full">
          <div className="flex">
            <FormLabel
              name={`Approvals.${ 1 }.date`}
              required={true}>
                BOMA Approval
            </FormLabel>
            <input 
              type="date"
              disabled={disabled}
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const TenYearVestingInputs = () => {

  return (
    <div className={styles.groupedSection}>
      <TenYearVestingDateInput />
      <TenYearVestingExtensionInput />
      <AddVestingBtn type={'10Y'} />

      <div className="flex py-6 justify-evenly">
        <TenYearVestingAchievedCheckbox />
        <TenYearVestingExpiredCheckbox />
      </div>
    </div>
  )
}

const AddVestingBtn = ({ type }: { type: '10Y' | '15Y' }) => {
  const { onClick, visible, label } = useHandleAddVestingBtn(type)

  if(!visible) return null

  return (
    <button 
      type="button"
      onClick={onClick}
      className="btn btn-lg btn-primary uppercase shadow-xl">
        {label}
    </button>
  )
}

const TenYearVestingDateInput = () => {
  const { controllerProps, disabled, fifteenYearVestingPeriod, visible } = useHandleTenYearVestingDateInput()

  if(!visible) return null

  return (
    <Controller
      name={`VestingPeriods.${ controllerProps.index }.date`}
      control={controllerProps.methods.control}
      rules={{
        validate: value =>
          value && fifteenYearVestingPeriod && new Date(value) > new Date(fifteenYearVestingPeriod.date) ? "10 year vesting period must be before 15 year" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              name={'10YVesting'}>
                10Y Vesting Period
            </FormLabel>
            <input 
              type="date"
              disabled={disabled}
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const TenYearVestingExtensionInput = () => {
  const { controllerProps, disabled, visible, showBtn } = useHandleTenYearVestingExtensionInput()

  if(!visible) return null

  if(showBtn) return (
    <AddVestingExtensionBtn type="10Y" />
  )

  return (
    <Controller
      name={`VestingPeriods.${ controllerProps.index }.VestingExtension.date`}
      control={controllerProps.methods.control}
      rules={{
        validate: value =>
          value && new Date(value) < new Date(controllerProps.vestingPeriodDate) ? "Extension must be after original date" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          <div className="flex">
            <label htmlFor="10YVestingExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
            <input 
              type="date"
              disabled={disabled}
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const AddVestingExtensionBtn = ({ type }: { type: "10Y" | "15Y" }) => {
  const { onClick, visible } = useHandleAddVestingExtensionBtn(type)

  if(!visible) return null

  return (
    <button 
      type="button"
      onClick={onClick}
      className="btn btn-lg btn-primary uppercase shadow-xl">
        Add Extension
    </button>
  )
}

const TenYearVestingAchievedCheckbox = () => {
  const { visible, controllerProps, disabled } = useHandleVestingAchievedCheckbox('10Y')

  if(!visible) return null

  return (
    <Controller
      name={`VestingPeriods.${ controllerProps.index }.VestingStatus.achieved`}
      control={controllerProps.control}
      rules={{
        validate: value =>
          value && controllerProps.expired ? "Vesting cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor={`VestingPeriods.${ controllerProps.index }.VestingStatus.achieved`} className={styles.checkboxLabel}>Achieved</label>
            <input
              type="checkbox"
              checked={!!value}
              disabled={disabled}
              className="checkbox checkbox-secondary"
              { ...props } />
            <FormError error={error?.message} />
          </div>
        )
      }} />
  )
}

const TenYearVestingExpiredCheckbox = () => { // Ten year vesting period expired checkbox
  const { visible, controllerProps, disabled } = useHandleVestingExpiredCheckbox('10Y')

  if(!visible) return null

  return (
    <Controller
      name={`VestingPeriods.${ controllerProps.index }.VestingStatus.expired`}
      control={controllerProps.control}
      rules={{
        validate: value =>
          value && controllerProps.achieved ? "Vesting cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="10YExpired" className={styles.checkboxLabel}>Expired</label>
            <input 
              type="checkbox"
              checked={!!value}
              disabled={disabled}
              className="checkbox checkbox-secondary"
              { ...props } />
            <FormError error={error?.message} />
          </div>
        )
      }} />
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
  const { visible, controllerProps, disabled } = useHandleFifteenYearVestingDateInput()

  if(!visible) return (
    <AddVestingBtn type={'15Y'} />
  )

  return (
    <Controller
      name={`VestingPeriods.${ controllerProps.index }.date`}
      control={controllerProps.control}
      rules={{
        validate: value =>
          value && controllerProps.tenYearVesting && new Date(value) < new Date(controllerProps.tenYearVesting.date) ? "15 year vesting period must be after 10 year vesting period" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel name={'15YVesting'}>
              15Y Vesting Period
            </FormLabel>
            <input 
              type="date"
              disabled={disabled}
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const FifteenYearVestingExtensionInput = () => {
  const { visible, controllerProps, showBtn, disabled } = useHandleFifteenYearVestingExtensionInput()

  if(!visible) return null

  if(showBtn) return (
    <AddVestingExtensionBtn type={'15Y'} />
  )

  return (
    <Controller
      name={`VestingPeriods.${ controllerProps.index }.VestingExtension.date`}
      control={controllerProps.control}
      rules={{
        validate: value => 
          value && new Date(value) < new Date(controllerProps.vestingPeriod.date) ? "Extension must be after original vesting date" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex">
            <label htmlFor="10YVestingExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
            <input 
              type="date"
              className={styles.input}
              disabled={disabled}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const FifteenYearVestingAchievedCheckbox = () => {
  const { visible, controllerProps, disabled } = useHandleVestingAchievedCheckbox('15Y')

  if(!visible) return null

  return (
    <Controller
      name={`VestingPeriods.${ controllerProps.index }.VestingStatus.achieved`}
      control={controllerProps.control}
      rules={{
        validate: value =>
          value && controllerProps.expired ? "Vesting cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="15YAchieved" className={styles.checkboxLabel}>Achieved</label>
            <input 
              type="checkbox"
              checked={!!value}
              disabled={disabled}
              className="checkbox checkbox-secondary"
              { ...props } />
            <FormError error={error?.message} />
          </div>
        )
      }} />
  )
}

const FifteenYearVestingExpiredCheckbox = () => { // Fifteen year vesting period expired checkbox
  const { visible, controllerProps, disabled } = useHandleVestingExpiredCheckbox('15Y')

  if(!visible) return null

  return (
    <Controller
      name={`VestingPeriods.${ controllerProps.index }.VestingStatus.expired`}
      control={controllerProps.control}
      rules={{
        validate: value =>
          value && controllerProps.achieved ? "Vesting cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="15YExpired" className={styles.checkboxLabel}>Expired</label>
            <input
              type="checkbox"
              checked={!!value}
              disabled={disabled}
              className="checkbox checkbox-secondary"
              { ...props } />
            <FormError error={error?.message} />
          </div>
        )
      }} />
  )
}

const AddMilestoneExtensionBtn = ({ index }: { index: number }) => {
  const { visible, onClick } = useHandleAddMilestoneExtensionBtn(index)

  if(!visible) return null

  return (
    <button 
      type="button"
      onClick={onClick}
      className="btn btn-lg btn-primary uppercase shadow-xl">
        Add Extension
    </button>
  )
}

const FirstMilestoneInputs = () => {

  return (
    <div className={styles.groupedSection}>
      <FirstMilestoneDateInput />
      <FirstMilestoneExtensionInput />
      <AddMilestoneExtensionBtn index={0} />

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
    <Controller
      name={`Milestones.${ 0 }.date`}
      control={methods.control}
      rules={{
        required: "First milestone is required",
        validate: value =>
          value && secondMilestoneDate && new Date(value) > new Date(secondMilestoneDate) ? "First milestone must be before second milestone" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              name={`Milestones.${ 0 }.date`}
              required={true}>
                Milestone #1
            </FormLabel>
            <input 
              type="date"
              disabled={disabled}
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const FirstMilestoneExtensionInput = () => {
  const { showBtn, controllerProps, disabled } = useHandleMilestoneExtensionInput(0)

  if(showBtn) return (
    <AddMilestoneExtensionBtn index={0} />
  )

  return (
    <Controller
      name={`Milestones.${ 0 }.MilestoneExtension.date`}
      control={controllerProps.control}
      rules={{
        validate: value =>
          value && controllerProps.milestone && new Date(value) < new Date(controllerProps.milestone.date) ? "Extension must be after original milestone date" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          <div className="flex">
            <label htmlFor={`Milestones.${ 0 }.MilestoneExtension.date`} className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
            <input 
              type="date"
              className={styles.input}
              disabled={disabled}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const FirstMilestoneAchievedCheckbox = () => { // First milestone achieved checkbox
  const { controllerProps, disabled } = useHandleMilestoneAchievedCheckbox(0)

  return (
    <Controller
      name={`Milestones.${ 0 }.MilestoneStatus.achieved`}
      control={controllerProps.control}
      rules={{
        validate: value =>
          value && controllerProps.expired ? "Milestone cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
        <div className="flex flex-col items-center gap-2">
          <label htmlFor={`Milestones.${ 0 }.MilestoneStatus.achieved`} className={styles.checkboxLabel}>Achieved</label>
          <input 
            type="checkbox"
            checked={!!value}
            disabled={disabled}
            className="checkbox checkbox-secondary"
            { ...props } />
          <FormError error={error?.message} />
        </div>
        )
      }} />
  )
}

const FirstMilestoneExpiredCheckbox = () => { // First milestone expired checkbox
  const { controllerProps, disabled } = useHandleMilestoneExpiredCheckbox(0)

  return (
    <Controller
      name={`Milestones.${ 0 }.MilestoneStatus.expired`}
      control={controllerProps.control}
      rules={{
        validate: value =>
          value && controllerProps.achieved ? "Milestone cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor={`Milestones.${ 0 }.MilestoneStatus.expired`} className={styles.checkboxLabel}>Expired</label>
            <input 
              type="checkbox"
              checked={!!value}
              disabled={disabled}
              className="checkbox checkbox-secondary"
              { ...props } />
            <FormError error={error?.message} />
          </div>
        )
      }} />
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
    <Controller
      name={`Milestones.${ 1 }.date`}
      control={methods.control}
      rules={{
        required: "Second milestone is required",
        validate: value =>
          value && firstMilestoneDate && new Date(value) < new Date(firstMilestoneDate) ? "Second milestone must be after first milestone" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              name={'secondMilestone'}
              required={true}>
                Milestone #2
            </FormLabel>
            <input 
              type="date"
              disabled={disabled}
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const SecondMilestoneExtensionInput = () => {
  const { controllerProps, showBtn, disabled } = useHandleMilestoneExtensionInput(1)

  if(showBtn) return (
    <AddMilestoneExtensionBtn index={1} />
  )

  return (
    <Controller
      name={`Milestones.${ 1 }.MilestoneExtension.date`}
      control={controllerProps.control}
      rules={{
        validate: value =>
          value && controllerProps.milestone && new Date(value) < new Date(controllerProps.milestone.date) ? "Extension must be after original milestone date" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          <div className="flex">
            <label htmlFor={`Milestones.${ 1 }.MilestoneExtension.date`} className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
            <input 
              type="date"
              disabled={disabled}
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const SecondMilestoneAchievedCheckbox = () => { // Second milestone achieved checkbox
  const { controllerProps, disabled } = useHandleMilestoneAchievedCheckbox(1)

  return (
    <Controller
      name={`Milestones.${ 1 }.MilestoneStatus.achieved`}
      control={controllerProps.control}
      rules={{
        validate: value =>
          value && controllerProps.expired ? "Milestone cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor={`Milestones.${ 1 }.MilestoneStatus.achieved`} className={styles.checkboxLabel}>Achieved</label>
            <input 
              type="checkbox"
              checked={!!value}
              disabled={disabled}
              className="checkbox checkbox-secondary"
              { ...props } />
            <FormError error={error?.message} />
          </div>
        )
      }} />
    
  )
}

const SecondMilestoneExpiredCheckbox = () => { // Second milestone expired checkbox
  const { controllerProps, disabled } = useHandleMilestoneExpiredCheckbox(1)

  return (
    <Controller
      name={`Milestones.${ 1 }.MilestoneStatus.expired`}
      control={controllerProps.control}
      rules={{
        validate: value =>
          value && controllerProps.achieved ? "Milestone cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor={`Milestones.${ 1 }.MilestoneStatus.expired`} className={styles.checkboxLabel}>Expired</label>
            <input 
              type="checkbox"
              checked={!!value}
              disabled={disabled}
              className="checkbox checkbox-secondary"
              { ...props } />
            <FormError error={error?.message} />
          </div>
        )
      }} />
  )
}

const NotificationBtns = () => {

  return (
    <div className="flex flex-col gap-4 w-full">
      <AddNotificationBtn type={'Initial'} />
      <AddNotificationBtn type={'Last Call'} />
      <AddNotificationBtn type={'Lost Vesting'} />
    </div>
  )
}

const AddNotificationBtn = ({ type }: { type: AppTypes.NotificationTypes }) => {
  const { onClick, visible } = useHandleAddNotificationBtn(type)

  if(!visible) return null

  return (
    <button 
      type="button"
      onClick={onClick}
      className="btn btn-lg btn-primary uppercase shadow-xl">
        Add {type} Notification
    </button>
  )
}

const InitialNotificationInput = () => { // Initial notification input
  const { controllerProps, visible, disabled } = useHandleNotificationInput('Initial')

  if(!visible) return null

  return (
    <Controller
      name={`VestingNotifications.${ controllerProps.index }.date`}
      control={controllerProps.control}
      render={({ field }) => (
        <div className="flex">
          <label htmlFor={`VestingNotifications.${ controllerProps.index }.date`} className={`${ styles.label } flex-1`}>Initial</label>
          <input 
            type="date"
            disabled={disabled}
            className={styles.input}
            { ...field } />
        </div>
      )} />
  )
}

const LastCallNotificationInput = () => { // Last call notification input
  const { controllerProps, visible, disabled } = useHandleNotificationInput('Last Call')

  if(!visible) return null

  return (
    <Controller
      name={`VestingNotifications.${ controllerProps.index }.date`}
      control={controllerProps.control}
      render={({ field }) => (
        <div className="flex">
          <label htmlFor={`VestingNotifications.${ controllerProps.index }.date`} className={`${ styles.label } flex-1`}>Last Call</label>
          <input 
            type="date"
            disabled={disabled}
            className={styles.input}
            { ...field } />
        </div>
      )} />
  )
}

const LostVestingNotificationInput = () => { // Lost vesting notification input
  const { controllerProps, visible, disabled } = useHandleNotificationInput('Lost Vesting')

  if(!visible) return null

  return (
    <Controller
      name={`VestingNotifications.${ controllerProps.index }.date`}
      control={controllerProps.control}
      render={({ field }) => (
        <div className="flex">
          <label htmlFor={`VestingNotifications.${ controllerProps.index }.date`} className={`${ styles.label } flex-1`}>Lost Vesting</label>
          <input 
            type="date"
            disabled={disabled}
            className={styles.input}
            { ...field } />
        </div>
      )} />
  )
}