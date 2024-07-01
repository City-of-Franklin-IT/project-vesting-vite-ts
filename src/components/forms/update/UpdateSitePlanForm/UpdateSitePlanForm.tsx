import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { ordinanceOptions } from "../../../../utils"
import { getUser } from "../../../../helpers"
import { onSubmit, useSetDatesObj, useExpireProject, useMilestoneExt, handleDeleteValue } from '.'
import styles from '../../Forms.module.css'

// Components
import DeleteBtn from "../../../buttons/DeleteBtn/DeleteBtn"
import SaveBtn from "../../../buttons/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/CancelBtn/CancelBtn"
import DeleteProjectBtn from "../../../buttons/DeleteProjectBtn/DeleteProjectBtn"

// Types
import { VestingPeriod, Milestone, Notification } from "../../../../context/App/types"
import { UpdateSitePlanFormProps, UpdateSitePlanFormState } from './types'


function UpdateSitePlanForm({ data }: UpdateSitePlanFormProps) {
  const navigate = useNavigate()

  const user = getUser()

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<UpdateSitePlanFormState>({
    defaultValues: {
      expired: data.expired,
      name: data.name,
      cof: data.cof,
      ordinance: data.ordinance,
      approval: {
        approvedBy: data.Approvals[0].approvedBy,
        date: data.Approvals[0].date ?? undefined,
        uuid: data.Approvals[0].uuid ?? ''
      },
      vesting: {
        tenYear: {
          date: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.date ?? undefined,
          uuid: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.uuid ?? ''
        },
        fifteenYear: {
          date: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.date ?? undefined,
          uuid: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.uuid ?? ''
        }
      },
      milestones: {
        first: {
          date: data.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.date ?? undefined,
          uuid: data.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.uuid ?? '',
          status: {
            achieved: data.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.MilestoneStatus.achieved,
            expired: data.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.MilestoneStatus.expired,
            uuid: data.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.MilestoneStatus.uuid
          },
          extension: {
            date: data.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.Extension?.date ?? undefined,
            uuid: data.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.Extension?.uuid ?? ''
          }
        },
        second: {
          date: data.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.date ?? undefined,
          uuid: data.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.uuid ?? '',
          status: {
            achieved: data.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.MilestoneStatus.achieved,
            expired: data.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.MilestoneStatus.expired,
            uuid: data.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.MilestoneStatus.uuid ?? ''
          },
          extension: {
            date: data.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.Extension?.date ?? undefined,
            uuid: data.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.Extension?.uuid ?? ''
          }
        }
      },
      notifications: {
        initial: {
          date: data.Notifications.find((obj: Notification) => obj.type === 'Initial')?.date ?? undefined,
          type: 'Initial',
          uuid: data.Notifications.find((obj: Notification) => obj.type === 'Initial')?.uuid ?? ''
        },
        lastCall: {
          date: data.Notifications.find((obj: Notification) => obj.type === 'Last Call')?.date ?? undefined,
          type: 'Last Call',
          uuid: data.Notifications.find((obj: Notification) => obj.type === 'Last Call')?.uuid ?? ''
        },
        lostVesting: {
          date: data.Notifications.find((obj: Notification) => obj.type === 'Lost Vesting')?.date ?? undefined,
          type: 'Lost Vesting',
          uuid: data.Notifications.find((obj: Notification) => obj.type === 'Lost Vesting')?.uuid ?? ''
        }
      },
      notes: data.notes,
      uuid: data.uuid
    }
  })

  const values = watch()

  const dates = useSetDatesObj(values)

  const expireProject = useExpireProject(values.expired, values.milestones, setValue)

  const handleMilestoneExt = useMilestoneExt(values.milestones, setValue)

  useEffect(() => { // Handle expired project
    expireProject()
  }, [values.expired])

  useEffect(() => { // Handle first milestone extension
    handleMilestoneExt()
  }, [values.milestones.first.extension.date])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Update Site Plan</h1>
      <form onSubmit={handleSubmit(formData => onSubmit(formData, reset, navigate, user.token))} className="w-full">
        <div className={styles.body}>

          <section className="flex gap-1 ml-auto">
            <label htmlFor="expired" className={styles.checkboxLabel}>Project Expired</label>
            <input 
              type="checkbox"
              id="expired"
              { ...register('expired') }
              className={styles.checkbox} />
          </section>

          <section className={styles.inputSection}>
            <div className="flex">
              <label htmlFor="name" className={styles.label}>Project Name<span className="text-error">*</span></label>
              <input 
                type="text"
                disabled={values.expired} 
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
            <div className={`${ styles.inputSection } w-1/2`}>
              <div className="flex">
                <label htmlFor="cof" className={`${ styles.label } w-1/2`}>COF #<span className="text-error">*</span></label>
                <input 
                  type="number"
                  id="cof"
                  disabled={values.expired}
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
            <div className={`${ styles.inputSection } w-1/2`}>
              <div className="flex">
                <label htmlFor="approvedBy" className={`${ styles.label } w-1/2`}>Approval By<span className="text-error">*</span></label>
                <select
                  id="approvedBy"
                  disabled={values.expired}
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
            
            <div className={`${ styles.inputSection } w-1/2`}>
              <div className="flex">
                <label htmlFor="approvalDate" className={`${ styles.label } w-1/2`}>Approval Date<span className="text-error">*</span></label>
                <input 
                  type="date"
                  id="approvalDate" 
                  disabled={values.expired}
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
            <div className={`${ styles.inputSection } w-1/2`}>
              <div className="flex">
                <label htmlFor="10YVesting" className={`${ styles.label } w-1/2`}>10Y Vesting Period</label>
                <input 
                  type="date"
                  id="10YVesting"
                  disabled={values.expired}
                  { ...register('vesting.tenYear.date', {
                    validate: value =>
                      new Date(value as Date) > new Date(dates.fifteenYear.date as Date) ? "10Y vesting date must be before 15Y vesting date" : true
                  }) }
                  className={styles.input} />
              </div>
              {dates.tenYear.uuid && !values.expired && (
                <DeleteBtn
                  label={'Remove Vesting Period'}
                  deleteFn={() => handleDeleteValue('vesting.tenYear.date', dates.tenYear.uuid, setValue, user.token)} />
              )}
              {errors.vesting?.tenYear?.date && <p className={styles.error}>{errors.vesting.tenYear.date.message}</p>}
            </div>

            <div className={`${ styles.inputSection } w-1/2`}>
              <div className="flex">
                <label htmlFor="15YVesting" className={`${ styles.label } w-1/2`}>15Y Vesting Period</label>
                <input 
                  type="date"
                  id="15YVesting"
                  disabled={values.expired}
                  { ...register("vesting.fifteenYear.date", {
                    validate: value =>
                      new Date(value as Date) < new Date(dates.tenYear.date as Date) ? "15Y vesting date must be after 10Y vesting date" : true
                  }) } 
                  className={styles.input} />
              </div>
              {dates.fifteenYear.uuid && !values.expired && (
                <DeleteBtn
                  label={'Remove Vesting Period'}
                  deleteFn={() => handleDeleteValue('vesting.fifteenYear.date', dates.fifteenYear.uuid, setValue, user.token)} />
              )}
              {errors.vesting?.fifteenYear?.date && <p className={styles.error}>{errors.vesting.fifteenYear.date.message}</p>}
            </div>
          </section>

          <div className={styles.sectionHeader}>Milestones</div>
          <section className="flex gap-8">
            <div className={styles.groupedSection}>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="firstMilestone" className={`${ styles.label } w-1/2`}>Milestone #1<span className="text-error">*</span></label>
                  <input 
                    type="date"
                    id="firstMilestone"
                    disabled={values.expired}
                    { ...register("milestones.first.date", {
                      required: {
                        value: true,
                        message: "First milestone is required"
                      },
                      validate: value =>
                        !value || !dates.secondMilestone.date || new Date(value) > new Date(dates.secondMilestone.date as Date) ? "First milestone must be before second milestone" : true
                    }) }
                    className={styles.input} />
                </div>
                {errors.milestones?.first?.date && <p className={styles.error}>{errors.milestones.first.date.message}</p>}
              </div>

              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="firstMilestoneExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
                  <input 
                    type="date"
                    id="firstMilestoneExt"
                    disabled={values.expired}
                    { ...register("milestones.first.extension.date", {
                      validate: value =>
                      !dates.firstMilestone.date || new Date(value as Date) < new Date(dates.firstMilestone.date as Date) ? "Extension must be after original milestone date" : true
                    }) }
                    className={styles.input} />
                </div>
                {dates.firstMilestone.extension.uuid && !values.expired && (
                  <DeleteBtn 
                    label={'Remove Extension'}
                    deleteFn={() => handleDeleteValue('milestones.first.date', dates.firstMilestone.uuid, setValue, user.token)} />
                )}
                {errors.milestones?.first?.extension?.date && <p className={styles.error}>{errors.milestones.first.extension.date.message}</p>}
              </div>
              
              <div className="flex py-6 justify-evenly">
                <div className={styles.inputSection}>
                  <label htmlFor="firstMilestoneAchieved" className={styles.checkboxLabel}>Achieved</label>
                  <input 
                    type="checkbox"
                    id="firstMilestoneAchieved"
                    disabled={values.expired}
                    { ...register('milestones.first.status.achieved') }
                    className={styles.checkbox} />
                </div>

                <div className={styles.inputSection}>
                  <label htmlFor="firstMilestoneExpired" className={styles.checkboxLabel}>Expired</label>
                  <input 
                    type="checkbox"
                    id="firstMilestoneExpired"
                    disabled={values.expired}
                    { ...register('milestones.first.status.expired') }
                    className={styles.checkbox} />
                </div>
              </div>
            </div>

            <div className={styles.groupedSection}>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="secondMilestone" className={`${ styles.label } w-1/2`}>Milestone #2<span className="text-error">*</span></label>
                  <input 
                    type="date"
                    id="secondMilestone"
                    disabled={values.expired}
                    { ...register("milestones.second.date", {
                      required: {
                        value: true,
                        message: "Second milestone is required"
                      },
                      validate: value =>
                        !value || !dates.firstMilestone.date || new Date(value) < new Date(dates.firstMilestone.date as Date) ? "Second milestone must be after first milestone" : true
                    }) } 
                    className={styles.input} />
                </div>
                {errors.milestones?.second?.date && <p className={styles.error}>{errors.milestones.second.date.message}</p>}
              </div>

              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="secondMilestoneExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
                  <input 
                    type="date"
                    id="secondMilestoneExt"
                    disabled={values.expired}
                    { ...register("milestones.second.extension.date", {
                      validate: value =>
                      !dates.secondMilestone.date || new Date(value) < new Date(dates.secondMilestone.date as Date) ? "Extension must be after original milestone date" : true
                    }) }
                    className={styles.input} />
                </div>
                {dates.secondMilestone.extension.uuid && !values.expired && (
                  <DeleteBtn
                    label={'Remove Extension'}
                    deleteFn={() => handleDeleteValue('milestones.second.date', dates.secondMilestone.uuid, setValue, user.token)} />
                )}
                {errors.milestones?.second?.extension?.date && <p className={styles.error}>{errors.milestones.second.extension.date.message}</p>}
              </div>

              <div className="flex py-6 justify-evenly">
                <div className={styles.inputSection}>
                  <label htmlFor="secondMilestoneAchieved" className={styles.checkboxLabel}>Achieved</label>
                  <input 
                    type="checkbox"
                    id="secondMilestoneAchieved"
                    disabled={values.expired}
                    { ...register('milestones.second.status.achieved') }
                    className={styles.checkbox} />
                </div>

                <div className={styles.inputSection}>
                  <label htmlFor="secondMilestoneExpired" className={styles.checkboxLabel}>Expired</label>
                  <input 
                    type="checkbox"
                    id="secondMilestoneExpired"
                    disabled={values.expired}
                    { ...register('milestones.second.status.expired') }
                    className={styles.checkbox} />
                </div>
              </div>
            </div>
          </section>

          <div className={styles.sectionHeader}>Notifications</div>
          <section className="flex">
            <div className={`${ styles.groupedSection } flex-row mb-8 justify-evenly`}>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="initialNotification" className={`${ styles.label } flex-1`}>Initial</label>
                  <input 
                    type="date"
                    id="initialNotification"
                    disabled={values.expired}
                    { ...register("notifications.initial.date") }
                    className={styles.input} />
                </div>
                {dates.initialNotification.uuid && !values.expired && (
                  <DeleteBtn
                    label={'Remove Notification'}
                    deleteFn={() => handleDeleteValue('notifications.initial.date', dates.initialNotification.uuid, setValue, user.token)} />
                )}
              </div>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="lastCallNotification" className={`${ styles.label } flex-1`}>Last Call</label>
                  <input 
                    type="date"
                    id="lastCallNotification"
                    disabled={values.expired}
                    { ...register("notifications.lastCall.date") }
                    className={styles.input} />
                </div>
                {dates.lastCallNotification.uuid && !values.expired && (
                  <DeleteBtn
                    label={'Remove Notification'}
                    deleteFn={() => handleDeleteValue('notifications.lastCall.date', dates.lastCallNotification.uuid, setValue, user.token)} />
                )}
              </div>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="lostVestingNotification" className={`${ styles.label } flex-1`}>Lost Vesting</label>
                  <input 
                    type="date"
                    id="lostVestingNotification"
                    disabled={values.expired}
                    { ...register("notifications.lostVesting.date") }
                    className={styles.input} />
                </div>
                {dates.lastCallNotification.uuid && !values.expired && (
                  <DeleteBtn
                    label={'Remove Notification'}
                    deleteFn={() => handleDeleteValue('notifications.lostVesting.date', dates.lostVestingNotification.uuid, setValue, user.token)} />
                )}
              </div>
            </div>
          </section>

          <section className={styles.inputSection}>
            <div className="flex">
              <label htmlFor="notes" className={styles.label}>Notes</label>
              <textarea 
                rows={6}
                disabled={values.expired}
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
      <div className="mt-8 ml-auto">
        <DeleteProjectBtn uuid={data.uuid} />
      </div>
    </div>
  )
}

export default UpdateSitePlanForm
