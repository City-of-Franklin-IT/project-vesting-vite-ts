import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"
import { NODE_ENV } from "@/config"

export const useRedirect = () => { // Redirect unauthenticated users
  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()
  const navigate = useNavigate()

  const isDevelopment = NODE_ENV === 'development'

  useEffect(() => {
    if(isDevelopment) return

    if(instance && inProgress === 'none') {
      if(!activeAccount) {
        navigate('/projects')
      }
    }

    return
  }, [instance, inProgress, navigate, activeAccount, isDevelopment])
}