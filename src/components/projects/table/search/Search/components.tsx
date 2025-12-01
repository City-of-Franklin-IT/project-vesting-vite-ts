import { useHandleSearch, useHandleClearBtn } from './hooks'

export const Header = () => {
  return (
    <h2 className="text-primary-content text-2xl font-[play] uppercase font-bold">Search</h2>
  )
}

export const SearchInput = () => {
  const inputProps = useHandleSearch()

  return (
    <input 
      type="text" 
      placeholder="by project name, COF #, or zoning ordinance.." 
      className="input w-full"
      { ...inputProps } />
  )
}

export const ClearBtn = () => { // Clear search button
  const { visible, onClick } = useHandleClearBtn()

  if(!visible) return null

  return (
    <button 
      type="button" 
      onClick={onClick}
      className="btn btn-primary uppercase">
        Clear
    </button>
  )
}