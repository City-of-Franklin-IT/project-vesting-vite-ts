import { FormProvider } from "react-hook-form"
import { useUpdateSitePlanForm, useHandleFormSubmit } from './hooks'
import styles from '@/components/form-components/Forms.module.css'

// Types
import { ProjectInterface } from "@/context/types"

// Components
import DeleteProjectBtn from "../../../../form-components/buttons/DeleteProjectBtn"
import { ExpiredCheckbox, NameInput, COFNumberInput, OrdinanceInput, VestingInputs, MilestoneInputs, NotificationInputs, NotesInput } from '../UpdateDevelopmentPlanForm/components'
import FormBtns from "@/components/form-components/buttons/FormBtns"
import * as Components from './components'

function UpdateSitePlanForm({ project }: { project: ProjectInterface }) {
  const methods = useUpdateSitePlanForm(project)

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Site Plan</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleFormSubmit(formData))} className="w-full">
            <div className={styles.body}>

              <ExpiredCheckbox />
              <NameInput />

              <div className="flex gap-3">
                <COFNumberInput />
                <OrdinanceInput />
              </div>

              <Components.ApprovalInputs />

              <h2 className={styles.sectionHeader}>Vesting</h2>

              <VestingInputs />

              <h2 className={styles.sectionHeader}>Milestones</h2>

              <MilestoneInputs />

              <h2 className={styles.sectionHeader}>Notifications</h2>

              <NotificationInputs />

              <NotesInput />

            </div>

            <FormBtns />
          </form>
      </FormProvider>

      <div className="mt-8 ml-auto">
        <DeleteProjectBtn uuid={project.uuid} />
      </div>
    </div>
  )
}

export default UpdateSitePlanForm
