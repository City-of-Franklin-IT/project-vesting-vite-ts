import { useRedirect } from '../Create/hooks'
import { useGetProject } from './hooks'

// Components
import ErrorBoundary from '@/components/error/ErrorBoundary/ErrorBoundary'
import HandleLoading from '../../utils/HandleLoading'
import { Project } from './components'

function Update() {
  useRedirect()
  
  const { data, isLoading } = useGetProject()

  return (
    <ErrorBoundary href={'/projects'}>
      <HandleLoading isLoading={isLoading}>
        <Project project={data?.data} />
      </HandleLoading>
    </ErrorBoundary>
  )
}

export default Update