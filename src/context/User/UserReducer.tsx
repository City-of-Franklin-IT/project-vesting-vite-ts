// Types
import { UserReducerProps } from "./types"

const userReducer = (state: UserReducerProps['state'], action: UserReducerProps['action']) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

export default userReducer