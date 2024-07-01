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
import { Approval, VestingPeriod, Milestone, Notification } from "../../../../context/App/types"
import { UpdatePreliminaryPlatFormProps, UpdatePreliminaryPlatFormState } from './types'

function UpdatePreliminaryPlatForm({ data }: UpdatePreliminaryPlatFormProps) {
  const navigate = useNavigate()

  const user = getUser()

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<UpdatePreliminaryPlatFormState>({
    defaultValues: {
      expired: data.expired,
      name: data.name,
      cof: data.cof,
      ordinance: data.ordinance,
      approval: {
        FPMC: {
          date: data.Approvals.find((obj: Approval) => obj.approvedBy === 'FPMC')?.date ?? undefined,
          uuid: data.Approvals.find((obj: Approval) => obj.approvedBy === 'FPMC')?.uuid ?? ''
        },
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
      <h1 className={styles.title}>Update Preliminary Plat</h1>
      <form onSubmit={handleSubmit(formData => onSubmit(formData, reset, navigate, user.token))} className="w-full">
        <div className={styles.body}>

          <section className="flex gap-1 ml-auto">
            <label htmlFor="expired" className={styles.checkboxLabel}>Project Expired</label>
            <input 
              type="checkbox"
              id="expired"
              className={styles.checkbox}
              {...register('expired')} />
          </section>

          <section className={styles.inputSection}>
            <div className="flex">
              <label htmlFor="name" className={styles.label}>Project Name<span className="text-error">*</span></label>
              <input 
                type="text"
                disabled={values.expired} 
                className={styles.input}
                {...register('name', {
                  required: {
                    value: true,
                    message: "Project name is required"
                  },
                  maxLength: {
                    value: 255,
                    message: "Project name must be 255 characters or less"
                  },
                })} />
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
                  className={styles.input}
                  {...register('cof', {
                    required: {
                      value: true,
                      message: "COF # is required"
                    },
                  })} />
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

          <section className={styles.inputSection}>
            <div className={styles.inputSection}>
              <div className="flex">
                <label htmlFor="fpmcApproval" className={styles.label}>FPMC Approval<span className="text-error">*</span></label>
                <input 
                  type="date"
                  id="fpmcApproval"
                  disabled={values.expired}
                  className={styles.input}
                  {...register("approval.FPMC.date", {
                    required: {
                      value: true,
                      message: "FPMC approval date is required"
                    },
                  })} />
              </div>
              {errors.approval?.FPMC?.date && <p className={styles.error}>{errors.approval.FPMC.date.message}</p>}
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
                  className={styles.input}
                  {...register('vesting.tenYear.date', {
                    validate: value =>
                      new Date(value as Date) > new Date(dates.fifteenYear.date as Date) ? "10Y vesting date must be before 15Y vesting date" : true
                  })} />
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
                  className={styles.input}
                  {...register("vesting.fifteenYear.date", {
                    validate: value =>
                      new Date(value as Date) < new Date(dates.tenYear.date as Date) ? "15Y vesting date must be after 10Y vesting date" : true
                  })} />
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
                    className={styles.input}
                    {...register("milestones.first.date", {
                      required: {
                        value: true,
                        message: "First milestone is required"
                      },
                      validate: value =>
                        !value || new Date(value) > new Date(dates.secondMilestone.date as Date) ? "First milestone must be before second milestone" : true
                    })} />
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
                    className={styles.input}
                    {...register("milestones.first.extension.date", {
                      validate: value =>
                      !dates.firstMilestone.date || new Date(value as Date) < new Date(dates.firstMilestone.date as Date) ? "Extension must be after original milestone date" : true
                    })} />
                </div>
                {dates.firstMilestone.extension.uuid && !values.expired && (
                  <DeleteBtn 
                    label={'Remove Extension'}
                    deleteFn={() => handleDeleteValue('milestones.first.extension.date', dates.firstMilestone.extension.uuid, setValue, user.token)} />
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
                    className={styles.checkbox}
                    {...register('milestones.first.status.achieved')} />
                </div>

                <div className={styles.inputSection}>
                  <label htmlFor="firstMilestoneExpired" className={styles.checkboxLabel}>Expired</label>
                  <input 
                    type="checkbox"
                    id="firstMilestoneExpired"
                    disabled={values.expired}
                    className={styles.checkbox}
                    {...register('milestones.first.status.expired')} />
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
                    className={styles.input}
                    {...register("milestones.second.date", {
                      required: {
                        value: true,
                        message: "Second milestone is required"
                      },
                      validate: value =>
                        !value || new Date(value) < new Date(dates.firstMilestone.date as Date) ? "Second milestone must be after first milestone" : true
                    })} />
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
                    className={styles.input}
                    {...register("milestones.second.extension.date", {
                      validate: value =>
                      !dates.secondMilestone.date || new Date(value) < new Date(dates.secondMilestone.date as Date) ? "Extension must be after original milestone date" : true
                    })} />
                </div>
                {dates.secondMilestone.extension.uuid && !values.expired && (
                  <DeleteBtn
                    label={'Remove Extension'}
                    deleteFn={() => handleDeleteValue('milestones.second.extension.date', dates.secondMilestone.extension.uuid, setValue, user.token)} />
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
                    className={styles.checkbox}
                    {...register('milestones.second.status.achieved')} />
                </div>

                <div className={styles.inputSection}>
                  <label htmlFor="secondMilestoneExpired" className={styles.checkboxLabel}>Expired</label>
                  <input 
                    type="checkbox"
                    id="secondMilestoneExpired"
                    disabled={values.expired}
                    className={styles.checkbox}
                    {...register('milestones.second.status.expired')} />
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
                    className={styles.input}
                    {...register("notifications.initial.date")} />
                </div>
                {dates.initialNotification && !values.expired && (
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
                    className={styles.input}
                    {...register("notifications.lastCall.date")} />
                </div>
                {dates.lastCallNotification.date && !values.expired && (
                  <DeleteBtn
                    label={'Remove Notification'}
                    deleteFn={() => handleDeleteValue('notifications.initial.date', dates.lastCallNotification.uuid, setValue, user.token)} />
                )}
              </div>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="lostVestingNotification" className={`${ styles.label } flex-1`}>Lost Vesting</label>
                  <input 
                    type="date"
                    id="lostVestingNotification"
                    disabled={values.expired}
                    className={styles.input}
                    {...register("notifications.lostVesting.date")} />
                </div>
                {dates.lostVestingNotification.date && !values.expired && (
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
                className={styles.input}
                {...register("notes")}></textarea>
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

export default UpdatePreliminaryPlatForm
