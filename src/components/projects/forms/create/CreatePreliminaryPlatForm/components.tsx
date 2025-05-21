import { Controller } from "react-hook-form"
import { useProjectCreateCtx } from "@/helpers/hooks"
import { useHandleFPMCDateChange } from "./hooks"
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormLabel from '../../../../form-components/FormLabel'
import FormError from '../../../../form-components/FormError'
import { OrdinanceOptions } from "@/helpers/components"

export const NameInput = () => { // Name input
  const { methods: { formState: { errors }, register } } = useProjectCreateCtx()

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
          className={styles.input}
          { ...register('name', {
            required: "Project name is required",
            maxLength: {
              value: 255,
              message: "Project name must be 255 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors?.name?.message?.toString()} />
    </div>
  )
}

export const COFNumberInput = () => { // COF number input
  const { methods: { formState: { errors }, register } } = useProjectCreateCtx()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          name={'cof'}
          required={true}>
            COF #
        </FormLabel>
        <input 
          type="number"
          className={styles.input}
          { ...register('cof', {
            required: "COF # is required",
          }) } />
      </div>
      <FormError error={errors?.cof?.message?.toString()} />
    </div>
  )
}

export const OrdinanceInput = () => { // Ordinance input
  const { methods: { formState: { errors }, register } } = useProjectCreateCtx()

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
            required: "Zoning ordinance is required"
          }) }>
            <OrdinanceOptions />
        </select>
      </div>
      <FormError error={errors?.ordinance?.message?.toString()} />
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
  const { methods: { control } } = useProjectCreateCtx()

  useHandleFPMCDateChange()

  return (
    <Controller
      name={`Approvals.${ 0 }.date`}
      control={control}
      rules={{
        required: "FPMC approval date is required"
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              name={`Approvals.${ 0 }.date`}
              required={true}>
                FPMC Approval
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

export const NotesInput = () => { // Notes input
  const { methods } = useProjectCreateCtx()

  return (
    <div className="flex">
      <FormLabel name={'notes'}>
        Notes
      </FormLabel>
      <textarea 
        rows={6}
        className={styles.input}
        { ...methods.register("notes") }>
      </textarea>
    </div>
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
        validate: value =>
          new Date(value) > new Date(fifteenYearDate) ? "10Y vesting date must be before 15Y vesting date" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, ...props } = field

        return (
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel name={`VestingPeriods.${ 0 }.date`}>
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
        )}} />
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
        validate: value =>
          new Date(value) < new Date(tenYearDate) ? "15Y vesting date must be after 10Y vesting date" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel name={`VestingPeriods.${ 1 }.date`}>
              15Y Vesting Period
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

const FirstMilestoneDateInput = () => {
  const { methods: { control, watch } } = useProjectCreateCtx()

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
  const { methods: { watch, control, trigger } } = useProjectCreateCtx()

  const firstMilestoneDate = watch(`Milestones.${ 0 }.date`)

  return (
    <Controller
      name={`Milestones.${ 1 }.date`}
      control={control}
      rules={{
        validate: value =>
          !value || new Date(value) < new Date(firstMilestoneDate) ? "Second milestone must be after first milestone" : true
      }}
      render={({ field, fieldState: { error } }) => {
        const { onBlur, ...props } = field

        return (
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex">
              <FormLabel
                name={'secondMilestone'}
                required={true}>
                  Milestone #2
              </FormLabel>
              <input 
                type="date"
                className={styles.input}
                onBlur={() => {
                  field.onBlur
                  trigger(`Milestones.${ 1 }.date`)
                }}
                { ...props } />
            </div>
            <FormError error={error?.message} />
          </div>
        )
      }} />
  )
}