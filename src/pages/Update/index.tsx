import { useRedirect } from '../Create/hooks'
import { useGetProject } from './hooks'

// Components
import Layout from "../../components/layout/Layout"

// Components
import { Project } from './components'
import HandleLoading from '../../utils/HandleLoading'

function Update() {
  useRedirect()
  
  const { data, isSuccess } = useGetProject()

  return (
    <Layout>
      <HandleLoading isLoaded={isSuccess}>
        <Project project={data?.data} />
      </HandleLoading>
    </Layout>
  )
}

export default Update