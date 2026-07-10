import { ProjectsProvider } from '@/components/projects/containers/ProjectsContainer/context'
import { useGetProjects } from './hooks'

// Components
import Loading from '@/components/loading/Loading'
import ProjectsContainer from '../../components/projects/containers/ProjectsContainer'

function Projects() {
  const { data, isLoading } = useGetProjects()

  if(isLoading) return <Loading />

  return (
    <div className="w-full">
      <ProjectsProvider>
        <ProjectsContainer projects={data?.data || []} />
      </ProjectsProvider>
    </div>
  )
}

export default Projects
