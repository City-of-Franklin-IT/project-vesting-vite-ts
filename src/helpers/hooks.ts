import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router"
import { useFormContext } from "react-hook-form"
import { useMsal } from "@azure/msal-react"
import { NODE_ENV } from '../config'

// Types
import { ProjectCreateInterface } from "@/context/types"

export const useGetToken = () => {
  const [state, setState] = useState<{ token: string | undefined }>({ token: undefined })

  const { instance, inProgress } = useMsal()

  const activeAccount = instance.getActiveAccount()

  const navigate = useNavigate()

  if(NODE_ENV === 'development') {
    return 'dev-token'
  }

  const checkToken = async () => {
    let token: string | undefined = undefined

    if(activeAccount?.idTokenClaims && activeAccount.idTokenClaims.exp) { // Check if token is expired or about to expire
      const expiresOn = activeAccount.idTokenClaims.exp * 1000
      const now = Date.now()
  
      if(expiresOn > now + 3000000) { // Still valid
        token = activeAccount.idToken
        setState({ token })
        return
      }
  
      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount,
        forceRefresh: true
      }
  
      const response = await instance.acquireTokenSilent(request) // Refresh token

      setState({ token: response.idToken })
    }

    if(activeAccount && !activeAccount.idTokenClaims) { // Active account but !idTokenClaims
      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount
      }

      const response = await instance.acquireTokenSilent(request) // Refresh token

      setState({ token: response.idToken })
    }

    if(!activeAccount) { // !Active account - redirect to login
      navigate('/projects')
    }
  }

  useEffect(() => {
    if(inProgress !== 'none') { // Wait for instance to fully initialize
      return
    }

    checkToken()

    const intervalId = setInterval(checkToken, 4 * 60 * 1000) // Check every 4 minutes
    
    return () => clearInterval(intervalId)
  }, [inProgress])

  return state.token
}

export const useEnableQuery = () => {
  const [state, setState] = useState<{ enabled: boolean }>({ enabled: false })

  const token = useGetToken()

  useEffect(() => {
    let timeout = null

    if(token) {
      timeout = setTimeout(() => {
        setState({ enabled: true })
      }, 300) // 300ms delay
    } else setState({ enabled: false })

    return () => {
      if(timeout) {
        clearTimeout(timeout)
      }
    }
  }, [token])

  return { enabled: state.enabled, token }
}

export const useRedirectAfterLogin = () => {
  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if(inProgress === 'none') {

      if(activeAccount) {
        const redirectUrl = sessionStorage.getItem('redirectUrl') // Check for redirectUrl

        if(redirectUrl) {        
          window.location.href = redirectUrl
          sessionStorage.removeItem('redirectUrl')
        }
      } else window.location.pathname = '/vesting'
    }
  }, [activeAccount, inProgress])
}

export const useProjectCreateCtx = () => { // Project create ctx
  const methods = useFormContext<ProjectCreateInterface>()

  const disabled = methods.watch('expired')

  return { methods, disabled }
}

export const useExpireProject = () => { // Handle project expiration - expire milestones/vesting
  const { methods: { watch, setValue, getValues } } = useProjectCreateCtx()

  const expired = watch('expired')

  const expireProject = useCallback(() => {
    if(expired) {
      const setFormValues = () => {
        const milestones = getValues('Milestones')
        milestones?.forEach((milestone, index) => {
          if(!milestone.MilestoneStatus.achieved) {
            setValue(`Milestones.${ index }.MilestoneStatus.expired`, true, { shouldValidate: true, shouldDirty: true })
          }
        })

        const vestingPeriods = watch(`VestingPeriods`)
        vestingPeriods?.forEach((period, index) => {
          if(!period.VestingStatus?.achieved) {
            setValue(`VestingPeriods.${ index }.VestingStatus.expired`, true, { shouldValidate: true, shouldDirty: true })
          }
        })
      }

      setFormValues()
    }
  }, [expired, getValues])

  useEffect(() => {
    expireProject()
  }, [expireProject])
}

export const useMilestoneExt = () => { // Handle milestone #1 extension
  const { methods: { setValue, getValues } } = useProjectCreateCtx()

  const firstMilestone = getValues('Milestones')?.find(milestone => milestone.number === 1)
  const milestoneExtension = firstMilestone?.MilestoneExtension

  const handleMilestoneExt = useCallback(() => { // If extended - update milestone #2 date
    if(milestoneExtension?.date) {
      const date = new Date(milestoneExtension?.date)
      const updatedSecondMilestoneDate = date.setFullYear(date.getFullYear() + 2)
  
      setValue(`Milestones.${ 1 }.date`, new Date(updatedSecondMilestoneDate).toISOString().split("T")[0])
    }
  }, [milestoneExtension])

  useEffect(() => {
    handleMilestoneExt()
  }, [handleMilestoneExt])
}