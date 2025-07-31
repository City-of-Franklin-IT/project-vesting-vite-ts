import { useContext } from 'react'
import { MemoryRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectsCtx, { ProjectsProvider } from '../ProjectsContainer/context'
import { useHandleFilterBtnClick } from './hooks'

describe('FilterContainer', () => {

  describe('useHandleFilterBtnClick', () => {
    it('Updates filter in ProjectsCtx when called', async () => {
      
      const TestComponent = () => {
        const { filter } = useContext(ProjectsCtx)

        const { handleFilterBtnClick } = useHandleFilterBtnClick('Development Plan')

        return (
          <>
            <span data-testid="test-span">{filter}</span>
            <button 
              type="button"
              onClick={handleFilterBtnClick}>
                Click Me
            </button>
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

      await userEvent.click(screen.getByRole('button'))

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Development Plan'))
    })
  })
})