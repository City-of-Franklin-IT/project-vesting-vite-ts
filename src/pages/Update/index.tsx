import { useRedirect } from '../Create/hooks'
import { useGetProject } from './hooks'

// Components
import { Project } from './components'
import ErrorBoundary from '@/components/error/ErrorBoundary/ErrorBoundary'
import HandleLoading from '../../utils/HandleLoading'

function Update() {
  useRedirect()
  
  const { data, isSuccess } = useGetProject()

  return (
    <ErrorBoundary href={'/projects'}>
      <HandleLoading isLoaded={isSuccess}>
        <Project project={data?.data} />
      </HandleLoading>
    </ErrorBoundary>
  )
}

export default Update