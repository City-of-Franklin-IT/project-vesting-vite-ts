import { useCallback, useMemo } from "react"
import { updateProject, updateResolution, updateApproval, updateMilestone, updateMilestoneStatus, createExtension, updateExtension, createNotification, updateNotification, createPeriod, updatePeriod, deletePeriod, deleteExtension, deleteNotification } from "../../../../context/App/AppActions"
import { savedPopup, errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { Periods, NotificationTypes } from "../../../../context/App/types" 
import { OnSubmitProps, UseSetDatesObjProps, DatesObj, UseExpireProjectProps, UseMilestoneExt, HandleDeleteValueProps, DeleteFunctions, SetValueKeys } from "./types"

export const onSubmit = async (formData: OnSubmitProps['formData'], reset: OnSubmitProps['reset'], navigate: OnSubmitProps['navigate'], token: OnSubmitProps['token']) => { // Handle form submit
  const projectObj = {
    expired: formData.expired,
    name: formData.name,
    cof: formData.cof,
    ordinance: formData.ordinance as Date,
    notes: formData.notes,
    uuid: formData.uuid
  }

  const result = await updateProject(projectObj, token)

  if(result.success) {
    const vestingArray = [] // Vesting periods

    formData.vesting.tenYear.date && vestingArray.push({ type: "10Y" as Periods, date: formData.vesting.tenYear.date, uuid: formData.vesting.tenYear.uuid })
    formData.vesting.fifteenYear.date && vestingArray.push({ type: "15Y" as Periods, date: formData.vesting.fifteenYear.date, uuid: formData.vesting.fifteenYear.uuid })

    const approvalArray = [{ // Approvals
      date: formData.approval.FPMC.date,
      uuid: formData.approval.FPMC.uuid
    },{
      date: formData.approval.BOMA.date,
      uuid: formData.approval.BOMA.uuid
    }]

    const milestonesArray = [{ // Milestones
      date: formData.milestones.first.date,
      uuid: formData.milestones.first.uuid
    },{
      date: formData.milestones.second.date,
      uuid: formData.milestones.second.uuid
    }]

    const milestonesStatusArray = [{ // Milestones statuses
      achieved: formData.milestones.first.status.achieved,
      expired: formData.milestones.first.status.expired,
      uuid: formData.milestones.first.status.uuid
    },{
      achieved: formData.milestones.second.status.achieved,
      expired: formData.milestones.second.status.expired,
      uuid: formData.milestones.second.status.uuid
    }]

    const extensionsArray = [{ // Extensions
      date: formData.milestones.first.extension.date,
      parentId: formData.milestones.first.uuid,
      uuid: formData.milestones.first.extension.uuid
    },{
      date: formData.milestones.second.extension.date,
      parentId: formData.milestones.second.uuid,
      uuid: formData.milestones.second.extension.uuid
    }]

    const notificationsArray = [{ // Notifications
      date: formData.notifications.initial.date,
      type: "Initial",
      parentId: formData.uuid,
      uuid: formData.notifications.initial.uuid
    },{
      date: formData.notifications.lastCall.date,
      type: "Last Call",
      parentId: formData.uuid,
      uuid: formData.notifications.lastCall.uuid
    },{
      date: formData.notifications.lostVesting.date,
      type: "Lost Vesting",
      parentId: formData.uuid,
      uuid: formData.notifications.lastCall.uuid
    }]

    const response = await Promise.all([
      updateResolution({ resolution: formData.resolution.resolution, uuid: formData.resolution.uuid }, token),
      ...approvalArray.map(obj => updateApproval(obj, token)),
      ...milestonesArray.map(obj => updateMilestone(obj, token)),
      ...milestonesStatusArray.map(obj => updateMilestoneStatus(obj, token)),
      ...extensionsArray.map(obj => {
        if(obj.date && !obj.uuid) { // New extension
          createExtension({ date: obj.date as Date, parentId: obj.parentId }, token)
        }

        if(obj.date && obj.uuid) { // Update existing extension
          updateExtension({ date: obj.date as Date, uuid: obj.uuid }, token)
        }
      }),
      ...notificationsArray.map(obj => {
        if(obj.date && !obj.uuid) { // New notification
          createNotification({ date: obj.date as Date, type: obj.type as NotificationTypes, parentId: formData.uuid }, token)
        }

        if(obj.date && obj.uuid) { // Update existing notification
          updateNotification({ date: obj.date as Date, uuid: obj.uuid }, token)
        }
      }),
      ...vestingArray.map(obj => {
        if(!formData.expired) { // Active project
          if(!obj.uuid) { // New vesting period for active project
            createPeriod({ type: obj.type, date: obj.date as Date, parentId: formData.uuid }, token)
          } else updatePeriod({ type: obj.type as Periods, date: obj.date as Date, uuid: obj.uuid }, token) // Update existing period for active project
        } else { // Delete vesting periods for expired project
          if(obj.uuid) {
            deletePeriod(obj.uuid, token)
          }
        }
      }),
    ])

    if(response) {
      savedPopup(result.msg)
      navigate('/')
    } else errorPopup()
  } else {
    errorPopup(result.msg)
    reset()
  }
}

export const useSetDatesObj = (values: UseSetDatesObjProps['values']): DatesObj => useMemo(() => { // Return datesObj
  return {
    FPMC: {
      date: values.approval.FPMC.date,
      uuid: values.approval.FPMC.uuid
    },
    BOMA: {
      date: values.approval.BOMA.date,
      uuid: values.approval.BOMA.uuid
    },
    tenYear: {
      date: values.vesting.tenYear.date,
      uuid: values.vesting.tenYear.uuid
    },
    fifteenYear: {
      date: values.vesting.fifteenYear.date,
      uuid: values.vesting.fifteenYear.uuid
    },
    firstMilestone: {
      date: values.milestones.first.date,
      uuid: values.milestones.first.uuid,
      extension: {
        date: values.milestones.first.extension.date,
        uuid: values.milestones.first.extension.uuid
      }
    },
    secondMilestone: {
      date: values.milestones.second.date,
      uuid: values.milestones.second.uuid,
      extension: {
        date: values.milestones.second.extension.date,
        uuid: values.milestones.second.extension.uuid
      }
    },
    initialNotification: {
      date: values.notifications.initial.date,
      uuid: values.notifications.initial.uuid
    },
    lastCallNotification: {
      date: values.notifications.lastCall.date,
      uuid: values.notifications.lastCall.uuid
    },
    lostVestingNotification: {
      date: values.notifications.lostVesting.date,
      uuid: values.notifications.lostVesting.uuid
    }
  }
}, [values.approval.FPMC.date, values.approval.BOMA.date, values.vesting.tenYear.date, values.vesting.fifteenYear.date, values.milestones.first, values.milestones.second, values.notifications.initial.date, values.notifications.lastCall.date, values.notifications.lostVesting.date])

export const useExpireProject = (expired: UseExpireProjectProps['expired'], milestones: UseExpireProjectProps['milestones'], setValue: UseExpireProjectProps['setValue']): () => void => useCallback(() => { // Handle milestones on project expiration
  if(expired) {
    if(!milestones.first.status.achieved && !milestones.first.status.expired) { // If no status milestone - expire
      setValue("milestones.first.status.expired", true, { shouldValidate: true })
    }

    if(!milestones.second.status.achieved && !milestones.second.status.expired) { 
      setValue("milestones.second.status.expired", true, { shouldValidate: true })
    }
  }
}, [milestones])

export const useMilestoneExt = (milestones: UseMilestoneExt['milestones'], setValue: UseMilestoneExt['setValue']): () => void => useCallback(() => {
  const date = new Date(milestones.first.extension.date ? milestones.first.extension.date : milestones.first.date as Date ) // Check if first milestone is extended

  const updatedSecondMilestoneDate = date.setFullYear(date.getFullYear() + 2)
  setValue("milestones.second.date", new Date(updatedSecondMilestoneDate).toISOString().split("T")[0])

}, [milestones])

export const handleDeleteValue = async (target: HandleDeleteValueProps['target'], uuid: HandleDeleteValueProps['uuid'], setValue: HandleDeleteValueProps['setValue'], token: HandleDeleteValueProps['token']): Promise<void> => {
  const deleteFunctions: DeleteFunctions = {
    vesting: deletePeriod(uuid, token),
    milestones: deleteExtension(uuid, token),
    notifications: deleteNotification(uuid, token)
  }

  const targetUUID = target.split('.')
  targetUUID[targetUUID.length - 1] = "uuid"

  const deleteFn = deleteFunctions[target.split('.')[0] as keyof DeleteFunctions]
  const result = await deleteFn

  console.log(result)

  if(result.success) { // On success - clear form state of deleted values
    setValue(target, undefined, { shouldValidate: true })
    setValue(targetUUID.join().replaceAll(",", ".") as SetValueKeys, '', { shouldValidate: true })

    savedPopup(result.msg)
  } else errorPopup(result.msg)
}