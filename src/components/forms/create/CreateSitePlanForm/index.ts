import { useMemo, useCallback } from 'react'
import { createProject, createApproval, createPeriod, createMilestone } from '../../../../context/App/AppActions'
import { savedPopup, errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { Periods } from '../../../../context/App/types'
import { OnSubmitProps, UseSetDatesObjProps, DatesObj, UseSetDatesProps, SetValueKeys } from "./types"

export const onSubmit = async (formData: OnSubmitProps['formData'], navigate: OnSubmitProps['navigate'], token: OnSubmitProps['token']): Promise<void> => {
  const projectObj = {
    type: formData.type,
    name: formData.name,
    cof: formData.cof,
    ordinance: formData.ordinance,
    notes: formData.notes
  }

  const result = await createProject(projectObj, token)

  if(result.success && result.data) {
    const vestingArray = []

    formData.vesting.tenYear.date && vestingArray.push({ type: "10Y" as Periods, date: formData.vesting.tenYear.date as Date, parentId: result.data.uuid })
    formData.vesting.fifteenYear.date as Date && vestingArray.push({ type: "15Y" as Periods, date: formData.vesting.fifteenYear.date as Date, parentId: result.data.uuid })

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
      createApproval({ date: formData.approval.date as Date, approvedBy: formData.approval.approvedBy as string, parentId: result.data.uuid }, token),
      ...vestingArray.map(obj => createPeriod(obj, token)),
      ...milestonesArray.map(obj => createMilestone(obj, token))
    ])

    if(response) {
      savedPopup(result.msg || undefined)
      navigate('/')
    } else errorPopup()
  } else errorPopup()
}

export const useSetDatesObj = (values: UseSetDatesObjProps['values']): DatesObj => useMemo(() => { // Return datesObj
  return {
    approvalDate: values.approval.date,
    tenYearDate: values.vesting.tenYear.date,
    fifteenYearDate: values.vesting.fifteenYear.date,
    firstMilestoneDate: values.milestones.first.date,
    secondMilestoneDate: values.milestones.second.date
  }
}, [values.approval.date, values.vesting.tenYear.date, values.vesting.fifteenYear.date, values.milestones.first.date, values.milestones.second.date]) 

export const useSetDates = (dates: UseSetDatesProps['dates'], setValue: UseSetDatesProps['setValue']): () => void => useCallback(() => { // Set project vesting period and milestone dates
  if(dates.approvalDate) { // If approval date
    const approvalDate = new Date(dates.approvalDate)

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
}, [dates, setValue])