import { createContext, useContext, useCallback, useEffect, useState, ReactNode } from 'react'
import { useMsal } from '@azure/msal-react'
import { acquireRequest, loginRequest } from '@/context/Auth/config'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | undefined
  isLoading: boolean
  refreshToken: (forceRefresh?: boolean) => Promise<string | undefined>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthCtxProvider({ children }: { children: ReactNode }) {
  const { instance, accounts, inProgress } = useMsal()
  const [token, setToken] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const getToken = useCallback(async (forceRefresh = false): Promise<string | undefined> => {
    if (import.meta.env.DEV) {
      setToken(import.meta.env.VITE_MOCK_TOKEN)
      setIsLoading(false)
      return import.meta.env.VITE_MOCK_TOKEN
    }

    if (inProgress !== 'none') return token

    setIsLoading(true)

    const activeAccount = instance.getActiveAccount()

    if (!activeAccount && accounts.length === 0) {
      setToken(undefined)
      setIsLoading(false)
      return undefined
    }

    if (!activeAccount && accounts.length > 0) {
      instance.setActiveAccount(accounts[0])
      setIsLoading(false)
      return token
    }

    if (!activeAccount) {
      setToken(undefined)
      setIsLoading(false)
      return undefined
    }

    try {
      const response = await instance.acquireTokenSilent({ ...acquireRequest(activeAccount), forceRefresh })
      setToken(response.accessToken)
      setIsLoading(false)
      return response.accessToken
    } catch {
      try {
        const response = await instance.acquireTokenPopup(acquireRequest(activeAccount))
        setToken(response.accessToken)
        setIsLoading(false)
        return response.accessToken
      } catch {
        instance.loginRedirect(loginRequest)
        return undefined
      }
    }
  }, [instance, accounts, inProgress, token])

  useEffect(() => {
    getToken()
  }, [inProgress, accounts])

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') getToken()
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [getToken])

  const value: AuthContextType = {
    isAuthenticated: !!token,
    token,
    isLoading,
    refreshToken: getToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if(!context) {
    throw new Error('useAuth must be used within AuthCtxProvider')
  }

  return context
}
