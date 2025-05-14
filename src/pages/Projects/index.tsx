import { ProjectsProvider } from '@/components/projects/containers/ProjectsContainer/context'
import { useGetProjects } from './hooks'

// Components
import Layout from '../../components/layout/Layout'
import ProjectsContainer from '../../components/projects/containers/ProjectsContainer'
import HandleLoading from '../../utils/HandleLoading'

function Projects() {
  const { data, isSuccess } = useGetProjects()

  return (
    <Layout>
      <HandleLoading isLoaded={isSuccess}>
        <div className="w-full">
          <ProjectsProvider>
            <ProjectsContainer projects={data?.data || []} />
          </ProjectsProvider>
        </div>
      </HandleLoading>
    </Layout>
  )
}

export default Projects
