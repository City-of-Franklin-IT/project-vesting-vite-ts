import { useGetUserDepartment } from "@/helpers/hooks"

export const useHandleDocsBtn = () => {
  const { department } = useGetUserDepartment()

  const visible = department === 'IT' || import.meta.env.DEV

  return visible
}
