import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import BackToTopBtn from '.'

describe('BackToTop', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
    render(<BackToTopBtn handleClick={handleClickMock} />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  it('onClick event handler called on button click', () => {
    render(<BackToTopBtn handleClick={handleClickMock} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClickMock).toHaveBeenCalled()
  })
})