import { useLocation } from 'react-router'

// Components
import CreateDevelopmentPlanForm from '../../components/projects/forms/create/CreateDevelopmentPlanForm'
import CreatePreliminaryPlatForm from '../../components/projects/forms/create/CreatePreliminaryPlatForm'
import CreateSitePlanForm from '../../components/projects/forms/create/CreateSitePlanForm'

import { FormTypes } from './types'

export const Form = () => { // Determine form type
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const type = params.get('type') as FormTypes

  let form = null

  switch(type) {
    case 'Development Plan':
      form = <CreateDevelopmentPlanForm />
      break
    case 'Preliminary Plat':
      form = <CreatePreliminaryPlatForm />
      break
    case 'Site Plan':
      form = <CreateSitePlanForm />
      break
    default:
      form = null
  }

  return form
}