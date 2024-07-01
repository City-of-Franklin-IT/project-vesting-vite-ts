// Components
import UpdateDevelopmentPlanForm from '../../forms/update/UpdateDevelopmentPlanForm/UpdateDevelopmentPlanForm'
import UpdateSitePlanForm from '../../forms/update/UpdateSitePlanForm/UpdateSitePlanForm'
import UpdatePreliminaryPlatForm from '../../forms/update/UpdatePreliminaryPlatForm/UpdatePreliminaryPlatForm'

// Types
import { Project } from '../../../context/App/types'

export const setFormType = (data: Project ) => { // Set update form type
  const { type } = data

  switch(type) {
    case 'Development Plan':
      return <UpdateDevelopmentPlanForm data={data} />
    case 'Site Plan':
      return <UpdateSitePlanForm data={data} />
    case 'Preliminary Plat':
      return <UpdatePreliminaryPlatForm data={data} />
    default:
      return null
  }
}