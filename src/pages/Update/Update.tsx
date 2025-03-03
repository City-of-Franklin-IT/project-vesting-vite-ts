import { useGetProject } from './hooks'

// Components
import Layout from "../../components/layout/Layout/Layout"

// Components
import { Project } from './components'
import HandleLoading from '../../utils/HandleLoading'

function Update() {
  const { data, dataUpdatedAt, isSuccess } = useGetProject()

  return (
    <Layout>
      <HandleLoading isLoaded={isSuccess}>
        <Project
          key={`project-${ data?.data.uuid }-${ dataUpdatedAt }`}
          project={data?.data} />
      </HandleLoading>
    </Layout>
  )
}

export default Update