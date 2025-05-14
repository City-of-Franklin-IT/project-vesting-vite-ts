import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"

export const useRedirect = () => { // Redirect unauthenticated users
  const { instance, inProgress } = useMsal()

  const navigate = useNavigate()

  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if(instance && inProgress === 'none') {
      if(!activeAccount) {
        navigate('/projects')
      }
    }

    return
  }, [instance, inProgress, navigate, activeAccount])
}