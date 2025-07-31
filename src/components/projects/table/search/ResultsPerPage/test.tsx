import { useContext } from 'react'
import { MemoryRouter } from 'react-router'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProjectsCtx, { ProjectsProvider } from '@/components/projects/containers/ProjectsContainer/context'

// Components
import ResultsPerPage from '.'

describe('ResultsPerPage', () => {
  it('Updates resultsPerPage in ProjectsCtx on select', async () => {
    const TestComponent = () => {
      const { resultsPerPage } = useContext(ProjectsCtx)

      const label = `Results Per Page: ${ resultsPerPage }`

      return (
        <>
          <span data-testid="test-span">{label}</span>
          <ResultsPerPage />
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

    expect(screen.getByTestId('test-span')).toHaveTextContent('Results Per Page: 100')

    await userEvent.selectOptions(screen.getByRole('combobox'), '25')

    await waitFor(() => expect(screen.getByTestId('test-span')).toHaveTextContent('Results Per Page: 25'))
  })
})