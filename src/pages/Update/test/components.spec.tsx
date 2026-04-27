import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Project } from '../components'

vi.mock('@/components/projects/containers/ProjectContainer', () => ({
  default: ({ project }: any) => <div data-testid="project-container">{project.name}</div>
}))

describe('Project component', () => {
  it('renders null when project is undefined', () => {
    const { container } = render(<Project project={undefined} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders ProjectContainer when project is provided', () => {
    const project = {
      uuid: 'test-uuid',
      type: 'Site Plan' as const,
      name: 'Test Project',
      cof: 1234,
      ordinance: '2022-01-01' as const,
      expired: false,
      notes: null,
      Approvals: [],
      VestingNotifications: [],
      Milestones: [],
      VestingPeriods: [],
      createdBy: 'user@example.com',
      createdAt: '2024-01-01',
      updatedBy: 'user@example.com',
      updatedAt: '2024-01-01'
    }

    const { getByTestId } = render(<Project project={project} />)

    expect(getByTestId('project-container')).toBeInTheDocument()
  })
})
