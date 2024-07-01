import { setFormType } from '.'

// Components
import FormContainer from '../../forms/FormContainer/FormContainer'

// Types
import { ProjectContainerProps } from './types'

function ProjectContainer({ data }: ProjectContainerProps) {
  return (
    <div className="w-full">
      <FormContainer>
        {setFormType(data)}
      </FormContainer>
    </div>
  )
}

export default ProjectContainer