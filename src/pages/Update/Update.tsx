import { useLocation } from 'react-router-dom'
import { useValidateUser } from '../../helpers'
import { useGetProject } from './hooks'

// Components
import Layout from "../../components/layout/Layout/Layout"

// Components
import { Project } from './components'

function Update() {
  const params = new URLSearchParams(useLocation().search)

  const uuid = params.get('uuid')

  const { data, dataUpdatedAt } = useGetProject(uuid || '')

  useValidateUser()

  return (
    <Layout>
      <Project
        key={`project-${ data?.data.uuid }-${ dataUpdatedAt }`}
        project={data?.data} />
    </Layout>
  )
}

export default Update