import { useGetUserDepartment } from "@/helpers/hooks"
import { MOCK_AUTH } from "@/context/Auth"

export const useHandleDocsBtn = () => {
  const { department } = useGetUserDepartment()

  const visible = department === 'IT' || MOCK_AUTH

  return visible
}
