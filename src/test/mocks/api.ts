import { faker } from '@faker-js/faker'

// Types
import * as AppTypes from '@/context/types'

export const createMockProject = (overrides?: Partial<AppTypes.ProjectInterface>): AppTypes.ProjectInterface => ({
  type: faker.helpers.arrayElement(['Development Plan', 'Preliminary Plat', 'Site Plan']),
  name: faker.company.name(),
  cof: faker.number.int({ min: 1000, max: 9999 }),
  ordinance: faker.helpers.arrayElement([
    '2014-09-29', '2016-02-23', '2017-01-01', '2017-04-01', '2018-03-01',
    '2018-07-01', '2019-12-30', '2020-12-30', '2020-12-08', '2022-01-01',
    '2023-01-01', '2024-07-01'
  ]),
  expired: faker.helpers.arrayElement([true, false, null]),
  notes: faker.lorem.paragraph(),
  Approvals: [],
  Resolution: undefined,
  VestingNotifications: [],
  Milestones: [],
  VestingPeriods: [],
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid(),
  ...overrides
})

export const createMockApproval = (overrides?: Partial<AppTypes.ApprovalInterface>): AppTypes.ApprovalInterface => ({
  date: faker.date.anytime().toISOString().split('T')[0],
  approvedBy: faker.helpers.arrayElement(['Admin', 'FPMC', 'BOMA']),
  parentId: faker.string.uuid(),
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid(),
  ...overrides
})

export const createMockResolution = (overrides?: Partial<AppTypes.ResolutionInterface>): AppTypes.ResolutionInterface => ({
  resolution: faker.lorem.sentence(),
  parentId: faker.string.uuid(),
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid(),
  ...overrides
})

export const createMockMilestone = (overrides?: Partial<AppTypes.MilestoneInterface>): AppTypes.MilestoneInterface => ({
  number: faker.helpers.arrayElement([1, 2]),
  date: faker.date.anytime().toISOString().split('T')[0],
  parentId: faker.string.uuid(),
  MilestoneExtension: undefined,
  MilestoneStatus: undefined,
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid(),
  ...overrides
})

export const createMockMilestoneExtension = (overrides?: Partial<AppTypes.MilestoneExtensionInterface>): AppTypes.MilestoneExtensionInterface => ({
  date: faker.date.anytime().toISOString().split('T')[0],
  parentId: faker.string.uuid(),
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid(),
  ...overrides
})

export const createMockMilestoneStatus = (overrides?: Partial<AppTypes.MilestoneStatusInterface>): AppTypes.MilestoneStatusInterface => ({
  achieved: faker.helpers.arrayElement([true, false, null]),
  expired: faker.helpers.arrayElement([true, false, null]),
  parentId: faker.string.uuid(),
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid(),
  ...overrides
})

export const createMockVestingPeriod = (overrides?: Partial<AppTypes.VestingPeriodInterface>): AppTypes.VestingPeriodInterface => ({
  type: faker.helpers.arrayElement(['10Y', '15Y']),
  date: faker.date.anytime().toISOString().split('T')[0],
  parentId: faker.string.uuid(),
  VestingExtension: undefined,
  VestingStatus: undefined,
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid(),
  ...overrides
})

export const createMockVestingStatus = (overrides?: Partial<AppTypes.VestingStatusInterface>): AppTypes.VestingStatusInterface => ({
  achieved: faker.helpers.arrayElement([true, false, null]),
  expired: faker.helpers.arrayElement([true, false, null]),
  parentId: faker.string.uuid(),
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid(),
  ...overrides
})

export const createMockVestingExtension = (overrides?: Partial<AppTypes.VestingExtensionInterface>): AppTypes.VestingExtensionInterface => ({
  date: faker.date.anytime().toISOString().split('T')[0],
  parentId: faker.string.uuid(),
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid(),
  ...overrides
})

export const createMockVestingNotification = (overrides?: Partial<AppTypes.VestingNotificationInterface>): AppTypes.VestingNotificationInterface => ({
  date: faker.date.anytime().toISOString().split('T')[0],
  type: faker.helpers.arrayElement(['Initial', 'Last Call', 'Lost Vesting']),
  parentId: faker.string.uuid(),
  createdBy: faker.internet.email(),
  createdAt: faker.date.anytime().toISOString(),
  updatedBy: faker.internet.email(),
  updatedAt: faker.date.anytime().toISOString(),
  uuid: faker.string.uuid(),
  ...overrides
})