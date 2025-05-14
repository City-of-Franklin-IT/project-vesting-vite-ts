import { Reducer, createContext, useReducer } from 'react'
import appReducer from './AppReducer'

// Types
import { ReactNode } from 'react'
import { AppContextObj, AppState, ReducerAction } from './types'

const AppContext = createContext<AppContextObj>({
  dispatch: () => {},
  filter: '',
  milestoneFilter: {
    start: '',
    end: ''
  },
  searchValue: '',
  showCompleted: true,
  showAchieved: {
    firstMilestone: true,
    secondMilestone: true
  },
  showExpired: true
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const initialState: AppState = {
    filter: '',
    milestoneFilter: {
      start: '',
      end: ''
    },
    searchValue: '',
    showCompleted: true,
    showAchieved: {
      firstMilestone: true,
      secondMilestone: true
    },
    showExpired: true
  }

  const [state, dispatch] = useReducer<Reducer<AppState, ReducerAction>>(appReducer, initialState)

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext