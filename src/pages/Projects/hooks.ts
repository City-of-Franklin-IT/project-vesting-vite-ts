import { useQuery } from "react-query"
import { getProjects } from "@/context/AppActions"

export const useGetProjects = () => { // Get projects

  return useQuery('projects', () => getProjects())
}