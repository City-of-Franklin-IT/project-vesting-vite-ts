import { FormTypeMap } from './utils'

// Types
import { ProjectInterface } from '@/context/types'

export const Form = ({ project }: { project: ProjectInterface } ) => { // Set update form type
  const { type } = project

  const UpdateForm = FormTypeMap.get(type)

  if(UpdateForm) return <UpdateForm project={project} />
}