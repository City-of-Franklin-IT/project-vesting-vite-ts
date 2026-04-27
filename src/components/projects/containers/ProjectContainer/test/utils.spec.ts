import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/projects/forms/update/UpdateDevelopmentPlanForm', () => ({ default: () => null }))
vi.mock('@/components/projects/forms/update/UpdateSitePlanForm', () => ({ default: () => null }))
vi.mock('@/components/projects/forms/update/UpdatePreliminaryPlatForm', () => ({ default: () => null }))

import { FormTypeMap } from '../utils'

describe('FormTypeMap', () => {
  it('contains Development Plan', () => {
    expect(FormTypeMap.has('Development Plan')).toBe(true)
  })

  it('contains Preliminary Plat', () => {
    expect(FormTypeMap.has('Preliminary Plat')).toBe(true)
  })

  it('contains Site Plan', () => {
    expect(FormTypeMap.has('Site Plan')).toBe(true)
  })

  it('has entries for all 3 update form types', () => {
    expect(FormTypeMap.size).toBe(3)
  })

  it('returns a function for each type', () => {
    FormTypeMap.forEach(component => {
      expect(typeof component).toBe('function')
    })
  })
})
