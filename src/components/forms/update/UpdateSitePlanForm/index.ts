import { useCallback, useMemo } from "react"
import { useForm } from "react-hook-form"
import { updateProject, updateApproval, updateMilestone, updateMilestoneStatus, createExtension, updateExtension, createNotification, updateNotification, createPeriod, updatePeriod, deletePeriod, deleteExtension, deleteNotification, deleteVestingExtension, updatePeriodStatus, createVestingExtension, updateVestingExtension } from "../../../../context/App/AppActions"
import { savedPopup, errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { Periods, NotificationTypes, VestingPeriod, Milestone, Notification } from '../../../../context/App/types'
import { UseUpdateSitePlanFormProps, UpdateSitePlanFormState, OnSubmitProps, UseSetDatesObjProps, DatesObj, UseMilestoneExt, UseExpireProjectProps, HandleDeleteValueProps, SetValueKeys } from "./types"

export const useUpdateSitePlanForm = (data: UseUpdateSitePlanFormProps['data']) => {
  return useForm<UpdateSitePlanFormState>({
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
          uuid: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.uuid ?? '',
          status: {
            achieved: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.VestingStatus.achieved,
            expired: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.VestingStatus.expired,
            uuid: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.VestingStatus.uuid
          },
          extension: {
            date: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.VestingExtension?.date ?? undefined,
            uuid: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.VestingExtension?.uuid ?? ''
          }
        },
        fifteenYear: {
          date: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.date ?? undefined,
          uuid: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.uuid ?? '',
          status: {
            achieved: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.VestingStatus.achieved,
            expired: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.VestingStatus.expired,
            uuid: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.VestingStatus.uuid
          },
          extension: {
            date: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.VestingExtension?.date ?? undefined,
            uuid: data.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.VestingExtension?.uuid ?? ''
          }
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
}

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

export const useSetDatesObj = (values: UseSetDatesObjProps['values']): DatesObj => useMemo(() => { // Return datesObj
  console.log(values)
  return {
    approval: {
      date: values.approval.date,
      uuid: values.approval.uuid
    },
    tenYear: {
      date: values.vesting.tenYear.date,
      uuid: values.vesting.tenYear.uuid,
      extension: {
        date: values.vesting.tenYear.extension.date,
        uuid: values.vesting.tenYear.extension.uuid
      }
    },
    fifteenYear: {
      date: values.vesting.fifteenYear.date,
      uuid: values.vesting.fifteenYear.uuid,
      extension: {
        date: values.vesting.fifteenYear.extension.date,
        uuid: values.vesting.fifteenYear.extension.uuid
      }
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
}, [values])

export const useExpireProject = (values: UseExpireProjectProps['values'], options: UseExpireProjectProps['options']): () => void => useCallback(() => { // Handle milestones on project expiration
  const { expired, milestones } = values
  const { setValue } = options
  
  if(expired) {
    if(!milestones.first.status.achieved && !milestones.first.status.expired) { // If no status milestone - expire
      setValue("milestones.first.status.expired", true, { shouldValidate: true })
    }

    if(!milestones.second.status.achieved && !milestones.second.status.expired) { 
      setValue("milestones.second.status.expired", true, { shouldValidate: true })
    }
  }
}, [values.milestones])

export const useMilestoneExt = (milestones: UseMilestoneExt['milestones'], options: UseMilestoneExt['options']): () => void => useCallback(() => {
  const { setValue } = options

  const date = new Date(milestones.first.extension.date ? milestones.first.extension.date : milestones.first.date as Date ) // Check if first milestone is extended

  const updatedSecondMilestoneDate = date.setFullYear(date.getFullYear() + 2)
  setValue("milestones.second.date", new Date(updatedSecondMilestoneDate).toISOString().split("T")[0])

}, [milestones])

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