import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useForm, Path } from 'react-hook-form'
import { useProjectCreateCtx, useEnableQuery } from '@/helpers/hooks'
import { addYears } from '@/helpers/utils'
import { handleCreateSitePlan } from './utils'
import { errorPopup, savedPopup } from '@/utils/Toast/Toast'

// Types
import { UseFormReturn } from 'react-hook-form'
import * as AppTypes from '@/context/types'

/**
* Returns form methods and submit handler for CreateSitePlanForm
**/
export const useHandleCreateSitePlanForm = () => {
  const methods = useCreateSitePlanForm()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, handleFormSubmit }
}

/**
* Sets milestone and vesting dates when approval date changes
**/
export const useHandleApprovalDateChange = () => {
  const { methods } = useProjectCreateCtx()

  const { setValue, watch, getValues } = methods

  const approvalDate = watch(`Approvals.${ 0 }.date`)

  useEffect(() => {
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
}

/**
* Initializes react-hook-form with default values for Site Plan
**/
const useCreateSitePlanForm = (): UseFormReturn<AppTypes.ProjectCreateInterface> => {
  return useForm<AppTypes.ProjectCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      type: 'Site Plan',
      name: '',
      cof: undefined,
      ordinance: '',
      Approvals: [{
        approvedBy: '',
        date: ''
      }],
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

    const result = await handleCreateSitePlan(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else savedPopup(result.msg)

    queryClient.invalidateQueries({ queryKey: ['getProjects'] })
    navigate('/projects')
  }
}