import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import * as indexModule from '.'

// Components
import DeleteProjectBtn from './DeleteProjectBtn'

describe('DeleteProjectBtn', () => {
  vi.mock('./index', () => ({
    handleClick: vi.fn()
  }))
  
  const handleClickMock = vi.fn()

  beforeEach(() => {
    vi.spyOn(indexModule, 'handleClick').mockImplementation(handleClickMock)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })
  
  it('Renders correctly', () => {
    render(
      <BrowserRouter>
        <DeleteProjectBtn uuid={'123'} />
      </BrowserRouter>
    )  

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  it('onClick event handler called on button click', () => {
    render(
      <BrowserRouter>
        <DeleteProjectBtn uuid={'123'} />
      </BrowserRouter>
    )  

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClickMock).toHaveBeenCalled()
  })
})