import { Controller } from 'react-hook-form'
import { useProjectCreateCtx } from '@/helpers/hooks'
import { useHandleApprovalDateChange } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormError from "@/components/form-components/FormError/FormError"
import FormLabel from '@/components/form-components/FormLabel/FormLabel'

export const ApprovalInputs = () => {

  return (
    <div className="flex gap-3">
      <ApprovalBySelect />
      <ApprovalDateInput />
    </div>
  )
}

const ApprovalBySelect = () => {
  const { methods, disabled } = useProjectCreateCtx()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Approved By'}
          name={'approvedBy'} />
        <select 
          id="approvedBy"
          disabled={disabled}
          className={styles.input}
          { ...methods.register(`Approvals.${ 0 }.approvedBy`) }>
            <option value={""}></option>
            <option value={"Admin"}>Admin</option>
            <option value={"FPMC"}>FPMC</option>
        </select>
      </div>
    </div>
  )
}

const ApprovalDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const handleApprovalDateChange = useHandleApprovalDateChange()

  return (
    <Controller
      name={`Approvals.${ 0 }.date`}
      control={methods.control}
      rules={{
        required: "Approval date is required"
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
            disabled={disabled}
            className={styles.input}
            ref={field.ref}
            value={field.value}
            onChange={() => handleApprovalDateChange}
            onBlur={() => methods.trigger(`Approvals.${ 0 }.date`)} />
        </div>
        <FormError error={error?.message} />
      </div>
    )} />
  )
}