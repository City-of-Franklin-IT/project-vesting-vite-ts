import { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { mock } from 'ts-mockito'
import AppContext from '../../../context/App/AppContext'
import styles from './ShowCompleted.module.css'
import * as indexModule from '.'

// Types
import { AppState } from '../../../context/App/types'
import { ShowCompletedState } from './types'

// Components
import ShowCompleted from './ShowCompleted'

describe('ShowCompleted', () => {
  vi.mock('./index', () => ({
    useShowCompleted: vi.fn()
  }))

  const ctxMock = mock<AppState>()
  const dispatch = vi.fn()
  const useShowCompletedMock = vi.fn()

  beforeEach(() => {
    vi.spyOn(indexModule, 'useShowCompleted').mockImplementation(useShowCompletedMock)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Renders correctly', () => {
    render(
      <AppContext.Provider value={{ ...ctxMock, dispatch }}>
        <ShowCompleted />
      </AppContext.Provider>
    )

    const input = screen.getByRole('checkbox')

    expect(input).toBeInTheDocument()
  })

  it('State updated on change', () => {
    const TestComponent = () => {
      const [state, setState] = useState<ShowCompletedState>({ showCompleted: true })

      return (
        <div className={styles.container}>
          <label className={styles.label}>Show Completed:</label>
          <div>Show Completed = {state.showCompleted ? 'True' : 'False'}</div>
          <input 
            type="checkbox"
            checked={state.showCompleted}
            className={styles.checkbox}
            onChange={() => setState(prevState => ({ showCompleted: !prevState.showCompleted }))} />
        </div>
      )
    }

    const { rerender } = render(<TestComponent />)
    let text = screen.getByText('Show Completed = True')

    expect(text).toBeInTheDocument()

    rerender(<TestComponent />)
    const input = screen.getByRole('checkbox')

    fireEvent.click(input)
    text = screen.getByText('Show Completed = False')

    expect(text).toBeInTheDocument()
  })
})