import { useQuery } from "react-query"
import { getProjects } from "@/context/AppActions"

export const useGetProjects = () => { // Get projects

  return useQuery('getProjects', () => getProjects(), { staleTime: Infinity })
}