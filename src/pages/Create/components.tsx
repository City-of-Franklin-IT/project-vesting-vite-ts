import { useLocation } from 'react-router-dom'

// Components
import CreateDevelopmentPlanForm from '../../components/forms/create/CreateDevelopmentPlanForm/CreateDevelopmentPlanForm'
import CreatePreliminaryPlatForm from '../../components/forms/create/CreatePreliminaryPlatForm/CreatePreliminaryPlatForm'
import CreateSitePlanForm from '../../components/forms/create/CreateSitePlanForm/CreateSitePlanForm'

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