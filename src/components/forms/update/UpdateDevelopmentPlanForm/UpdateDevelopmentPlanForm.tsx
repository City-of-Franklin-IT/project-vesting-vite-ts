import { useNavigate } from "react-router-dom"
import { ordinanceOptions } from "../../../../utils"
import { useUpdateDevelopmentPlanForm, onSubmit, useSetDatesObj, useExpireProject, useMilestoneExt, handleDeleteValue } from "."
import styles from '../../Forms.module.css'

// Components
import DeleteBtn from "../../../buttons/DeleteBtn/DeleteBtn"
import SaveBtn from "../../../buttons/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/CancelBtn/CancelBtn"
import DeleteProjectBtn from "../../../buttons/DeleteProjectBtn/DeleteProjectBtn"

// Types
import { UpdateDevelopmentPlanFormProps } from "./types"

function UpdateDevelopmentPlanForm({ data }: UpdateDevelopmentPlanFormProps) {
  const navigate = useNavigate()

  const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useUpdateDevelopmentPlanForm(data) // useForm

  const values = watch()

  const dates = useSetDatesObj(values)

  useExpireProject(values, { setValue }) // Handle project expiration

  useMilestoneExt(values.milestones, { setValue }) // Set second milestone on first milestone extension change

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Update Development Plan</h1>
      <form onSubmit={handleSubmit(formData => onSubmit(formData, { reset, navigate }))} className="w-full">
        <div className={styles.body}>

          <section className="flex gap-1 ml-auto">
            <label htmlFor="expired" className={styles.checkboxLabel}>Project Expired</label>
            <input 
              type="checkbox"
              id="expired"
              {...register('expired')}
              className={styles.checkbox} />
          </section>

          <section className={styles.inputSection}>
            <div className="flex">
              <label htmlFor="name" className={styles.label}>Project Name<span className="text-error">*</span></label>
              <input 
                type="text"
                id="name"
                disabled={values.expired}
                {...register('name', {
                  required: {
                    value: true,
                    message: "Project name is required"
                  },
                  maxLength: {
                    value: 255,
                    message: "Project name must be 255 characters or less"
                  },
                })} 
                className={styles.input} />
            </div>
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </section>

          <section className={styles.inputSection}>
            <div className="flex">
              <label htmlFor="cof" className={styles.label}>COF #<span className="text-error">*</span></label>
              <input 
                type="number"
                id="cof"
                disabled={values.expired}
                {...register('cof', {
                  required: {
                    value: true,
                    message: "COF # is required"
                  },
                })}
                className={styles.input} />
            </div>
            {errors.cof && <p className={styles.error}>{errors.cof.message}</p>}
          </section>

          <section className="flex gap-3">
            <div className={`${ styles.inputSection } w-1/2`}>
              <div className="flex">
                <label htmlFor="resolution" className={`${ styles.label } w-1/2`} 
                >Resolution #<span className="text-error">*</span></label>
                <input 
                  type="text"
                  id="resolution"
                  disabled={values.expired} 
                  {...register("resolution.resolution", {
                    required: {
                      value: true,
                      message: "Resolution is required"
                    },
                    maxLength: {
                      value: 10,
                      message: "Resolution must be 10 character or less"
                    }
                  })}
                  className={styles.input} />
              </div>
              {errors.resolution?.resolution && <p className={styles.error}>{errors.resolution.resolution.message}</p>}
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

          <section className="flex gap-2">
            <div className={`${ styles.inputSection } w-1/2`}>
              <div className="flex">
                <label htmlFor="fpmcApproval" className={`${ styles.label } w-1/2`}>FPMC Approval<span className="text-error">*</span></label>
                <input 
                  type="date"
                  id="fpmcApproval"
                  disabled={values.expired}
                  {...register("approval.FPMC.date", {
                    required: {
                      value: true,
                      message: "FPMC approval date is required"
                    },
                    validate: value =>
                      !value || new Date(value) > new Date(dates.BOMA.date as Date) ? "FPMC approval date must be before BOMA approval date" : true
                  })}
                  className={styles.input} />
              </div>
              {errors.approval?.FPMC?.date && <p className={styles.error}>{errors.approval.FPMC.date.message}</p>}
            </div>
            
            <div className={`${ styles.inputSection } w-1/2`}>
              <div className="flex">
                <label htmlFor="bomaApproval" className={`${ styles.label } w-1/2`}>BOMA Approval<span className="text-error">*</span></label>
                <input 
                  type="date"
                  id="bomaApproval"
                  disabled={values.expired}
                  {...register("approval.BOMA.date", {
                    required: {
                      value: true,
                      message: "BOMA approval date is required"
                    },
                    validate: value => 
                      !value || new Date(value) < new Date(dates.FPMC.date as Date) ? "BOMA approval date must be after FPMC approval date" : true
                  })}
                  className={styles.input} />
              </div>
              {errors.approval?.BOMA?.date && <p className={styles.error}>{errors.approval.BOMA.date.message}</p>}
            </div>
          </section>

          <div className={styles.sectionHeader}>Vesting</div>
          <section className="flex gap-2">
            <div className={styles.groupedSection}>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="10YVesting" className={`${ styles.label } w-1/2`}>10Y Vesting Period</label>
                  <input 
                  type="date"
                  id="10YVesting"
                  disabled={values.expired}
                  {...register("vesting.tenYear.date", {
                    validate: value =>
                      value && (new Date(value as Date) > new Date(dates.fifteenYear.date as Date)) ? "10Y vesting date must be before 15Y vesting date" : true
                  })}
                  className={styles.input} />
                </div>
                {dates.tenYear.uuid && !values.expired && (
                  <DeleteBtn
                    label={'Remove Vesting Period'}
                    deleteFn={() => handleDeleteValue('vesting.tenYear.date', dates.tenYear.uuid, { setValue })} />
                )}
                {errors.vesting?.tenYear?.date && <p className={styles.error}>{errors.vesting.tenYear.date.message}</p>}
              </div>

              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="10YVestingExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
                  <input 
                    type="date"
                    id="10YVestingExt"
                    disabled={values.expired}
                    {...register("vesting.tenYear.extension.date", {
                      validate: value =>
                      new Date(value as Date) < new Date(dates.tenYear.date as Date) ? "Extension must be after original vesting date" : true
                    })}
                    className={styles.input} />
                </div>
                {dates.tenYear?.extension?.uuid && !values.expired && (
                  <DeleteBtn 
                    label={'Remove Extension'}
                    deleteFn={() => handleDeleteValue('vesting.tenYear.extension.date', dates.tenYear.extension.uuid, { setValue })} />
                )}
                {errors.vesting?.tenYear?.extension?.date && <p className={styles.error}>{errors.vesting.tenYear.extension.date.message}</p>}
              </div>
              
              <div className="flex py-6 justify-evenly">
                <div className={styles.inputSection}>
                  <label htmlFor="10YAchieved" className={styles.checkboxLabel}>Achieved</label>
                  <input 
                    type="checkbox"
                    id="10YAchieved"
                    disabled={values.expired}
                    {...register('vesting.tenYear.status.achieved', {
                      validate: value =>
                        value && watch("vesting.tenYear.status.expired") ? "Vesting cannot be both achieved and expired" : true
                    })}
                    className={styles.checkbox} />
                </div>

                <div className={styles.inputSection}>
                  <label htmlFor="10YExpired" className={styles.checkboxLabel}>Expired</label>
                  <input 
                    type="checkbox"
                    id="10YExpired"
                    disabled={values.expired}
                    {...register('vesting.tenYear.status.expired')}
                    className={styles.checkbox} />
                </div>
              </div>
              
              {errors.vesting?.tenYear?.status?.achieved && (
                <div className="m-auto">
                  <p className={styles.error}>{errors.vesting?.tenYear?.status?.achieved.message }</p>
                </div>
              )}
            </div>

            <div className={styles.groupedSection}>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="15YVesting" className={`${ styles.label } w-1/2`}>15Y Vesting Period</label>
                  <input 
                    type="date"
                    id="15YVesting"
                    disabled={values.expired}
                    {...register('vesting.fifteenYear.date', {
                      validate: value =>
                        value && (new Date(value) < new Date(dates.tenYear.date as Date)) ? "15Y vesting period must be after 10Y" : true
                    })} 
                    className={styles.input} />
                </div>
                {dates.fifteenYear.uuid && !values.expired && (
                  <DeleteBtn
                    label={'Remove Vesting Period'}
                    deleteFn={() => handleDeleteValue('vesting.fifteenYear.date', dates.fifteenYear.uuid, { setValue })} />
                )}
                {errors.vesting?.fifteenYear?.date && <p className={styles.error}>{errors.vesting?.fifteenYear?.date.message}</p>}
              </div>

              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="15YExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
                  <input 
                    type="date"
                    id="15YExt"
                    disabled={values.expired}
                    {...register('vesting.fifteenYear.extension.date', {
                      validate: value =>
                      value && (new Date(value) < new Date(dates.fifteenYear.date || '')) ? "Extension must be after original vesting date" : true
                    })}
                    className={styles.input} />
                </div>
                {dates.fifteenYear.extension.uuid && !values.expired && (
                  <DeleteBtn
                    label={'Remove Extension'}
                    deleteFn={() => handleDeleteValue('vesting.fifteenYear.extension.date', dates.fifteenYear.extension.uuid, { setValue })} />
                )}
                {errors.vesting?.fifteenYear?.extension?.date && <p className={styles.error}>{errors.vesting?.fifteenYear?.extension?.date.message}</p>}
              </div>

              <div className="flex py-6 justify-evenly">
                <div className={styles.inputSection}>
                  <label htmlFor="15YAchieved" className={styles.checkboxLabel}>Achieved</label>
                  <input 
                    type="checkbox"
                    id="15YAchieved"
                    disabled={values.expired}
                    {...register('vesting.fifteenYear.status.achieved', {
                      validate: value =>
                        value && watch('vesting.fifteenYear.status.expired') ? "Cannot be both achieved and expired" : true
                    })}
                    className={styles.checkbox} />
                </div>

                <div className={styles.inputSection}>
                  <label htmlFor="15YExpired" className={styles.checkboxLabel}>Expired</label>
                  <input 
                    type="checkbox"
                    id="15YExpired"
                    disabled={values.expired}
                    {...register('vesting.fifteenYear.status.expired')}
                    className={styles.checkbox} />
                </div>
              </div>
              {errors.vesting?.fifteenYear?.status?.achieved && (
                <div className="m-auto">
                  <p className={styles.error}>{errors.vesting?.fifteenYear?.status?.achieved.message }</p>
                </div>
              )}
            </div>
          </section>

          <div className={styles.sectionHeader}>Milestones</div>
          <section className="flex gap-2">
            <div className={styles.groupedSection}>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="firstMilestone" className={`${ styles.label } w-1/2`}>Milestone #1<span className="text-error">*</span></label>
                  <input 
                    type="date"
                    id="firstMilestone"
                    disabled={values.expired}
                    {...register("milestones.first.date", {
                      required: {
                        value: true,
                        message: "First milestone is required"
                      },
                      validate: value =>
                        !value || new Date(value) > new Date(dates.secondMilestone.date as Date) ? "First milestone must be before second milestone" : true
                    })}
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
                    {...register("milestones.first.extension.date", {
                      validate: value =>
                      !dates.firstMilestone.date || new Date(value as Date) < new Date(dates.firstMilestone.date as Date) ? "Extension must be after original milestone date" : true
                    })}
                    className={styles.input} />
                </div>
                {dates.firstMilestone.extension.uuid && !values.expired && (
                  <DeleteBtn 
                    label={'Remove Extension'}
                    deleteFn={() => handleDeleteValue('milestones.first.extension.date', dates.firstMilestone.extension.uuid, { setValue })} />
                )}
                {errors.milestones?.first?.extension && <p className={styles.error}>{errors.milestones.first.extension.message}</p>}
              </div>
              
              <div className="flex py-6 justify-evenly">
                <div className={styles.inputSection}>
                  <label htmlFor="firstMilestoneAchieved" className={styles.checkboxLabel}>Achieved</label>
                  <input 
                    type="checkbox"
                    id="firstMilestoneAchieved"
                    disabled={values.expired}
                    {...register('milestones.first.status.achieved', {
                      validate: value =>
                        value && watch("milestones.first.status.expired") ? "Milestone cannot be both achieved and expired" : true
                    })}
                    className={styles.checkbox} />
                </div>

                <div className={styles.inputSection}>
                  <label htmlFor="firstMilestoneExpired" className={styles.checkboxLabel}>Expired</label>
                  <input 
                    type="checkbox"
                    id="firstMilestoneExpired"
                    disabled={values.expired}
                    {...register('milestones.first.status.expired')}
                    className={styles.checkbox} />
                </div>
              </div>
              
              {errors.milestones?.first?.status?.achieved && (
                <div className="m-auto">
                  <p className={styles.error}>{errors.milestones.first.status.achieved.message }</p>
                </div>
              )}
            </div>

            <div className={styles.groupedSection}>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="secondMilestone" className={`${ styles.label } w-1/2`}>Milestone #2<span className="text-error">*</span></label>
                  <input 
                    type="date"
                    id="secondMilestone"
                    disabled={values.expired}
                    {...register("milestones.second.date", {
                      required: {
                        value: true,
                        message: "Second milestone is required"
                      },
                      validate: value =>
                        !value || new Date(value) < new Date(dates.firstMilestone.date as Date) ? "Second milestone must be after first milestone" : true
                    })} 
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
                    {...register("milestones.second.extension.date", {
                      validate: value =>
                      !dates.secondMilestone.date || new Date(value) < new Date(dates.secondMilestone.date as Date) ? "Extension must be after original milestone date" : true
                    })}
                    className={styles.input} />
                </div>
                {dates.secondMilestone.extension.uuid && !values.expired && (
                  <DeleteBtn
                    label={'Remove Extension'}
                    deleteFn={() => handleDeleteValue('milestones.second.extension.date', dates.secondMilestone.extension.uuid, { setValue })} />
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
                    {...register('milestones.second.status.achieved', {
                      validate: value =>
                        value && watch("milestones.second.status.expired") ? "Milestone cannot be both achieved and expired" : true
                    })}
                    className={styles.checkbox} />
                </div>

                <div className={styles.inputSection}>
                  <label htmlFor="secondMilestoneExpired" className={styles.checkboxLabel}>Expired</label>
                  <input 
                    type="checkbox"
                    id="secondMilestoneExpired"
                    disabled={values.expired}
                    {...register('milestones.second.status.expired')}
                    className={styles.checkbox} />
                </div>
              </div>
              {errors.milestones?.second?.status?.achieved && (
                <div className="m-auto">
                  <p className={styles.error}>{errors.milestones.second.status.achieved.message }</p>
                </div>
              )}
            </div>
          </section>

          <div className={styles.sectionHeader}>Notifications</div>
          <section className="flex">
            <div className={`${ styles.groupedSection } flex-row mb-8 justify-evenly flex-wrap`}>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="initialNotification" className={`${ styles.label } flex-1`}>Initial</label>
                  <input 
                    type="date"
                    id="initialNotification"
                    disabled={values.expired}
                    {...register("notifications.initial.date")}
                    className={styles.input} />
                </div>
                {dates.initialNotification.uuid && !values.expired && (
                  <DeleteBtn
                    label={'Remove Notification'}
                    deleteFn={() => handleDeleteValue('notifications.initial.date', dates.initialNotification.uuid, { setValue })} />
                )}
              </div>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="lastCallNotification" className={`${ styles.label } flex-1`}>Last Call</label>
                  <input 
                    type="date"
                    id="lastCallNotification"
                    disabled={values.expired}
                    {...register("notifications.lastCall.date")}
                    className={styles.input} />
                </div>
                {dates.lastCallNotification.uuid && !values.expired && (
                  <DeleteBtn
                    label={'Remove Notification'}
                    deleteFn={() => handleDeleteValue('notifications.lastCall.date', dates.lastCallNotification.uuid, { setValue })} />
                )}
              </div>
              <div className={styles.inputSection}>
                <div className="flex">
                  <label htmlFor="lostVestingNotification" className={`${ styles.label } flex-1`}>Lost Vesting</label>
                  <input 
                    type="date"
                    id="lostVestingNotification"
                    disabled={values.expired}
                    {...register("notifications.lostVesting.date")}
                    className={styles.input} />
                </div>
                {dates.lostVestingNotification.uuid && !values.expired && (
                  <DeleteBtn
                    label={'Remove Notification'}
                    deleteFn={() => handleDeleteValue('notifications.lostVesting.date', dates.lostVestingNotification.uuid, { setValue })} />
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
                {...register("notes")}
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

export default UpdateDevelopmentPlanForm