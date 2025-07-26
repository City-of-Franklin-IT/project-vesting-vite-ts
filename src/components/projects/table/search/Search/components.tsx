import { useContext } from "react"
import ProjectCtx from '@/components/projects/containers/ProjectsContainer/context'
import { useHandleSearch } from './hooks'

export const Header = () => {

  return (
    <h2 className="absolute text-warning text-4xl font-[fugaz_one] text-shadow-lg -top-5 -left-3 z-10">Search</h2>
  )
}

export const SearchInput = () => {
  const { searchValue } = useContext(ProjectCtx)

  const handleSearch = useHandleSearch()

  return (
    <input 
      type="text" 
      value={searchValue} 
      placeholder="by project name, COF #, or zoning ordinance.." 
      onChange={(e) => handleSearch(e)} 
      className="input input-lg w-full" />
  )
}

export const ClearBtn = () => { // Clear search button
  const { searchValue, dispatch } = useContext(ProjectCtx)

  if(!searchValue) return null

  return (
    <button 
      type="button" 
      onClick={() => dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })}
      className="absolute btn btn-lg btn-primary uppercase z-10 rounded-l-none right-0">
        Clear
    </button>
  )
}