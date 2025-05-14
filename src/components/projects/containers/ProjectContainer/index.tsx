import { Form } from './components'

// Components
import FormContainer from '../../../form-components/FormContainer/FormContainer'

// Types
import { ProjectInterface } from '@/context/App/types'

function ProjectContainer({ project }: { project: ProjectInterface }) {
  
  return (
    <div className="w-full">
      <FormContainer>
        <Form project={project} />
      </FormContainer>
    </div>
  )
}

export default ProjectContainer