import { useContext, useEffect } from 'react'
import { MemoryRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectsCtx, { ProjectsProvider } from '@/components/projects/containers/ProjectsContainer/context'
import { createMock } from '@/test/mocks/utils'
import { useSetTotalPages, useHandlePaginationBtns, useResetActivePage } from './hooks'

const mockProjects = createMock('createMockProject', 200)

describe('Pagination', () => {

  describe('useSetTotalPages', () => {
    it('Sets totalPages in ProjectsCtx', async () => {
      const TestComponent = () => {
        const { totalPages } = useContext(ProjectsCtx)

        useSetTotalPages(mockProjects.length)

        const label = `Total Pages: ${ totalPages }`

        return (
          <span data-testid="test-span">{label}</span>
        )
      }

      render(
        <MemoryRouter>
          <ProjectsProvider>
            <TestComponent />
          </ProjectsProvider>
        </MemoryRouter>
      )

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Total Pages: 2'))
    })
  })

  describe('useHandlePaginationBtns', () => {
    it('handlePrevPage sets currentPage - 1 in ProjectsCtx when called', async () => {
      const TestComponent = () => {
        const { currentPage, dispatch } = useContext(ProjectsCtx)

        const { handlePrevPage } = useHandlePaginationBtns()

        const label = `Current Page: ${ currentPage }`

        useEffect(() => {
          dispatch({ type: 'SET_CURRENT_PAGE', payload: 10 })
        }, [])

        return (
          <>
            <span data-testid="test-span">{label}</span>
            <button 
              type="button"
              onClick={handlePrevPage}>
                Prev Page
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

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Current Page: 9'))
    })

    it('handleNextPage sets currentPage + 1 in ProjectsCtx when called', async () => {
      const TestComponent = () => {
        const { currentPage, dispatch } = useContext(ProjectsCtx)

        const { handleNextPage } = useHandlePaginationBtns()

        const label = `Current Page: ${ currentPage }`

        useEffect(() => {
          dispatch({ type: 'SET_CURRENT_PAGE', payload: 10 })
        }, [])

        return (
          <>
            <span data-testid="test-span">{label}</span>
            <button 
              type="button"
              onClick={handleNextPage}>
                Next Page
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

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Current Page: 11'))
    })
  })

  describe('useResetActivePage', () => {
    it('Resets currentPage to 1 when called / on change to context values', async () => {
      const TestComponent = () => {
        const { currentPage, dispatch } = useContext(ProjectsCtx)

        const label = `Current Page: ${ currentPage }`

        useResetActivePage()

        useEffect(() => {
          dispatch({ type: 'SET_CURRENT_PAGE', payload: 10 })
        }, [])

        return (
          <>
            <span data-testid="test-span">{label}</span>
            <input 
              type="text" 
              onChange={(e) => dispatch({ type: 'SET_SEARCH_VALUE', payload: e.currentTarget.value })} />
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

      expect(screen.getByTestId('test-span')).toHaveTextContent('Current Page: 10')

      await userEvent.type(screen.getByRole('textbox'), 'Some text value')

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Current Page: 1'))
    })
  })
})