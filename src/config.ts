const isDev = import.meta.env.DEV

export const APP_BASE = '/vesting'
export const APP_TITLE = 'Project Vesting'

export const CLIENT_ID = '27b0f13e-b9e9-4b04-9a28-8130cf2ba6b5'
export const ENTRA_CLIENT_ID = '62d76967-d490-4c39-ad33-f245baf5dc53'
export const AUTH_AUTHORITY = 'https://login.microsoftonline.com/f6644f52-f834-4a2f-a433-e6bc40d7c17f/'
export const AUTH_REDIRECT_URI = 'https://dev.franklintn.gov/vesting'
export const AUTH_POST_LOGOUT_REDIRECT_URI = '/'

export const API_URL = isDev ? 'https://cofasv38.franklin-gov.com/api/v3/eng' : 'https://dev.franklintn.gov/api/v3/eng'
export const MCP_URL = isDev ? 'https://cofasv38.franklin-gov.com' : 'https://dev.franklintn.gov'

// Development only - auth is bypassed in dev mode
export const MOCK_TOKEN = 'dev-token-12345'
