import { useCallback, useMemo, useEffect } from "react"
import { useForm, useFormContext } from "react-hook-form"

// Types
import { UseFormReturn } from "react-hook-form"
import { Approval, VestingPeriod, Milestone, Notification } from '../../../../context/App/types'
import { UpdatePreliminaryPlatFormProps, UpdatePreliminaryPlatFormUseForm, UseSetDatesObjProps, DatesObj, UseMilestoneExt, UseExpireProjectProps } from "./types"

export const useUpdatePreliminaryPlatForm = (data: UpdatePreliminaryPlatFormProps['data']) => {
  return useForm<UpdatePreliminaryPlatFormUseForm>({
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

export const useUpdatePreliminaryPlatFormContext = (): { methods: UseFormReturn<UpdatePreliminaryPlatFormUseForm>, disabled: boolean } => { // UpdatePreliminaryPlatForm context
  const methods = useFormContext<UpdatePreliminaryPlatFormUseForm>()

  const disabled = methods.watch('expired')

  return { methods, disabled }
}

export const useSetDatesObj = (values: UseSetDatesObjProps['values']): DatesObj => useMemo(() => { // Return datesObj
  return {
    FPMC: {
      date: values.approval.FPMC.date,
      uuid: values.approval.FPMC.uuid
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

export const useExpireProject = (values: UseExpireProjectProps['values'], options: UseExpireProjectProps['options']) => { // Handle milestones on project expiration
  const { expired, milestones, vesting } = values
  const { setValue } = options

  const expireProject = useCallback(() => {
    if(expired) {
      if(!milestones.first.status.achieved && !milestones.first.status.expired) {
        setValue("milestones.first.status.expired", true, { shouldValidate: true })
      }
  
      if(!milestones.second.status.achieved && !milestones.second.status.expired) { 
        setValue("milestones.second.status.expired", true, { shouldValidate: true })
      }
  
      if(!vesting.tenYear.status.achieved && !vesting.tenYear.status.expired) {
        setValue('vesting.tenYear.status.expired', true, { shouldValidate: true })
      }
  
      if(!vesting.fifteenYear.status.achieved && !vesting.fifteenYear.status.expired) {
        setValue('vesting.fifteenYear.status.expired', true, { shouldValidate: true })
      }
    }
  }, [values.expired])

  useEffect(() => {
    expireProject()
  }, [values.expired, expireProject])
}

export const useMilestoneExt = (milestones: UseMilestoneExt['milestones'], options: UseMilestoneExt['options']): void => { // Handle milestone #1 extension
  const { setValue } = options

  const handleMilestoneExt = useCallback(() => { // If extended - update milestone #2 date
    if(milestones.first.extension.date) {
      const date = new Date(milestones.first.extension.date)

      const updatedSecondMilestoneDate = date.setFullYear(date.getFullYear() + 2)
  
      setValue("milestones.second.date", new Date(updatedSecondMilestoneDate).toISOString().split("T")[0])
    }
  }, [milestones.first.extension.date])

  useEffect(() => {
    handleMilestoneExt()
  }, [handleMilestoneExt, milestones.first.extension.date])
}