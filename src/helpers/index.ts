import { useCookies } from "react-cookie"

// Types
import { UserObj } from "../context/App/types"

export const getUser = () => { // Get logged in user object
  const [cookies] = useCookies(["user"])

  const { user } = cookies

  if(user?.token) {
    return user as UserObj
  } else return {} as UserObj
}