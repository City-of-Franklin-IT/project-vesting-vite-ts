import { useRedirect } from '../Create/hooks'
import { useGetProject } from './hooks'

// Components
import Layout from "../../components/layout/Layout"

// Components
import { Project } from './components'
import ErrorBoundary from '@/components/error/ErrorBoundary/ErrorBoundary'
import HandleLoading from '../../utils/HandleLoading'

function Update() {
  useRedirect()
  
  const { data, isSuccess } = useGetProject()

  return (
    <Layout>
      <ErrorBoundary href={'/projects'}>
        <HandleLoading isLoaded={isSuccess}>
          <Project project={data?.data} />
        </HandleLoading>
      </ErrorBoundary>
    </Layout>
  )
}

export default Update