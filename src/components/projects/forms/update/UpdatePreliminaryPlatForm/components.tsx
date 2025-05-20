import { Controller } from 'react-hook-form'
import { useProjectCreateCtx } from '@/helpers/hooks'
import { useHandleFPMCDateChange } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormError from "../../../../form-components/FormError"
import FormLabel from '@/components/form-components/FormLabel'

export const FPMCApprovalDateInput = () => {
  const { methods, disabled } = useProjectCreateCtx()

  useHandleFPMCDateChange()

  return (
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
              name={`Approvals.${ 0 }.date`}
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
      )
    } />
  )
}