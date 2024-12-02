import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { mock } from 'ts-mockito'
import AppContext from '../../../context/App/AppContext'

// Types
import { AppState } from '../../../context/App/types'

// Components
import FilterBtn from './FilterBtn'

describe('FilterBtn', () => {
  it('Renders correctly', () => {
    render(<FilterBtn type={'Development Plan'} />)

    const button = screen.getByRole('button')
    const text = screen.getByText('Development Plan')

    expect(button).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  it('onClick event handler called on button click', () => {
    const dispatch = vi.fn()
    const stateMock = mock<AppState>()

    render(
      <BrowserRouter>
        <AppContext.Provider value={{ ...stateMock, dispatch }}>
          <FilterBtn type={'Development Plan'} />
        </AppContext.Provider>
      </BrowserRouter>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(dispatch).toHaveBeenCalled()
  })
})
