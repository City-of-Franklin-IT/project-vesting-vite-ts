import { Controller } from 'react-hook-form'
import { useProjectCreateCtx } from '@/helpers/hooks'
import { useHandleApprovalDateChange } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormError from "@/components/form-components/FormError"
import FormLabel from '@/components/form-components/FormLabel'

export const ApprovalInputs = () => {

  return (
    <div className="flex gap-3">
      <ApprovalBySelect />
      <ApprovalDateInput />
    </div>
  )
}

const ApprovalBySelect = () => {
  const { methods: { control }, disabled } = useProjectCreateCtx()

  return (
    <Controller
      name={`Approvals.${ 0 }.approvedBy`}
      control={control}
      rules={{
        required: "Approved by is required"
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex">
            <FormLabel
              name={'approvedBy'}
              required={true}>
                Approved By
            </FormLabel>
            <select 
              disabled={disabled}
              className={styles.input}
              defaultValue={""}
              { ...field }>
                <option value=""></option>
                <option value={"Admin"}>Admin</option>
                <option value={"FPMC"}>FPMC</option>
            </select>
          </div>
          <FormError error={error?.message} />
        </div>
      )} />
  )
}

const ApprovalDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  useHandleApprovalDateChange()

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
            name={'fpmcApproval'}
            required={true}>
              FPMC Approval
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