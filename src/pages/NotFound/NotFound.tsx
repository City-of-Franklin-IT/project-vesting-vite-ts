// Components
import ErrorHandler from '../../utils/ErrorHandler/ErrorHandler'

function NotFound() {
  return (
    <ErrorHandler 
      title={'404 nothin to see here..'}
      subtitle={'You will be redirected'} />
  )
}

export default NotFound