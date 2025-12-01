import { useHandleShowExpiredCheckbox, useHandleShowCompletedCheckbox } from './hooks'

export const ShowExpiredCheckbox = () => {
  const inputProps = useHandleShowExpiredCheckbox()

  return (
    <div className="flex gap-2 items-center">
      <label className="text-primary-content text-lg font-[play] uppercase whitespace-nowrap">Show Expired:</label>
      <input
        type="checkbox"
        className="checkbox checkbox-primary"
        { ...inputProps } />
    </div>
  )
}
export const ShowCompletedCheckbox = () => {
  const inputProps = useHandleShowCompletedCheckbox()

  return (
    <div className="flex gap-2 items-center">
      <label className="text-primary-content text-lg font-[play] uppercase whitespace-nowrap">Show Completed:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-primary"
        { ...inputProps } />
    </div>
  )
}