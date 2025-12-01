// Types
import * as AppTypes from "@/context/types"

// Components
import ProjectContainer from "@/components/projects/containers/ProjectContainer"

export const Project = ({ project }: { project: AppTypes.ProjectInterface | undefined }) => {
  if(!project) return null

  return (
    <ProjectContainer project={project} />
  )
}