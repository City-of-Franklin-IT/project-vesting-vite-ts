import { useHandlePaginationBtns } from './hooks'

export const PaginationButtons = () => {
  const { handlePrevPage, handleNextPage, currentPage, totalPages } = useHandlePaginationBtns()

  return (
    <div className="flex flex-col gap-2 h-fit mt-auto lg:flex-row lg:gap-3">
      <PaginationButton
        disabled={currentPage === 1}
        onClick={handlePrevPage}>
          Prev Page
      </PaginationButton>
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={handleNextPage}>
          Next Page
      </PaginationButton>
    </div>
  )
}

type PaginationButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'onClick'> & { disabled: boolean, onClick: React.MouseEventHandler<HTMLButtonElement> }

const PaginationButton = (props: PaginationButtonProps) => {

  return (
    <button
      type="button"
      disabled={props.disabled}
      onClick={props.onClick}
      className={props.className || "btn btn-primary text-sm uppercase shadow-xl"}>
        {props.children}
    </button>
  )
}