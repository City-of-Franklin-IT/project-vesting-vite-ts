import { useNavigate } from 'react-router'
import { useFieldArray, Controller } from 'react-hook-form'
import { useProjectCreateCtx, useExpireProject, useMilestoneExt } from '@/helpers/hooks'
import { useHandleBOMADateChange, useHandleVestingExtensionBtn, useShowNotificationInputs } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormError from "../../../../form-components/FormError/FormError"
import FormLabel from '@/components/form-components/FormLabel/FormLabel'
import { OrdinanceOptions } from '@/helpers/components'
import CancelBtn from '@/components/form-components/buttons/CancelBtn'
import SaveBtn from '@/components/form-components/buttons/SaveBtn'
import { NotificationTypes } from '@/context/types'

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
          label={'Project Name'}
          name={'name'}
          required={true} />
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
          label={'COF #'}
          name={'cof'}
          required={true} />
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
          label={'Zoning Ordinance'}
          name={'ordinance'}
          required={true} />
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
          label={'Resolution #'}
          name={'resolution'}
          required={true} />
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
  const showInputs = useShowNotificationInputs()

  return (
    <div className={styles.groupedSection}>
      <div className={`flex mb-8 justify-evenly flex-wrap ${ !showInputs ? 'hidden' : null }`}>
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
      <FormLabel
        label={'Notes'}
        name={'notes'} />
      <textarea 
        rows={6}
        disabled={disabled}
        className={styles.input}
        { ...methods.register("notes") }>
      </textarea>
    </div>
  )
}

export const Buttons = () => { // Form buttons
  const navigate = useNavigate()

  return (
    <div className={styles.buttonsContainer}>
      <CancelBtn handleClick={() => navigate('/projects')} />
      <SaveBtn />
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
          !value || new Date(value) > new Date(bomaDate) ? "FPMC approval date must be before BOMA approval date" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { onBlur, ...props } = field

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
          !value || new Date(value) < new Date(fpmcDate) ? "BOMA approval date must be after FPMC approval date" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2 w-full">
          <div className="flex">
            <FormLabel
              label={'BOMA Approval'}
              name={'bomaApproval'}
              required={true} />
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
      <AddTenYearVestingBtn />

      <div className="flex py-6 justify-evenly">
        <TenYearVestingAchievedCheckbox />
        <TenYearVestingExpiredCheckbox />
      </div>
    </div>
  )
}

const AddTenYearVestingBtn = () => {
  const { methods: { getValues, watch, control } } = useProjectCreateCtx()

  const vestingPeriods = watch(`VestingPeriods`)

  const tenYearVesting = vestingPeriods.findIndex(period => period.type === "10Y")

  const { append } = useFieldArray({
    control,
    name: 'VestingPeriods'
  })

  const add10YPeriod = () => {
    append({
      type: "10Y",
      date: "",
      parentId: getValues('uuid') as string
    })
  }

  if(tenYearVesting !== -1) return null

  return (
    <button 
      type="button"
      onClick={add10YPeriod}
      className="btn btn-lg btn-primary uppercase">
        Add 10 Year Vesting Period
    </button>
  )
}

const TenYearVestingDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const vestingPeriods = methods.watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "10Y") // Check if 10Y is in form state

  if(index === -1) return null

  return (
    <Controller
      name={`VestingPeriods.${ index }.date`}
      control={methods.control}
      rules={{
        required: "Vesting date is required",
        validate: value =>
          new Date(value) > new Date(vestingPeriods.find(period => period.type === "15Y")?.date as string) ? "10 year vesting period must be before 15 year" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              label={'10Y Vesting Period'}
              name={'10YVesting'}
              required={true} />
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
  const { methods, disabled } = useProjectCreateCtx()

  const vestingPeriods = methods.watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "10Y")

  if(index === -1) return null

  if(!vestingPeriods[index].VestingExtension) return <AddVestingExtensionBtn type="10Y" />

  return (
    <Controller
      name={`VestingPeriods.${ index }.VestingExtension.date`}
      control={methods.control}
      rules={{
        validate: value =>
          new Date(value) < new Date(vestingPeriods[index].date) ? "Extension must be after original date" : true
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
  const handleVestingExtensionBtn = useHandleVestingExtensionBtn(type)

  if(!handleVestingExtensionBtn) return null

  return (
    <button 
      type="button"
      onClick={handleVestingExtensionBtn}
      className="btn btn-lg btn-primary uppercase">
        Add Extension
    </button>
  )
}

const TenYearVestingAchievedCheckbox = () => {
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "10Y")

  if(index === -1 || !vestingPeriods[index].uuid) return null

  return (
    <Controller
      name={`VestingPeriods.${ index }.VestingStatus.expired`}
      control={control}
      rules={{
        validate: value =>
          value && watch(`VestingPeriods.${ index }.VestingStatus.achieved`) ? "Vesting cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="10YAchieved" className={styles.checkboxLabel}>Achieved</label>
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
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "10Y")

  if(index === -1 || !vestingPeriods[index].uuid) return null

  return (
    <Controller
      name={`VestingPeriods.${ index }.VestingStatus.expired`}
      control={control}
      rules={{
        validate: value =>
          value && watch(`VestingPeriods.${ index }.VestingStatus.achieved`) ? "Vesting cannot be both achieved and expired" : true
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

const AddFifteenYearVestingBtn = () => {
  const { methods: { getValues, control, watch } } = useProjectCreateCtx()

  const vestingPeriods = watch(`VestingPeriods`)

  const tenYearVesting = vestingPeriods.findIndex(period => period.type === "15Y")

  const { append } = useFieldArray({
    control,
    name: 'VestingPeriods'
  })

  const add15YPeriod = () => {
    append({
      type: "15Y",
      date: "",
      parentId: getValues('uuid') as string,
    })
  }

  if(tenYearVesting !== -1) return null

  return (
    <button 
      type="button"
      onClick={add15YPeriod}
      className="btn btn-lg btn-primary uppercase">
        Add 15 Year Vesting Period
    </button>
  )
}

const FifteenYearVestingDateInput = () => {
  const { methods: { control, watch }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "15Y") // Check if 15Y is in form state

  if(index === -1) return <AddFifteenYearVestingBtn />

  return (
    <Controller
      name={`VestingPeriods.${ index }.date`}
      control={control}
      rules={{
        required: "Vesting date is required",
        validate: value =>
          !value || new Date(value) < new Date(vestingPeriods.find(period => period.type === "10Y")?.date as string) ? "15 year vesting period must be after 10 year vesting period" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              label={'15Y Vesting Period'}
              name={'15YVesting'} />
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
  const { methods: { control, watch }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "15Y")

  if(index === -1) return null

  if(!vestingPeriods[index].VestingExtension) return <AddVestingExtensionBtn type="15Y" /> // Add vesting extension button

  return (
    <Controller
      name={`VestingPeriods.${ index }.VestingExtension.date`}
      control={control}
      rules={{
        validate: value => 
          new Date(value) < new Date(vestingPeriods[index].date) ? "Extension must be after original vesting date" : true
        
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
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "15Y")

  if(index === -1 || !vestingPeriods[index]?.uuid) return null

  return (
    <Controller
      name={`VestingPeriods.${ index }.VestingStatus.achieved`}
      control={control}
      rules={{
        validate: value =>
          value && watch(`VestingPeriods.${ index }.VestingStatus.expired`) ? "Vesting cannot be both achieved and expired" : true
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
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "15Y")

  if(index === -1 || !vestingPeriods[index]?.uuid) return null

  return (
    <Controller
      name={`VestingPeriods.${ index }.VestingStatus.expired`}
      control={control}
      rules={{
        validate: value =>
          value && watch(`VestingPeriods.${ index }.VestingStatus.achieved`) ? "Vesting cannot be both achieved and expired" : true
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

const AddMilestoneExtensionBtn = ({ number }: { number: 1 | 2 }) => {
  const { methods: { setValue, watch } } = useProjectCreateCtx()

  const milestones = watch('Milestones')

  const index = milestones.findIndex(milestone => milestone.number === number)

  const handleBtnClick = () => {
    const milestone = milestones[index]

    setValue(`Milestones.${ index }.MilestoneExtension.date`, "", { shouldValidate: true, shouldDirty: true })
    setValue(`Milestones.${ index }.MilestoneExtension.parentId`, milestone.uuid as string, { shouldValidate: true, shouldDirty: true })
  }

  const milestoneStatus = milestones[index].MilestoneStatus

  if(milestoneStatus.achieved !== null || milestoneStatus.expired !== null) return null

  return (
    <button 
      type="button"
      onClick={handleBtnClick}
      className="btn btn-lg btn-primary uppercase">
        Add Extension
    </button>
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
    <Controller
      name={`Milestones.${ 0 }.date`}
      control={methods.control}
      rules={{
        required: "First milestone is required",
        validate: value =>
          !value || new Date(value) > new Date(secondMilestoneDate) ? "First milestone must be before second milestone" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              label={'Milestone #1'}
              name={'firstMilestone'}
              required={true} />
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

const FirstMilestoneExtensionInput = () => { // 
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  useMilestoneExt()

  const firstMilestone = watch(`Milestones.${ 0 }`)

  if(!firstMilestone.MilestoneExtension) return <AddMilestoneExtensionBtn number={1} />

  return (
    <Controller
      name={`Milestones.${ 0 }.MilestoneExtension.date`}
      control={control}
      rules={{
        required: "Extension date is required",
        validate: value =>
          !firstMilestone || new Date(value) < new Date(firstMilestone.date) ? "Extension must be after original milestone date" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          <div className="flex">
            <label htmlFor="firstMilestoneExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
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
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  return (
    <Controller
      name={`Milestones.${ 0 }.MilestoneStatus.achieved`}
      control={control}
      rules={{
        validate: value =>
          value && watch(`Milestones.${ 0 }.MilestoneStatus.expired`) ? "Milestone cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="firstMilestoneAchieved" className={styles.checkboxLabel}>Achieved</label>
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
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  return (
    <Controller
      name={`Milestones.${ 0 }.MilestoneStatus.expired`}
      control={control}
      rules={{
        validate: value =>
          value && watch(`Milestones.${ 0 }.MilestoneStatus.achieved`) ? "Milestone cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="firstMilestoneExpired" className={styles.checkboxLabel}>Expired</label>
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
          !value || new Date(value) < new Date(firstMilestoneDate) ? "Second milestone must be after first milestone" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              label={'Milestone #2'}
              name={'secondMilestone'}
              required={true} />
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
  const { methods, disabled } = useProjectCreateCtx()

  const secondMilestone = methods.watch(`Milestones.${ 1 }`)

  if(!secondMilestone.MilestoneExtension) return <AddMilestoneExtensionBtn number={2} />

  return (
    <Controller
      name={`Milestones.${ 1 }.MilestoneExtension.date`}
      control={methods.control}
      rules={{
        required: "Extension date is required",
        validate: value =>
          !secondMilestone || new Date(value) < new Date(secondMilestone.date) ? "Extension must be after original milestone date" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          <div className="flex">
            <label htmlFor="secondMilestoneExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
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
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  return (
    <Controller
      name={`Milestones.${ 1 }.MilestoneStatus.achieved`}
      control={control}
      rules={{
        validate: value =>
          value && watch(`Milestones.${ 1 }.MilestoneStatus.expired`) ? "Milestone cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="secondMilestoneAchieved" className={styles.checkboxLabel}>Achieved</label>
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
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  return (
    <Controller
      name={`Milestones.${ 1 }.MilestoneStatus.expired`}
      control={control}
      rules={{
        validate: value =>
          value && watch(`Milestones.${ 1 }.MilestoneStatus.achieved`) ? "Milestone cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="secondMilestoneExpired" className={styles.checkboxLabel}>Expired</label>
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

const AddNotificationBtn = ({ type }: { type: NotificationTypes }) => {
  const { methods: { watch, control, getValues } } = useProjectCreateCtx()

  const notifications = watch('VestingNotifications')

  const { append } = useFieldArray({
    control,
    name: 'VestingNotifications'
  })

  const index = notifications?.findIndex(notification => notification.type === type)

  if(index !== -1) return null

  const addNotification = () => {
    append({
      type,
      date: "",
      parentId: getValues('uuid') as string
    })
  }

  return (
    <button 
      type="button"
      onClick={addNotification}
      className="btn btn-lg btn-primary uppercase">
        Add {type} Notification
    </button>
  )
}

const InitialNotificationInput = () => { // Initial notification input
  const { methods, disabled } = useProjectCreateCtx()

  const notifications = methods.watch('VestingNotifications') || []

  const index = notifications.findIndex(notification => notification.type === 'Initial')

  if(index === -1) return null

  return (
    <Controller
      name={`VestingNotifications.${ index }.date`}
      control={methods.control}
      rules={{
        required: "Notification date is required"
      }}
      render={({ field }) => (
        <div className="flex">
          <label htmlFor="initialNotification" className={`${ styles.label } flex-1`}>Initial</label>
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
  const { methods, disabled } = useProjectCreateCtx()

  const notifications = methods.watch('VestingNotifications') || []

  const index = notifications.findIndex(notification => notification.type === 'Last Call')

  if(index === -1) return null

  return (
    <Controller
      name={`VestingNotifications.${ index }.date`}
      control={methods.control}
      rules={{
        required: "Notification date is required"
      }}
      render={({ field }) => (
        <div className="flex">
          <label htmlFor="lastCallNotification" className={`${ styles.label } flex-1`}>Last Call</label>
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
  const { methods, disabled } = useProjectCreateCtx()

  const notifications = methods.watch('VestingNotifications') || []

  const index = notifications.findIndex(notification => notification.type === 'Lost Vesting')

  if(index === -1) return null

  return (
    <Controller
      name={`VestingNotifications.${ index }.date`}
      control={methods.control}
      rules={{
        required: "Notification date is required"
      }}
      render={({ field }) => (
        <div className="flex">
          <label htmlFor="lostVestingNotification" className={`${ styles.label } flex-1`}>Lost Vesting</label>
          <input 
            type="date"
            disabled={disabled}
            className={styles.input}
            { ...field } />
        </div>
      )} />
  )
}