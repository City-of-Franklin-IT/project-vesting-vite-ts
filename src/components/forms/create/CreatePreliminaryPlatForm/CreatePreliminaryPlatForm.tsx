import { useNavigate } from 'react-router-dom'
import { FormProvider } from 'react-hook-form'
import { useCreatePreliminaryPlatForm, useSetDatesObj, useSetDates } from './hooks'
import { onSubmit } from './utils'
import styles from '../../Forms.module.css'

// Components
import { NameInput, COFNumberInput, OrdinanceInput, FPMCApprovalInput, TenYearVestingInput, FifteenYearVestingInput, FirstMilestoneDateInput, SecondMilestoneDateInput, NotesInput, Buttons } from './components'

function CreatePreliminaryPlatForm() {
  const navigate = useNavigate()

  const methods = useCreatePreliminaryPlatForm()

  const values = methods.watch()

  const dates = useSetDatesObj(values)

  useSetDates(dates, { setValue: methods.setValue }) // Set milestones and vesting dates on FPMC approval change

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Preliminary Plat</h1>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => onSubmit(formData, { navigate }))} className="w-full">
          <div className={styles.body}>
            
            <NameInput />

            <div className="flex gap-3">
              <COFNumberInput />
              <OrdinanceInput />
            </div>

            <FPMCApprovalInput />

            <div className="flex gap-3">
              <TenYearVestingInput />
              <FifteenYearVestingInput />
            </div>

            <div className="flex gap-3">
              <FirstMilestoneDateInput />
              <SecondMilestoneDateInput />
            </div>

            <NotesInput />
          </div>

          <Buttons />

        </form>
      </FormProvider>
    
    </div>
  )
}

export default CreatePreliminaryPlatForm