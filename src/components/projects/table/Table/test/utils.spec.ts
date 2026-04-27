import { describe, it, expect } from 'vitest'
import {
  setMilestoneIconVariant,
  setVestingIconVariant,
  setIconVariant,
  handleRowStyling,
  handleDetailsBtnIcon,
  ZoningOrdinanceMap,
  ordinanceOptions
} from '../utils'
import { createMockProject, createMockMilestone, createMockVestingPeriod } from '@/test/mocks/api'

describe('setMilestoneIconVariant', () => {
  it('returns red when project is expired and not hovered', () => {
    const project = createMockProject({ expired: true })
    const milestone = createMockMilestone()

    expect(setMilestoneIconVariant(milestone, project, false)).toBe('red')
  })

  it('returns light when project is expired and hovered', () => {
    const project = createMockProject({ expired: true })
    const milestone = createMockMilestone()

    expect(setMilestoneIconVariant(milestone, project, true)).toBe('light')
  })

  it('returns green when milestone is achieved and not hovered', () => {
    const project = createMockProject({ expired: false })
    const milestone = createMockMilestone({ MilestoneStatus: { achieved: true, expired: false, parentId: 'p1', uuid: 'u1', createdBy: '', createdAt: '', updatedBy: '', updatedAt: '' } })

    expect(setMilestoneIconVariant(milestone, project, false)).toBe('green')
  })

  it('returns red when milestone is expired and not hovered', () => {
    const project = createMockProject({ expired: false })
    const milestone = createMockMilestone({ MilestoneStatus: { achieved: false, expired: true, parentId: 'p1', uuid: 'u1', createdBy: '', createdAt: '', updatedBy: '', updatedAt: '' } })

    expect(setMilestoneIconVariant(milestone, project, false)).toBe('red')
  })

  it('returns dark when no status and not hovered', () => {
    const project = createMockProject({ expired: false })
    const milestone = createMockMilestone({ MilestoneStatus: undefined })

    expect(setMilestoneIconVariant(milestone, project, false)).toBe('dark')
  })

  it('returns light when no status and hovered', () => {
    const project = createMockProject({ expired: false })
    const milestone = createMockMilestone({ MilestoneStatus: undefined })

    expect(setMilestoneIconVariant(milestone, project, true)).toBe('light')
  })

  it('returns dark when milestone is undefined and not hovered', () => {
    const project = createMockProject({ expired: false })

    expect(setMilestoneIconVariant(undefined, project, false)).toBe('dark')
  })
})

describe('setVestingIconVariant', () => {
  it('returns red when project is expired and not hovered', () => {
    const project = createMockProject({ expired: true })
    const period = createMockVestingPeriod()

    expect(setVestingIconVariant(period, project, false)).toBe('red')
  })

  it('returns light when project is expired and hovered', () => {
    const project = createMockProject({ expired: true })
    const period = createMockVestingPeriod()

    expect(setVestingIconVariant(period, project, true)).toBe('light')
  })

  it('returns green when vesting period is achieved and not hovered', () => {
    const project = createMockProject({ expired: false })
    const period = createMockVestingPeriod({ VestingStatus: { achieved: true, expired: false, parentId: 'p1', uuid: 'u1', createdBy: '', createdAt: '', updatedBy: '', updatedAt: '' } })

    expect(setVestingIconVariant(period, project, false)).toBe('green')
  })

  it('returns red when vesting period is expired and not hovered', () => {
    const project = createMockProject({ expired: false })
    const period = createMockVestingPeriod({ VestingStatus: { achieved: false, expired: true, parentId: 'p1', uuid: 'u1', createdBy: '', createdAt: '', updatedBy: '', updatedAt: '' } })

    expect(setVestingIconVariant(period, project, false)).toBe('red')
  })

  it('returns dark when no status and not hovered', () => {
    const project = createMockProject({ expired: false })
    const period = createMockVestingPeriod({ VestingStatus: undefined })

    expect(setVestingIconVariant(period, project, false)).toBe('dark')
  })

  it('returns dark when period is undefined and not hovered', () => {
    const project = createMockProject({ expired: false })

    expect(setVestingIconVariant(undefined, project, false)).toBe('dark')
  })
})

describe('setIconVariant', () => {
  it('returns red when project is expired and not hovered', () => {
    const project = createMockProject({ expired: true })

    expect(setIconVariant(project, false)).toBe('red')
  })

  it('returns light when project is expired and hovered', () => {
    const project = createMockProject({ expired: true })

    expect(setIconVariant(project, true)).toBe('light')
  })

  it('returns green when all vesting periods are achieved and not hovered', () => {
    const period = createMockVestingPeriod({ VestingStatus: { achieved: true, expired: false, parentId: 'p1', uuid: 'u1', createdBy: '', createdAt: '', updatedBy: '', updatedAt: '' } })
    const project = createMockProject({ expired: false, VestingPeriods: [period] })

    expect(setIconVariant(project, false)).toBe('green')
  })

  it('returns light when completed and hovered', () => {
    const period = createMockVestingPeriod({ VestingStatus: { achieved: true, expired: false, parentId: 'p1', uuid: 'u1', createdBy: '', createdAt: '', updatedBy: '', updatedAt: '' } })
    const project = createMockProject({ expired: false, VestingPeriods: [period] })

    expect(setIconVariant(project, true)).toBe('light')
  })

  it('returns dark when project is active with no completed vesting', () => {
    const project = createMockProject({ expired: false, VestingPeriods: [] })

    expect(setIconVariant(project, false)).toBe('dark')
  })
})

describe('handleRowStyling', () => {
  it('returns a different style for expired vs active projects', () => {
    const expiredProject = createMockProject({ expired: true })
    const activeProject = createMockProject({ expired: false, VestingPeriods: [] })

    expect(handleRowStyling(expiredProject)).not.toBe(handleRowStyling(activeProject))
  })

  it('returns a different style for completed vs active projects', () => {
    const achievedPeriod = createMockVestingPeriod({ VestingStatus: { achieved: true, expired: false, parentId: 'p1', uuid: 'u1', createdBy: '', createdAt: '', updatedBy: '', updatedAt: '' } })
    const activePeriod = createMockVestingPeriod({ VestingStatus: { achieved: false, expired: false, parentId: 'p1', uuid: 'u1', createdBy: '', createdAt: '', updatedBy: '', updatedAt: '' } })
    const completedProject = createMockProject({ expired: false, VestingPeriods: [achievedPeriod] })
    const activeProject = createMockProject({ expired: false, VestingPeriods: [activePeriod] })

    expect(handleRowStyling(completedProject)).not.toBe(handleRowStyling(activeProject))
  })

  it('returns a different style for expired vs completed projects', () => {
    const achievedPeriod = createMockVestingPeriod({ VestingStatus: { achieved: true, expired: false, parentId: 'p1', uuid: 'u1', createdBy: '', createdAt: '', updatedBy: '', updatedAt: '' } })
    const expiredProject = createMockProject({ expired: true })
    const completedProject = createMockProject({ expired: false, VestingPeriods: [achievedPeriod] })

    expect(handleRowStyling(expiredProject)).not.toBe(handleRowStyling(completedProject))
  })

  it('returns a string for every project state', () => {
    const project = createMockProject({ expired: false, VestingPeriods: [] })

    expect(typeof handleRowStyling(project)).toBe('string')
  })
})

describe('handleDetailsBtnIcon', () => {
  it('returns minimize type when expanded', () => {
    const result = handleDetailsBtnIcon({ expanded: true, hovered: false })

    expect(result.type).toBe('minimize')
  })

  it('returns expand type when not expanded', () => {
    const result = handleDetailsBtnIcon({ expanded: false, hovered: false })

    expect(result.type).toBe('expand')
  })

  it('returns light variant when hovered', () => {
    const result = handleDetailsBtnIcon({ expanded: false, hovered: true })

    expect(result.variant).toBe('light')
  })

  it('returns dark variant when not hovered', () => {
    const result = handleDetailsBtnIcon({ expanded: false, hovered: false })

    expect(result.variant).toBe('dark')
  })

  it('always returns small size', () => {
    const result = handleDetailsBtnIcon({ expanded: true, hovered: true })

    expect(result.size).toBe('small')
  })
})

describe('ZoningOrdinanceMap', () => {
  it('contains entries for all known ordinance dates', () => {
    expect(ZoningOrdinanceMap.has('2014-09-29')).toBe(true)
    expect(ZoningOrdinanceMap.has('2024-07-01')).toBe(true)
  })

  it('returns a URL string for each entry', () => {
    ZoningOrdinanceMap.forEach((value) => {
      expect(typeof value).toBe('string')
    })
  })
})

describe('ordinanceOptions', () => {
  it('has an empty default option first', () => {
    expect(ordinanceOptions[0].text).toBe('')
    expect(ordinanceOptions[0].value).toBe('')
  })

  it('contains all ordinance dates', () => {
    const dates = ordinanceOptions.map(o => o.text).filter(Boolean)

    expect(dates).toContain('2014-09-29')
    expect(dates).toContain('2024-07-01')
  })
})
