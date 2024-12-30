import { useCallback, useEffect } from "react"
import { useForm, useFormContext } from "react-hook-form"

// Types
import { UseFormReturn } from "react-hook-form"
import { Notification } from "../../../../context/App/types"
import { Approval, VestingPeriod, Milestone } from "../../../../context/App/types"
import { UpdateDevelopmentPlanFormProps, UpdateDevelopmentPlanFormUseForm, UseExpireProjectProps, UseMilestoneExt } from "./types"

export const useUpdateDevelopmentPlanForm = (project: UpdateDevelopmentPlanFormProps['project']): UseFormReturn<UpdateDevelopmentPlanFormUseForm> => { // Update development plan form state
  return useForm<UpdateDevelopmentPlanFormUseForm>({
    defaultValues: {
      expired: project.expired,
      name: project.name,
      cof: project.cof,
      resolution: {
        resolution: project.Resolution.resolution,
        uuid: project.Resolution.uuid
      },
      ordinance: project.ordinance,
      approval: {
        FPMC: {
          date: project.Approvals.find((obj: Approval) => obj.approvedBy === 'FPMC')?.date ?? undefined,
          uuid: project.Approvals.find((obj: Approval) => obj.approvedBy === 'FPMC')?.uuid ?? ''
        },
        BOMA: {
          date: project.Approvals.find((obj: Approval) => obj.approvedBy === 'BOMA')?.date ?? undefined,
          uuid: project.Approvals.find((obj: Approval) => obj.approvedBy === 'BOMA')?.uuid ?? ''
        }
      },
      vesting: {
        tenYear: {
          date: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.date ?? undefined,
          uuid: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.uuid ?? '',
          status: {
            achieved: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.VestingStatus.achieved,
            expired: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.VestingStatus.expired,
            uuid: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.VestingStatus.uuid
          },
          extension: {
            date: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.VestingExtension?.date ?? undefined,
            uuid: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "10Y")?.VestingExtension?.uuid ?? ''
          }
        },
        fifteenYear: {
          date: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.date ?? undefined,
          uuid: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.uuid ?? '',
          status: {
            achieved: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.VestingStatus.achieved,
            expired: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.VestingStatus.expired,
            uuid: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.VestingStatus.uuid
          },
          extension: {
            date: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.VestingExtension?.date ?? undefined,
            uuid: project.VestingPeriods.find((obj: VestingPeriod) => obj.type === "15Y")?.VestingExtension?.uuid ?? ''
          }
        }
      },
      milestones: {
        first: {
          date: project.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.date ?? undefined,
          uuid: project.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.uuid ?? '',
          status: {
            achieved: project.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.MilestoneStatus.achieved,
            expired: project.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.MilestoneStatus.expired,
            uuid: project.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.MilestoneStatus.uuid
          },
          extension: {
            date: project.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.Extension?.date ?? undefined,
            uuid: project.VestingMilestones.find((obj: Milestone) => obj.number === 1)?.Extension?.uuid ?? ''
          }
        },
        second: {
          date: project.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.date ?? undefined,
          uuid: project.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.uuid ?? '',
          status: {
            achieved: project.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.MilestoneStatus.achieved,
            expired: project.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.MilestoneStatus.expired,
            uuid: project.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.MilestoneStatus.uuid ?? ''
          },
          extension: {
            date: project.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.Extension?.date ?? undefined,
            uuid: project.VestingMilestones.find((obj: Milestone) => obj.number === 2)?.Extension?.uuid ?? ''
          }
        }
      },
      notifications: {
        initial: {
          date: project.Notifications.find((obj: Notification) => obj.type === 'Initial')?.date ?? undefined,
          type: 'Initial',
          uuid: project.Notifications.find((obj: Notification) => obj.type === 'Initial')?.uuid ?? ''
        },
        lastCall: {
          date: project.Notifications.find((obj: Notification) => obj.type === 'Last Call')?.date ?? undefined,
          type: 'Last Call',
          uuid: project.Notifications.find((obj: Notification) => obj.type === 'Last Call')?.uuid ?? ''
        },
        lostVesting: {
          date: project.Notifications.find((obj: Notification) => obj.type === 'Lost Vesting')?.date ?? undefined,
          type: 'Lost Vesting',
          uuid: project.Notifications.find((obj: Notification) => obj.type === 'Lost Vesting')?.uuid ?? ''
        }
      },
      notes: project.notes,
      uuid: project.uuid
    }
  })
}

export const useUpdateDevelopmentPlanFormContext = (): { methods: UseFormReturn<UpdateDevelopmentPlanFormUseForm>, disabled: boolean } => { // UpdateDevelopmentPlanForm context
  const methods = useFormContext<UpdateDevelopmentPlanFormUseForm>()

  const disabled = methods.watch('expired')

  return { methods, disabled }
}

export const useExpireProject = (values: UseExpireProjectProps['values'], options: UseExpireProjectProps['options']) => { // Handle project expiration - expire milestones/vesting
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

export const useMilestoneExt = (milestones: UseMilestoneExt['milestones'], options: UseMilestoneExt['options']) => { // Handle milestone #1 extension
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