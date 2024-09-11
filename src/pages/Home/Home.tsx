import { useValidateUser } from '../../helpers'
import { useGetProjects } from '.'

// Components
import Layout from '../../components/layout/Layout/Layout'
import ProjectsContainer from '../../components/projects/ProjectsContainer/ProjectsContainer'

function Home() {
  const { data } = useGetProjects()

  useValidateUser()

  return (
    <Layout>
      <div className="w-full">
        <ProjectsContainer data={data?.data.records ?? []} />
      </div>
    </Layout>
  )
}

export default Home
