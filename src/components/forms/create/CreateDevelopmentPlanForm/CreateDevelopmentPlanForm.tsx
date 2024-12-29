import { useNavigate } from 'react-router-dom'
import { FormProvider } from 'react-hook-form'
import { useCreateDevelopmentPlanForm, useSetDatesObj, useSetDates } from './hooks'
import { onSubmit } from './utils'
import styles from '../../Forms.module.css'

// Components
import { COFNumberInput, NameInput, OrdinanceInput, ResolutionInput, FPMCApprovalInput, BOMAApprovalInput, TenYearVestingInput, FifteenYearVestingInput, FirstMilestoneDateInput, SecondMilestoneDateInput, NotesInput, Buttons } from './components'

function CreateDevelopmentPlanForm() {
  const navigate = useNavigate()

  const methods = useCreateDevelopmentPlanForm() // useForm

  const values = methods.watch()

  const dates = useSetDatesObj(values)

  useSetDates(dates, { setValue: methods.setValue }) // Set dates on BOMA approval change

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Create Development Plan</h1>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => onSubmit(formData, { navigate }))} className="w-full">
          <div className={styles.body}>
            
            <NameInput />
            <COFNumberInput />

            <div className="flex gap-3">
              <ResolutionInput />
              <OrdinanceInput />
            </div>

            <div className="flex gap-3">
              <FPMCApprovalInput />
              <BOMAApprovalInput />
            </div>

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

export default CreateDevelopmentPlanForm