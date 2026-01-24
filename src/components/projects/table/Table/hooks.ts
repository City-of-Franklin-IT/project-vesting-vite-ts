import { useState } from "react"
import { useMsal } from "@azure/msal-react"

/**
* Returns table row hover event handlers and hovered state
**/
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

/**
* Returns project cell onClick handler and expanded state
**/
export const useHandleProjectCell = () => {
  const [state, setState] = useState<{ expanded: boolean }>({ expanded: false })

  const onClick = () => {
    setState(prevState => ({ expanded: !prevState.expanded }))
  }

  return { onClick, expanded: state.expanded }
}

/**
* Returns whether user has active MSAL account
**/
export const useHandleProjectName = () => {
  const { instance } = useMsal()

  const activeAccount = instance.getActiveAccount()

  return !!activeAccount
}