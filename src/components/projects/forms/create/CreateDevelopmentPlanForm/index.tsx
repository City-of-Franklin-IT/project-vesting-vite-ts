import { FormProvider } from 'react-hook-form'
import { useCreateDevelopmentPlanForm, useHandleFormSubmit } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Components
import FormBtns from '@/components/form-components/buttons/FormBtns'
import * as Components from './components'

function CreateDevelopmentPlanForm() {
  const methods = useCreateDevelopmentPlanForm() // useForm

  const handleFormSubmit = useHandleFormSubmit()

  console.log(methods.watch())

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Development Plan</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))} className="w-full">
          <div className={styles.body}>
            <Components.NameInput />
            <Components.COFNumberInput />

            <div className="flex gap-3">
              <Components.ResolutionInput />
              <Components.OrdinanceInput />
            </div>

            <Components.ApprovalInputs />
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

export default CreateDevelopmentPlanForm