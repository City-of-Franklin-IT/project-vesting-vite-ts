import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { addYears } from "@/helpers/utils"
import { useEnableQuery, useProjectCreateCtx } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateSitePlan } from './utils'

// Types
import { Path } from "react-hook-form"
import { ProjectInterface, ProjectCreateInterface } from "@/context/types"

export const useUpdateSitePlanForm = (project: ProjectInterface) => {

  return useForm<ProjectCreateInterface>({
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

export const useHandleApprovalDateChange = () => { // Set other dates on approval date change
  const { methods } = useProjectCreateCtx()

  const { setValue, watch, getValues } = methods

  const approvalDate = watch(`Approvals.${ 0 }.date`)

  const cb = useCallback(() => {
      if(approvalDate) {
        const setFormValue = (field: Path<ProjectCreateInterface>, years: number) => {
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

export const useHandleFormSubmit = () => {
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()

  return useCallback((formData: ProjectCreateInterface) => {
      if(!enabled || !token) {
        return
      }
  
      handleUpdateSitePlan(formData, token)
        .then(_ => navigate('/projects'))
        .catch(err => errorPopup(err))
    }, [navigate, enabled, token])
}