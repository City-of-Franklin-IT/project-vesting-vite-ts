import { useCallback, useMemo } from "react"
import { useForm, useFormContext } from "react-hook-form"

// Types
import { UseFormReturn } from "react-hook-form"
import { VestingPeriod, Milestone, Notification } from '../../../../context/App/types'
import { UseUpdateSitePlanFormProps, UpdateSitePlanFormUseForm, UseSetDatesObjProps, DatesObj, UseMilestoneExt, UseExpireProjectProps } from "./types"

export const useUpdateSitePlanForm = (data: UseUpdateSitePlanFormProps['data']) => {
  return useForm<UpdateSitePlanFormUseForm>({
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

export const useUpdateSitePlanFormContext = (): { methods: UseFormReturn<UpdateSitePlanFormUseForm>, disabled: boolean } => { // UpdateSitePlanForm context
  const methods = useFormContext<UpdateSitePlanFormUseForm>()

  const disabled = methods.watch('expired')

  return { methods, disabled }
}

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