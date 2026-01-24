import { useMemo } from "react"
import { useProjectCreateCtx } from "@/helpers/hooks"

/**
* Returns whether form submit button should be disabled based on validation and submission state
**/
export const useDisableBtn = () => {
  const { methods: { formState: { isValid, isSubmitting } } } = useProjectCreateCtx()

  return useMemo(() => {
    return (!isValid || isSubmitting) ?
      true :
      false
  }, [isValid, isSubmitting])
}