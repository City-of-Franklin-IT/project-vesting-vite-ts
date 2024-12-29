import { useNavigate } from 'react-router-dom'
import { FormProvider } from 'react-hook-form'
import { useCreateSitePlanForm, useSetDatesObj, useSetDates } from './hooks'
import { onSubmit } from './utils'
import styles from '../../Forms.module.css'

// Components
import { NameInput, COFNumberInput, OrdinanceInput, ApprovedBySelect, ApprovedOnInput, TenYearVestingInput, FifteenYearVestingInput, FirstMilestoneDateInput, SecondMilestoneDateInput, NotesInput, Buttons } from './components'

function CreateSitePlanForm() {
  const navigate = useNavigate()

  const methods = useCreateSitePlanForm()

  const values = methods.watch()

  const dates = useSetDatesObj(values)

  useSetDates(dates, { setValue: methods.setValue })

  return (
    <div className={styles.container}>

      <h1 className={styles.title}>Create Site Plan</h1>

      <FormProvider { ...methods }>
      <form onSubmit={methods.handleSubmit(formData => onSubmit(formData, { navigate }))} className="w-full">
          <div className={styles.body}>
            
            <NameInput />

            <div className="flex gap-3">
              <COFNumberInput />
              <OrdinanceInput />
            </div>

            <div className="flex gap-3">
              <ApprovedBySelect />
              <ApprovedOnInput />
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

export default CreateSitePlanForm