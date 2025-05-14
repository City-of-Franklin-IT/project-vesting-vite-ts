import { useNavigate } from 'react-router'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

// Types
import { ErrorBoundaryProps } from './types'

function ErrorBoundary({ href, children }: ErrorBoundaryProps) {
  const ErrorFallback = () => {
    const navigate = useNavigate()

    setTimeout(() => {
      navigate(href)
    }, (50))

    return null
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset any state or perform any action on reset
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}

export default ErrorBoundary