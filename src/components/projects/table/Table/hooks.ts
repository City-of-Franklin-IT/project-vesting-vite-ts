import { useState } from "react"
import { useMsal } from "@azure/msal-react"

export const useHandleTableRowHover = () => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  const onMouseEnter = () => {
    if(window.innerWidth < 1024) return

    setState({ hovered: true })
  }

  const onMouseLeave = () => {
    if(window.innerWidth < 1024) return

    setState({ hovered: false })
  }

  return { trProps: { onMouseEnter, onMouseLeave }, hovered: state.hovered }
}

export const useHandleProjectCell = () => {
  const [state, setState] = useState<{ expanded: boolean }>({ expanded: false })

  const onClick = () => {
    setState(prevState => ({ expanded: !prevState.expanded }))
  }

  return { onClick, expanded: state.expanded }
}

export const useHandleProjectName = () => {
  const { instance } = useMsal()

  const activeAccount = instance.getActiveAccount()

  return !!activeAccount
}