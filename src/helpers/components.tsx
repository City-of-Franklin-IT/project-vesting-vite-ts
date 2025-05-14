import { ordinanceOptions } from "@/utils"

export const OrdinanceOptions = () => {
  
  return (
    <>
      {ordinanceOptions.map(ordinance => {
        return (
          <option key={`ordinance-option-${ ordinance.value }`} value={ordinance.value}>{ordinance.text}</option>
        )
      })}
    </>
  )
}