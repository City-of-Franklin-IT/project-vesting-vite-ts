import { useMemo, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createProject, createApproval, createPeriod, createMilestone } from '../../../../context/App/AppActions'
import { savedPopup, errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { UseFormReturn } from 'react-hook-form'
import { Periods } from '../../../../context/App/types'
import { CreatePreliminaryPlatFormState, OnSubmitProps, UseSetDatesObjProps, DatesObj, UseSetDatesProps, SetValueKeys } from './types'

export const useCreatePreliminaryPlatForm = (): UseFormReturn<CreatePreliminaryPlatFormState> => { // CreatePreliminaryPlatForm useForm
  return useForm<CreatePreliminaryPlatFormState>({
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

export const onSubmit = async (formData: OnSubmitProps['formData'], options: OnSubmitProps['options']): Promise<void> => { // Handle form submit
  const { navigate } = options
  
  const projectObj = {
    type: formData.type,
    name: formData.name,
    cof: formData.cof,
    ordinance: formData.ordinance,
    notes: formData.notes
  }

  const result = await createProject(projectObj)

  if(result.success && result.data) {
    const vestingArray = []

    formData.vesting.tenYear.date && vestingArray.push({ type: "10Y" as Periods, date: formData.vesting.tenYear.date as Date, parentId: result.data.uuid })
    formData.vesting.fifteenYear.date && vestingArray.push({ type: "15Y" as Periods, date: formData.vesting.fifteenYear.date as Date, parentId: result.data.uuid })

    const milestonesArray = [{
      number: 1,
      date: formData.milestones.first.date as Date,
      parentId: result.data.uuid
    },{
      number: 2,
      date: formData.milestones.second.date as Date,
      parentId: result.data.uuid
    }]

    const response = await Promise.all([
      createApproval({ date: formData.approval.FPMC.date as Date, approvedBy: "FPMC", parentId: result.data.uuid }),
      ...vestingArray.map(obj => createPeriod(obj)),
      ...milestonesArray.map(obj => createMilestone(obj))
    ])

    if(response) {
      savedPopup(result.msg || undefined)
      navigate('/')
    } else errorPopup()
  } else errorPopup()
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