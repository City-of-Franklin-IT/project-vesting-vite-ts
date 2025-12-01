import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useQueryClient } from 'react-query'
import { useForm, Path } from 'react-hook-form'
import { useProjectCreateCtx, useEnableQuery } from '@/helpers/hooks'
import { addYears } from '@/helpers/utils'
import { handleCreateSitePlan } from './utils'
import { errorPopup } from '@/utils/Toast/Toast'

// Types
import { UseFormReturn } from 'react-hook-form'
import * as AppTypes from '@/context/types'

export const useHandleCreateSitePlanForm = () => {
  const methods = useCreateSitePlanForm()
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
        const newVestingPeriods = getValues(`VestingPeriods`) || []

        newVestingPeriods.forEach((period, index) => {
        const yearsToAdd = period.type === "10Y" ? 10 : 15
        setFormValue(`VestingPeriods.${ index }.date`, yearsToAdd)
      })
    }
  }, [approvalDate, setValue, getValues])
  
  useEffect(() => {
    cb()
  }, [cb])
}

const useCreateSitePlanForm = (): UseFormReturn<AppTypes.ProjectCreateInterface> => { // CreateSitePlanForm useForm

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

const useHandleFormSubmit = () => {
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  return useCallback((formData: AppTypes.ProjectCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleCreateSitePlan(formData, token)
      .then(_ => {
        queryClient.invalidateQueries('getProjects')
        navigate('/projects')
      })
      .catch(err => errorPopup(err))
  }, [navigate, queryClient, enabled, token])
}