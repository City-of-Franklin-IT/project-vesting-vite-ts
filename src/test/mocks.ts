import { mock } from 'ts-mockito'

// Types
import { AppState } from '../context/App/types'

export const mockAppState = (): AppState => { // Mock AppState
  const appState = mock<AppState>()

  return appState
}