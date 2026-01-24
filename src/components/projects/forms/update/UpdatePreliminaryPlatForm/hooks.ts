import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useForm, UseFormReturn } from "react-hook-form"
import { addYears } from "@/helpers/utils"
import { useEnableQuery, useProjectCreateCtx } from "@/helpers/hooks"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { handleUpdatePreliminaryPlat } from './utils'

// Types
import { Path } from "react-hook-form"
import * as AppTypes from '@/context/types'

/**
* Returns form methods and submit handler for UpdatePreliminaryPlatForm
**/
export const useHandleUpdatePreliminaryPlatForm = (project: AppTypes.ProjectInterface) => {
  const methods = useUpdatePreliminaryPlatForm(project)
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, handleFormSubmit }
}

/**
* Sets milestone and vesting dates when FPMC approval date changes
**/
export const useHandleFPMCDateChange = () => {
  const { methods } = useProjectCreateCtx()

  const { setValue, watch, getValues } = methods

  const fpmcDate = watch(`Approvals.${ 0 }.date`)

  useEffect(() => {
    if(fpmcDate) {
      const setFormValue = (field: Path<AppTypes.ProjectCreateInterface>, years: number) => {
        setValue(field, addYears(years, fpmcDate), { shouldValidate: true, shouldDirty: true })
      }

      setFormValue(`Milestones.${ 0 }.date`, 3)
      setFormValue(`Milestones.${ 1 }.date`, 5)

      const vestingPeriods = getValues(`VestingPeriods`) || []

      vestingPeriods.forEach((period, index) => {
        const yearsToAdd = period.type === "10Y" ? 10 : 15
        setFormValue(`VestingPeriods.${ index }.date`, yearsToAdd)
      })
    }
  }, [fpmcDate, setValue, getValues])
}

/**
* Initializes react-hook-form with existing project data for Preliminary Plat
**/
const useUpdatePreliminaryPlatForm = (project: AppTypes.ProjectInterface): UseFormReturn<AppTypes.ProjectCreateInterface> => {
  return useForm<AppTypes.ProjectCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      expired: project.expired,
      name: project.name,
      cof: project.cof,
      ordinance: project.ordinance,
      Approvals: project.Approvals?.map(approval => { return { ...approval, date: approval.date.toString() } }),
      VestingPeriods: project.VestingPeriods?.map(period => { return { ...period, date: period.date.toString() } }),
      Milestones: project.Milestones?.map(milestone => { return { ...milestone, date: milestone.date.toString() } }),
      VestingNotifications: project.VestingNotifications,
      notes: project.notes,
      uuid: project.uuid
    }
  })
}

/**
* Returns async submit handler that updates the project and navigates to projects page
**/
const useHandleFormSubmit = () => {
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return async (formData: AppTypes.ProjectCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleUpdatePreliminaryPlat(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else savedPopup(result.msg)

    queryClient.invalidateQueries({ queryKey: ['getProject', formData.uuid] })
    queryClient.invalidateQueries({ queryKey: ['getProjects'] })
    navigate('/projects')
  }
}