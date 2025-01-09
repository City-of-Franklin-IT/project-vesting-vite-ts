import { useUpdateDevelopmentPlanFormContext } from "./hooks"
import { handleDeleteValue } from "./utils"
import styles from '../../Forms.module.css'

// Components
import DeleteBtn from "../../../buttons/DeleteBtn/DeleteBtn"
import FormError from "../../FormError/FormError"

export const ExpiredCheckbox = () => { // Project expired checkbox
  const { methods } = useUpdateDevelopmentPlanFormContext()

  return (
    <div className="flex gap-1 ml-auto">
      <label htmlFor="expired" className={styles.checkboxLabel}>Project Expired</label>
      <input 
        type="checkbox"
        id="expired"
        {...methods.register('expired')}
        className="checkbox checkbox-secondary" />
    </div>
  )
}

export const TenYearVestingExtensionInput = () => { // Ten year vesting period extension input
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  const tenYear = methods.watch('vesting.tenYear.date')

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="10YVestingExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
        <input 
          type="date"
          id="10YVestingExt"
          disabled={disabled}
          {...methods.register("vesting.tenYear.extension.date", {
            validate: value =>
            new Date(value as Date) < new Date(tenYear as Date) ? "Extension must be after original vesting date" : true
          })}
          className={styles.input} />
      </div>
      <DeleteTenYearExtensionBtn />
      <FormError field={'vesting.tenYear.extension.date'} />
    </div>
  )
}

export const TenYearVestingAchievedCheckbox = () => { // Ten year vesting period achieved checkbox
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="10YAchieved" className={styles.checkboxLabel}>Achieved</label>
      <input 
        type="checkbox"
        id="10YAchieved"
        disabled={disabled}
        {...methods.register('vesting.tenYear.status.achieved', {
          validate: value =>
            value && methods.watch("vesting.tenYear.status.expired") ? "Vesting cannot be both achieved and expired" : true
        })}
        className="checkbox checkbox-secondary" />
      <FormError field={'vesting.tenYear.status.achieved'} />
    </div>
  )
}

export const TenYearVestingExpiredCheckbox = () => { // Ten year vesting period expired checkbox
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="10YExpired" className={styles.checkboxLabel}>Expired</label>
      <input 
        type="checkbox"
        id="10YExpired"
        disabled={disabled}
        {...methods.register('vesting.tenYear.status.expired')}
        className="checkbox checkbox-secondary" />
    </div>
  )
}

export const FifteenYearVestingExtensionInput = () => { // Fifteen year vesting period extension input
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  const fifteenYear = methods.watch('vesting.fifteenYear.date')

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="15YExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
        <input 
          type="date"
          id="15YExt"
          disabled={disabled}
          {...methods.register('vesting.fifteenYear.extension.date', {
            validate: value =>
            value && (new Date(value) < new Date(fifteenYear || '')) ? "Extension must be after original vesting date" : true
          })}
          className={styles.input} />
      </div>
      <DeleteFifteenTearExtensionBtn />
      <FormError field={'vesting.fifttenYear.extension.date'} />
    </div>
  )
}

export const FifteenYearVestingAchievedCheckbox = () => { // Fifteen year vesting achieved checkbox
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="15YAchieved" className={styles.checkboxLabel}>Achieved</label>
      <input 
        type="checkbox"
        id="15YAchieved"
        disabled={disabled}
        {...methods.register('vesting.fifteenYear.status.achieved', {
          validate: value =>
            value && methods.watch('vesting.fifteenYear.status.expired') ? "Cannot be both achieved and expired" : true
        })}
        className="checkbox checkbox-secondary" />
      <FormError field={'vesting.fifteenYear.status.achieved'} />
    </div>
  )
}

export const FifteenYearVestingExpiredCheckbox = () => { // Fifteen year vesting expired checkbox
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="15YExpired" className={styles.checkboxLabel}>Expired</label>
      <input 
        type="checkbox"
        id="15YExpired"
        disabled={disabled}
        {...methods.register('vesting.fifteenYear.status.expired')}
        className="checkbox checkbox-secondary" />
    </div>
  )
}

export const FirstMilestoneExtensionInput = () => { // 
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  const firstMilestone = methods.watch('milestones.first.date')

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="firstMilestoneExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
        <input 
          type="date"
          id="firstMilestoneExt"
          disabled={disabled}
          {...methods.register("milestones.first.extension.date", {
            validate: value =>
            !firstMilestone || new Date(value as Date) < new Date(firstMilestone as Date) ? "Extension must be after original milestone date" : true
          })}
          className={styles.input} />
      </div>
      <FirstMilestoneExtensionDeleteBtn />
      <FormError field={'milestones.first.extension.date'} />
    </div>
  )
}

export const FirstMilestoneAchievedCheckbox = () => { // First milestone achieved checkbox
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="firstMilestoneAchieved" className={styles.checkboxLabel}>Achieved</label>
      <input 
        type="checkbox"
        id="firstMilestoneAchieved"
        disabled={disabled}
        {...methods.register('milestones.first.status.achieved', {
          validate: value =>
            value && methods.watch("milestones.first.status.expired") ? "Milestone cannot be both achieved and expired" : true
        })}
        className="checkbox checkbox-secondary" />
      <FormError field={'milestones.first.status.achieved'} />
    </div>
  )
}

export const FirstMilestoneExpiredCheckbox = () => { // First milestone expired checkbox
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="firstMilestoneExpired" className={styles.checkboxLabel}>Expired</label>
      <input 
        type="checkbox"
        id="firstMilestoneExpired"
        disabled={disabled}
        {...methods.register('milestones.first.status.expired')}
        className="checkbox checkbox-secondary" />
    </div>
  )
}

export const SecondMilestoneExtensionInput = () => { // Second milsetone extension 
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  const secondMilestone = methods.watch('milestones.second.date')

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="secondMilestoneExt" className={`${ styles.label } ${ styles.extensionLabel }`}>Extension</label>
        <input 
          type="date"
          id="secondMilestoneExt"
          disabled={disabled}
          {...methods.register("milestones.second.extension.date", {
            validate: value =>
            !secondMilestone || new Date(value) < new Date(secondMilestone as Date) ? "Extension must be after original milestone date" : true
          })}
          className={styles.input} />
      </div>
      <SecondMilestoneExtensionDeleteBtn />
      <FormError field={'milestones.second.extension.date'} />
    </div>
  )
}

export const SecondMilestoneAchievedCheckbox = () => { // Second milestone achieved checkbox
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="secondMilestoneAchieved" className={styles.checkboxLabel}>Achieved</label>
      <input 
        type="checkbox"
        id="secondMilestoneAchieved"
        disabled={disabled}
        {...methods.register('milestones.second.status.achieved', {
          validate: value =>
            value && methods.watch("milestones.second.status.expired") ? "Milestone cannot be both achieved and expired" : true
        })}
        className="checkbox checkbox-secondary" />
    </div>
  )
}

export const SecondMilestoneExpiredCheckbox = () => { // Second milestone expired checkbox
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="secondMilestoneExpired" className={styles.checkboxLabel}>Expired</label>
      <input 
        type="checkbox"
        id="secondMilestoneExpired"
        disabled={disabled}
        {...methods.register('milestones.second.status.expired')}
        className="checkbox checkbox-secondary" />
    </div>
  )
}

export const InitialNotificationInput = () => { // Initial notification input
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="initialNotification" className={`${ styles.label } flex-1`}>Initial</label>
        <input 
          type="date"
          id="initialNotification"
          disabled={disabled}
          {...methods.register("notifications.initial.date")}
          className={styles.input} />
      </div>
      <InitialNotificationDeleteBtn />
    </div>
  )
}

export const LastCallNotificationInput = () => { // Last call notification input
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="lastCallNotification" className={`${ styles.label } flex-1`}>Last Call</label>
        <input 
          type="date"
          id="lastCallNotification"
          disabled={disabled}
          {...methods.register("notifications.lastCall.date")}
          className={styles.input} />
      </div>
      <LastCallNotificationDeleteBtn />
    </div>
  )
}

export const LostVestingNotificationInput = () => { // Lost vesting notification input
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <label htmlFor="lostVestingNotification" className={`${ styles.label } flex-1`}>Lost Vesting</label>
        <input 
          type="date"
          id="lostVestingNotification"
          disabled={disabled}
          {...methods.register("notifications.lostVesting.date")}
          className={styles.input} />
      </div>
      <LostVestingNotificationDeleteBtn />
    </div>
  )
}

export const DeleteTenYearBtn = () => { // Delete ten year vesting period button
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext() 

  const tenYear = methods.getValues('vesting.tenYear.uuid')

  const visible = tenYear && !disabled

  if(!visible) return null

  return (
    <DeleteBtn
      label={'Remove Vesting Period'}
      deleteFn={() => handleDeleteValue('vesting.tenYear.date', tenYear, {
        setValue: methods.setValue
      })} />
  )
}

export const DeleteFifteenYearBtn = () => { // Delete fifteen year vesting period button
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  const fifteenYear = methods.getValues('vesting.fifteenYear.uuid')

  const visible = fifteenYear && !disabled

  if(!visible) return null

  return (
    <DeleteBtn
      label={'Remove Vesting Period'}
      deleteFn={() => handleDeleteValue('vesting.fifteenYear.date', fifteenYear, {
        setValue: methods.setValue
      })} />
  )
}

const DeleteTenYearExtensionBtn = () => { // Delete ten year vesting extension button
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  const tenYearExt = methods.watch('vesting.tenYear.extension.uuid')

  const visible = tenYearExt && !disabled 

  if(!visible) return null

  return (
    <DeleteBtn 
      label={'Remove Extension'}
      deleteFn={() => handleDeleteValue('vesting.tenYear.extension.date', tenYearExt, { setValue: methods.setValue })} />
  )
}

const DeleteFifteenTearExtensionBtn = () => { // Delete fifteen year vesting extension button
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  const fifteenYearExt = methods.watch('vesting.fifteenYear.extension.uuid')

  return (
    <>
      {fifteenYearExt && !disabled && (
        <DeleteBtn
          label={'Remove Extension'}
          deleteFn={() => handleDeleteValue('vesting.fifteenYear.extension.date', fifteenYearExt, { setValue: methods.setValue })} />
      )}
    </>
  )
}

const FirstMilestoneExtensionDeleteBtn = () => { // First milestone extension delete button
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  const firstMilestoneExt = methods.watch('milestones.first.extension.uuid')

  return (
    <>
      {firstMilestoneExt && !disabled && (
        <DeleteBtn 
          label={'Remove Extension'}
          deleteFn={() => handleDeleteValue('milestones.first.extension.date', firstMilestoneExt, { setValue: methods.setValue })} />
      )}
    </>
  )
}

const SecondMilestoneExtensionDeleteBtn = () => { // Second milestone extension delete button
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  const secondMilestoneExt = methods.watch('milestones.second.extension.uuid')

  return (
    <>
      {secondMilestoneExt && !disabled && (
        <DeleteBtn
          label={'Remove Extension'}
          deleteFn={() => handleDeleteValue('milestones.second.extension.date', secondMilestoneExt, { setValue: methods.setValue })} />
      )}
    </>
  )
}

const InitialNotificationDeleteBtn = () => { // Delete initial notification button
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  const initialNotification = methods.watch('notifications.initial.uuid')

  return (
    <>
      {initialNotification && !disabled && (
        <DeleteBtn
          label={'Remove Notification'}
          deleteFn={() => handleDeleteValue('notifications.initial.date', initialNotification, { setValue: methods.setValue })} />
      )}
    </>
  )
}

const LastCallNotificationDeleteBtn = () => { // Last call notification delete button
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  const lastCallNotification = methods.watch('notifications.lastCall.uuid')

  return (
    <>
      {lastCallNotification && !disabled && (
        <DeleteBtn
          label={'Remove Notification'}
          deleteFn={() => handleDeleteValue('notifications.lastCall.date', lastCallNotification, { setValue: methods.setValue })} />
      )}
    </>
  )
}

const LostVestingNotificationDeleteBtn = () => { // Lost vesting notification delete button
  const { methods, disabled } = useUpdateDevelopmentPlanFormContext()

  const lostVestingNotification = methods.watch('notifications.lostVesting.uuid')

  return (
    <>
      {lostVestingNotification && !disabled && (
        <DeleteBtn
          label={'Remove Notification'}
          deleteFn={() => handleDeleteValue('notifications.lostVesting.date', lostVestingNotification, { setValue: methods.setValue })} />
      )}
    </>
  )
}