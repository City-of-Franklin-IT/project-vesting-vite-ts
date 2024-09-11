import { useCallback, useEffect, useMemo } from "react"
import { useForm, UseFormReturn } from "react-hook-form"
import { createProject, createResolution, createApproval, createPeriod, createMilestone } from '../../../../context/App/AppActions'
import { savedPopup, errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { Periods } from "../../../../context/App/types"
import { CreateDevelopmentPlanFormState, OnSubmitProps, UseSetDatesObjProps, DatesObj, UseSetDatesProps, SetValueKeys } from "./types"

export const useCreateDevelopmentPlanForm = (): UseFormReturn<CreateDevelopmentPlanFormState> => { // CreateDevelopmentPlanForm useForm
  return useForm<CreateDevelopmentPlanFormState>({
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
    const approvalArray = [{ // Approvals
      date: formData.approval.FPMC.date as Date,
      approvedBy: "FPMC",
      parentId: result.data.uuid
    },{
      date: formData.approval.BOMA.date as Date,
      approvedBy: "BOMA",
      parentId: result.data.uuid
    }]

    const vestingArray = []

    formData.vesting.tenYear.date && vestingArray.push({ type: "10Y" as Periods, date: formData.vesting.tenYear.date as Date, parentId: result.data.uuid })
    formData.vesting.fifteenYear.date && vestingArray.push({ type: "15Y" as Periods, date: formData.vesting.fifteenYear.date as Date, parentId: result.data.uuid })

    const milestonesArray = [{ // Milestones
      number: 1,
      date: formData.milestones.first.date as Date,
      parentId: result.data.uuid
    },{
      number: 2,
      date: formData.milestones.second.date as Date,
      parentId: result.data.uuid
    }]

    const response = await Promise.all([
      createResolution({ resolution: formData.resolution, parentId: result.data.uuid }),
      ...approvalArray.map(obj => createApproval(obj)),
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