import { useQuery } from "react-query"
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "@/helpers/hooks"
import { getProjects } from "@/context/App/AppActions"

export const useGetProjects = () => { // Get projects
  const { enabled, token } = useEnableQuery()

  return useQuery('projects', () => getProjects(authHeaders(token)), { enabled })
}