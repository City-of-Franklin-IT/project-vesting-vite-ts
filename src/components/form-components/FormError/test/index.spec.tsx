import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FormError from '../index'

describe('FormError', () => {
  it('renders nothing when error is undefined', () => {
    const { container } = render(<FormError error={undefined} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when error is empty string', () => {
    const { container } = render(<FormError error="" />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders the error message', () => {
    render(<FormError error="This field is required" />)

    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('renders with the form-error test id', () => {
    render(<FormError error="Invalid value" />)

    expect(screen.getByTestId('form-error')).toBeInTheDocument()
  })
})
