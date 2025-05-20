import { useMemo } from "react"
import { useProjectCreateCtx } from "@/helpers/hooks"

export const useDisableBtn = () => {
  const { methods: { formState: { isValid, isSubmitting } } } = useProjectCreateCtx()

  return useMemo(() => {
    if(!isValid || isSubmitting) {
      return true
    } return false
  }, [isValid, isSubmitting])
}