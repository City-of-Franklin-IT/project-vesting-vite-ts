import { createProject, createApproval, createPeriod, createMilestone } from '../../../../context/App/AppActions'
import { savedPopup, errorPopup } from "../../../../utils/Toast/Toast"

// Types
import { Periods } from '../../../../context/App/types'
import { OnSubmitProps } from './types'

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