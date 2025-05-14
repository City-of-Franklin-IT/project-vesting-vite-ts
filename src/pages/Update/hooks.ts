import { useQuery } from 'react-query'
import { useLocation } from 'react-router'
import { getProject } from '../../context/App/AppActions'
import { useEnableQuery } from '@/helpers/hooks'

// Types
import { authHeaders } from '@/helpers/utils'

export const useGetProject = () => {
  const { enabled, token } = useEnableQuery()

  const params = new URLSearchParams(useLocation().search)

  const uuid = params.get('uuid')

  return useQuery(['getProject', uuid], () => getProject(uuid as string, authHeaders(token)), { enabled: enabled && !!uuid })
}