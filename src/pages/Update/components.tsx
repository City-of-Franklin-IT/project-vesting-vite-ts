// Types
import { Project as ProjectType } from "../../context/App/types"

// Components
import ProjectContainer from "../../components/project/ProjectContainer/ProjectContainer"

export const Project = ({ project }: { project: ProjectType | undefined }) => {

  return (
    <>
      {project && (
        <ProjectContainer project={project} />
      )}
    </>
  )
}