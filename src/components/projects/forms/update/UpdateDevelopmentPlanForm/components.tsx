import { useFieldArray, Controller } from 'react-hook-form'
import { useProjectCreateCtx, useExpireProject, useMilestoneExt } from '@/helpers/hooks'
import { useHandleBOMADateChange, useHandleVestingExtensionBtn, useShowNotificationInputs } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormError from "../../../../form-components/FormError"
import FormLabel from '@/components/form-components/FormLabel'
import { OrdinanceOptions } from '@/helpers/components'
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
      className="btn btn-lg btn-primary uppercase shadow-xl">
        Add 10 Year Vesting Period
    </button>
  )
}

const TenYearVestingDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const vestingPeriods = methods.watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "10Y") // Check if 10Y is in form state

  if(index === -1) return null

  const fifteenYearVestingPeriod = vestingPeriods.find(period => period.type === "15Y")

  return (
    <Controller
      name={`VestingPeriods.${ index }.date`}
      control={methods.control}
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
          value && new Date(value) < new Date(vestingPeriods[index].date) ? "Extension must be after original date" : true
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
      className="btn btn-lg btn-primary uppercase shadow-xl">
        Add Extension
    </button>
  )
}

const TenYearVestingAchievedCheckbox = () => {
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "10Y")

  if(index === -1 || !vestingPeriods[index].uuid) return null

  const expired = watch(`VestingPeriods.${ index }.VestingStatus.expired`)

  return (
    <Controller
      name={`VestingPeriods.${ index }.VestingStatus.expired`}
      control={control}
      rules={{
        validate: value =>
          value && expired ? "Vesting cannot be both achieved and expired" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { value, ...props } = field

        return (
          <div className="flex flex-col items-center gap-2">
            <label htmlFor={`VestingPeriods.${ index }.VestingStatus.expired`} className={styles.checkboxLabel}>Achieved</label>
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

  const achieved = watch(`VestingPeriods.${ index }.VestingStatus.achieved`)

  return (
    <Controller
      name={`VestingPeriods.${ index }.VestingStatus.expired`}
      control={control}
      rules={{
        validate: value =>
          value && achieved ? "Vesting cannot be both achieved and expired" : true
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
      className="btn btn-lg btn-primary uppercase shadow-xl">
        Add 15 Year Vesting Period
    </button>
  )
}

const FifteenYearVestingDateInput = () => {
  const { methods: { control, watch }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "15Y") // Check if 15Y is in form state

  if(index === -1) return <AddFifteenYearVestingBtn />

  const tenYearVesting = vestingPeriods.find(period => period.type === "10Y")

  return (
    <Controller
      name={`VestingPeriods.${ index }.date`}
      control={control}
      rules={{
        validate: value =>
          value && tenYearVesting && new Date(value) < new Date(tenYearVesting.date) ? "15 year vesting period must be after 10 year vesting period" : true
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
  const { methods: { control, watch }, disabled } = useProjectCreateCtx()

  const vestingPeriods = watch('VestingPeriods')

  const index = vestingPeriods.findIndex(period => period.type === "15Y")

  if(index === -1) return null

  if(!vestingPeriods[index].VestingExtension) return <AddVestingExtensionBtn type="15Y" /> // Add vesting extension button

  const vestingPeriod = vestingPeriods[index]

  return (
    <Controller
      name={`VestingPeriods.${ index }.VestingExtension.date`}
      control={control}
      rules={{
        validate: value => 
          value && new Date(value) < new Date(vestingPeriod.date) ? "Extension must be after original vesting date" : true
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

  const expired = watch(`VestingPeriods.${ index }.VestingStatus.expired`)

  return (
    <Controller
      name={`VestingPeriods.${ index }.VestingStatus.achieved`}
      control={control}
      rules={{
        validate: value =>
          value && expired ? "Vesting cannot be both achieved and expired" : true
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

  const achieved = watch(`VestingPeriods.${ index }.VestingStatus.achieved`)

  return (
    <Controller
      name={`VestingPeriods.${ index }.VestingStatus.expired`}
      control={control}
      rules={{
        validate: value =>
          value && achieved ? "Vesting cannot be both achieved and expired" : true
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

  if(milestoneStatus.achieved || milestoneStatus.expired) return null

  return (
    <button 
      type="button"
      onClick={handleBtnClick}
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
      <AddMilestoneExtensionBtn number={1} />

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
        validate: value =>
          value && firstMilestone && new Date(value) < new Date(firstMilestone.date) ? "Extension must be after original milestone date" : true
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
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const expired = watch(`Milestones.${ 0 }.MilestoneStatus.expired`)

  return (
    <Controller
      name={`Milestones.${ 0 }.MilestoneStatus.achieved`}
      control={control}
      rules={{
        validate: value =>
          value && expired ? "Milestone cannot be both achieved and expired" : true
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
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const achieved = watch(`Milestones.${ 0 }.MilestoneStatus.achieved`)

  return (
    <Controller
      name={`Milestones.${ 0 }.MilestoneStatus.expired`}
      control={control}
      rules={{
        validate: value =>
          value && achieved ? "Milestone cannot be both achieved and expired" : true
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
  const { methods, disabled } = useProjectCreateCtx()

  const secondMilestone = methods.watch(`Milestones.${ 1 }`)

  if(!secondMilestone.MilestoneExtension) return <AddMilestoneExtensionBtn number={2} />

  return (
    <Controller
      name={`Milestones.${ 1 }.MilestoneExtension.date`}
      control={methods.control}
      rules={{
        validate: value =>
          value && secondMilestone && new Date(value) < new Date(secondMilestone.date) ? "Extension must be after original milestone date" : true
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
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const expired = watch(`Milestones.${ 1 }.MilestoneStatus.expired`)

  return (
    <Controller
      name={`Milestones.${ 1 }.MilestoneStatus.achieved`}
      control={control}
      rules={{
        validate: value =>
          value && expired ? "Milestone cannot be both achieved and expired" : true
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
  const { methods: { watch, control }, disabled } = useProjectCreateCtx()

  const achieved = watch(`Milestones.${ 1 }.MilestoneStatus.achieved`)

  return (
    <Controller
      name={`Milestones.${ 1 }.MilestoneStatus.expired`}
      control={control}
      rules={{
        validate: value =>
          value && achieved ? "Milestone cannot be both achieved and expired" : true
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
      className="btn btn-lg btn-primary uppercase shadow-xl">
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
      render={({ field }) => (
        <div className="flex">
          <label htmlFor={`VestingNotifications.${ index }.date`} className={`${ styles.label } flex-1`}>Initial</label>
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
      render={({ field }) => (
        <div className="flex">
          <label htmlFor={`VestingNotifications.${ index }.date`} className={`${ styles.label } flex-1`}>Last Call</label>
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
      render={({ field }) => (
        <div className="flex">
          <label htmlFor={`VestingNotifications.${ index }.date`} className={`${ styles.label } flex-1`}>Lost Vesting</label>
          <input 
            type="date"
            disabled={disabled}
            className={styles.input}
            { ...field } />
        </div>
      )} />
  )
}