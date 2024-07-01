import { deleteProject } from "../../../context/App/AppActions"
import { savedPopup, errorPopup } from "../../../utils/Toast/Toast"

// Types
import { HandleClickProps } from "./types"

export const handleClick = async (active: HandleClickProps['active'], setState: HandleClickProps['setState'], uuid: HandleClickProps['uuid'], navigate: HandleClickProps['navigate'], token: HandleClickProps['token']): Promise<void> => { // Handle delete project button click

  if(!active) {
    setState(({ active: true }))
  } else {
    const result = await deleteProject(uuid, token)

    if(result.success) {
      savedPopup(result.msg)
      navigate('/')
    } else errorPopup(result.msg)
  }
}