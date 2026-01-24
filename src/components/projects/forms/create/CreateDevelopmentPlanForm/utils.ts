import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/AppActions'

// Types
import * as AppTypes from "@/context/types"

export const handleCreateDevelopmentPlan = async (formData: AppTypes.ProjectCreateInterface, token: string) => { // Handle form submit
  const result = await AppActions.createProject(formData, authHeaders(token))

  if(result.success) {
    await AppActions.createResolution({ ...formData.Resolution, parentId: result.data.uuid }, authHeaders(token))

    await Promise.all([
      formData.Approvals.map(approval => AppActions.createApproval({ ...approval, parentId: result.data.uuid }, authHeaders(token))),
      formData.VestingPeriods.map(period => {
        if(period.date) {
          AppActions.createPeriod({ ...period, parentId: result.data.uuid }, authHeaders(token))
        }
      }),
      formData.Milestones.map(milestone => AppActions.createMilestone({ ...milestone, parentId: result.data.uuid }, authHeaders(token)))
    ])
  }

  return result
}