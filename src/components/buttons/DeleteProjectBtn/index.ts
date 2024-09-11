import { deleteProject } from "../../../context/App/AppActions"
import { savedPopup, errorPopup } from "../../../utils/Toast/Toast"

// Types
import { HandleClickProps } from "./types"

export const handleClick = async (active: HandleClickProps['active'], uuid: HandleClickProps['uuid'], options: HandleClickProps['options']): Promise<void> => { // Handle delete project button click
  const { setState, navigate } = options

  if(!active) {
    setState(({ active: true }))
  } else {
    const result = await deleteProject(uuid)

    if(result.success) {
      savedPopup(result.msg)
      navigate('/')
    } else errorPopup(result.msg)
  }
}