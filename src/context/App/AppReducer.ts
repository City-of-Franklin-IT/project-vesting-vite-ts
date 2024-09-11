// Types
import { AppReducerProps } from './types'

const appReducer = (state: AppReducerProps['state'], action: AppReducerProps['action']) => {
  switch(action.type) {
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload
      }
    case 'TOGGLE_SHOW_EXPIRED':
      return {
        ...state,
        showExpired: action.payload
      }
    case 'SET_MILESTONE_FILTER':
      return {
        ...state,
        milestoneFilter: action.payload
      }
    case 'TOGGLE_SHOW_ACHIEVED':
      return {
        ...state,
        showAchieved: action.payload
      }
    case 'TOGGLE_SHOW_COMPLETED':
      return {
        ...state,
        showCompleted: action.payload
      }
    default:
      return state
  }
}

export default appReducer