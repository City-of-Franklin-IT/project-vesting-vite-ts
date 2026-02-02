import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { useEnableQuery } from '@/helpers/hooks'
import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/AppActions'

/**
* Returns project by uuid from server
**/
export const useGetProject = () => {
  const { enabled, token } = useEnableQuery()

  const { uuid } = useParams()

  return useQuery({
    queryKey: ['getProject', uuid],
    queryFn: () => AppActions.getProject(uuid as string, authHeaders(token)),
    enabled: enabled && !!uuid
  })
}