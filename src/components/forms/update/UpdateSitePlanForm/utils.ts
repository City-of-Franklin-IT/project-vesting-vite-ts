import { updateProject, updateApproval, updateMilestone, updateMilestoneStatus, createExtension, updateExtension, createNotification, updateNotification, createPeriod, updatePeriod, deletePeriod, deleteExtension, deleteNotification, deleteVestingExtension, updatePeriodStatus, createVestingExtension, updateVestingExtension } from "../../../../context/App/AppActions"
import { savedPopup, errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { Periods, NotificationTypes } from '../../../../context/App/types'
import { OnSubmitProps, HandleDeleteValueProps, SetValueKeys } from "./types"

export const onSubmit = async (formData: OnSubmitProps['formData'], options: OnSubmitProps['options']): Promise<void> => {
  const { reset, navigate } = options

  const projectObj = {
    expired: formData.expired,
    name: formData.name,
    cof: formData.cof,
    ordinance: formData.ordinance as Date,
    notes: formData.notes,
    uuid: formData.uuid
  }

  const result = await updateProject(projectObj)

  if(result.success) {
    const vestingArray = [] // Vesting periods
    const vestingStatusArray = [] // Vesting period statuses
    const vestingExtensionsArray = [] // Vesting period extensions

    if(formData.vesting.tenYear.date) { // Handle 10Y vesting period
      const tenYear = formData.vesting.tenYear

      vestingArray.push({ type: "10Y" as Periods, date: tenYear.date, uuid: tenYear.uuid })
      vestingStatusArray.push({ achieved: tenYear.status.achieved, expired: tenYear.status.expired, uuid: tenYear.status.uuid })

      if(tenYear.extension.date) { // Extension
        vestingExtensionsArray.push({ date: tenYear.extension.date, parentId: tenYear.uuid, uuid: tenYear.extension.uuid })
      }
    }

    if(formData.vesting.fifteenYear.date) { // Handle 15Y vesting period
      const fifteenYear = formData.vesting.fifteenYear

      vestingArray.push({ type: "15Y" as Periods, date: fifteenYear.date, uuid: fifteenYear.uuid })
      vestingStatusArray.push({ achieved: fifteenYear.status.achieved, expired: fifteenYear.status.expired, uuid: fifteenYear.status.uuid })

      if(fifteenYear.extension.date) { // Extension
        vestingExtensionsArray.push({ date: fifteenYear.extension.date, parentId: fifteenYear.uuid, uuid: fifteenYear.extension.uuid })
      }
    }

    const approvalArray = [{ // Approvals
      date: formData.approval.date,
      uuid: formData.approval.uuid
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
      ...approvalArray.map(obj => updateApproval(obj)),
      ...milestonesArray.map(obj => updateMilestone(obj)),
      ...milestonesStatusArray.map(obj => updateMilestoneStatus(obj)),
      ...extensionsArray.map(obj => {
        if(obj.date && !obj.uuid) { // New extension
          createExtension({ date: obj.date as Date, parentId: obj.parentId })
        }

        if(obj.date && obj.uuid) { // Update existing extension
          updateExtension({ date: obj.date as Date, uuid: obj.uuid })
        }
      }),
      ...notificationsArray.map(obj => {
        if(obj.date && !obj.uuid) { // New notification
          createNotification({ date: obj.date as Date, type: obj.type as NotificationTypes, parentId: formData.uuid })
        }

        if(obj.date && obj.uuid) { // Update existing notification
          updateNotification({ date: obj.date as Date, uuid: obj.uuid })
        }
      }),
      ...vestingArray.map(obj => {
        if(!formData.expired) { // Active project
          if(!obj.uuid) { // New vesting period for active project
            createPeriod({ type: obj.type, date: obj.date as Date, parentId: formData.uuid })
          } else updatePeriod({ type: obj.type as Periods, date: obj.date as Date, uuid: obj.uuid }) // Update existing period for active project
        } else { // Delete vesting periods for expired project
          if(obj.uuid) {
            deletePeriod(obj.uuid)
          }
        }
      }),
      ...vestingStatusArray.map(obj => updatePeriodStatus(obj)),
      ...vestingExtensionsArray.map(obj => {
        if(obj.date && !obj.uuid) { // New extension
          createVestingExtension({ date: obj.date as Date, parentId: obj.parentId })
        }

        if(obj.date && obj.uuid) { // Update existing extension
          updateVestingExtension({ date: obj.date as Date, uuid: obj.uuid })
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

export const handleDeleteValue = async (target: HandleDeleteValueProps['target'], uuid: HandleDeleteValueProps['uuid'], options: HandleDeleteValueProps['options']): Promise<void> => {
  const { setValue } = options
  
  const targetUUID = target.split('.')
  targetUUID[targetUUID.length - 1] = "uuid"

  let deleteFn

  if(target === 'vesting.tenYear.date' || target === 'vesting.fifteenYear.date') { // Delete vesting period
    deleteFn = deletePeriod(uuid)
  }

  if(target === 'vesting.tenYear.extension.date' || target === 'vesting.fifteenYear.extension.date') { // Delete vesting period extension
    deleteFn = deleteVestingExtension(uuid)
  }

  if(target.split('.')[0] === 'milestones') { // Delete milestone extension
    deleteFn = deleteExtension(uuid)
  }

  if(target.split('.')[0] === 'notifications') { // Delete notification
    deleteFn = deleteNotification(uuid)
  }

  const result = await deleteFn

  if(result && result.success) { // On success - clear form state of deleted values
    setValue(target, undefined, { shouldValidate: true })
    setValue(targetUUID.join().replaceAll(",", ".") as SetValueKeys, '', { shouldValidate: true })

    savedPopup(result.msg)
  } else errorPopup(result?.msg)
}