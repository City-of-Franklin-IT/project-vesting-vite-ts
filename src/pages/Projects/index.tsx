import { ProjectsProvider } from '@/components/projects/containers/ProjectsContainer/context'
import { useGetProjects } from './hooks'

// Components
import ProjectsContainer from '../../components/projects/containers/ProjectsContainer'
import HandleLoading from '../../utils/HandleLoading'

function Projects() {
  const { data, isSuccess } = useGetProjects()

  return (
    <HandleLoading isLoaded={isSuccess}>
      <div className="w-full">
        <ProjectsProvider>
          <ProjectsContainer projects={data?.data || []} />
        </ProjectsProvider>
      </div>
    </HandleLoading>
  )
}

export default Projects
