import { FormProvider } from "react-hook-form"
import { DevTool } from '@hookform/devtools'
import { useUpdateDevelopmentPlanForm, useHandleFormSubmit } from "./hooks"
import styles from '@/components/form-components/Forms.module.css'

// Types
import { ProjectInterface } from "@/context/types"

// Components
import DeleteProjectBtn from "../../../../form-components/buttons/DeleteProjectBtn/DeleteProjectBtn"
import * as Components from './components'

function UpdateDevelopmentPlanForm({ project }: { project: ProjectInterface }) {
  const methods = useUpdateDevelopmentPlanForm(project) // useForm

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Development Plan</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))} className="w-full">
          <div className={styles.body}>

            <Components.ExpiredCheckbox />

            <Components.NameInput />
            <Components.COFNumberInput />

            <div className="flex gap-3">
              <Components.ResolutionInput />
              <Components.OrdinanceInput />
            </div>

            <Components.ApprovalInputs />

            <h2 className={styles.sectionHeader}>Vesting</h2>

            <Components.VestingInputs />

            <h2 className={styles.sectionHeader}>Milestones</h2>

            <Components.MilestoneInputs />

            <h2 className={styles.sectionHeader}>Notifications</h2>

            <Components.NotificationInputs />
            <Components.NotesInput />

          </div>

          <Components.Buttons />
          <DevTool control={methods.control} />
        </form>
        
        <div className="mt-8 ml-auto">
          <DeleteProjectBtn uuid={project.uuid} />
        </div>

      </FormProvider>
    </div>
  )
}

export default UpdateDevelopmentPlanForm