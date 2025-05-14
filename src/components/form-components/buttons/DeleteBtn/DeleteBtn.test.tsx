import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import DeleteBtn from './DeleteBtn'

describe('DeleteBtn', () => {
  const deleteFnMock = vi.fn()

  it('Renders correctly', () => {
    render(
      <DeleteBtn
        label={'Delete Project'}
        deleteFn={deleteFnMock} />
    )

    const button = screen.getByRole('button')
    const text = screen.getByText('Delete Project')

    expect(button).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  it('onClick event handler called on button click', () => {
    render(
      <DeleteBtn
        label={'Delete Project'}
        deleteFn={deleteFnMock} />
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(deleteFnMock).toHaveBeenCalled()
  })
})