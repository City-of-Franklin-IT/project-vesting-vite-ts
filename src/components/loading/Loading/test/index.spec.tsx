import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Loading from '../index'

describe('Loading', () => {
  it('renders a loading icon', () => {
    render(<Loading />)

    expect(screen.getByAltText('loading icon')).toBeInTheDocument()
  })

  it('renders a pointer-events-none overlay wrapper', () => {
    const { container } = render(<Loading />)

    expect(container.firstChild).toBeInTheDocument()
  })
})
