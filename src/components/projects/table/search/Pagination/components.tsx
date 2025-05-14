import React, { useContext } from "react"
import ProjectsCtx from "@/components/projects/containers/ProjectsContainer/context"

export const PaginationButtons = () => {
  const { currentPage, totalPages, dispatch } = useContext(ProjectsCtx)

  return (
    <div className="flex gap-3 h-fit mt-auto">
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage - 1 })}>
          Prev Page
      </PaginationButton>
      <PaginationButton
        disabled={currentPage === totalPages}
        onClick={() => dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPage + 1 })}>
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