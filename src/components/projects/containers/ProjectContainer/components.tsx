// Components
import UpdateDevelopmentPlanForm from '../../forms/update/UpdateDevelopmentPlanForm'
import UpdateSitePlanForm from '../../forms/update/UpdateSitePlanForm'
import UpdatePreliminaryPlatForm from '../../forms/update/UpdatePreliminaryPlatForm'

// Types
import { ProjectInterface } from '../../../../context/App/types'

export const Form = ({ project }: { project: ProjectInterface } ) => { // Set update form type
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