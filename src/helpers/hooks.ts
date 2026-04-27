import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router"
import { useFormContext } from "react-hook-form"
import { useMsal } from "@azure/msal-react"
import { getUserDepartment } from "./utils"
import { useAuth } from "@/context/Auth"

// Types
import * as AppTypes from "@/context/types"
import { AccountInfo } from "@azure/msal-browser"

export const useGetToken = () => {
  const { token } = useAuth()
  return token
}

export const useEnableQuery = () => {
  const { token, isLoading, refreshToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !token) {
      navigate('/')
    }
  }, [token, isLoading, navigate])

  return { enabled: !!token && !isLoading, token, refreshToken }
}

export const withTokenRefresh = async <T>(
  fn: () => Promise<T>,
  refresh: () => Promise<string | undefined>
): Promise<T> => {
  try {
    return await fn()
  } catch (e) {
    if (e instanceof Error && e.message === '401') await refresh()
    throw e
  }
}

export const useRedirectAfterLogin = () => {
  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if(inProgress === 'none') {
      if(activeAccount) {
        const redirectUrl = sessionStorage.getItem('redirectUrl')

        if(redirectUrl) {
          window.location.href = redirectUrl
          sessionStorage.removeItem('redirectUrl')
        }
      } else window.location.pathname = '/vesting'
    }
  }, [activeAccount, inProgress])
}

export const useProjectCreateCtx = () => {
  const methods = useFormContext<AppTypes.ProjectCreateInterface>()

  const disabled = methods.watch('expired')

  return { methods, disabled }
}

export const useExpireProject = () => {
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

export const useMilestoneExt = () => {
  const { methods: { setValue, getValues } } = useProjectCreateCtx()

  const firstMilestone = getValues('Milestones')?.find(milestone => milestone.number === 1)
  const milestoneExtension = firstMilestone?.MilestoneExtension

  const handleMilestoneExt = useCallback(() => {
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

export const useGetUserDepartment = () => {
  const [state, setState] = useState<{ department: string | undefined, isLoading: boolean }>({ department: undefined, isLoading: true })

  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if(activeAccount && inProgress === 'none' && !state.department) {
      getUserDepartment(instance, activeAccount as AccountInfo)
        .then(department => setState({ department, isLoading: false }))
        .catch((err) => {
          console.log(err)
          setState(prev => ({ ...prev, isLoading: false }))
        })
    } else if (inProgress === 'none' && !activeAccount) {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }, [inProgress, state.department])

  return { department: state.department, isLoading: state.isLoading }
}
