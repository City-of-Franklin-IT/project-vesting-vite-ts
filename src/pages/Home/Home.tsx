import { Suspense } from 'react'
import { useQuery } from 'react-query'
import { getProjects } from '../../context/App/AppActions'
import { errorPopup } from '../../utils/Toast/Toast'

// Components
import Layout from '../../components/layout/Layout/Layout'
import ProjectsContainer from '../../components/projects/ProjectsContainer/ProjectsContainer'

function Home() {
  const { data, isError } = useQuery('projects', () => getProjects(), { suspense: true })

  if(isError || !data) {
    errorPopup('Server Error')
  }

  return (
    <Layout>
      <div className="w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsContainer data={data?.data.records ?? []} />
        </Suspense>
      </div>
    </Layout>
  )
}

export default Home
