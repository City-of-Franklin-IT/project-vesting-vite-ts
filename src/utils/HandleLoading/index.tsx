// Types
import { HandleLoadingProps } from './types'

// Components
import Loading from '../../components/loading/Loading'

function HandleLoading({ children, isLoaded }: HandleLoadingProps) {
  return (
    <>
      {isLoaded ? (
        children
      ) : <Loading />}
    </>
  )
}

export default HandleLoading