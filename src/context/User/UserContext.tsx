import { Reducer, createContext, useReducer } from 'react'
import userReducer from './UserReducer'

// Types
import { ReactNode } from 'react'
import { UserContextObj, UserState, UserAction } from './types'

const UserContext = createContext<UserContextObj>({
  dispatch: () => {},
  user: {
    email: '',
    role: undefined,
    department: ''
  }
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const initialState: UserState = {
    user: {
      email: '',
      role: undefined,
      department: ''
    }
  }

  const [state, dispatch] = useReducer<Reducer<UserState, UserAction>>(userReducer, initialState)

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext