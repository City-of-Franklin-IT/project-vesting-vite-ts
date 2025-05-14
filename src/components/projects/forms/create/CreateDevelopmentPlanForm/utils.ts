import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'
import { savedPopup, errorPopup } from "../../../../../utils/Toast/Toast"

// Types
import { ProjectCreateInterface } from "@/context/App/types"

export const handleCreateDevelopmentPlan = async (formData: ProjectCreateInterface, token: string): Promise<void> => { // Handle form submit
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

    savedPopup(result.msg)
  } else errorPopup()
}