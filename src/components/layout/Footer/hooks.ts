import { useGetUserDepartment } from "@/helpers/hooks"

const MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === 'true'

export const useHandleDocsBtn = () => {
  const { department } = useGetUserDepartment()

  const visible = department === 'IT' || MOCK_AUTH

  return visible
}
