import { useQuery } from "@tanstack/react-query"
import * as AppActions from '@/context/AppActions'

/**
* Returns projects from server
**/
export const useGetProjects = () => {

  return useQuery({
    queryKey: ['getProjects'],
    queryFn: () => AppActions.getProjects()
  })
}