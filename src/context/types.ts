export interface ProjectInterface extends BaseInterface { 
  type: ProjectTypes
  name: string
  cof: number
  ordinance: ZoningOrdinanceType
  expired: boolean | null
  notes: string | null
  Approvals?: ApprovalInterface[]
  Resolution?: ResolutionInterface
  VestingNotifications?: VestingNotificationInterface[]
  Milestones?: MilestoneInterface[]
  VestingPeriods?: VestingPeriodInterface[]
  [key: string]: any
}

export interface ProjectCreateInterface extends Omit<ProjectInterface, 'Approvals' | 'Resolution' | 'VestingNotifications' | 'Milestones' | 'VestingPeriods' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  Approvals: ApprovalCreateInterface[]
  Resolution: ResolutionCreateInterface
  Milestones: MilestoneCreateInterface[]
  VestingPeriods: VestingPeriodCreateInterface[]
  VestingNotifications?: VestingNotificationCreateInterface[]
  uuid?: string
}

export interface ApprovalInterface extends BaseInterface {
  date: string
  approvedBy: "Admin" | "FPMC" | "BOMA"
  parentId: string
}

export interface ApprovalCreateInterface extends Omit<ApprovalInterface, 'approvedBy' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  approvedBy: 'Admin' | 'FPMC' | 'BOMA' | ''
  uuid?: string
}

export interface ResolutionInterface extends BaseInterface {
  resolution: string
  parentId: string
}

export interface ResolutionCreateInterface extends Omit<ResolutionInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  uuid?: string
}

export interface MilestoneInterface extends BaseInterface {
  number: 1 | 2
  date: string
  parentId: string
  MilestoneExtension?: MilestoneExtensionInterface
  MilestoneStatus?: MilestoneStatusInterface
}

export interface MilestoneCreateInterface extends Omit<MilestoneInterface, 'MilestoneExtension' | 'MilestoneStatus' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  MilestoneExtension: MilestoneExtensionCreateInterface
  MilestoneStatus: MilestoneStatusUpdateInterface
  uuid?: string
}

export interface MilestoneExtensionInterface extends BaseInterface {
  date: string
  parentId: string
}

export interface MilestoneExtensionCreateInterface extends Omit<MilestoneExtensionInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{ uuid?: string }

export interface MilestoneStatusInterface extends BaseInterface {
  achieved: boolean | null
  expired: boolean | null
  parentId: string
}

export interface MilestoneStatusUpdateInterface extends Omit<MilestoneStatusInterface, 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{}

export interface VestingPeriodInterface extends BaseInterface {
  type: "10Y" | "15Y"
  date: string
  parentId: string
  VestingExtension?: VestingExtensionInterface
  VestingStatus?: VestingStatusInterface
}

export interface VestingPeriodCreateInterface extends Omit<VestingPeriodInterface, 'VestingExtension' | 'VestingStatus' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  VestingExtension?: VestingExtensionCreateInterface
  VestingStatus?: VestingStatusUpdateInterface
  uuid?: string
}

export interface VestingStatusInterface extends BaseInterface {
  achieved: boolean | null
  expired: boolean | null
  parentId: string
}

export interface VestingStatusUpdateInterface extends Omit<VestingStatusInterface, 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{}

export interface VestingExtensionInterface extends BaseInterface {
  date: string
  parentId: string
}

export interface VestingExtensionCreateInterface extends Omit<VestingExtensionInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{ uuid?: string }

export interface VestingNotificationInterface extends BaseInterface {
  date: string
  type: NotificationTypes
  parentId: string
}

export interface VestingNotificationCreateInterface extends Omit<VestingNotificationInterface, 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  parentId: string
  uuid?: string
}

export interface ServerResponse { // Server response object
  success: boolean
  msg?: string
}

export type NotificationTypes =
  | 'Initial'
  | 'Last Call'
  | 'Lost Vesting'

export type ZoningOrdinanceType =
  | '2014-09-29'
  | '2016-02-23'
  | '2017-01-01'
  | '2017-04-01'
  | '2018-03-01'
  | '2018-07-01'
  | '2019-12-30'
  | '2020-12-30'
  | '2020-12-08'
  | '2022-01-01'
  | '2023-01-01'
  | '2024-07-01'
  | '2025-01-01'

type ProjectTypes = 
  | 'Development Plan'
  | 'Preliminary Plat'
  | 'Site Plan'

type BaseInterface = {
  uuid: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}