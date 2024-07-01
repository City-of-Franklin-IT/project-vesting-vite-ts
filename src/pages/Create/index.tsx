// Components
import CreateDevelopmentPlanForm from '../../components/forms/create/CreateDevelopmentPlanForm/CreateDevelopmentPlanForm'
import CreatePreliminaryPlatForm from '../../components/forms/create/CreatePreliminaryPlatForm/CreatePreliminaryPlatForm'
import CreateSitePlanForm from '../../components/forms/create/CreateSitePlanForm/CreateSitePlanForm'

// Types
import { HandleFormTypeProps, FormTypes } from './types'

export const handleFormType = (type: HandleFormTypeProps['type']) => { // Determine form type
  const obj: Record<FormTypes, JSX.Element> = {
    ['Development Plan']: <CreateDevelopmentPlanForm />,
    ['Preliminary Plat']: <CreatePreliminaryPlatForm />,
    ['Site Plan']: <CreateSitePlanForm />
  }

  return obj[type]
}