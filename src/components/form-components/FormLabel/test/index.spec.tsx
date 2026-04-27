import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FormLabel from '../index'

describe('FormLabel', () => {
  it('renders children as label text', () => {
    render(<FormLabel name="name">Project Name</FormLabel>)

    expect(screen.getByText('Project Name')).toBeInTheDocument()
  })

  it('renders a label element linked to the field name', () => {
    render(<FormLabel name="cof">COF Number</FormLabel>)
    const label = screen.getByTestId('form-label')

    expect(label).toHaveAttribute('for', 'cof')
  })

  it('does not render the required icon when required is false', () => {
    render(<FormLabel name="name" required={false}>Name</FormLabel>)

    expect(screen.queryByAltText('required icon')).not.toBeInTheDocument()
  })

  it('does not render the required icon when required is omitted', () => {
    render(<FormLabel name="name">Name</FormLabel>)

    expect(screen.queryByAltText('required icon')).not.toBeInTheDocument()
  })

  it('renders the required icon when required is true', () => {
    render(<FormLabel name="name" required>Name</FormLabel>)

    expect(screen.getByAltText('required icon')).toBeInTheDocument()
  })
})
