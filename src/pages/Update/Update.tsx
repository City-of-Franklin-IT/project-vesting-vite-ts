import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import UserContext from '../../context/User/UserContext'
import { useValidateUser } from '../../helpers'
import { useGetProject } from '.'

// Components
import Layout from "../../components/layout/Layout/Layout"
import ProjectContainer from '../../components/project/ProjectContainer/ProjectContainer'

// Types
import { Project } from '../../context/App/types'

function Update() {
  const { dispatch } = useContext(UserContext)

  const params = new URLSearchParams(useLocation().search)

  const uuid = params.get('uuid')

  const { data, dataUpdatedAt } = useGetProject(uuid || '')

  useValidateUser(dispatch)

  return (
    <Layout>
      {data && (
        <ProjectContainer 
          key={`project-update-${ dataUpdatedAt }`}
          data={data.data as Project} />
      )}
    </Layout>
  )
}

export default Update