import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import DetailsBtn from '.'

describe('DetailsBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
    render(
      <DetailsBtn  
        expanded={false}
        hovered={false}
        handleClick={handleClickMock} />
    )

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  it('onClick event handler called on button click', () => {
    render(
      <DetailsBtn  
        expanded={false}
        hovered={false}
        handleClick={handleClickMock} />
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClickMock).toHaveBeenCalled()
  })
})