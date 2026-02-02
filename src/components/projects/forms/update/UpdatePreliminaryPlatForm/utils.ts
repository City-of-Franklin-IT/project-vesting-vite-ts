import { authHeaders, handleMilestoneExtension, handleVestingPeriod, handleVestingExtension, handleNotification } from "@/helpers/utils"
import * as AppActions from '@/context/AppActions'

// Types
import * as AppTypes from "@/context/types"

export const handleUpdatePreliminaryPlat = async (formData: AppTypes.ProjectCreateInterface, token: string) => {
  const result = await AppActions.updateProject(formData, authHeaders(token))

  if(result.success) {
    await Promise.all([ // Approvals
      formData.Approvals.map(async approval => await AppActions.updateApproval(approval, authHeaders(token)))
    ])

    await Promise.all([ // Milestones
      formData.Milestones.map(async milestone => {
        await AppActions.updateMilestone(milestone, authHeaders(token)) // Update milestone
        await AppActions.updateMilestoneStatus(milestone.MilestoneStatus, authHeaders(token)) // Update milestone status

        handleMilestoneExtension(milestone.MilestoneExtension, formData.uuid as string, token)
      })
    ])

    await Promise.all([ // Vesting periods
      formData.VestingPeriods.map(async period => {
        handleVestingPeriod(period, formData.uuid as string, token)
        handleVestingExtension(period.VestingExtension, formData.uuid as string, token)
      })
    ])

    await Promise.all([ // Notifications
      formData.VestingNotifications?.map(async notification => { // Vesting notifications
        handleNotification(notification, token)
      })
    ])

  }

  return result
}