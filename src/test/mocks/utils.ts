import * as MockAPI from './api'

// Types
import * as AppTypes from '@/context/types'

type MockFunctionMap = {
  'createMockProject': AppTypes.ProjectInterface
  'createMockApproval': AppTypes.ApprovalInterface
  'createMockResolution': AppTypes.ResolutionInterface
  'createMockMilestone': AppTypes.MilestoneInterface
  'createMockMilestoneExtension': AppTypes.MilestoneExtensionInterface
  'createMockMilestoneStatus': AppTypes.MilestoneStatusInterface
  'createMockVestingPeriod': AppTypes.VestingPeriodInterface
  'createMockVestingStatus': AppTypes.VestingStatusInterface
  'createMockVestingExtension': AppTypes.VestingExtensionInterface
  'createMockVestingNotification': AppTypes.VestingNotificationInterface
}

export const createMock = <T extends keyof MockFunctionMap>(
  type: T, 
  length: number, 
  overrides?: Partial<MockFunctionMap[T]>
): MockFunctionMap[T][] => {
  const mockFunction = MockAPI[type] as (overrides?: Partial<MockFunctionMap[T]>) => MockFunctionMap[T]
  return Array.from({ length }).map(() => mockFunction(overrides))
}