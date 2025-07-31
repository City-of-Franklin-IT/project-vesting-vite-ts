import { useContext } from 'react'
import { MemoryRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectsCtx, { ProjectsProvider } from './context'

// Components
import * as Components from './components'

describe('ProjectsContainer', () => {

  describe('ShowExpiredCheckbox', () => {
    it('Should toggle showExpired in ProjectsCtx on change', async () => {
      const TestComponent = () => {
        const { showExpired } = useContext(ProjectsCtx)

        const label = showExpired ? 'True' : 'False'

        return (
          <>
            <span data-testid="test-span">{label}</span>
            <Components.ShowExpiredCheckbox />
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

      expect(screen.getByTestId('test-span')).toHaveTextContent('True')

      await userEvent.click(screen.getByRole('checkbox'))

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('False'))
    })
  })

  describe('ShowCompletedCheckbox', () => {
    it('Should toggle showCompleted in ProjectsCtx on change', async () => {
      const TestComponent = () => {
        const { showCompleted } = useContext(ProjectsCtx)

        const label = showCompleted ? 'True' : 'False'

        return (
          <>
            <span data-testid="test-span">{label}</span>
            <Components.ShowCompletedCheckbox />
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

      expect(screen.getByTestId('test-span')).toHaveTextContent('True')

      await userEvent.click(screen.getByRole('checkbox'))

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('False'))
    })
  })
})