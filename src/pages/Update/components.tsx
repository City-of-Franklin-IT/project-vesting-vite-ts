// Types
import { ProjectInterface } from "../../context/App/types"

// Components
import ProjectContainer from "../../components/projects/containers/ProjectContainer"

export const Project = ({ project }: { project: ProjectInterface | undefined }) => {
  if(!project) return null

  return (
    <ProjectContainer project={project} />
  )
}