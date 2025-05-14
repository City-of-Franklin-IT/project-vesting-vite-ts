import { useProjectCreateCtx } from '@/helpers/hooks'
import { useHandleFPMCDateChange } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormError from "../../../../form-components/FormError/FormError"
import FormLabel from '@/components/form-components/FormLabel/FormLabel'

export const FPMCApprovalDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  const handleFPMCDateChange = useHandleFPMCDateChange()

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
            onChange: () => handleFPMCDateChange,
            onBlur: () => methods.trigger(`Approvals.${ 0 }.date`)
          })}
          className={styles.input} />
      </div>
      <FormError field={`Approvals.${ 0 }.date`} />
    </div>
  )
}