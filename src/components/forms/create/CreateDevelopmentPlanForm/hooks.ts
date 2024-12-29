import { useCallback, useEffect, useMemo } from "react"
import { useForm, useFormContext } from "react-hook-form"

// Types
import { UseFormReturn } from "react-hook-form"
import { UpdateDevelopmentPlanFormUseForm } from "../../update/UpdateDevelopmentPlanForm/types"
import { CreateDevelopmentPlanFormUseForm, UseSetDatesObjProps, DatesObj, UseSetDatesProps, SetValueKeys } from "./types"

export const useCreateDevelopmentPlanForm = (): UseFormReturn<CreateDevelopmentPlanFormUseForm> => { // CreateDevelopmentPlanForm useForm
  return useForm<CreateDevelopmentPlanFormUseForm>({
    defaultValues: {
      type: 'Development Plan',
      name: '',
      cof: undefined,
      resolution: '',
      ordinance: undefined,
      approval: {
        FPMC: {
          date: undefined
        },
        BOMA: {
          date: undefined
        }
      },
      vesting: {
        tenYear: {
          date: undefined
        },
        fifteenYear: {
          date: undefined
        }
      },
      milestones: {
        first: {
          date: undefined
        },
        second: {
          date: undefined
        }
      },
      notes: ''
    }
  })
}

export const useCreateDevelopmentPlanFormContext = (): { methods: UseFormReturn<CreateDevelopmentPlanFormUseForm|UpdateDevelopmentPlanFormUseForm>, disabled: boolean } => { // CreateDevelopmentPlan form context
  const methods = useFormContext<CreateDevelopmentPlanFormUseForm|UpdateDevelopmentPlanFormUseForm>()

  const disabled = methods.watch('expired')

  return { methods, disabled }
}

export const useSetDatesObj = (values: UseSetDatesObjProps['values']): DatesObj => useMemo(() => { // Return datesObj
  return {
    fpmcDate: values.approval.FPMC.date,
    bomaDate: values.approval.BOMA.date,
    tenYearDate: values.vesting.tenYear.date,
    fifteenYearDate: values.vesting.fifteenYear.date,
    firstMilestoneDate: values.milestones.first.date,
    secondMilestoneDate: values.milestones.second.date
  }
}, [values.approval.FPMC.date, values.approval.BOMA.date, values.vesting.tenYear.date, values.vesting.fifteenYear.date, values.milestones.first.date, values.milestones.second.date])

export const useSetDates = (dates: UseSetDatesProps['dates'], options: UseSetDatesProps['options']): void => { // Set milestones and vesting dates on BOMA approval date change
  const { setValue } = options

  const setDates = useCallback(() => {
    if(dates.bomaDate) { // If approval date
      const approvalDate = new Date(dates.bomaDate)
  
      const datesObj: Record<SetValueKeys, number> = {
        ["milestones.first.date"]: new Date(approvalDate).setFullYear(approvalDate.getFullYear() + 3),
        ["milestones.second.date"]: new Date(approvalDate).setFullYear(approvalDate.getFullYear() + 5),
        ["vesting.tenYear.date"]: new Date(approvalDate).setFullYear(approvalDate.getFullYear() + 10),
        ["vesting.fifteenYear.date"]: new Date(approvalDate).setFullYear(approvalDate.getFullYear() + 15)
      }
  
      for(const prop in datesObj) {
        const dateString = new Date(datesObj[prop as SetValueKeys]).toISOString().split("T")[0]
        setValue(prop as SetValueKeys, dateString);
      }
    }
  }, [dates])

  useEffect(() => {
    setDates()
  }, [dates])
}