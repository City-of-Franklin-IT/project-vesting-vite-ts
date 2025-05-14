import { useCallback, useEffect } from "react"
import { useNavigate } from "react-router"
import { useForm, Path } from "react-hook-form"
import { useEnableQuery, useProjectCreateCtx } from "@/helpers/hooks"
import { addYears } from "@/helpers/utils"
import { handleCreateDevelopmentPlan } from './utils'
import { errorPopup } from "@/utils/Toast/Toast"

// Types
import { UseFormReturn } from "react-hook-form"
import { ProjectCreateInterface } from "@/context/App/types"

export const useCreateDevelopmentPlanForm = (): UseFormReturn<ProjectCreateInterface> => { // CreateDevelopmentPlanForm useForm

  return useForm<ProjectCreateInterface>({
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

export const useHandleFormSubmit = () => {
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()

  return useCallback((formData: ProjectCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleCreateDevelopmentPlan(formData, token)
      .then(_ => navigate('/projects'))
      .catch(err => errorPopup(err))
  }, [navigate, enabled, token])
}