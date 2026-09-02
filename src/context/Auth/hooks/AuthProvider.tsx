import { useEffect, useState } from "react"
import { PublicClientApplication } from "@azure/msal-browser"
import { MsalProvider } from "@azure/msal-react"
import { msalConfig } from "../config"
import Loading from "@/components/loading/Loading"

// Types
import { ReactNode } from "react"
import { AuthenticationResult, EventType, IPublicClientApplication } from "@azure/msal-browser"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [msalInstance, setMsalInstance] = useState<IPublicClientApplication | undefined>(undefined)

  useEffect(() => {
    const instance = new PublicClientApplication(msalConfig)

    instance.initialize().then(() => {
      if(!instance.getActiveAccount() && instance.getAllAccounts().length > 0) {
        instance.setActiveAccount(instance.getAllAccounts()[0])
      }

      instance.addEventCallback((event) => {
        const authenticationResult = event.payload as AuthenticationResult
        const account = authenticationResult?.account

        if(event.eventType === EventType.LOGIN_SUCCESS && account) {
          instance.setActiveAccount(account)
        }
      })

      setMsalInstance(instance)
    })
  }, [])

  if(!msalInstance) return <Loading />

  return <MsalProvider instance={msalInstance}>
    {children}
  </MsalProvider>
}

export const useAuthProvider = () => {
  return { AuthProvider }
}
