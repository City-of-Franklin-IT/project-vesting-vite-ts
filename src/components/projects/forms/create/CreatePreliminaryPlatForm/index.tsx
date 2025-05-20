import { FormProvider } from 'react-hook-form'
import { useCreatePreliminaryPlatForm, useHandleFormSubmit } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormBtns from '@/components/form-components/buttons/FormBtns'
import * as Components from './components'

function CreatePreliminaryPlatForm() {
  const methods = useCreatePreliminaryPlatForm()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Preliminary Plat</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))} className="w-full">
          <div className={styles.body}>
            <Components.NameInput />

            <div className="flex gap-3">
              <Components.COFNumberInput />
              <Components.OrdinanceInput />
            </div>

            <Components.FPMCApprovalInput />
            <Components.VestingInputs />
            <Components.MilestoneInputs />

            <Components.NotesInput />
          </div>

          <FormBtns />
        </form>
      </FormProvider>
    
    </div>
  )
}

export default CreatePreliminaryPlatForm