import { useContext, useEffect } from 'react'
import { MemoryRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectsCtx, { ProjectsProvider } from '@/components/projects/containers/ProjectsContainer/context'

// Components
import * as Components from './components'

describe('MilestoneFilter', () => {

  describe('DateInputs', () => {
    it('Updates milestoneFilter in ProjectsCtx on change', async () => {
      const TestComponent = () => {
        const { milestoneFilter } = useContext(ProjectsCtx)

        const filterStatus = milestoneFilter.start && milestoneFilter.end ? 'Filter Active' : 'Filter Inactive'

        return (
          <>
            <span data-testid="test-span">{filterStatus}</span>
            <Components.DateInputs />
          </>
        )
      }

      render(
        <MemoryRouter>
          <ProjectsProvider>
            <TestComponent />
          </ProjectsProvider>
        </MemoryRouter>
      )

      expect(screen.getByTestId('test-span')).toHaveTextContent('Filter Inactive')

      await userEvent.type(screen.getByTestId('start-input'), '2025-07-30')
      await userEvent.type(screen.getByTestId('end-input'), '2025-07-31')

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Filter Active'))
    })
  })

  describe('RemoveFilterBtn', () => {
    it('Clears milestoneFilter from ProjectsCtx on click', async () => {

      const TestComponent = () => {
        const { milestoneFilter, dispatch } = useContext(ProjectsCtx)

        const filterStatus = milestoneFilter.start && milestoneFilter.end ? 'Filter Active' : 'Filter Inactive'

        useEffect(() => {
          dispatch({ type: 'SET_MILESTONE_FILTER', payload: { start: '2025-07-30', end: '2025-07-31' } })
        }, [])

        return (
          <>
            <span data-testid="test-span">{filterStatus}</span>
            <Components.RemoveFilterBtn />
          </>
        )
      }

      render(
        <MemoryRouter>
          <ProjectsProvider>
            <TestComponent />
          </ProjectsProvider>
        </MemoryRouter>
      )

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Filter Active'))

      await userEvent.click(screen.getByRole('button'))

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Filter Inactive')) 
    })
  })

  describe('ShowAchieved', () => {
    it('Toggles showAchieved in ProjectsCtx on change', async () => {

      const TestComponent = () => {
        const { showAchieved } = useContext(ProjectsCtx)

        const filterStatus = showAchieved.firstMilestone ? 'Filter Active' : 'Filter Inactive'

        return (
          <>
            <span data-testid="test-span">{filterStatus}</span>
            <Components.ShowAchieved />
          </>
        )
      }

      render(
        <MemoryRouter>
          <ProjectsProvider>
            <TestComponent />
          </ProjectsProvider>
        </MemoryRouter>
      )

      expect(screen.getByTestId('test-span')).toHaveTextContent('Filter Active')

      await userEvent.click(screen.getAllByRole('checkbox')[0]) // First milestone checkbox

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Filter Inactive'))
    })
  })
})