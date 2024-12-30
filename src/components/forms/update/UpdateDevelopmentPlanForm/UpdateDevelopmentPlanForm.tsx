import { useNavigate } from "react-router-dom"
import { FormProvider } from "react-hook-form"
import { useUpdateDevelopmentPlanForm, useExpireProject, useMilestoneExt } from "./hooks"
import { onSubmit } from './utils'
import styles from '../../Forms.module.css'

// Types
import { UpdateDevelopmentPlanFormProps } from "./types"

// Components
import DeleteProjectBtn from "../../../buttons/DeleteProjectBtn/DeleteProjectBtn"
import { NameInput, COFNumberInput, ResolutionInput, OrdinanceInput, FPMCApprovalInput, BOMAApprovalInput, TenYearVestingInput, FifteenYearVestingInput, FirstMilestoneDateInput, SecondMilestoneDateInput, NotesInput, Buttons } from '../../create/CreateDevelopmentPlanForm/components'
import { ExpiredCheckbox, TenYearVestingExtensionInput, TenYearVestingAchievedCheckbox, TenYearVestingExpiredCheckbox, FifteenYearVestingExtensionInput, FifteenYearVestingAchievedCheckbox, FifteenYearVestingExpiredCheckbox, FirstMilestoneExtensionInput, FirstMilestoneAchievedCheckbox, FirstMilestoneExpiredCheckbox, SecondMilestoneExtensionInput, SecondMilestoneAchievedCheckbox, SecondMilestoneExpiredCheckbox, InitialNotificationInput, LastCallNotificationInput, LostVestingNotificationInput } from './components'

function UpdateDevelopmentPlanForm({ project }: UpdateDevelopmentPlanFormProps) {
  const navigate = useNavigate()

  const methods = useUpdateDevelopmentPlanForm(project) // useForm

  const values = methods.watch()

  useExpireProject(values, { setValue: methods.setValue }) // Handle project expiration

  useMilestoneExt(values.milestones, { setValue: methods.setValue }) // Set second milestone on first milestone extension change

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Update Development Plan</h1>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => onSubmit(formData, { reset: methods.reset, navigate }))} className="w-full">
          <div className={styles.body}>

            <ExpiredCheckbox />

            <NameInput />
            <COFNumberInput />

            <div className="flex gap-3">
              <ResolutionInput />
              <OrdinanceInput />
            </div>

            <div className="flex gap-2">
              <FPMCApprovalInput />
              <BOMAApprovalInput />
            </div>

            <h2 className={styles.sectionHeader}>Vesting</h2>

            <div className="flex gap-2">
              <div className={styles.groupedSection}>
                <TenYearVestingInput />
                <TenYearVestingExtensionInput />
                
                <div className="flex py-6 justify-evenly">
                  <TenYearVestingAchievedCheckbox />
                  <TenYearVestingExpiredCheckbox />
                </div>
              </div>

              <div className={styles.groupedSection}>
                <FifteenYearVestingInput />
                <FifteenYearVestingExtensionInput />

                <div className="flex py-6 justify-evenly">
                  <FifteenYearVestingAchievedCheckbox />
                  <FifteenYearVestingExpiredCheckbox />
                </div>
              </div>
            </div>

            <h2 className={styles.sectionHeader}>Milestones</h2>

            <div className="flex gap-2">
              <div className={styles.groupedSection}>
                <FirstMilestoneDateInput />
                <FirstMilestoneExtensionInput />
                
                <div className="flex py-6 justify-evenly">
                  <FirstMilestoneAchievedCheckbox />
                  <FirstMilestoneExpiredCheckbox />
                </div>
              </div>

              <div className={styles.groupedSection}>
                <SecondMilestoneDateInput />
                <SecondMilestoneExtensionInput />
                
                <div className="flex py-6 justify-evenly">
                  <SecondMilestoneAchievedCheckbox />
                  <SecondMilestoneExpiredCheckbox />
                </div>
              </div>
            </div>

            <h2 className={styles.sectionHeader}>Notifications</h2>

            <div className={`${ styles.groupedSection } flex-row mb-8 justify-evenly flex-wrap`}>
              <InitialNotificationInput />
              <LastCallNotificationInput />
              <LostVestingNotificationInput />
            </div>

            <NotesInput />

          </div>

          <Buttons />

        </form>
        
        <div className="mt-8 ml-auto">
          <DeleteProjectBtn uuid={project.uuid} />
        </div>

      </FormProvider>
      
    </div>
  )
}

export default UpdateDevelopmentPlanForm