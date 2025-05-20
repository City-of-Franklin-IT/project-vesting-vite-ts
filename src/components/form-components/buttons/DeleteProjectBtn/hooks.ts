import { useState, useCallback } from "react"
import { useNavigate } from "react-router"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/AppActions'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

export const useHandleBtnClick = (uuid: string) => {
  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const navigate = useNavigate()

  const { token } = useEnableQuery()

  const handleClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    const result = await AppActions.deleteProject(uuid, authHeaders(token))

    if(result.success) {
      savedPopup(result.msg)
      navigate('/projects')
    } else errorPopup(result.msg)
  }, [uuid, token, navigate, state.active])

  return { handleClick, active: state.active }
}