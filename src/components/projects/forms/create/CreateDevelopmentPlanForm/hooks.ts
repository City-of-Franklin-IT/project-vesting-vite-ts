import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router"
import { useForm, Path } from "react-hook-form"
import { useQueryClient } from "react-query"
import { useEnableQuery, useProjectCreateCtx } from "@/helpers/hooks"
import { addYears } from "@/helpers/utils"
import { handleCreateDevelopmentPlan } from './utils'
import { errorPopup } from "@/utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import * as AppTypes from "@/context/types"

export const useHandleCreateDevelopmentPlanForm = () => {
  const methods = useCreateDevelopmentPlanForm()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, handleFormSubmit }
}

export const useHandleBOMADateChange = () => { // Set other dates on BOMA date change
  const { methods } = useProjectCreateCtx()

  const { setValue, watch, getValues } = methods

  const bomaDate = watch(`Approvals.${ 1 }.date`)

  const cb = useCallback(() => {
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

  useEffect(() => {
    cb()
  }, [cb])
}

const useCreateDevelopmentPlanForm = (): UseFormReturn<AppTypes.ProjectCreateInterface> => { // CreateDevelopmentPlanForm useForm

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

const useHandleFormSubmit = () => {
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  return useCallback((formData: AppTypes.ProjectCreateInterface) => {
    if(!enabled || !token) return

    handleCreateDevelopmentPlan(formData, token)
      .then(_ => {
        queryClient.invalidateQueries('getProjects')
        navigate('/projects')
      })
      .catch(err => errorPopup(err))
  }, [navigate, queryClient, enabled, token])
}