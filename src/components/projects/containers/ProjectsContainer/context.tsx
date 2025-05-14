import { createContext, useReducer } from "react"

// Types
import { ReactNode, Reducer, Dispatch } from "react"

type ProjectsCtx = {
  dispatch: Dispatch<ProjectsAction>
  currentPage: number
  filter: 'Development Plan' | 'Preliminary Plat' | 'Site Plan' | ''
  milestoneFilter: {
    start: string
    end: string
  },
  resultsPerPage: number
  searchValue: string
  showAchieved: {
    firstMilestone: boolean
    secondMilestone: boolean
  }
  showCompleted: boolean
  showExpired: boolean
  totalPages: number
}

type ProjectsState = Omit<ProjectsCtx, 'dispatch'>

type ProjectsAction =
  | { type: 'SET_CURRENT_PAGE', payload: number }
  | { type: 'SET_SEARCH_VALUE', payload: string }
  | { type: 'SET_TOTAL_PAGES', payload: number }
  | { type: 'SET_RESULTS_PER_PAGE', payload: number }
  | { type: 'SET_TYPE_FILTER', payload: 'Development Plan' | 'Preliminary Plat' | 'Site Plan' | '' }
  | { type: 'TOGGLE_SHOW_EXPIRED' }
  | { type: 'TOGGLE_SHOW_COMPLETED' }
  | { type: 'SET_MILESTONE_FILTER', payload: { start: string, end: string } }
  | { type: 'SET_SHOW_ACHIEVED_FILTER', payload: { firstMilestone: boolean, secondMilestone: boolean } }

  const initialState: ProjectsState = {
    currentPage: 1,
    filter: '',
    milestoneFilter: {
      start: '',
      end: ''
    },
    resultsPerPage: 100,
    searchValue: '',
    showAchieved: {
      firstMilestone: true,
      secondMilestone: true
    },
    showCompleted: true,
    showExpired: true,
    totalPages: 1
  }

const ProjectsCtx = createContext<ProjectsCtx>({
  ...initialState,
  dispatch: () => null,
  totalPages: 1
})

const projectsReducer = (state: ProjectsState, action: ProjectsAction) => {

  switch(action.type) {
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      }
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload
      }
    case 'SET_TOTAL_PAGES':
      return {
        ...state,
        totalPages: action.payload
      }
    case 'SET_RESULTS_PER_PAGE':
      return {
        ...state,
        resultsPerPage: action.payload
      }
    case 'SET_TYPE_FILTER':
      return {
        ...state,
        filter: action.payload
      }
    case 'TOGGLE_SHOW_EXPIRED':
      return {
        ...state,
        showExpired: !state.showExpired
      }
    case 'TOGGLE_SHOW_COMPLETED':
      return {
        ...state,
        showCompleted: !state.showCompleted
      }
    case 'SET_MILESTONE_FILTER':
      return {
        ...state,
        milestoneFilter: action.payload
      }
    case 'SET_SHOW_ACHIEVED_FILTER':
      return {
        ...state,
        showAchieved: action.payload
      }
    default:
      return state
  }
}

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<ProjectsState, ProjectsAction>>(projectsReducer, initialState)

  return (
    <ProjectsCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </ProjectsCtx.Provider>
  ) 
}

export default ProjectsCtx