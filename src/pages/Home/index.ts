import { useQuery } from "react-query"
import { getProjects } from "../../context/App/AppActions"

export const useGetProjects = () => { // Get projects
  return useQuery('projects', () => getProjects(), { suspense: true })
}