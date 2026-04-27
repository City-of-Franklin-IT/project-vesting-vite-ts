import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/AppActions'

/**
* Returns docs from server
**/
export const useGetDocs = () => {
  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ['getDocs'],
    queryFn: () => withTokenRefresh(
      () => AppActions.getDocs(authHeaders(token)),
      refreshToken
    ),
    enabled: enabled && !!token
  })
}

/**
* Returns endpoint item input checkbox props
**/
export const useHandleEndpointItem = () => {
  const [state, setState] = useState<{ isOpen: boolean }>({ isOpen: false })

  const onChange = () => {
    setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  return { checked: state.isOpen, onChange }
}
