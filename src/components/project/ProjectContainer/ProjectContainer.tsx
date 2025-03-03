import { Form } from './components'

// Components
import FormContainer from '../../forms/FormContainer/FormContainer'

// Types
import { ProjectContainerProps } from './types'

function ProjectContainer({ project }: ProjectContainerProps) {
  
  return (
    <div className="w-full">
      <FormContainer>
        <Form project={project} />
      </FormContainer>
    </div>
  )
}

export default ProjectContainer