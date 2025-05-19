import { useNavigate } from 'react-router'
import { Controller } from 'react-hook-form'
import { useProjectCreateCtx } from '@/helpers/hooks'
import { useHandleBOMADateChange } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormLabel from '../../../../form-components/FormLabel/FormLabel'
import FormError from '../../../../form-components/FormError/FormError'
import CancelBtn from '../../../../form-components/buttons/CancelBtn'
import SaveBtn from '../../../../form-components/buttons/SaveBtn'
import { OrdinanceOptions } from '@/helpers/components'

export const NameInput = () => { // Name input
  const { methods: { formState: { errors }, register, trigger } } = useProjectCreateCtx()

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
          { ...register('name', {
            required: "Project name is required",
            maxLength: {
              value: 255,
              message: "Project name must be 255 characters or less"
            },
            onChange: () => trigger('name')
          }) }
          className={styles.input} />
      </div>
      <FormError error={errors.name?.message?.toString()} />
    </div>
  )
}

export const COFNumberInput = () => { // COF number input
  const { methods: { register, trigger, formState: { errors } } } = useProjectCreateCtx()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'COF #'}
          name={'cof'}
          required={true} />
        <input 
          type="number"
          { ...register('cof', {
            required: "COF # is required",
            onChange: () => trigger('cof')
          }) }
          className={styles.input} />
      </div>
      <FormError error={errors.cof?.message?.toString()} />
    </div>
  )
}

export const OrdinanceInput = () => {
  const { methods: { register, trigger, formState: { errors } } } = useProjectCreateCtx()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Zoning Ordinance'}
          name={'ordinance'}
          required={true} />
        <select 
          className={styles.input}
          { ...register("ordinance", {
            required: "Zoning ordinance is required",
            onBlur: () => trigger('ordinance')
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
  const { methods: { control } } = useProjectCreateCtx()

  return (
    <Controller
      name={'Resolution.resolution'}
      control={control}
      rules={{
        required: "Resolution # is required",
        maxLength: {
          value: 10,
          message: "Resolution # must be 10 characters or less"
        }
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              label={'Resolution #'}
              name={'resolution'}
              required={true} />
            <input 
              type="text"
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
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
  const { methods: { watch, control } } = useProjectCreateCtx()

  const bomaDate = watch(`Approvals.${ 1 }.date`)

  return (
    <Controller
      name={`Approvals.${ 0 }.date`}
      control={control}
      rules={{
        required: "FPMC approval date is required",
        validate: value =>
          !value || new Date(value) > new Date(bomaDate) ? "FPMC approval date must be before BOMA approval date" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              label={'FPMC Approval'}
              name={'fpmcApproval'}
              required={true} />
            <input 
              type="date"
              className={styles.input}
              { ...field } />
            <FormError error={error?.message} />
          </div>
        </div>
      )} />
  )
}

const BOMAApprovalDateInput = () => {
  const { methods: { watch, control } } = useProjectCreateCtx()

  const fpmcDate = watch(`Approvals.${ 0 }.date`)

  useHandleBOMADateChange()

  return (
    <Controller
      name={`Approvals.${ 1 }.date`}
      control={control}
      rules={{
        required: "BOMA approval date is required",
        validate: value => 
          !value || new Date(value) > new Date(fpmcDate) ? "BOMA approval date must be after FPMC approval date" : true,
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              label={'BOMA Approval'}
              name={'bomaApproval'}
              required={true} />
            <input 
              type="date"
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )
    } />
  )
}

const TenYearVestingDateInput = () => {
  const { methods: { control, watch, trigger } } = useProjectCreateCtx()

  const fifteenYearDate = watch(`VestingPeriods.${ 1 }.date`)

  return (
    <Controller
      name={`VestingPeriods.${ 0 }.date`}
      control={control}
      rules={{
        required: "Vesting date is required",
        validate: value =>
          new Date(value) > new Date(fifteenYearDate) ? "10Y vesting date must be before 15Y vesting date" : true, 
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, ...props } = field

        return (
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel
                label={'10Y Vesting Period'}
                name={'10YVesting'} />
              <input 
                type="date"
                className={styles.input}
                onChange={(e) => {
                  field.onChange(e.currentTarget.value)
                  trigger(`VestingPeriods.${ 0 }.date`)
                }}
                { ...props } />
            </div>
            <FormError error={error?.message} />
          </div>
        )
      }} />
  )
}

const FifteenYearVestingDateInput = () => {
  const { methods: { control, watch } } = useProjectCreateCtx()

  const tenYearDate = watch(`VestingPeriods.${ 0 }.date`)

  return (
    <Controller
      name={`VestingPeriods.${ 1 }.date`}
      control={control}
      rules={{
        required: "Vesting date is required",
        validate: value =>
          new Date(value) < new Date(tenYearDate) ? "15Y vesting date must be after 10Y vesting date" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              label={'15Y Vesting Period'}
              name={'15YVesting'} />
            <input 
              type="date"
              className={styles.input}
              { ...field } />
          </div>
          <div className="flex gap-2">
            <FormError error={error?.message} />
          </div>
        </div>
      )} />
  )
}

const FirstMilestoneDateInput = () => {
  const { methods: { watch, control } } = useProjectCreateCtx()

  const secondMilestoneDate = watch(`Milestones.${ 1 }.date`)

  return (
    <Controller
      name={`Milestones.${ 0 }.date`}
      control={control}
      rules={{
        required: "First milestone date is required",
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
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const SecondMilestoneDateInput = () => {
  const { methods: { control, watch, trigger } } = useProjectCreateCtx()

  const firstMilestoneDate = watch(`Milestones.${ 0 }.date`)

  return (
    <Controller
      name={`Milestones.${ 1 }.date`}
      control={control}
      rules={{
        required: "Second milestone date is required",
        validate: value =>
          !value || new Date(value) < new Date(firstMilestoneDate) ? "Second milestone must be after first milestone" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { onBlur, ...props } = field

        return (
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel
                label={'Milestone #2'}
                name={'secondMilestone'}
                required={true} />
              <input 
                type="date"
                className={styles.input}
                onBlur={() => trigger(`Milestones.${ 1 }.date`)}
                { ...props } />
            </div>
            <FormError error={error?.message} />
          </div>
        )
      }} />
  )
}