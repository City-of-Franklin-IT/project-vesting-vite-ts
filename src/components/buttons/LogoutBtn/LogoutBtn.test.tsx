import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { mock } from 'ts-mockito'
import AppContext from '../../../context/App/AppContext'
import * as indexModule from '.'

// Types
import { AppState } from '../../../context/App/types'

// Components
import LogoutBtn from './LogoutBtn'

describe('LogoutBtn', () => {
  vi.mock('./index', () => ({
    handleLogoutClick: vi.fn()
  }))

  const handleLogoutClickMock = vi.fn()

  beforeEach(() => {
    vi.spyOn(indexModule, 'handleLogoutClick').mockImplementation(handleLogoutClickMock)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Renders correctly', () => {
    render(
      <BrowserRouter>
        <LogoutBtn />
      </BrowserRouter>
    )

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  it('onClick event handler called on button click', () => {
    const dispatch = vi.fn()
    const stateMock = mock<AppState>()

    render(
      <BrowserRouter>
        <AppContext.Provider value={{ ...stateMock, dispatch }}>
          <LogoutBtn />
        </AppContext.Provider>
      </BrowserRouter>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleLogoutClickMock).toHaveBeenCalled()
  })
})