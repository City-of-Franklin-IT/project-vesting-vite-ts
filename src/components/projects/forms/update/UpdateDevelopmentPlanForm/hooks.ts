import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { addYears } from "@/helpers/utils"
import { useEnableQuery, useProjectCreateCtx } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateDevelopmentPlan } from './utils'

// Types
import { Path } from "react-hook-form"
import { ProjectInterface, ProjectCreateInterface } from "@/context/App/types"

export const useUpdateDevelopmentPlanForm = (project: ProjectInterface) => { // Update development plan form state

  return useForm<ProjectCreateInterface>({
    defaultValues: {
      expired: project.expired,
      name: project.name,
      cof: project.cof,
      Resolution: project.Resolution,
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

export const useHandleBOMADateChange = () => { // Set other dates on BOMA date change
  const { methods } = useProjectCreateCtx()

  const { setValue, watch, getValues } = methods

  const bomaDate = watch(`Approvals.${ 1 }.date`)

  const cb = useCallback(() => {
    if(bomaDate) {
      const setFormValue = (field: Path<ProjectCreateInterface>, years: number) => {
        setValue(field, addYears(years, bomaDate), { shouldValidate: true, shouldDirty: true })
      }

      setFormValue(`Milestones.${ 0 }.date`, 3)
      setFormValue(`Milestones.${ 1 }.date`, 5)

      const vestingPeriods = getValues(`VestingPeriods`) || []

      vestingPeriods.forEach((period, index) => {
        const yearsToAdd = period.type === "10Y" ? 10 : 15
        setFormValue(`VestingPeriods.${ index }.date`, yearsToAdd)
      })
    }

  }, [bomaDate, setValue, getValues])

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

    handleUpdateDevelopmentPlan(formData, token)
      .then(_ => navigate('/projects'))
      .catch(err => errorPopup(err))
  }, [navigate, enabled, token])
}