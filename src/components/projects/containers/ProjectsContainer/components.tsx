import { useContext } from "react"
import ProjectsCtx from "./context"

export const ShowExpiredCheckbox = () => {
  const { showExpired, dispatch } = useContext(ProjectsCtx)

  return (
    <div className="flex gap-2 items-center">
      <label className="text-primary-content text-lg font-[play] uppercase whitespace-nowrap">Show Expired:</label>
      <input 
        type="checkbox"
        checked={showExpired}
        className="checkbox checkbox-primary"
        onChange={() => dispatch({ type: 'TOGGLE_SHOW_EXPIRED' })} />
    </div>
  )
}
export const ShowCompletedCheckbox = () => {
  const { showCompleted, dispatch } = useContext(ProjectsCtx)

  return (
    <div className="flex gap-2 items-center">
      <label className="text-primary-content text-lg font-[play] uppercase whitespace-nowrap">Show Completed:</label>
      <input 
        type="checkbox"
        checked={showCompleted}
        className="checkbox checkbox-primary"
        onChange={() => dispatch({ type: 'TOGGLE_SHOW_COMPLETED' })} />
    </div>
  )
}