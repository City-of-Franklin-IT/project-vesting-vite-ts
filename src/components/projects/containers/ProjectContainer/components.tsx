import { FormTypeMap } from './utils'

// Types
import * as AppTypes from '@/context/types'

export const Form = ({ project }: { project: AppTypes.ProjectInterface } ) => { // Set update form type
  const { type } = project

  const UpdateForm = FormTypeMap.get(type)!

  return (
    <UpdateForm project={project} />
  )
}