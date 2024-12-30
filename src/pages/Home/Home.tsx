import { useValidateUser } from '../../helpers'
import { useGetProjects } from './hooks'

// Components
import Layout from '../../components/layout/Layout/Layout'
import ProjectsContainer from '../../components/projects/ProjectsContainer/ProjectsContainer'

function Home() {
  useValidateUser()

  const { data } = useGetProjects()

  return (
    <Layout>
      <div className="w-full">
        <ProjectsContainer data={data?.data.records ?? []} />
      </div>
    </Layout>
  )
}

export default Home
