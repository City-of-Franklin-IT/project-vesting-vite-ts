import { useState } from "react"

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

  return { onMouseEnter, onMouseLeave, hovered: state.hovered }
}