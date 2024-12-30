// Components
import UpdateDevelopmentPlanForm from '../../forms/update/UpdateDevelopmentPlanForm/UpdateDevelopmentPlanForm'
import UpdateSitePlanForm from '../../forms/update/UpdateSitePlanForm/UpdateSitePlanForm'
import UpdatePreliminaryPlatForm from '../../forms/update/UpdatePreliminaryPlatForm/UpdatePreliminaryPlatForm'

// Types
import { Project } from '../../../context/App/types'

export const Form = ({ project }: { project: Project } ) => { // Set update form type
  const { type } = project

  switch(type) {
    case 'Development Plan':
      return <UpdateDevelopmentPlanForm project={project} />
    case 'Site Plan':
      return <UpdateSitePlanForm project={project} />
    case 'Preliminary Plat':
      return <UpdatePreliminaryPlatForm project={project} />
    default:
      return null
  }
}