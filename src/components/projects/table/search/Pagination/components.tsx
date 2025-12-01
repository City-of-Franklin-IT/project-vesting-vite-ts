import { useHandlePaginationBtns } from './hooks'

export const PaginationButtons = () => {
  const { prevBtnProps, nextBtnProps } = useHandlePaginationBtns()

  return (
    <div className="flex flex-col gap-2 h-fit mt-auto lg:flex-row lg:gap-3">
      <PaginationButton { ...prevBtnProps }>
        Prev Page
      </PaginationButton>
      <PaginationButton { ...nextBtnProps }>
        Next Page
      </PaginationButton>
    </div>
  )
}

type PaginationButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'onClick'> & { disabled: boolean, onClick: React.MouseEventHandler<HTMLButtonElement> }

const PaginationButton = (props: PaginationButtonProps) => {
  const { className, children, ...btnProps } = props

  return (
    <button
      type="button"
      className={className || "btn btn-primary text-sm uppercase shadow-xl"}
      { ...btnProps }>
        {children}
    </button>
  )
}