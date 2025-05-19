import * as AppActions from '@/context/AppActions'
import { authHeaders } from '@/helpers/utils'
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

// Types
import { ProjectCreateInterface } from '@/context/types'

export const handleCreatePreliminaryPlat = async (formData: ProjectCreateInterface, token: string): Promise<void> => {
  const result = await AppActions.createProject(formData, authHeaders(token))

  if(result.success) {
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