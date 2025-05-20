import { useNavigate } from 'react-router'
import { Controller } from 'react-hook-form'
import { useProjectCreateCtx } from '@/helpers/hooks'
import { useHandleBOMADateChange } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormLabel from '../../../../form-components/FormLabel'
import FormError from '../../../../form-components/FormError'
import { OrdinanceOptions } from '@/helpers/components'

export const NameInput = () => { // Name input
  const { methods: { formState: { errors }, register, trigger } } = useProjectCreateCtx()

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
          name={'cof'}
          required={true}>
            COF #
        </FormLabel>
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
          name={'ordinance'}
          required={true}>
            Zoning Ordinance
        </FormLabel>
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
              name={'Resolution.resolution'}
              required={true}>
                Resolution #
            </FormLabel>
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
      <FormLabel name={'notes'}>
        Notes
      </FormLabel>
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
              name={`Approvals.${ 0 }.date`}
              required={true}>
                FPMC
            </FormLabel>
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
          !value || new Date(value) < new Date(fpmcDate) ? "BOMA approval date must be after FPMC approval date" : true,
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              name={`Approvals.${ 1 }.date`}
              required={true}>
                BOMA Approval
            </FormLabel>
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
              <FormLabel name={'10YVesting'}>
                  10Y Vesting Period
              </FormLabel>
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
            <FormLabel name={'15YVesting'}>
              15Y Vesting Period
            </FormLabel>
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
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const SecondMilestoneDateInput = () => {
  const { methods: { control, watch } } = useProjectCreateCtx()

  const firstMilestoneDate = watch(`Milestones.${ 0 }.date`)

  return (
    <Controller
      name={`Milestones.${ 1 }.date`}
      control={control}
      rules={{
        required: "Second milestone date is required",
        validate: value =>
          value && firstMilestoneDate && new Date(value) < new Date(firstMilestoneDate) ? "Second milestone must be after first milestone" : true
      }}
      render={({ field, fieldState: { error } }) => (
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel
                name={`Milestones.${ 1 }.date`}
                required={true}>
                  Milestone #2 
              </FormLabel>
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