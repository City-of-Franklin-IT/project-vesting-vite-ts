import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { addYears } from "@/helpers/utils"
import { useEnableQuery, useProjectCreateCtx } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateSitePlan } from './utils'

// Types
import { Path } from "react-hook-form"
import * as AppTypes from '@/context/types'

export const useHandleUpdateSitePlanForm = (project: AppTypes.ProjectInterface) => {
  const methods = useUpdateSitePlanForm(project)
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, handleFormSubmit }
}

export const useHandleApprovalDateChange = () => { // Set other dates on approval date change
  const { methods } = useProjectCreateCtx()

  const { setValue, watch, getValues } = methods

  const approvalDate = watch(`Approvals.${ 0 }.date`)

  const cb = useCallback(() => {
      if(approvalDate) {
        const setFormValue = (field: Path<AppTypes.ProjectCreateInterface>, years: number) => {
          setValue(field, addYears(years, approvalDate), { shouldValidate: true, shouldDirty: true })
        }
  
        setFormValue(`Milestones.${ 0 }.date`, 3)
        setFormValue(`Milestones.${ 1 }.date`, 5)
  
        const vestingPeriods = getValues(`VestingPeriods`) || []
  
        vestingPeriods.forEach((period, index) => {
          const yearsToAdd = period.type === "10Y" ? 10 : 15
          setFormValue(`VestingPeriods.${ index }.date`, yearsToAdd)
        })
      }
  
    }, [approvalDate, setValue, getValues])
  
    useEffect(() => {
      cb()
    }, [cb])
}

const useUpdateSitePlanForm = (project: AppTypes.ProjectInterface) => {

  return useForm<AppTypes.ProjectCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      expired: project.expired,
      name: project.name,
      cof: project.cof,
      ordinance: project.ordinance,
      Approvals: project.Approvals,
      VestingPeriods: project.VestingPeriods,
      Milestones: project.Milestones,
      VestingNotifications: project.VestingNotifications,
      notes: project.notes,
      uuid: project.uuid
    }
  })
}

const useHandleFormSubmit = () => {
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  return useCallback((formData: AppTypes.ProjectCreateInterface) => {
      if(!enabled || !token) {
        return
      }
  
      handleUpdateSitePlan(formData, token)
        .then(_ => {
          queryClient.invalidateQueries(['getProject', formData.uuid])
          queryClient.invalidateQueries('getProjects')
          navigate('/projects')
        })
        .catch(err => errorPopup(err))
    }, [navigate, queryClient, enabled, token])
}