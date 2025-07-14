import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"

export const useRedirect = (href: string) => {
  const { instance, inProgress } = useMsal()

  const navigate = useNavigate()

  const isReady = instance && inProgress === 'none'

  useEffect(() => {
    if(isReady) {
      const activeAccount = instance.getActiveAccount()
      if(activeAccount) {
        navigate(href)
      } else navigate('/')
    }
  }, [isReady, instance, navigate, href])
}