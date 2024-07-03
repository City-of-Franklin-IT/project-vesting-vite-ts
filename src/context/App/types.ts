// Types
import { Dispatch, ReactNode } from "react"

export interface AppReducerProps { // AppReducer props
  state: AppState,
  action: ReducerAction
}

export interface AppContextObj { // App context object
  dispatch: Dispatch<Action>,
  filter: string,
  milestoneFilter: {
    start: string,
    end: string
  },
  searchValue: string,
  showExpired: boolean,
  showAchieved: {
    firstMilestone: boolean,
    secondMilestone: boolean
  }
}

export interface AppState { // App context state object
  filter: string,
  searchValue: string,
  milestoneFilter: {
    start: string,
    end: string
  }
  showExpired: boolean,
  showAchieved: {
    firstMilestone: boolean,
    secondMilestone: boolean
  }
}

export interface ReducerAction {
  type: string, payload: any
}

export interface AppProviderProps {
  children: ReactNode
}

export interface LoginForm { // LoginForm props
  email: string,
  password: string
}

export interface LoginResponse { // loginUser response object
  success: boolean,
  token: string,
  msg: string
}

export interface ServerResponse { // Server response object
  success: boolean,
  data?: object | object[],
  msg?: string
}

export interface GetProjectsResponse extends ServerResponse { // getProjects fn response object
  count: number,
  data: {
    records: Project[]
  }
}

export interface GetProjectResponse extends ServerResponse { // getProject fn response object
  data: Project
}

export interface CreateProjectProps { // createProject fn props
  formData: {
    type: ProjectTypes,
    name: string,
    cof: number,
    ordinance: Date,
    notes: string
  },
  token: string
}

export interface CreateProjectResponse extends ServerResponse { // createProject fn response
  data: BaseObj & {
    type: ProjectTypes,
    name: string,
    cof: number,
    ordinance: Date,
    expired: boolean,
    notes: string,
  }
}

export interface UpdateProjectProps { // updateProject fn props
  formData: {
    name: string,
    cof: number,
    ordinance: Date,
    expired: boolean,
    notes: string,
    uuid: string
  },
  token: string
}

export interface DeleteProjectsProps { // deleteProject fn props
  uuid: string,
  token: string
}

export interface CreateApprovalProps { // createApproval fn props
  formData: {
    date: Date,
    approvedBy: string,
    parentId: string
  },
  token: string
}

export interface UpdateApprovalProps { // updateApproval fn props
  formData: {
    date: Date | string | undefined,
    approvedBy?: string,
    uuid: string
  },
  token: string
}

export interface DeleteApprovalProps { // deleteApproval fn props
  uuid: string,
  token: string
}

export interface CreateResolutionProps { // createResolution fn props
  formData: {
    resolution: string,
    parentId: string
  },
  token: string
}

export interface UpdateResolutionProps { // updateResolution fn props
  formData: {
    resolution: string,
    uuid: string
  },
  token: string
}

export interface CreatePeriodProps { // createPeriod fn props
  formData: {
    type: Periods,
    date: Date,
    parentId: string
  },
  token: string
}

export interface UpdatePeriodProps { // updatePeriod fn props
  formData: {
    type: Periods,
    date: Date,
    uuid: string
  },
  token: string
}

export interface UpdatePeriodStatusProps { // updatePeriodStatus fn props
  formData: {
    achieved: boolean,
    expired: boolean,
    uuid: string
  },
  token: string
}

export interface DeletePeriodProps { // deletePeriod fn props
  uuid: string,
  token: string
}

export interface CreateMilestoneProps { // createMilestone fn props
  formData: {
    number: number,
    date: Date,
    parentId: string
  },
  token: string
}

export interface UpdateMilestoneProps { // updateMilestone fn props
  formData: {
    date: Date | string | undefined,
    uuid: string
  },
  token: string
}

export interface UpdateMilestoneStatusProps { // updateMilestoneStatus fn props
  formData: {
    achieved: boolean,
    expired: boolean,
    uuid: string
  },
  token: string
}

export interface DeleteMilestoneProps { // deleteMilestone fn props
  uuid: string,
  token: string
}

export interface CreateExtensionProps { // createExtension fn props
  formData: {
    date: Date,
    parentId: string
  },
  token: string
}

export interface UpdateExtensionProps { // updateExtension fn props
  formDate: {
    date: Date,
    uuid: string
  },
  token: string
}

export interface DeleteExtensionProps { // deleteExtension fn props
  uuid: string,
  token: string
}

export interface CreateNotificationProps { // createNotification fn props
  formData: {
    date: Date,
    type: NotificationTypes,
    parentId: string
  },
  token: string
}

export interface UpdateNotificationProps { // updateNotification fn props
  formData: {
    date: Date,
    uuid: string
  },
  token: string
}

export interface DeleteNotificationProps { // deleteNotification fn props
  uuid: string,
  token: string
}

export interface Project extends BaseObj { 
  type: ProjectTypes,
  name: string,
  cof: number,
  ordinance: Date,
  expired: boolean,
  notes: string,
  Approvals: Approval[],
  Resolution: Resolution,
  Notification: Notification,
  VestingMilestones: Milestone[],
  VestingPeriods: VestingPeriod[],
  [key: string]: any
}

export type Action = 
  | { type: 'SET_FILTER', payload: string }
  | { type: 'SET_SEARCH_VALUE', payload: string }
  | { type: 'TOGGLE_SHOW_EXPIRED', payload: boolean }
  | { type: 'SET_MILESTONE_FILTER', payload: { start: Date | string | undefined, end: Date | string | undefined } }
  | { type: 'TOGGLE_SHOW_ACHIEVED', payload: { firstMilestone: boolean, secondMilestone: boolean } }

export type ProjectTypes = 
  | 'Development Plan'
  | 'Preliminary Plat'
  | 'Site Plan'

export type NotificationTypes =
  | 'Initial'
  | 'Last Call'
  | 'Lost Vesting'

export type Periods =
  | "10Y"
  | "15Y"

type BaseObj = {
  uuid: string,
  createdBy: string,
  createdAt: Date,
  updatedBy: string,
  updatedAt: Date
}

export interface Approval extends BaseObj {
  date: Date,
  approvedBy: "Admin" | "FPMC" | "BOMA",
  parentId: string,
}

interface Resolution extends BaseObj {
  resolution: string,
  parentId: string,
}

export interface Notification extends BaseObj {
  date: Date,
  type: NotificationTypes,
  parentId: string,
}

export interface Milestone extends BaseObj {
  number: 1 | 2,
  date: Date,
  parentId: string,
  Extension: Extension,
  MilestoneStatus: MilestoneStatus
}

interface Extension extends BaseObj {
  date: Date,
  parentId: string
}

interface MilestoneStatus extends BaseObj {
  achieved: boolean,
  expired: boolean,
  parentId: string,
}

export interface VestingPeriod extends BaseObj {
  type: Periods,
  date: Date,
  parentId: string
  VestingStatus: VestingStatus
}

interface VestingStatus extends BaseObj {
  achieved: boolean,
  expired: boolean,
  parentId: string
}

export interface UserObj { // User object
  role: Role,
  department: string,
  email: string,
  iat: number,
  exp: number,
  token: string
}

type Role = 
  | "Super User"
  | "Editor"