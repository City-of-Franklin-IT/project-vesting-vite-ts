import { useQuery } from 'react-query'
import { getProject } from '../../context/App/AppActions'

// Types
import { UseQueryResult } from 'react-query'
import { GetProjectResponse } from '../../context/App/types'
import { UseGetProjectProps } from './types'

export const useGetProject = (uuid: UseGetProjectProps['uuid']): UseQueryResult<GetProjectResponse> => {
  return useQuery(['getProject', uuid], () => getProject(uuid as string), { suspense: true, enabled: !!uuid })
}