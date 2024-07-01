import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getProject } from '../../context/App/AppActions'
import { errorPopup } from '../../utils/Toast/Toast'

// Components
import Layout from "../../components/layout/Layout/Layout"
import ProjectContainer from '../../components/project/ProjectContainer/ProjectContainer'
// import ErrorHandler from '../../utils/ErrorHandler/ErrorHandler'

// Types
import { Project } from '../../context/App/types'

function Update() {
  const params = new URLSearchParams(useLocation().search)

  const uuid = params.get('uuid')

  const { data, isError, dataUpdatedAt } = useQuery(['project', 
  ], () => getProject(uuid as string), { suspense: true, enabled: !!uuid })

  if(isError || !data) {
    errorPopup('Server Error')
  }

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        {data && (
          <ProjectContainer 
            key={`project-update-${ dataUpdatedAt }`}
            data={data.data as Project} />
        )}
      </Suspense>
    </Layout>
  )
}

export default Update