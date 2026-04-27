import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BackToTopBtn from '../index'

describe('BackToTopBtn', () => {
  it('renders a button with Back To Top text', () => {
    render(<BackToTopBtn onClick={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Back To Top' })).toBeInTheDocument()
  })

  it('renders a button of type button', () => {
    render(<BackToTopBtn onClick={vi.fn()} />)
    const button = screen.getByRole('button')

    expect(button).toHaveAttribute('type', 'button')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<BackToTopBtn onClick={onClick} />)

    fireEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
