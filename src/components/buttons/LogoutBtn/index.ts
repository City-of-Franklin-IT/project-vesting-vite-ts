import { infoPopup, errorPopup } from "../../../utils/Toast/Toast"
import { logoutUser } from "../../../context/User/UserActions"

// Types
import { HandleLogoutClick } from "./types"

export const handleLogoutClick = async (navigate: HandleLogoutClick['navigate'], dispatch: HandleLogoutClick['dispatch']): Promise<void> => { // Remove user cookie on btn click and navigate to Login page
  const response = await logoutUser()

  if(response.success) {
    dispatch({ type: 'SET_USER', payload: undefined }) // Reset User ctx
    infoPopup('Logged Out')
    return navigate('/')
  } else errorPopup()
}