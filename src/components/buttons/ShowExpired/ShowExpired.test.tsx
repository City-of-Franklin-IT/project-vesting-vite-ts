import { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { mock } from 'ts-mockito'
import AppContext from '../../../context/App/AppContext'
import styles from './ShowExpired.module.css'
import * as indexModule from '.'

// Types
import { AppState } from '../../../context/App/types'
import { ShowExpiredState } from './types'

// Components
import ShowExpired from './ShowExpired'

describe('ShowExpired', () => {
  vi.mock('./index', () => ({
    useShowExpired: vi.fn()
  }))

  const ctxMock = mock<AppState>()
  const dispatch = vi.fn()
  const useShowExpiredMock = vi.fn()

  beforeEach(() => {
    vi.spyOn(indexModule, 'useShowExpired').mockImplementation(useShowExpiredMock)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Renders correctly', () => {
      render(
        <AppContext.Provider value={{ ...ctxMock, dispatch }}>
          <ShowExpired />
        </AppContext.Provider>
      )

      const input = screen.getByRole('checkbox')
  
      expect(input).toBeInTheDocument()
  })

  it('State updated on change', () => {
    const TestComponent = () => {
      const [state, setState] = useState<ShowExpiredState>({ showExpired: true })

      return (
        <div className={styles.container}>
          <label className={styles.label}>Show Expired:</label>
          <div>Show Expired = {state.showExpired ? 'True' : 'False'}</div>
          <input 
            type="checkbox"
            checked={state.showExpired}
            className={styles.checkbox}
            onChange={() => setState(prevState => ({ showExpired: !prevState.showExpired }))} />
        </div>
      )
    }

    const { rerender } = render(<TestComponent />)
    let text = screen.getByText('Show Expired = True')

    expect(text).toBeInTheDocument()

    rerender(<TestComponent />)
    const input = screen.getByRole('checkbox')

    fireEvent.click(input)
    text = screen.getByText('Show Expired = False')

    expect(text).toBeInTheDocument()
  })
})