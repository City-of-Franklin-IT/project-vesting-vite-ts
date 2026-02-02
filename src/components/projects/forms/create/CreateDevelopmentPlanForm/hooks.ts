import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useForm, Path } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { useEnableQuery, useProjectCreateCtx } from "@/helpers/hooks"
import { addYears } from "@/helpers/utils"
import { handleCreateDevelopmentPlan } from './utils'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import * as AppTypes from "@/context/types"

/**
* Returns form methods and submit handler for CreateDevelopmentPlanForm
**/
export const useHandleCreateDevelopmentPlanForm = () => {
  const methods = useCreateDevelopmentPlanForm()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, handleFormSubmit }
}

/**
* Sets milestone and vesting dates when BOMA approval date changes
**/
export const useHandleBOMADateChange = () => {
  const { methods } = useProjectCreateCtx()

  const { setValue, watch, getValues } = methods

  const bomaDate = watch(`Approvals.${ 1 }.date`)

  useEffect(() => {
    if(bomaDate) {
      const setFormValue = (field: Path<AppTypes.ProjectCreateInterface>, years: number) => {
        setValue(field, addYears(years, bomaDate), { shouldValidate: true, shouldDirty: true })
      }

      setFormValue(`Milestones.${ 0 }.date`, 3)
      setFormValue(`Milestones.${ 1 }.date`, 5)

      const newVestingPeriods = getValues(`VestingPeriods`) || []

      newVestingPeriods.forEach((period, index) => {
        const yearsToAdd = period.type === "10Y" ? 10 : 15
        setFormValue(`VestingPeriods.${ index }.date`, yearsToAdd)
      })
    }
  }, [bomaDate, setValue, getValues])
}

/**
* Initializes react-hook-form with default values for Development Plan
**/
const useCreateDevelopmentPlanForm = (): UseFormReturn<AppTypes.ProjectCreateInterface> => {
  return useForm<AppTypes.ProjectCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      type: 'Development Plan',
      name: '',
      cof: undefined,
      ordinance: '',
      Approvals: [{
        approvedBy: 'FPMC',
        date: '',
      },{
        approvedBy: 'BOMA',
        date: '',
      }],
      Resolution: {
        resolution: ''
      },
      VestingPeriods: [{
        type: '10Y',
        date: '',
      },{
        type: '15Y',
        date: '',
      }],
      Milestones: [{
        number: 1,
        date: '',
      },{
        number: 2,
        date: ''
      }],
      notes: ''
    }
  })
}

/**
* Returns async submit handler that creates the project and navigates to projects page
**/
const useHandleFormSubmit = () => {
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return async (formData: AppTypes.ProjectCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleCreateDevelopmentPlan(formData, token).catch(() => null)

    if(!result?.success) {
      errorPopup(result?.msg || 'Error saving project')
    } else savedPopup(result.msg)

    await queryClient.invalidateQueries({ queryKey: ['getProjects'] })
    navigate('/projects')
  }
}