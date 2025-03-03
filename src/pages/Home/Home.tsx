import { useValidateUser } from '../../helpers'
import { useGetProjects } from './hooks'

// Components
import Layout from '../../components/layout/Layout/Layout'
import ProjectsContainer from '../../components/projects/ProjectsContainer/ProjectsContainer'
import HandleLoading from '../../utils/HandleLoading'

function Home() {
  useValidateUser()
  const { data, isSuccess } = useGetProjects()

  return (
    <Layout>
      <HandleLoading isLoaded={isSuccess}>
        <div className="w-full">
          <ProjectsContainer projects={data?.data || []} />
        </div>
      </HandleLoading>
    </Layout>
  )
}

export default Home
