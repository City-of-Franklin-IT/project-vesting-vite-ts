import { useContext } from "react"
import AppContext from "../../../context/App/AppContext"

// Comonents
import FilterBtn from "../../buttons/FilterBtn/FilterBtn"

export const ClearFilterBtn = () => { // Clear filter button
  const { filter } = useContext(AppContext)

  return (
    <>
      {filter && (
        <div className="mt-6 m-none md:m-auto">
          <FilterBtn />
        </div>
      )}
    </>
  )
}