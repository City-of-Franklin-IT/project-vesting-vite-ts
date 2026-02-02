import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/context/AppActions"

/**
* Returns projects from server
**/
export const useGetProjects = () => {

  return useQuery({
    queryKey: ['getProjects'],
    queryFn: () => getProjects()
  })
}