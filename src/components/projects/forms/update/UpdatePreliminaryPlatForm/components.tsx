import { Controller } from 'react-hook-form'
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
        
        <Controller
          name={`Approvals.${ 0 }.date`}
          control={methods.control}
          rules={{
            required: "FPMC approval date is required"
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
                  onChange={() => handleFPMCDateChange}
                  onBlur={() => methods.trigger(`Approvals.${ 0 }.date`)} />
              </div>
              <FormError error={error?.message} />
            </div>
          )} />
      </div>
    </div>
  )
}