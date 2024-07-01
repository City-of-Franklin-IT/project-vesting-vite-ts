// Components
import Layout from "../../components/layout/Layout/Layout"
import Error from '../../components/error/Error/Error'

// Types
import { ErrorHandlerProps } from "./types"

function ErrorHandler({ title, subtitle }: ErrorHandlerProps) {
  return (
    <Layout>
      <div className="m-auto">
        <Error 
          title={title}
          subtitle={subtitle} />
      </div>
    </Layout>
  )
}

export default ErrorHandler