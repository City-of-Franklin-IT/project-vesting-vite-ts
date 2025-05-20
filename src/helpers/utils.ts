import * as AppActions from '@/context/AppActions'

// Types
import * as Types from '@/context/types'

export const authHeaders = (token: string | undefined) => {
  const headers = new Headers()

  if(token) {
    headers.append('Authorization', `Bearer ${ token }`)
  }

  return headers
}

export const addYears = <T extends number, D extends string>(years: T, date: D) => {
  const approvalDate = new Date(date)

  const newDate = new Date(approvalDate)
  newDate.setFullYear(approvalDate.getFullYear() + years)

  return newDate.toISOString().split('T')[0]
}

export const handleMilestoneExtension = async (MilestoneExtension: Types.MilestoneExtensionCreateInterface, parentId: string, token: string) => {
  if(MilestoneExtension) { 
    if(MilestoneExtension.uuid) { // Update existing milestone extension
      if(!MilestoneExtension.date) { // Delete
        await AppActions.deleteExtension(MilestoneExtension.uuid, authHeaders(token))
        return
      } else await AppActions.updateExtension(MilestoneExtension, authHeaders(token)) // Update
    } else await AppActions.createExtension({ ...MilestoneExtension, parentId }, authHeaders(token)) // Create
  } else return
}

export const handleVestingPeriod = async (VestingPeriod: Types.VestingPeriodCreateInterface, parentId: string, token: string) => {
  if(VestingPeriod.uuid) { // Existing
    if(!VestingPeriod.date) {
      await AppActions.deletePeriod(VestingPeriod.uuid, authHeaders(token)) // Delete
      return
    } else {
      await AppActions.updatePeriod(VestingPeriod, authHeaders(token)) // Update
      if(VestingPeriod.VestingStatus) {
        await AppActions.updatePeriodStatus(VestingPeriod.VestingStatus, authHeaders(token))
      }
    }
  } else await AppActions.createPeriod({ ...VestingPeriod, parentId }, authHeaders(token)) // Create
}

export const handleVestingExtension = async (VestingExtension: Types.VestingExtensionCreateInterface | undefined, parentId: string, token: string) => {
  if(VestingExtension) { 
    if(VestingExtension.uuid) { // Update existing vesting extension
      if(!VestingExtension.date) { // Delete
        await AppActions.deleteVestingExtension(VestingExtension.uuid, authHeaders(token))
      } else await AppActions.updateVestingExtension(VestingExtension, authHeaders(token)) // Update
    } else await AppActions.createVestingExtension({ ...VestingExtension, parentId }, authHeaders(token)) // Create
  }
}

export const handleNotification = async (VestingNotification: Types.VestingNotificationCreateInterface, token: string) => {
  if(VestingNotification.uuid) { // Existing
    if(!VestingNotification.date) { 
      AppActions.deleteNotification(VestingNotification.uuid, authHeaders(token)) // Delete
    } else AppActions.updateNotification(VestingNotification, authHeaders(token)) // Update
  } else AppActions.createNotification(VestingNotification, authHeaders(token)) // Create
}