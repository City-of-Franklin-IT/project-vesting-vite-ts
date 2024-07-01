import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ordinanceOptions } from '../../../../utils'
import { getUser } from '../../../../helpers'
import { onSubmit, useSetDatesObj, useSetDates } from '.'
import styles from '../../Forms.module.css'

// Components
import SaveBtn from '../../../buttons/SaveBtn/SaveBtn'
import CancelBtn from '../../../buttons/CancelBtn/CancelBtn'

// Types
import { CreateSitePlanFormState } from './types'

function CreateSitePlanForm() {
  const navigate = useNavigate()

  const user = getUser()

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CreateSitePlanFormState>({
    defaultValues: {
      type: 'Site Plan',
      name: '',
      cof: undefined,
      ordinance: undefined,
      approval: {
        approvedBy: undefined,
        date: undefined
      },
      vesting: {
        tenYear: {
          date: undefined
        },
        fifteenYear: {
          date: undefined
        }
      },
      milestones: {
        first: {
          date: undefined
        },
        second: {
          date: undefined
        }
      },
      notes: ''
    }
  })

  const values = watch()

  const dates = useSetDatesObj(values)

  const setDates = useSetDates(dates, setValue)

  useEffect(() => {
    setDates()
  }, [dates.approvalDate])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Site Plan</h1>
      <form onSubmit={handleSubmit(formData => onSubmit(formData, navigate, user.token))} className="w-full">
        <div className={styles.body}>

          <section className={styles.inputSection}>
            <div className="flex">
              <label htmlFor="name" className={`${ styles.label } w-1/2`}>Project Name<span className="text-error">*</span></label>
              <input 
                type="text"
                id="name"
                { ...register('name', {
                  required: {
                    value: true,
                    message: "Project name is required"
                  },
                  maxLength: {
                    value: 255,
                    message: "Project name must be 255 characters or less"
                  }
                }) } 
                className={styles.input} />
            </div>
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </section>
          
          <section className="flex gap-3">
            <div className={`${styles.inputSection} w-1/2`}>
              <div className="flex">
                <label htmlFor="cof" className={`${ styles.label } w-1/2`}>COF #<span className="text-error">*</span></label>
                <input 
                  type="number"
                  id="cof" 
                  { ...register('cof', {
                    required: {
                      value: true,
                      message: "COF # is required"
                    }
                  }) }
                  className={styles.input} />
              </div>
              {errors.cof && <p className={styles.error}>{errors.cof.message}</p>}
            </div>
            
            <div className={`${ styles.inputSection } w-1/2`}>
              <div className="flex">
                <label htmlFor="ordinance" className={`${ styles.label } w-1/2`}>Zoning Ordinance<span className="text-error">*</span></label>
                <select 
                  id="ordinance"
                  { ...register("ordinance", {
                    required: {
                      value: true,
                      message: "Zoning ordinance is required"
                    }
                  }) }
                  className={styles.input}>
                    {ordinanceOptions.map((obj, index) => {
                      return (
                        <option key={`select-option-${ index }`} value={obj.value}>{obj.text}</option>
                      )
                    })}
                  </select>
              </div>
              {errors.ordinance && <p className={styles.error}>{errors.ordinance.message}</p>}
            </div>
          </section>

          <section className="flex gap-3">
            <div className={`${styles.inputSection} w-1/2`}>
              <div className="flex">
                <label htmlFor="approvedBy" className={`${ styles.label } w-1/2`}>Approval By<span className="text-error">*</span></label>
                <select
                  id="approvedBy"
                  { ...register("approval.approvedBy", {
                    required: {
                      value: true,
                      message: "Approval by is required"
                    }
                  }) }
                  className={styles.input}>
                    <option value=""></option>
                    <option value="Admin">Admin</option>
                    <option value="FPMC">FPMC</option>
                </select>
              </div>
              {errors.approval?.approvedBy && <p className={styles.error}>{errors.approval.approvedBy.message}</p>}
            </div>
            
            <div className={`${styles.inputSection} w-1/2`}>
              <div className="flex">
                <label htmlFor="approvalDate" className={`${ styles.label } w-1/2`}>Approval Date<span className="text-error">*</span></label>
                <input 
                  type="date"
                  id="approvalDate" 
                  { ...register("approval.date", {
                    required: {
                      value: true,
                      message: "Approval date is required"
                    }
                  }) }
                  className={styles.input} />
              </div>
              {errors.approval?.date && <p className={styles.error}>{errors.approval.date.message}</p>}
            </div>
          </section>

          <section className="flex gap-3">
            <div className={`${styles.inputSection} w-1/2`}>
              <div className="flex">
                <label htmlFor="10YVesting" className={`${ styles.label } w-1/2`}>10Y Vesting Period</label>
                <input 
                  type="date"
                  id="10YVesting"
                  { ...register("vesting.tenYear.date", {
                    validate: value =>
                      new Date(value as Date) > new Date(dates.fifteenYearDate as Date) ? "10Y vesting date must be before 15Y vesting date" : true
                  }) }
                  className={styles.input} />
              </div>
              {errors.vesting?.tenYear?.date && <p className={styles.error}>{errors.vesting.tenYear.date.message}</p>}
            </div>

            <div className={`${styles.inputSection} w-1/2`}>
              <div className="flex">
                <label htmlFor="15YVesting" className={`${ styles.label } w-1/2`}>15Y Vesting Period</label>
                <input 
                  type="date"
                  id="15YVesting"
                  { ...register("vesting.fifteenYear.date", {
                    validate: value =>
                      new Date(value as Date) < new Date(dates.tenYearDate as Date) ? "15Y vesting date must be after 10Y vesting date" : true
                  }) } 
                  className={styles.input} />
                  {errors.vesting?.fifteenYear?.date && <p className={styles.error}>{errors.vesting.fifteenYear.date.message}</p>}
              </div>
            </div>
          </section>
          
          <section className="flex gap-3">
            <div className={`${styles.inputSection} w-1/2`}>
              <div className="flex">
                <label htmlFor="firstMilestone" className={`${ styles.label } w-1/2`}>Milestone #1<span className="text-error">*</span></label>
                <input 
                  type="date"
                  id="firstMilestone"
                  { ...register("milestones.first.date", {
                    required: {
                      value: true,
                      message: "First milestone is required"
                    },
                    validate: value =>
                      !value || !dates.secondMilestoneDate || new Date(value as Date) > new Date(dates.secondMilestoneDate) ? "First milestone must be before second milestone" : true
                  }) }
                  className={styles.input} />
              </div>
              {errors.milestones?.first?.date && <p className={styles.error}>{errors.milestones.first.date.message}</p>}
            </div>
            
            <div className={`${styles.inputSection} w-1/2`}>
              <div className="flex">
                <label htmlFor="secondMilestone" className={`${ styles.label } w-1/2`}>Milestone #2<span className="text-error">*</span></label>
                <input 
                  type="date"
                  id="secondMilestone"
                  { ...register("milestones.second.date", {
                    required: {
                      value: true,
                      message: "Second milestone is required"
                    },
                    validate: value =>
                      !value || !dates.firstMilestoneDate || new Date(value) < new Date(dates.firstMilestoneDate) ? "Second milestone must be after first milestone" : true
                  }) } 
                  className={styles.input} />
              </div>
              {errors.milestones?.second?.date && <p className={styles.error}>{errors.milestones.second.date.message}</p>}
            </div>
          </section>

          <section className={styles.inputSection}>
            <div className="flex">
              <label htmlFor="notes" className={styles.label}>Notes</label>
              <textarea 
                rows={6}
                id="notes"
                { ...register("notes") }
                className={styles.input}></textarea>
            </div>
          </section>
          
        </div>
        <div className={styles.buttonsContainer}>
          <CancelBtn handleClick={() => navigate('/')} />
          <SaveBtn />
        </div>
      </form>
    </div>
  )
}

export default CreateSitePlanForm