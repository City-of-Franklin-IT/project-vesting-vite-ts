import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import RequiredIcon from '../index'

describe('RequiredIcon', () => {
  it('renders the required icon image', () => {
    render(<RequiredIcon width="w-3" />)

    expect(screen.getByAltText('required icon')).toBeInTheDocument()
  })

  it('applies the provided width class to the image', () => {
    render(<RequiredIcon width="w-4" />)
    const img = screen.getByAltText('required icon')

    expect(img.className).toContain('w-4')
  })

  it('applies a different width class correctly', () => {
    render(<RequiredIcon width="w-6" />)
    const img = screen.getByAltText('required icon')

    expect(img.className).toContain('w-6')
  })
})
