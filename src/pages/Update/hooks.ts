import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { getProject } from '@/context/AppActions'
import { useEnableQuery } from '@/helpers/hooks'

// Types
import { authHeaders } from '@/helpers/utils'

export const useGetProject = () => {
  const { enabled, token } = useEnableQuery()

  const { uuid } = useParams()

  return useQuery(['getProject', uuid], () => getProject(uuid as string, authHeaders(token)), { enabled: enabled && !!uuid })
}