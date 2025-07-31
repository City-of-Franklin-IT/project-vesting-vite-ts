// Components
import FormContainer from '../../../form-components/FormContainer'
import * as Components from './components'

// Types
import { ProjectInterface } from '@/context/types'

function ProjectContainer({ project }: { project: ProjectInterface }) {
  
  return (
    <div className="w-full">
      <FormContainer>
        <Components.Form project={project} />
      </FormContainer>
    </div>
  )
}

export default ProjectContainer