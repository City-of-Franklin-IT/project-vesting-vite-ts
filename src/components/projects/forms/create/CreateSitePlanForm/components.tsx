import { useNavigate } from "react-router"
import { Controller } from "react-hook-form"
import { useProjectCreateCtx } from "@/helpers/hooks"
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormLabel from '../../../../form-components/FormLabel/FormLabel'
import FormError from '../../../../form-components/FormError/FormError'
import CancelBtn from '../../../../form-components/buttons/CancelBtn'
import SaveBtn from '../../../../form-components/buttons/SaveBtn'
import { OrdinanceOptions } from "@/helpers/components"

export const NameInput = () => { // Name input
  const { methods: { formState: { errors }, register } } = useProjectCreateCtx()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Project Name'}
          name={'name'}
          required={true} />
        <input 
          type="text" 
          { ...register('name', {
            required: "Project name is required",
            maxLength: {
              value: 255,
              message: "Project name must be 255 characters or less"
            }
          }) }
          className={styles.input} />
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
          label={'COF #'}
          name={'cof'}
          required={true} />
        <input 
          type="number"
          { ...register('cof', {
            required: "COF # is required"
          }) }
          className={styles.input} />
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
          label={'Zoning Ordinance'}
          name={'ordinance'}
          required={true} />
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

export const ApprovalInputs = () => {

  return (
    <div className="flex gap-3">
      <ApprovedBySelect />
      <ApprovalDateInput />
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

const TenYearVestingDateInput = () => {
  const { methods: { control, watch } } = useProjectCreateCtx()

  const fifteenYearDate = watch(`VestingPeriods.${ 1 }.date`)

  return (
    <Controller
      name={`VestingPeriods.${ 0 }.date`}
      control={control}
      rules={{
        validate: value =>
          new Date(value) > new Date(fifteenYearDate) ? "10Y vesting date must be before 15Y vesting date" : true
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              label={'10Y Vesting Period'}
              name={'10YVesting'} />
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
            <FormLabel
              label={'15Y Vesting Period'}
              name={'15YVesting'} />
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
  const { methods: { watch, control } } = useProjectCreateCtx()

  const secondMilestoneDate = watch(`Milestones.${ 1 }.date`)

  return (
    <Controller
      name={`Milestones.${ 0 }.date`}
      control={control}
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
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const SecondMilestoneDateInput = () => {
  const { methods: { watch, control } } = useProjectCreateCtx()

  const firstMilestoneDate = watch(`Milestones.${ 0 }.date`)

  return (
    <Controller
      name={`Milestones.${ 1 }.date`}
      control={control}
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
              className={styles.input}
              { ...field } />
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
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

const ApprovedBySelect = () => { // Site plan approval by select
  const { methods: { control }, disabled } = useProjectCreateCtx()

  return (
    <Controller
      name={`Approvals.${ 0 }.approvedBy`}
      control={control}
      rules={{
        required: "Approval by is required"
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              label={'Approved By'}
              name={'approvedBy'} />
            <select
              disabled={disabled}
              className={styles.input}
              defaultValue={""}
              { ...field }>
                <option value="Admin">Admin</option>
                <option value="FPMC">FPMC</option>
            </select>
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
    
  )
}

const ApprovalDateInput = () => { // Site plan approved on date input
  const { methods: { control } } = useProjectCreateCtx()

  return (
    <Controller
      name={`Approvals.${ 0 }.date`}
      control={control}
      rules={{
        required: "Approval date is required"
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              label={'Approved On'}
              name={'approvalDate'}
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