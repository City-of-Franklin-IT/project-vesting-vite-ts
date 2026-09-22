import * as AppActions from '@/context/AppActions'

// Types
import * as Types from '@/context/types'
import { AccountInfo, IPublicClientApplication } from '@azure/msal-browser'
import { MotionProps } from 'motion/react'

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
    } else if(MilestoneExtension.date) await AppActions.createExtension({ ...MilestoneExtension, parentId }, authHeaders(token)) // Create
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
    } else if(VestingExtension.date) await AppActions.createVestingExtension({ ...VestingExtension, parentId }, authHeaders(token)) // Create
  }
}

export const handleNotification = async (VestingNotification: Types.VestingNotificationCreateInterface, token: string) => {
  if(VestingNotification.uuid) { // Existing
    if(!VestingNotification.date) {
      AppActions.deleteNotification(VestingNotification.uuid, authHeaders(token)) // Delete
    } else AppActions.updateNotification(VestingNotification, authHeaders(token)) // Update
  } else AppActions.createNotification(VestingNotification, authHeaders(token)) // Create
}

export const getUserDepartment = async (instance: IPublicClientApplication, activeAccount: AccountInfo) => {
  const graphConfig = {
    graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me?$select=department',
    scopes: ['User.Read']
  }

  const accessTokenRequest = {
    scopes: graphConfig.scopes,
    account: activeAccount
  }

  const result = await instance.acquireTokenSilent(accessTokenRequest)
  const accessToken = result.accessToken

  const headers = new Headers()
  headers.append('Authorization', `Bearer ${ accessToken }`)
  const response = await fetch(graphConfig.graphMeEndpoint, { headers })
  const data = await response.json()

  return data.department
}

const slideInLeft: MotionProps = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1
  }
}

const slideInRight: MotionProps = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 15,
    mass: 1
  }
}

const fadeInOut: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: {
    duration: 0.25,
    ease: "easeOut"
    }
  },
  transition: {
    duration: 0.25,
    ease: "easeIn"
  }
}

export type MotionPropsType =
  | "slideInLeft"
  | "slideInRight"
  | "fadeInOut"

export const motionPropsMap = new Map<MotionPropsType, MotionProps>([
  ["slideInLeft", slideInLeft],
  ["slideInRight", slideInRight],
  ["fadeInOut", fadeInOut]
])