import { useLocation } from 'react-router'
import { FormTypeMap } from './utils'

// Types
import { FormTypes } from './types'

export const Form = () => { // Determine form type
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const type = params.get('type') as FormTypes

  const Component = FormTypeMap.get(type) // Get create form

  if(!Component) return null

  return <Component />
}