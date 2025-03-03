import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import { getProject } from '../../context/App/AppActions'
import { useValidateUser, useEnableQuery } from '../../helpers'

// Types
import { UseQueryResult } from 'react-query'
import { GetProjectResponse } from '../../context/App/types'

export const useGetProject = (): UseQueryResult<GetProjectResponse> => {
  const { isAuthenticated, isLoading } = useValidateUser()

  const enabled = useEnableQuery(isAuthenticated, isLoading)

  const params = new URLSearchParams(useLocation().search)

  const uuid = params.get('uuid')

  return useQuery(['getProject', uuid], () => getProject(uuid as string), { enabled: enabled && !!uuid })
}