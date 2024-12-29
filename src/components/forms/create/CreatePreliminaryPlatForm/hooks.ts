import { useMemo, useCallback, useEffect } from 'react'
import { useForm, useFormContext } from 'react-hook-form'

// Types
import { UseFormReturn } from 'react-hook-form'
import { UpdatePreliminaryPlatFormUseForm } from '../../update/UpdatePreliminaryPlatForm/types'
import { CreatePreliminaryPlatFormUseForm, UseSetDatesObjProps, DatesObj, UseSetDatesProps, SetValueKeys } from './types'

export const useCreatePreliminaryPlatForm = (): UseFormReturn<CreatePreliminaryPlatFormUseForm> => { // CreatePreliminaryPlatForm useForm
  return useForm<CreatePreliminaryPlatFormUseForm>({
    defaultValues: {
      type: 'Preliminary Plat',
      name: '',
      cof: undefined,
      ordinance: undefined,
      approval: {
        FPMC: {
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

export const useCreatePreliminaryPlatFormContext = (): { methods: UseFormReturn<CreatePreliminaryPlatFormUseForm|UpdatePreliminaryPlatFormUseForm>, disabled: boolean } => { // CreatePreliminaryPlatForm context
  const methods = useFormContext<CreatePreliminaryPlatFormUseForm|UpdatePreliminaryPlatFormUseForm>()

  const disabled = methods.watch('expired')

  return { methods, disabled }
}

export const useSetDatesObj = (values: UseSetDatesObjProps['values']): DatesObj => useMemo(() => { // Return datesObj
  return {
    fpmcDate: values.approval.FPMC.date,
    tenYearDate: values.vesting.tenYear.date,
    fifteenYearDate: values.vesting.fifteenYear.date,
    firstMilestoneDate: values.milestones.first.date,
    secondMilestoneDate: values.milestones.second.date
  }
}, [values.approval.FPMC.date, values.vesting.tenYear.date, values.vesting.fifteenYear.date, values.milestones.first.date, values.milestones.second.date])

export const useSetDates = (dates: UseSetDatesProps['dates'], options: UseSetDatesProps['options']) => { // Set milestones and vesting dates on FPMC approval change
  const { setValue } = options

  const setDates = useCallback(() => {
    if(dates.fpmcDate) { // If approval date
      const approvalDate = new Date(dates.fpmcDate)
  
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