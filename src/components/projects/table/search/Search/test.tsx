import { useContext } from 'react'
import { MemoryRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectsCtx, { ProjectsProvider } from '@/components/projects/containers/ProjectsContainer/context'

// Components
import * as Components from './components'

const TestComponent = ({ children }: { children: React.ReactNode }) => {
  const { searchValue } = useContext(ProjectsCtx)

  const label = `Search Value: ${ searchValue }`

  return (
    <>
      <span data-testid="test-span">{label}</span>
      {children}
    </>
  )
}

describe('Search', () => {

  describe('SearchInput', () => {
    it('Updates searchValue in ProjectCtx on change', async () => {

      render(
        <MemoryRouter>
          <ProjectsProvider>
            <TestComponent>
              <Components.SearchInput />
            </TestComponent>
          </ProjectsProvider>
        </MemoryRouter>
      )

      await userEvent.type(screen.getByRole('textbox'), 'ABC123')

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Search Value: ABC123'))
    })
  })

  describe('ClearBtn', () => {
    it('Clears searchValue from ProjectCtx on click', async () => {

      render(
        <MemoryRouter>
          <ProjectsProvider>
            <TestComponent>
              <Components.SearchInput />
              <Components.ClearBtn />
            </TestComponent>
          </ProjectsProvider>
        </MemoryRouter>
      )

      await userEvent.type(screen.getByRole('textbox'), 'ABC123')

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Search Value: ABC123'))

      await userEvent.click(screen.getByRole('button'))

      await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Search Value:'))
    })
  })
})