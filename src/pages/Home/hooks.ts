import { useQuery } from "react-query"
import { getProjects } from "../../context/App/AppActions"
import { useEnableQuery } from "../../helpers"

export const useGetProjects = () => { // Get projects
  const enabled = useEnableQuery(true, false)

  return useQuery('projects', () => getProjects(), { enabled })
}