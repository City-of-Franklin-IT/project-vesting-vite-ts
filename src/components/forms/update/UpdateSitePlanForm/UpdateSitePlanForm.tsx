import { useNavigate } from "react-router-dom"
import { FormProvider } from "react-hook-form"
import { useUpdateSitePlanForm, useSetDatesObj, useExpireProject, useMilestoneExt } from './hooks'
import { onSubmit } from './utils'
import styles from '../../Forms.module.css'

// Components
import { NameInput, COFNumberInput, OrdinanceInput, ApprovedBySelect, ApprovedOnInput, TenYearVestingInput, FifteenYearVestingInput, FirstMilestoneDateInput, SecondMilestoneDateInput, NotesInput, Buttons } from '../../create/CreateSitePlanForm/components'
import { ExpiredCheckbox, TenYearVestingExtensionInput, TenYearVestingAchievedCheckbox, TenYearVestingExpiredCheckbox, FifteenYearVestingExtensionInput, FifteenYearVestingAchievedCheckbox, FifteenYearVestingExpiredCheckbox, FirstMilestoneExtensionInput, FirstMilestoneAchievedCheckbox, FirstMilestoneExpiredCheckbox, SecondMilestoneExtensionInput, SecondMilestoneAchievedCheckbox, SecondMilestoneExpiredCheckbox, InitialNotificationInput, LastCallNotificationInput, LostVestingNotificationInput } from './components'

// Types
import { UpdateSitePlanFormProps } from './types'


function UpdateSitePlanForm({ data }: UpdateSitePlanFormProps) {
  const navigate = useNavigate()

  const methods = useUpdateSitePlanForm(data)

  const values = methods.watch()

  const dates = useSetDatesObj(values)

  useExpireProject(values, { setValue: methods.setValue }) // Handle project expiration

  useMilestoneExt(values.milestones, { setValue: methods.setValue }) // Set second milestone on first milestone extension change

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Update Site Plan</h1>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => onSubmit(formData, { reset: methods.reset, navigate }))} className="w-full">
            <div className={styles.body}>

              <ExpiredCheckbox />

              <NameInput />

              <div className="flex gap-3">
                <COFNumberInput />
                <OrdinanceInput />
              </div>

              <div className="flex gap-3">
                <ApprovedBySelect />
                <ApprovedOnInput />
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
      </FormProvider>
    </div>
  )
}

export default UpdateSitePlanForm
